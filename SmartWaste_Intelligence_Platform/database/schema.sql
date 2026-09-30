-- Smart Waste Intelligence Platform (SWIP) Database Schema
-- Compatible with SQLite / PostgreSQL / MySQL

CREATE TABLE IF NOT EXISTS bins (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    zone VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    fill_level INT NOT NULL DEFAULT 0,
    weight_kg DECIMAL(5, 2) NOT NULL DEFAULT 0.0,
    temperature_c DECIMAL(4, 1) NOT NULL DEFAULT 25.0,
    battery_pct INT NOT NULL DEFAULT 100,
    status VARCHAR(20) NOT NULL DEFAULT 'NORMAL', -- NORMAL, WARNING, CRITICAL
    waste_type VARCHAR(50) NOT NULL DEFAULT 'General',
    last_collection TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(32) PRIMARY KEY,
    ticket_id VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- Overflowing bin, Garbage on road, Missed collection, Illegal dumping
    description TEXT,
    location_name VARCHAR(150),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    photo_url VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'Submitted', -- Submitted, Reviewed, Assigned, In Progress, Resolved
    citizen_contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workers (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    vehicle_id VARCHAR(30),
    status VARCHAR(20) NOT NULL DEFAULT 'Available', -- Available, On Route, Busy, Off Duty
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8)
);

CREATE TABLE IF NOT EXISTS collection_tasks (
    id VARCHAR(32) PRIMARY KEY,
    task_code VARCHAR(20) UNIQUE NOT NULL,
    bin_id VARCHAR(32) REFERENCES bins(id),
    complaint_id VARCHAR(32) REFERENCES complaints(id),
    worker_id VARCHAR(32) REFERENCES workers(id),
    priority VARCHAR(20) NOT NULL DEFAULT 'High', -- Critical, High, Medium, Low
    priority_score INT NOT NULL DEFAULT 50,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending', -- Pending, Assigned, In Progress, Completed
    proof_photo_url VARCHAR(255),
    weight_collected_kg DECIMAL(5, 2),
    assigned_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bin_id VARCHAR(32) NOT NULL,
    fill_level INT NOT NULL,
    weight_kg DECIMAL(5, 2) NOT NULL,
    temperature_c DECIMAL(4, 1) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotspots (
    id VARCHAR(32) PRIMARY KEY,
    zone_name VARCHAR(100) NOT NULL,
    incident_count INT NOT NULL DEFAULT 1,
    severity VARCHAR(20) NOT NULL DEFAULT 'Medium', -- High, Medium, Low
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    last_reported TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
