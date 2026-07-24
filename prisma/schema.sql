-- ==========================================
-- 1. ENUMS & HELPER FUNCTIONS
-- ==========================================

-- Define strict states for appointments to prevent bad data
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

-- Helper function to check if the current user is an admin
-- This makes our RLS policies much cleaner to write
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 2. TABLE CREATION
-- ==========================================

-- PROFILES TABLE: Extends the default Supabase auth.users table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SERVICES TABLE: The menu of braids and classes
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  deposit_amount NUMERIC(10, 2) NOT NULL, -- Fixed deposit to hold the slot
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- APPOINTMENTS TABLE: The core booking ledger
CREATE TABLE appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE RESTRICT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status appointment_status DEFAULT 'pending',
  stripe_payment_intent TEXT, -- Links to Stripe to verify the deposit was paid
  client_notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent double booking the exact same time block mechanically
  CONSTRAINT no_overlapping_appointments EXCLUDE USING gist (
    tsrange(start_time, end_time) WITH &&
  ) WHERE (status IN ('confirmed', 'pending'))
);


-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can see and update their own profile. Admins can see everything.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id OR is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- SERVICES POLICIES
-- Anyone on the internet can see active services. Only admins can edit the menu.
CREATE POLICY "Anyone can view active services" ON services FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY "Only admins can insert services" ON services FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Only admins can update services" ON services FOR UPDATE USING (is_admin());
CREATE POLICY "Only admins can delete services" ON services FOR DELETE USING (is_admin());

-- APPOINTMENTS POLICIES
-- Clients can book and view their own history. Admins have full control.
CREATE POLICY "Clients can view own appointments" ON appointments FOR SELECT USING (auth.uid() = client_id OR is_admin());
CREATE POLICY "Clients can book appointments" ON appointments FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can cancel own appointments" ON appointments FOR UPDATE USING (auth.uid() = client_id AND status = 'pending' OR is_admin());
CREATE POLICY "Only admins can delete appointments" ON appointments FOR DELETE USING (is_admin());


-- ==========================================
-- 4. AUTOMATION TRIGGERS
-- ==========================================

-- Function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to Profiles
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Attach trigger to Appointments
CREATE TRIGGER set_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
