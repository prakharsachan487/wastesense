-- ==========================================================
-- WASTESENSE: AI-POWERED SMART WASTE INTELLIGENCE PLATFORM
-- Production PostgreSQL Database Schema for Supabase
-- ==========================================================

-- Enable PostGIS / UUID extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SMART BINS TABLE (IoT Sensor Telemetry)
CREATE TABLE IF NOT EXISTS public.smart_bins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bin_id VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    zone VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    fill_level INTEGER NOT NULL CHECK (fill_level >= 0 AND fill_level <= 100),
    weight DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    temperature DOUBLE PRECISION NOT NULL DEFAULT 25.0,
    battery INTEGER NOT NULL CHECK (battery >= 0 AND battery <= 100) DEFAULT 95,
    status VARCHAR(50) NOT NULL DEFAULT 'NORMAL',
    waste_type VARCHAR(100) NOT NULL DEFAULT 'Mixed Solid Waste',
    last_collection VARCHAR(100) NOT NULL,
    overflow_prediction VARCHAR(150),
    priority_score INTEGER NOT NULL DEFAULT 50,
    risk_factor VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. COMPLAINTS TABLE (Citizen Incident Reports)
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    user_phone VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    location VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(50) NOT NULL DEFAULT 'Submitted',
    assigned_worker VARCHAR(150),
    assigned_vehicle VARCHAR(150),
    timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. COLLECTION TASKS TABLE (Automated Dispatch Work Orders)
CREATE TABLE IF NOT EXISTS public.collection_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_code VARCHAR(50) UNIQUE NOT NULL,
    bin_id VARCHAR(50),
    complaint_id VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    zone VARCHAR(100) NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    priority_score INTEGER NOT NULL DEFAULT 50,
    worker_id VARCHAR(100) NOT NULL,
    worker_name VARCHAR(150) NOT NULL,
    vehicle_id VARCHAR(100) NOT NULL,
    vehicle_name VARCHAR(150) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Assigned',
    instructions TEXT,
    before_fill INTEGER,
    after_fill INTEGER,
    proof_photo TEXT,
    created_time VARCHAR(100),
    due_time VARCHAR(100),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 4. WORKERS TABLE (Sanitation Crew Fleet)
CREATE TABLE IF NOT EXISTS public.workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(100) DEFAULT 'Driver & Operator',
    assigned_zone VARCHAR(100) NOT NULL,
    assigned_vehicle VARCHAR(100),
    status VARCHAR(50) DEFAULT 'On Route',
    completed_today INTEGER DEFAULT 0,
    efficiency_score INTEGER DEFAULT 95
);

-- 5. VEHICLES TABLE (Compactor Trucks & Units)
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plate_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    capacity_tons DOUBLE PRECISION NOT NULL,
    current_load_tons DOUBLE PRECISION DEFAULT 0.0,
    fuel_level INTEGER NOT NULL CHECK (fuel_level >= 0 AND fuel_level <= 100),
    status VARCHAR(50) DEFAULT 'Active',
    assigned_worker VARCHAR(150),
    zone VARCHAR(100) NOT NULL
);

-- 6. PICKUP REQUESTS TABLE (Bulky Doorstep Bookings)
CREATE TABLE IF NOT EXISTS public.pickup_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    waste_type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    preferred_date VARCHAR(50) NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    notes TEXT,
    assigned_unit VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CITIZEN ECO REWARDS LEDGER
CREATE TABLE IF NOT EXISTS public.eco_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    citizen_name VARCHAR(150) NOT NULL,
    citizen_phone VARCHAR(50),
    points_awarded INTEGER NOT NULL DEFAULT 50,
    complaint_ref VARCHAR(50),
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- REALTIME WEB-SOCKET SUBSCRIPTIONS
-- ==========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.smart_bins;
ALTER PUBLICATION supabase_realtime ADD TABLE public.complaints;
ALTER PUBLICATION supabase_realtime ADD TABLE public.collection_tasks;

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
ALTER TABLE public.smart_bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_rewards ENABLE ROW LEVEL SECURITY;

-- Allow public read & write access for demo & municipal portal
CREATE POLICY "Public Read smart_bins" ON public.smart_bins FOR SELECT USING (true);
CREATE POLICY "Public Update smart_bins" ON public.smart_bins FOR UPDATE USING (true);

CREATE POLICY "Public Read complaints" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Public Insert complaints" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update complaints" ON public.complaints FOR UPDATE USING (true);

CREATE POLICY "Public Read collection_tasks" ON public.collection_tasks FOR SELECT USING (true);
CREATE POLICY "Public Insert collection_tasks" ON public.collection_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update collection_tasks" ON public.collection_tasks FOR UPDATE USING (true);

CREATE POLICY "Public Read workers" ON public.workers FOR SELECT USING (true);
CREATE POLICY "Public Read vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Public Read pickup_requests" ON public.pickup_requests FOR SELECT USING (true);
CREATE POLICY "Public Insert pickup_requests" ON public.pickup_requests FOR INSERT WITH CHECK (true);

