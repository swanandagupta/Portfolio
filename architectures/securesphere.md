# SecureSphere System Architecture Flow

```text
Live Network Packet Stream (PCAP / NetFlow)
        ↓
High-Throughput Packet Parser
        ↓
Feature Extraction Engine (80 CICIDS Features)
        ↓
Preprocessing & SMOTE Balance Pipeline
        ↓
Ensemble Classifier (Random Forest + XGBoost)
        ↓
Threat Categorization (DoS, DDoS, Botnet, Brute Force)
        ↓
Flask REST API & Live Analytics Dashboard
```
