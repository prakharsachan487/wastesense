# Smart Waste Intelligence Platform (SWIP)
> **Hackathon Software Demo • Virtual Smart Bins • AI • Operations • Analytics**

A closed-loop smart municipal and commercial waste operations platform that simulates IoT smart-bin events and turns them into real-time alerts, AI-driven priority decisions, collection tasks, worker mobile dispatch, and verified resolution.

---

## 🌟 Core Value Proposition

> *"We don't just report garbage. We detect it, predict it, dispatch the right resource, verify collection, and learn from the data."*

Unlike basic complaint apps, this platform provides a **complete closed-loop operational workflow** powered by a **digital twin / IoT simulation layer**, bridging citizens, field sanitation teams, and city administrators.

---

## 📁 Project Architecture & Structure

```
SmartWaste_Intelligence_Platform/
│
├── docs/                               # System specifications, requirements & demo plans
│   ├── project-requirements.md         # Full feature specifications & brief mapping
│   ├── system-architecture.md          # Multi-tier system design & data flow
│   ├── research-references.md          # Domain references, algorithms & IoT specs
│   └── hackathon-plan.md               # 5-screen judge walkthrough & live demo script
│
├── frontend/                           # Unified Responsive Web Application
│   ├── index.html                      # Main entrypoint with multi-portal navigation
│   ├── css/
│   │   ├── style.css                   # Modern glassmorphism & dashboard styling
│   │   └── components.css              # Cards, charts, maps, modals & status badges
│   └── js/
│       ├── app.js                      # Application state & router controller
│       ├── admin-dashboard.js          # Command center, KPI cards, hotspot map
│       ├── citizen-portal.js           # Issue reporting, photo upload, ticket tracking
│       ├── smart-bins.js               # IoT Digital Twin monitor & live telemetry
│       ├── ai-insights.js              # Urgency prediction & waste classifier
│       ├── worker-portal.js            # Dispatch queue, navigation & proof verification
│       └── mock-data.js                # Initial realistic mock dataset
│
├── backend/                            # Application API & Event Services
│   ├── server.js                       # Express / Node API server
│   ├── package.json                    # Backend dependencies
│   ├── controllers/
│   │   ├── binController.js            # IoT sensor ingestion & bin telemetry
│   │   ├── complaintController.js      # Citizen ticket lifecycle management
│   │   └── taskController.js           # Worker dispatch & resolution verification
│   └── routes/
│       └── api.js                      # REST API endpoints
│
├── ai/                                 # AI & Decision Engine
│   ├── priority_engine.py              # Priority scoring: Fill + Overflow + Urgency + Risk
│   ├── waste_classifier.py             # Image classification (Recyclable, Organic, Hazardous)
│   └── overflow_predictor.py           # Time-to-overflow predictive modeling
│
├── iot-simulation/                     # Digital Twin & Sensor Telemetry Generator
│   ├── simulator.py                    # Virtual bin telemetry generator (fill %, weight, temp)
│   └── sensor_config.json              # Sensor thresholds, jitter rates & bin metadata
│
├── database/                           # Schemas, Migrations & Seed Data
│   ├── schema.sql                      # SQL schema for Bins, Tickets, Tasks, Workers
│   └── seed_data.json                  # Sample data for 12 bins, 27 complaints, 5 hotspots
│
├── assets/                             # Visual assets, icons & demo imagery
│   └── badges/                         # Status indicator icons & graphics
│
├── tests/                              # Unit & Integration tests
│   ├── test_priority_engine.py         # Priority algorithm tests
│   └── test_api.js                     # Endpoint integration tests
│
└── README.md                           # Master Project Overview
```

---

## 🚀 Key Modules & Capabilities

### 1. Admin Command Center
- **Live KPIs**: Critical Bins (12), Open Complaints (27), Pickups Today (84), Hotspots (5).
- **Incident & Hotspot Map**: Real-time geolocation visualization of high-density waste clusters and overflowing bins.
- **Collection Performance**: Real-time response SLA tracking and operational throughput.

### 2. Smart Bins (IoT Digital Twin)
- **Live Telemetry**: Real-time fill level (%), weight (kg), internal temperature (°C), battery (%), and last serviced timestamp.
- **Simulate Sensor Control**: Interactive demo sliders and 1-click critical event trigger (e.g. inject 95% fill level into Bin B-102).

### 3. AI Decision Engine
- **Transparent Priority Scoring Algorithm**:
  $$\text{Priority} = \text{Fill Urgency} + \text{Predicted Overflow} + \text{Repeated Complaints} + \text{Time Since Collection} + \text{Location Risk}$$
- **Automated Dispatch**: Intelligent assignment of nearest worker and collection vehicle.
- **Waste Classification**: Visual AI assistance for proper segregation (Organic, Recyclable, E-Waste, Hazardous).

### 4. Citizen Portal
- **Ticket Submission**: Category selection (Overflowing bin, Garbage on road, Missed collection, Illegal dumping), photo upload, and GPS tag.
- **Transparent Lifecycle Tracking**: `Submitted` ➔ `Reviewed` ➔ `Assigned` ➔ `In Progress` ➔ `Resolved`.
- **Public Segregation Awareness**: Interactive guide on proper waste sorting.

### 5. Worker Field Portal
- **Task Queue**: Mobile-optimized assigned task cards with route navigation.
- **Execution Actions**: One-tap status updates (`Start Route` ➔ `Arrived` ➔ `Collected`).
- **Proof of Resolution**: Before/After photo upload and weight verification to close tickets.

---

## ⚡ 60-Second Hackathon Live Demo Flow

1. **Inspect Bin**: Navigate to **Smart Bins** tab and locate `Bin B-102` (normal status at 45%).
2. **Trigger IoT Event**: Open **Simulate Sensor Data**, set fill level to `95%`, and click **Publish Event**.
3. **AI Alert**: System instantly calculates priority score `94/100 (CRITICAL)` and flags high overflow risk.
4. **Auto-Dispatch**: A high-priority collection task is automatically generated and assigned to Worker Rahul S. (Vehicle #04).
5. **Worker Execution**: Switch to **Worker Portal**, accept task, mark `Arrived`, and upload collection proof photo.
6. **Closed Loop**: Bin fill drops to `18%`, complaint/task marked `Resolved`, and Admin Command Center updates metrics live!
