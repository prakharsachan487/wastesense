# Research & Domain References
**Smart Waste Intelligence Platform (SWIP)**

## 1. Domain Background & Literature

1. **Smart City IoT Waste Management**:
   - Application of ultrasonic sensors (HC-SR04 / industrial ultrasonic transducers) and optical sensors for container fill monitoring.
   - Dynamic vehicle routing problem (DVRP) with time windows for municipal solid waste collection.
   - Reduction of municipal collection costs by 30–45% via condition-based collection instead of fixed static scheduling.

2. **Automated Waste Segregation & Classification**:
   - Deep learning models (Convolutional Neural Networks / MobileNet / ResNet) trained on waste datasets (TrashNet, TACO dataset) categorizing plastics, paper, glass, organic, and hazardous items.
   - Public contamination mitigation through real-time feedback at disposal points.

3. **Digital Twin Prototyping for Smart Cities**:
   - Using digital twins to simulate urban infrastructure dynamics (sensor readings, weather correlation, foot-traffic load) before multi-million dollar sensor rollouts.
   - Eliminates hardware dependency during software architecture validation.

---

## 2. Sensor Telemetry Specifications

| Sensor Type | Field Name | Unit | Nominal Range | Critical Threshold |
| :--- | :--- | :--- | :--- | :--- |
| Ultrasonic Sensor | `fill_level` | % | 0 – 100 % | $\ge 90\%$ |
| Load Strain Gauge | `weight` | kg | 0 – 60.0 kg | $\ge 45.0\text{ kg}$ |
| Digital Thermistor | `temperature` | °C | 15.0 – 40.0 °C | $\ge 50.0^\circ\text{C}$ (Fire/Combustion risk) |
| Battery Voltage | `battery` | % | 20 – 100 % | $< 15\%$ |

---

## 3. Operational KPIs & Benchmark Standards
- **Mean Time to Dispatch (MTTD)**: Automated under 1 second (vs 4-8 hours in legacy municipal workflows).
- **Collection SLA**: Critical bins targeted within 2 hours; standard bins within 24 hours.
- **Route Fuel Reduction**: Up to 38% reduction in truck mileage by skipping under-filled bins.
