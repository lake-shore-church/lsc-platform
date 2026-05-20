-- ============================================================
-- Lake Shore Church — lsc-platform
-- Full Supabase SQL Migration
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for full-text sermon search

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('public', 'member', 'staff', 'admin');
create type prayer_status as enum ('new', 'assigned', 'prayed');
create type giving_fund as enum ('general', 'building', 'missions', 'other');
create type giving_frequency as enum ('one_time', 'weekly', 'monthly');
create type translation_status as enum ('pending', 'approved', 'rejected');
create type translation_language as enum ('es', 'fr', 'pt', 'zh', 'sw', 'ko');
create type subscriber_segment as enum ('member', 'visitor', 'global');
create type expense_category as enum (
  'staff_pastoral',
  'utilities',
  'venue_building',
  'missions',
  'events',
  'equipment',
  'technology',
  'administration',
  'other'
);

-- ============================================================
-- TABLE: profiles
-- ============================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role user_role not null default 'public',
  avatar_url text,
  phone text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- TABLE: sermon_series
-- ============================================================

create table sermon_series (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  artwork_url text,
  start_date date,
  end_date date,
  theme_color text default '#1B4F8A',
  is_active boolean default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABLE: sermons
-- ============================================================

create table sermons (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  pastor_id uuid references profiles(id),
  series_id uuid references sermon_series(id),
  scripture text,
  video_url text,
  audio_url text,
  transcript jsonb,
  transcript_status text default 'pending', -- pending | processing | ready
  published_at timestamptz,
  language text default 'en',
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Full-text search index on transcript
create index idx_sermons_transcript on sermons using gin(transcript);
create index idx_sermons_published on sermons(published_at desc);

-- ============================================================
-- TABLE: translations
-- ============================================================

create table translations (
  id uuid primary key default uuid_generate_v4(),
  sermon_id uuid not null references sermons(id) on delete cascade,
  language translation_language not null,
  transcript text,
  summary text,
  status translation_status not null default 'pending',
  reviewed_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique(sermon_id, language)
);

-- ============================================================
-- TABLE: prayer_requests
-- ============================================================

create table prayer_requests (
  id uuid primary key default uuid_generate_v4(),
  submitter_id uuid references profiles(id), -- nullable for anonymous
  content text not null,
  is_private boolean not null default false,
  status prayer_status not null default 'new',
  assigned_to uuid references profiles(id),
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_prayer_status on prayer_requests(status);
create index idx_prayer_private on prayer_requests(is_private);

-- ============================================================
-- TABLE: events
-- ============================================================

create table events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  ministry_area text,
  capacity integer,
  image_url text,
  is_recurring boolean default false,
  recurrence_rule text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create index idx_events_starts_at on events(starts_at);

-- ============================================================
-- TABLE: rsvps
-- ============================================================

create table rsvps (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references events(id) on delete cascade,
  user_id uuid references profiles(id), -- nullable for non-members
  name text not null,
  email text not null,
  reminder_sent boolean default false,
  created_at timestamptz not null default now(),
  unique(event_id, email)
);

-- ============================================================
-- TABLE: blog_posts
-- ============================================================

create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text,
  author_id uuid references profiles(id),
  published_at timestamptz,
  email_sent boolean default false,
  featured_image text,
  excerpt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_blog_published on blog_posts(published_at desc);

-- ============================================================
-- TABLE: email_subscribers
-- ============================================================

create table email_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  confirmed boolean default false,
  unsubscribed_at timestamptz,
  segment subscriber_segment default 'visitor',
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABLE: small_groups
-- ============================================================

create table small_groups (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  leader_id uuid references profiles(id),
  schedule text,
  location text,
  capacity integer,
  description text,
  ministry_area text,
  is_active boolean default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABLE: members
-- ============================================================

create table members (
  id uuid primary key references profiles(id) on delete cascade,
  small_group_id uuid references small_groups(id),
  joined_at date default current_date,
  notes text,
  emergency_contact text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABLE: giving_records
-- ============================================================

create table giving_records (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references profiles(id),
  amount numeric(10,2) not null,
  fund giving_fund not null default 'general',
  frequency giving_frequency not null default 'one_time',
  zeffy_id text unique, -- Zeffy transaction reference
  date date not null default current_date,
  created_at timestamptz not null default now()
);

create index idx_giving_member on giving_records(member_id);
create index idx_giving_date on giving_records(date desc);

-- ============================================================
-- TABLE: expenses
-- ============================================================

create table expenses (
  id uuid primary key default uuid_generate_v4(),
  date date not null,
  category expense_category not null,
  description text not null,
  amount numeric(10,2) not null,
  entered_by uuid references profiles(id),
  receipt_url text, -- Cloudflare R2 URL
  year integer not null default extract(year from current_date)::integer,
  notes text,
  created_at timestamptz not null default now()
);

create index idx_expenses_year on expenses(year);
create index idx_expenses_date on expenses(date desc);

-- ============================================================
-- TABLE: notification_prefs
-- ============================================================

create table notification_prefs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique not null references profiles(id) on delete cascade,
  service_reminder boolean default true,
  event_reminder boolean default true,
  new_sermon boolean default true,
  emergency boolean default true,
  onesignal_player_id text,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- HELPER: get current user role
-- ============================================================

create or replace function get_user_role()
returns user_role language sql security definer stable
as $$
  select role from profiles where id = auth.uid();
$$;

-- ============================================================
-- ROW LEVEL SECURITY — enable on all tables
-- ============================================================

alter table profiles enable row level security;
alter table sermons enable row level security;
alter table sermon_series enable row level security;
alter table prayer_requests enable row level security;
alter table events enable row level security;
alter table rsvps enable row level security;
alter table blog_posts enable row level security;
alter table email_subscribers enable row level security;
alter table members enable row level security;
alter table small_groups enable row level security;
alter table giving_records enable row level security;
alter table expenses enable row level security;
alter table notification_prefs enable row level security;
alter table translations enable row level security;

-- ============================================================
-- RLS POLICIES: profiles
-- ============================================================

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Staff can view all profiles"
  on profiles for select using (get_user_role() in ('staff', 'admin'));

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Admin can update any profile"
  on profiles for update using (get_user_role() = 'admin');

-- ============================================================
-- RLS POLICIES: sermons + sermon_series
-- ============================================================

create policy "Anyone can view published sermons"
  on sermons for select using (published_at is not null and published_at <= now());

create policy "Staff can manage sermons"
  on sermons for all using (get_user_role() in ('staff', 'admin'));

create policy "Anyone can view sermon series"
  on sermon_series for select using (true);

create policy "Staff can manage sermon series"
  on sermon_series for all using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: prayer_requests (CRITICAL)
-- ============================================================

-- Public can submit public prayers
create policy "Anyone can submit public prayer"
  on prayer_requests for insert
  with check (is_private = false);

-- Members can submit private prayers
create policy "Members can submit private prayer"
  on prayer_requests for insert
  with check (auth.uid() is not null and is_private = true);

-- Public prayers visible to all authenticated users
create policy "Authenticated users can view public prayers"
  on prayer_requests for select
  using (is_private = false and auth.uid() is not null);

-- Private prayers: submitter or staff only
create policy "Private prayers visible to submitter and staff"
  on prayer_requests for select
  using (
    is_private = true and (
      auth.uid() = submitter_id or
      get_user_role() in ('staff', 'admin')
    )
  );

-- Staff can update prayer status
create policy "Staff can update prayers"
  on prayer_requests for update
  using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: events + rsvps
-- ============================================================

create policy "Anyone can view events"
  on events for select using (true);

create policy "Staff can manage events"
  on events for all using (get_user_role() in ('staff', 'admin'));

create policy "Anyone can RSVP"
  on rsvps for insert with check (true);

create policy "Users can view own RSVPs"
  on rsvps for select using (auth.uid() = user_id);

create policy "Staff can view all RSVPs"
  on rsvps for select using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: blog_posts
-- ============================================================

create policy "Anyone can view published blog posts"
  on blog_posts for select
  using (published_at is not null and published_at <= now());

create policy "Staff can manage blog posts"
  on blog_posts for all using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: email_subscribers
-- ============================================================

create policy "Anyone can subscribe"
  on email_subscribers for insert with check (true);

create policy "Users can manage own subscription"
  on email_subscribers for all using (email = auth.email());

create policy "Staff can view all subscribers"
  on email_subscribers for select
  using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: members + small_groups
-- ============================================================

create policy "Members can view own member record"
  on members for select using (auth.uid() = id);

create policy "Staff can view all members"
  on members for select using (get_user_role() in ('staff', 'admin'));

create policy "Staff can manage members"
  on members for all using (get_user_role() in ('staff', 'admin'));

create policy "Anyone can view small groups"
  on small_groups for select using (is_active = true);

create policy "Staff can manage small groups"
  on small_groups for all using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: giving_records
-- ============================================================

create policy "Members can view own giving"
  on giving_records for select using (auth.uid() = member_id);

create policy "Admin can view all giving"
  on giving_records for select using (get_user_role() = 'admin');

create policy "Admin can manage giving records"
  on giving_records for all using (get_user_role() = 'admin');

-- ============================================================
-- RLS POLICIES: expenses
-- ============================================================

create policy "Staff can view expenses"
  on expenses for select using (get_user_role() in ('staff', 'admin'));

create policy "Staff can enter expenses"
  on expenses for insert with check (get_user_role() in ('staff', 'admin'));

create policy "Staff can update expenses"
  on expenses for update using (get_user_role() in ('staff', 'admin'));

create policy "Admin can delete expenses"
  on expenses for delete using (get_user_role() = 'admin');

-- ============================================================
-- RLS POLICIES: notification_prefs
-- ============================================================

create policy "Users can manage own notification prefs"
  on notification_prefs for all using (auth.uid() = user_id);

create policy "Staff can view all notification prefs"
  on notification_prefs for select using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- RLS POLICIES: translations
-- ============================================================

create policy "Anyone can view approved translations"
  on translations for select using (status = 'approved');

create policy "Staff can manage translations"
  on translations for all using (get_user_role() in ('staff', 'admin'));

-- ============================================================
-- SEED: create initial admin profile
-- Note: replace with your actual auth user ID after first login
-- ============================================================

-- Run this after you first sign in:
-- update profiles set role = 'admin' where email = 'your@email.com';

-- ============================================================
-- DONE
-- ============================================================
-- All 14 tables created with RLS policies
-- Run: update profiles set role = 'admin' where email = 'YOUR_EMAIL';
-- after your first login to grant yourself admin access
EOF