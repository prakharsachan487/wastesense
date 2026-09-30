# System Architecture Specification
**Smart Waste Intelligence Platform (SWIP)**

## 1. High-Level Architecture Diagram

```mermaid
graph TD
    subgraph ClientLayer ["Client Presentation Layer (Web Application)"]
        UI_Admin["Admin Command Center"]
        UI_Citizen["Citizen Service Portal"]
        UI_Bins["Smart Bin Digital Twin"]
        UI_Worker["Worker Dispatch & Verification"]
        UI_AI["AI Insights & Classifier"]
    end

    subgraph EventAndServiceLayer ["Application & Event Bus Layer"]
        Router["Client-Side Router & Event Bus"]
        StateStore["Global Reactive State Store"]
        Simulator["IoT Telemetry Simulator"]
    end

    subgraph BackendLayer ["Backend API & Microservices"]
        API_Gateway["API Gateway / Express Server"]
        BinService["Bin Telemetry Service"]
        TicketService["Complaint & Lifecycle Service"]
        TaskService["Dispatch & Task Engine"]
    end

    subgraph AIEngineLayer ["AI & Decision Engine"]
        PriorityEngine["Multi-Factor Priority Scoring"]
        OverflowPredictor["Time-to-Overflow Regressor"]
        WasteVision["Waste Classification Model"]
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        DB[(Relational DB / SQLite / In-Memory Store)]
        GeoStore["Geospatial Coordinates & Hotspot Clusters"]
    end

    %% Interactions
    Simulator -->|Publish Sensor Telemetry| EventAndServiceLayer
    EventAndServiceLayer -->|Sync Telemetry| BinService
    BinService --> PriorityEngine
    PriorityEngine -->|Critical Trigger (>85)| TaskService
    TaskService -->|Auto-Dispatch| UI_Worker
    UI_Worker -->|Submit Photo Proof & Empty Bin| TaskService
    TaskService -->|Update State to Resolved & Reset Bin| StateStore
    UI_Citizen -->|Submit Complaint| TicketService
    TicketService --> PriorityEngine
    WasteVision -->|Classification Result| UI_Citizen
    StateStore --> ClientLayer
    BackendLayer --> DB
    BackendLayer --> GeoStore
```

---

## 2. Multi-Tier Component Breakdown

### 2.1 Virtual Smart Bins (Digital Twin Layer)
- Models smart bins equipped with:
  - Ultrasonic Distance Sensor (Fill %: 0–100%)
  - Load Cell / Weight Strain Gauge (Weight: 0–50 kg)
  - Thermistor Temperature Sensor (Celsius: 15–60°C)
  - Telemetry Beacon (Last transmission, Battery %)
- Emits structured JSON events over an event bus.

### 2.2 AI Priority Engine Formulation
Priority index $P \in [0, 100]$ is computed as:
$$P = w_1 \cdot \min(100, \text{Fill}) + w_2 \cdot \text{PredOverflow} + w_3 \cdot \min(100, \text{Complaints} \cdot 25) + w_4 \cdot \text{TimeScore} + w_5 \cdot \text{RiskFactor}$$

Where:
- $w_1 = 0.35$ (Fill Urgency)
- $w_2 = 0.25$ (Predicted rate of accumulation)
- $w_3 = 0.15$ (Citizen reports clustered within 50m)
- $w_4 = 0.15$ (Hours elapsed since last collection)
- $w_5 = 0.10$ (Commercial/market zone vs low-density residential)

When $P \ge 85$, an automatic collection task dispatch event is emitted.

### 2.3 Closed-Loop Feedback Flow
1. **Detection**: IoT simulated telemetry detects fill $> 90\%$.
2. **Evaluation**: AI Engine rates Priority as `CRITICAL (94)`.
3. **Task Creation**: High-priority work order generated without waiting for complaints.
4. **Dispatch**: Nearest crew (Worker Rahul S., Vehicle #04) notified on worker portal.
5. **Collection**: Worker arrives, collects waste, inputs emptied weight, and uploads proof.
6. **Telemetry Reset**: Digital twin resets to $\approx 15-20\%$ fill level.
7. **Resolution**: Associated citizen tickets and alerts marked `Resolved`.
