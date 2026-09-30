# Project Requirements & Scope Specification
**Smart Waste Intelligence Platform (SWIP)**

## 1. Problem Statement & Brief Mapping

| Problem from Brief | Software Solution in SWIP |
| :--- | :--- |
| **Overflowing bins** | Virtual Smart Bin Monitoring shows live fill level and generates critical alerts when thresholds (>80% warning, >90% critical) are breached. |
| **Missed / delayed collection** | Automated collection task dispatch, worker assignment, status tracking, and completion verification are built into the workflow. |
| **Improper segregation** | AI waste classification (Organic, Recyclable, Hazardous, E-Waste) and citizen waste-awareness guide explain and support correct segregation. |
| **Reporting problems** | Citizen portal provides structured categories: Overflowing bin, Garbage on road, Missed collection, Illegal dumping with photo attachment & GPS geolocation. |
| **Complaint tracking** | Every complaint receives a unique tracking ticket ID and progresses through: `Submitted` → `Reviewed` → `Assigned` → `In Progress` → `Resolved`. |
| **Illegal dumping** | Citizen reports include geolocation and photo evidence; recurring incident coordinates are automatically clustered into hotspot zones. |
| **Lack of awareness** | Dedicated citizen awareness module provides educational breakdowns of waste streams, disposal rules, and contamination penalties. |
| **Centralized administrative data** | Admin Command Center consolidates real-time bin telemetry, complaints, scheduled pickups, worker tasks, and analytics. |
| **Identify waste hotspots** | Geospatial analytics aggregates sensor telemetry and citizen complaints to highlight high-frequency problem areas. |
| **Improve collection services** | Analytics monitor average response time, pending task queues, missed pickups, and weekly collection trends. |

---

## 2. Functional Requirements

### 2.1 Citizen Portal
- **FR-C1**: Anonymous or authenticated reporting with category selection.
- **FR-C2**: Photo capture/upload simulation with client-side preview.
- **FR-C3**: Geolocation coordinates capture (simulated or HTML5 Geolocation API).
- **FR-C4**: Real-time ticket tracking by Ticket ID with visual timeline progress.
- **FR-C5**: Waste segregation advisor with search and AI image recognition assistance.

### 2.2 Smart Bin Digital Twin (IoT Simulation)
- **FR-B1**: Support monitoring of multiple bins with telemetry: Bin ID, Fill Level (%), Weight (kg), Temperature (°C), Battery (%), Last Serviced, and Location Zone.
- **FR-B2**: Dynamic status thresholding:
  - Normal: `< 70%`
  - Warning: `70% - 89%`
  - Critical: `>= 90%`
- **FR-B3**: Interactive Sensor Simulation Control:
  - Select any bin from the fleet.
  - Manual slider controls for fill level, weight, and temperature.
  - Quick 1-click preset triggers: "Simulate Overflow Event (Bin B-102 at 95%)", "Simulate Fire Hazard (>55°C)", "Simulate Normal Flush".
  - Broadcast event into the platform's reactive event bus.

### 2.3 AI Priority & Dispatch Engine
- **FR-A1**: Real-time scoring using the transparent formula:
  $$\text{Score} = (\text{Fill Urgency} \times 0.35) + (\text{Predicted Overflow} \times 0.25) + (\text{Complaints} \times 0.15) + (\text{Time Since Collection} \times 0.15) + (\text{Location Risk} \times 0.10)$$
- **FR-A2**: Automatic task generation for bins reaching Critical priority (>85).
- **FR-A3**: Route optimization and nearest vehicle/worker assignment.

### 2.4 Worker Field View
- **FR-W1**: Mobile card interface displaying assigned collection tasks.
- **FR-W2**: Interactive status transitions: `Accept` → `In Route` → `At Location` → `Complete`.
- **FR-W3**: Completion verification requiring photographic proof upload and final weight input.
- **FR-W4**: Real-time closed-loop callback that flushes bin telemetry back to baseline (<20%).

### 2.5 Admin Command Center & Analytics
- **FR-M1**: Top-level KPI overview (Critical Bins, Open Complaints, Today's Pickups, Hotspots).
- **FR-M2**: Geospatial interactive map indicating smart bins, hotspots, and active truck routes.
- **FR-M3**: Operational response metrics and SLA tracking graphs.

---

## 3. Non-Functional Requirements
- **NFR-1**: Response time under 200ms for simulated IoT events.
- **NFR-2**: Responsive design across desktop, tablet, and mobile displays.
- **NFR-3**: Transparent prototype positioning explicitly declaring the IoT layer as a simulated digital twin.
