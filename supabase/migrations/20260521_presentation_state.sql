-- Run in Supabase SQL Editor (or via migration tooling).
-- Presenter mode: one shared slide index for projector + online viewers.

CREATE TABLE IF NOT EXISTS presentation_state (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sermon_id text,
  current_slide integer DEFAULT 0,
  total_slides integer DEFAULT 0,
  is_active boolean DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES profiles(id)
);

ALTER TABLE presentation_state ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view presentation state" ON presentation_state;
CREATE POLICY "Anyone can view presentation state"
  ON presentation_state FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff can manage presentation state" ON presentation_state;
CREATE POLICY "Staff can manage presentation state"
  ON presentation_state FOR ALL
  USING (get_user_role() IN ('staff', 'admin'));

-- Singleton row for the active church-wide presentation session
INSERT INTO presentation_state (
  id,
  sermon_id,
  current_slide,
  total_slides,
  is_active
)
VALUES (
  '00000000-0000-4000-a000-000000000001',
  NULL,
  0,
  0,
  false
)
ON CONFLICT (id) DO NOTHING;