-- ==========================================================
-- SEED INITIAL DATA (All 20 Smart Bins & Assets)
-- ==========================================================
INSERT INTO public.smart_bins (bin_id, location, zone, latitude, longitude, fill_level, weight, temperature, battery, status, waste_type, last_collection, overflow_prediction, priority_score, risk_factor)
VALUES
('B-101', 'Central Market, Sector 12 Gate 1', 'Zone A - Commercial', 28.6139, 77.2090, 78, 24.5, 28.4, 94, 'HIGH', 'Commercial Food Waste', '4h ago', 'Overflow in ~2.5 hrs', 84, 'Peak dining market surge'),
('B-102', 'Central Market, Vegetable Plaza', 'Zone A - Commercial', 28.6145, 77.2098, 95, 38.2, 29.5, 87, 'CRITICAL', 'Organic Wet Waste', '7h ago', 'CRITICAL: Spill within 30m', 95, 'Overfilled vegetable carton surge'),
('B-103', 'Metro Station Gate 3', 'Zone A - Commercial', 28.6120, 77.2075, 45, 12.1, 26.0, 98, 'NORMAL', 'Dry Recyclables & Cups', '1h ago', 'Normal velocity', 45, 'Regular pedestrian traffic'),
('B-104', 'Apex Commercial Tower', 'Zone A - Commercial', 28.6155, 77.2110, 62, 18.0, 27.2, 92, 'WARNING', 'Packaging Cardboard', '3h ago', 'Overflow in ~6 hrs', 68, 'Office afternoon unboxing'),
('B-105', 'Community Park Walkway', 'Zone B - Residential', 28.6210, 77.2180, 84, 21.0, 27.8, 90, 'HIGH', 'Mixed Domestic Waste', '5h ago', 'Overflow in ~1.5 hrs', 82, 'Morning walkers & pet waste'),
('B-106', 'Pocket 4 Residential Gates', 'Zone B - Residential', 28.6225, 77.2195, 25, 6.5, 24.5, 96, 'NORMAL', 'Dry Segregated Waste', '2h ago', 'Normal velocity', 25, 'Scheduled doorstep collected'),
('B-107', 'City Government Hospital ER', 'Zone C - Healthcare', 28.6290, 77.2250, 91, 32.0, 31.0, 89, 'CRITICAL', 'Sanitary Non-Hazardous', '6h ago', 'High health safety risk', 93, 'High ER patient influx'),
('B-108', 'Industrial Area Phase 2 Road 4', 'Zone D - Industrial', 28.6350, 77.2310, 52, 28.4, 33.5, 85, 'NORMAL', 'Scrap Packaging & Metal', '8h ago', 'Normal velocity', 55, 'Workshop packaging load'),
('B-109', 'Govt Model Senior Secondary School', 'Zone E - Institutional', 28.6410, 77.2380, 88, 19.5, 26.5, 95, 'HIGH', 'Paper & Stationery Dry', '4h ago', 'Recess volume burst', 86, 'Mid-day meal packaging'),
('B-110', 'Interstate Bus Terminal Bay 6', 'Zone F - Transit', 28.6480, 77.2450, 94, 35.0, 28.0, 91, 'CRITICAL', 'Single-Use Plastic Bottles', '5h ago', 'Critical transit overload', 94, 'Long-distance arrival surge')
ON CONFLICT (bin_id) DO NOTHING;

-- Seed Workers
INSERT INTO public.workers (worker_code, name, phone, role, assigned_zone, assigned_vehicle, status, completed_today, efficiency_score)
VALUES
('W-01', 'Rahul Sharma', '+91 98112-40192', 'Zone Lead Driver', 'Zone A - Commercial', 'Truck #04 (DL-1AA-4091)', 'On Route', 6, 96),
('W-02', 'Deepak Verma', '+91 98113-50123', 'Compactor Operator', 'Zone B - Residential', 'Truck #02 (DL-1AA-2019)', 'On Duty', 5, 92),
('W-03', 'Manoj Kumar', '+91 98114-60456', 'Emergency Triage Driver', 'Zone C - Healthcare', 'Van #07 (DL-2C-7712)', 'On Route', 4, 98)
ON CONFLICT (worker_code) DO NOTHING;

-- Seed Vehicles
INSERT INTO public.vehicles (plate_number, vehicle_name, type, capacity_tons, current_load_tons, fuel_level, status, assigned_worker, zone)
VALUES
('DL-1AA-4091', 'Truck #04 (Heavy Compactor)', 'Hydraulic Compactor', 8.5, 4.2, 84, 'Active', 'Rahul Sharma', 'Zone A - Commercial'),
('DL-1AA-2019', 'Truck #02 (Standard Tipper)', 'Mechanical Tipper', 5.0, 2.1, 76, 'Active', 'Deepak Verma', 'Zone B - Residential'),
('DL-2C-7712', 'Van #07 (Rapid Response)', 'Electric EV Van', 2.0, 0.8, 92, 'Active', 'Manoj Kumar', 'Zone C - Healthcare')
ON CONFLICT (plate_number) DO NOTHING;
