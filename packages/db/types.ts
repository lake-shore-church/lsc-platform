export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "public" | "member" | "staff" | "admin";
export type PrayerStatus = "new" | "assigned" | "prayed";
export type GivingFund = "general" | "building" | "missions" | "other";
export type GivingFrequency = "one_time" | "weekly" | "monthly";
export type TranslationStatus = "pending" | "approved" | "rejected";
export type TranslationLanguage = "es" | "fr" | "pt" | "zh" | "sw" | "ko";
export type SubscriberSegment = "member" | "visitor" | "global";
export type ExpenseCategory =
  | "staff_pastoral"
  | "utilities"
  | "venue_building"
  | "missions"
  | "events"
  | "equipment"
  | "technology"
  | "administration"
  | "other";

export type TranscriptStatus = "pending" | "processing" | "ready";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: UserRole;
          avatar_url: string | null;
          phone: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      sermon_series: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          artwork_url: string | null;
          start_date: string | null;
          end_date: string | null;
          theme_color: string | null;
          is_active: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          artwork_url?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          theme_color?: string | null;
          is_active?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          artwork_url?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          theme_color?: string | null;
          is_active?: boolean | null;
          created_at?: string;
        };
        Relationships: [];
      };
      sermons: {
        Row: {
          id: string;
          title: string;
          pastor_id: string | null;
          series_id: string | null;
          scripture: string | null;
          video_url: string | null;
          audio_url: string | null;
          transcript: Json | null;
          transcript_status: string | null;
          published_at: string | null;
          language: string | null;
          slug: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          pastor_id?: string | null;
          series_id?: string | null;
          scripture?: string | null;
          video_url?: string | null;
          audio_url?: string | null;
          transcript?: Json | null;
          transcript_status?: string | null;
          published_at?: string | null;
          language?: string | null;
          slug?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          pastor_id?: string | null;
          series_id?: string | null;
          scripture?: string | null;
          video_url?: string | null;
          audio_url?: string | null;
          transcript?: Json | null;
          transcript_status?: string | null;
          published_at?: string | null;
          language?: string | null;
          slug?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sermons_pastor_id_fkey";
            columns: ["pastor_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sermons_series_id_fkey";
            columns: ["series_id"];
            referencedRelation: "sermon_series";
            referencedColumns: ["id"];
          },
        ];
      };
      translations: {
        Row: {
          id: string;
          sermon_id: string;
          language: TranslationLanguage;
          transcript: string | null;
          summary: string | null;
          status: TranslationStatus;
          reviewed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sermon_id: string;
          language: TranslationLanguage;
          transcript?: string | null;
          summary?: string | null;
          status?: TranslationStatus;
          reviewed_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sermon_id?: string;
          language?: TranslationLanguage;
          transcript?: string | null;
          summary?: string | null;
          status?: TranslationStatus;
          reviewed_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "translations_sermon_id_fkey";
            columns: ["sermon_id"];
            referencedRelation: "sermons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "translations_reviewed_by_fkey";
            columns: ["reviewed_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      prayer_requests: {
        Row: {
          id: string;
          submitter_id: string | null;
          content: string;
          is_private: boolean;
          status: PrayerStatus;
          assigned_to: string | null;
          responded_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submitter_id?: string | null;
          content: string;
          is_private?: boolean;
          status?: PrayerStatus;
          assigned_to?: string | null;
          responded_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          submitter_id?: string | null;
          content?: string;
          is_private?: boolean;
          status?: PrayerStatus;
          assigned_to?: string | null;
          responded_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prayer_requests_submitter_id_fkey";
            columns: ["submitter_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prayer_requests_assigned_to_fkey";
            columns: ["assigned_to"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          starts_at: string;
          ends_at: string | null;
          location: string | null;
          ministry_area: string | null;
          capacity: number | null;
          image_url: string | null;
          is_recurring: boolean | null;
          recurrence_rule: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          starts_at: string;
          ends_at?: string | null;
          location?: string | null;
          ministry_area?: string | null;
          capacity?: number | null;
          image_url?: string | null;
          is_recurring?: boolean | null;
          recurrence_rule?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          starts_at?: string;
          ends_at?: string | null;
          location?: string | null;
          ministry_area?: string | null;
          capacity?: number | null;
          image_url?: string | null;
          is_recurring?: boolean | null;
          recurrence_rule?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      rsvps: {
        Row: {
          id: string;
          event_id: string;
          user_id: string | null;
          name: string;
          email: string;
          reminder_sent: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id?: string | null;
          name: string;
          email: string;
          reminder_sent?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string | null;
          name?: string;
          email?: string;
          reminder_sent?: boolean | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rsvps_event_id_fkey";
            columns: ["event_id"];
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rsvps_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string | null;
          author_id: string | null;
          published_at: string | null;
          email_sent: boolean | null;
          featured_image: string | null;
          excerpt: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content?: string | null;
          author_id?: string | null;
          published_at?: string | null;
          email_sent?: boolean | null;
          featured_image?: string | null;
          excerpt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string | null;
          author_id?: string | null;
          published_at?: string | null;
          email_sent?: boolean | null;
          featured_image?: string | null;
          excerpt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      email_subscribers: {
        Row: {
          id: string;
          email: string;
          confirmed: boolean | null;
          unsubscribed_at: string | null;
          segment: SubscriberSegment | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          confirmed?: boolean | null;
          unsubscribed_at?: string | null;
          segment?: SubscriberSegment | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          confirmed?: boolean | null;
          unsubscribed_at?: string | null;
          segment?: SubscriberSegment | null;
          created_at?: string;
        };
        Relationships: [];
      };
      small_groups: {
        Row: {
          id: string;
          name: string;
          leader_id: string | null;
          schedule: string | null;
          location: string | null;
          capacity: number | null;
          description: string | null;
          ministry_area: string | null;
          is_active: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          leader_id?: string | null;
          schedule?: string | null;
          location?: string | null;
          capacity?: number | null;
          description?: string | null;
          ministry_area?: string | null;
          is_active?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          leader_id?: string | null;
          schedule?: string | null;
          location?: string | null;
          capacity?: number | null;
          description?: string | null;
          ministry_area?: string | null;
          is_active?: boolean | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "small_groups_leader_id_fkey";
            columns: ["leader_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      members: {
        Row: {
          id: string;
          small_group_id: string | null;
          joined_at: string | null;
          notes: string | null;
          emergency_contact: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          small_group_id?: string | null;
          joined_at?: string | null;
          notes?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          small_group_id?: string | null;
          joined_at?: string | null;
          notes?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "members_id_fkey";
            columns: ["id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "members_small_group_id_fkey";
            columns: ["small_group_id"];
            referencedRelation: "small_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      giving_records: {
        Row: {
          id: string;
          member_id: string | null;
          amount: number;
          fund: GivingFund;
          frequency: GivingFrequency;
          zeffy_id: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          member_id?: string | null;
          amount: number;
          fund?: GivingFund;
          frequency?: GivingFrequency;
          zeffy_id?: string | null;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          member_id?: string | null;
          amount?: number;
          fund?: GivingFund;
          frequency?: GivingFrequency;
          zeffy_id?: string | null;
          date?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "giving_records_member_id_fkey";
            columns: ["member_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      expenses: {
        Row: {
          id: string;
          date: string;
          category: ExpenseCategory;
          description: string;
          amount: number;
          entered_by: string | null;
          receipt_url: string | null;
          year: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          category: ExpenseCategory;
          description: string;
          amount: number;
          entered_by?: string | null;
          receipt_url?: string | null;
          year?: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          category?: ExpenseCategory;
          description?: string;
          amount?: number;
          entered_by?: string | null;
          receipt_url?: string | null;
          year?: number;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_entered_by_fkey";
            columns: ["entered_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      presentation_state: {
        Row: {
          id: string;
          sermon_id: string | null;
          current_slide: number | null;
          total_slides: number | null;
          is_active: boolean | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          sermon_id?: string | null;
          current_slide?: number | null;
          total_slides?: number | null;
          is_active?: boolean | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          sermon_id?: string | null;
          current_slide?: number | null;
          total_slides?: number | null;
          is_active?: boolean | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "presentation_state_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notification_prefs: {
        Row: {
          id: string;
          user_id: string;
          service_reminder: boolean | null;
          event_reminder: boolean | null;
          new_sermon: boolean | null;
          emergency: boolean | null;
          onesignal_player_id: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_reminder?: boolean | null;
          event_reminder?: boolean | null;
          new_sermon?: boolean | null;
          emergency?: boolean | null;
          onesignal_player_id?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_reminder?: boolean | null;
          event_reminder?: boolean | null;
          new_sermon?: boolean | null;
          emergency?: boolean | null;
          onesignal_player_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notification_prefs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_user_role: {
        Args: Record<string, never>;
        Returns: UserRole;
      };
    };
    Enums: {
      user_role: UserRole;
      prayer_status: PrayerStatus;
      giving_fund: GivingFund;
      giving_frequency: GivingFrequency;
      translation_status: TranslationStatus;
      translation_language: TranslationLanguage;
      subscriber_segment: SubscriberSegment;
      expense_category: ExpenseCategory;
    };
    CompositeTypes: Record<string, never>;
  };
}

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];

export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];

export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];

export type Profile = Tables<"profiles">;
export type Sermon = Tables<"sermons">;
export type SermonSeries = Tables<"sermon_series">;
export type Translation = Tables<"translations">;
export type PrayerRequest = Tables<"prayer_requests">;
export type Event = Tables<"events">;
export type Rsvp = Tables<"rsvps">;
export type BlogPost = Tables<"blog_posts">;
export type EmailSubscriber = Tables<"email_subscribers">;
export type Member = Tables<"members">;
export type SmallGroup = Tables<"small_groups">;
export type GivingRecord = Tables<"giving_records">;
export type Expense = Tables<"expenses">;
export type NotificationPrefs = Tables<"notification_prefs">;
export type PresentationState = Tables<"presentation_state">;

export type SermonWithSeries = Sermon & {
  sermon_series: SermonSeries | null;
  pastor: Pick<Profile, "id" | "full_name" | "avatar_url"> | null;
};

export type MemberWithProfile = Member & {
  profile: Profile;
  small_group: SmallGroup | null;
};

export type GivingTotals = {
  total: number;
  byFund: Record<GivingFund, number>;
  count: number;
};

export type ExpenseTotals = {
  total: number;
  byCategory: Record<ExpenseCategory, number>;
  count: number;
};
