# AirIQ System Architecture Flow

```text
Autonomous Drone Fleet
        ↓
ESP32-S3 Microcontroller Unit
├── MQ135 Air Quality Sensor
├── MQ137 Ammonia Sensor
├── GPS High-Precision Module
└── Temperature & Humidity Probes
        ↓
Sensor Calibration & Noise Reduction
        ↓
AQI Computation & Spatial Mapping Engine
        ↓
Firebase Cloud Telemetry Store & REST API
        ↓
Live Visualization Dashboard
├── Hyperlocal AQI Heatmap
├── Historical Trend Analytics
└── Drone Trajectory Track
```
