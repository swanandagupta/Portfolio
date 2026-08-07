# SOC Copilot System Architecture Flow

```text
Security Event Streams
├── IBM QRadar SIEM Logs
├── Network Syslog & PCAP
├── Endpoint Detection Telemetry
└── Threat Intelligence Feeds
        ↓
Log Ingestion & Normalization Engine (CEF Format)
        ↓
Threat Detection & Analysis Pipeline
├── Automated IOC Extraction
├── MITRE ATT&CK TTP Mapper
├── Risk Scoring Algorithm
└── Alert Prioritization Filter
        ↓
Agentic LLM Investigation Assistant
        ↓
Incident Timeline & Remediation Generator
        ↓
SOC Operations Dashboard & Executive Summary
```
