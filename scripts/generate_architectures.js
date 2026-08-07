import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const projects = [
  {
    name: "streeva",
    title: "STREEVA — AI & Digital Twin Safety Architecture",
    accentColor: "#A78BFA",
    nodes: [
      { id: "mobile", title: "Mobile Application Layer", sub: ["Authentication Module", "Safe Route Planner", "Guardian Mode", "Emergency SOS"] },
      { id: "telemetry", title: "Location & Sensor Telemetry Service", sub: ["GPS Stream", "Real-Time Tracking"] },
      { id: "risk_engine", title: "Risk Intelligence Engine", sub: ["Spatio-Temporal Crime DB", "Street Lighting Data", "Police & Hospital Proximity", "Crowd Density & Weather API"] },
      { id: "ai_model", title: "AI Risk Prediction & Route Optimizer", sub: ["Safest Route Generator", "Fastest Route Option", "Balanced Hybrid Path"] },
      { id: "backend", title: "Application Backend & Firebase Store", sub: ["Users & Trip Logs", "Emergency Notifications", "Admin Analytics Dashboard"] }
    ]
  },
  {
    name: "airiq",
    title: "AirIQ — Drone-Based Hyperlocal Environmental AI",
    accentColor: "#5EEAD4",
    nodes: [
      { id: "drone", title: "Autonomous Drone Fleet", sub: ["Target Flight Trajectory", "Low-Altitude Sensing"] },
      { id: "esp32", title: "ESP32-S3 Payload Hardware", sub: ["MQ135 Gas Sensor", "MQ137 Ammonia Sensor", "High-Precision GPS", "Temp & Humidity Probes"] },
      { id: "processing", title: "Sensor Calibration & AQI Engine", sub: ["Noise Filtering", "Cross-Sensitivity Adjust", "Spatial AQI Computation"] },
      { id: "cloud", title: "Cloud Database & Telemetry API", sub: ["Firebase Realtime DB", "REST API Gateways"] },
      { id: "dash", title: "Visualization Dashboard", sub: ["Hyperlocal AQI Heatmap", "Historical Trends", "Drone Flight Tracks"] }
    ]
  },
  {
    name: "soc",
    title: "SOC Copilot — Agentic Threat Investigation Pipeline",
    accentColor: "#5EEAD4",
    nodes: [
      { id: "sources", title: "Security Event Streams", sub: ["IBM QRadar SIEM Logs", "Network Syslog & PCAP", "Endpoint Telemetry", "Threat Intel Feeds"] },
      { id: "ingest", title: "Log Ingestion & CEF Normalization", sub: ["Parsing Pipeline", "Common Event Format"] },
      { id: "detection", title: "Threat Detection Pipeline", sub: ["IOC Automated Extraction", "MITRE ATT&CK Mapper", "Risk Scoring Algorithm", "Alert Prioritization"] },
      { id: "agent", title: "Agentic LLM Investigation Assistant", sub: ["Incident Timeline Generator", "Remediation Playbook"] },
      { id: "dash", title: "SOC Operations Dashboard", sub: ["Executive Briefings", "Analyst Triage Center"] }
    ]
  },
  {
    name: "eeg",
    title: "EEG Cognitive Fingerprinting — Quantum Biometric Pipeline",
    accentColor: "#A78BFA",
    nodes: [
      { id: "raw", title: "Multi-Channel EEG Data Stream", sub: ["Brainwave Acquisition", "Cross-Session Logs"] },
      { id: "preprocess", title: "Signal Preprocessing Pipeline", sub: ["Bandpass Filter (0.5-50Hz)", "ICA Artifact Removal", "Channel Normalization"] },
      { id: "transformer", title: "Spatial-Temporal Transformer & Riemannian Mapping", sub: ["Covariance Extraction", "Tangent Space Mapping"] },
      { id: "disentangle", title: "Identity-State Disentanglement Network", sub: ["Identity Branch (Triplet Loss)", "State Branch", "Domain Adversarial Net"] },
      { id: "quantum", title: "Variational Quantum Classifier (VQC)", sub: ["4-Qubit Angle Encoding", "Parameterized Circuit", "Disentangled Identity Output"] }
    ]
  },
  {
    name: "rehab",
    title: "AI Rehabilitation System — Biomechanical Pose Pipeline",
    accentColor: "#FFB454",
    nodes: [
      { id: "input", title: "Patient Camera & Galaxy Watch Feeds", sub: ["RGB Video Feed", "Vitals & Heart Rate"] },
      { id: "pose", title: "MediaPipe 33-Landmark Pose Estimation", sub: ["3D Joint Skeleton Extraction", "Real-Time Tracking"] },
      { id: "analysis", title: "Exercise Recognition & Angle Analysis", sub: ["Joint Vector Computation", "Squat / Extension Classifier"] },
      { id: "eval", title: "AI Form Correctness Evaluator", sub: ["Angular Deviation Score", "Audio / Haptic Feedback", "Repetition Counter"] },
      { id: "dash", title: "Therapist Analytics Dashboard", sub: ["Patient Compliance Log", "Range of Motion History"] }
    ]
  },
  {
    name: "securesphere",
    title: "SecureSphere — Machine Learning Intrusion Detection System",
    accentColor: "#5EEAD4",
    nodes: [
      { id: "traffic", title: "Live Network Traffic Stream", sub: ["Raw Packet Capture", "NetFlow Telemetry"] },
      { id: "parser", title: "High-Throughput Packet Parser", sub: ["Stream Normalization", "Flow Duration Logging"] },
      { id: "features", title: "Feature Engineering & Preprocessing", sub: ["80 Statistical CICIDS Features", "SMOTE Class Balancing"] },
      { id: "ml_model", title: "Ensemble Classifier (Random Forest + XGBoost)", sub: ["DoS / DDoS Detection", "Botnet & Brute Force", "Web Attack Classification"] },
      { id: "dash", title: "Flask REST API & Analytics Dashboard", sub: ["Real-Time Prediction API", "Attack Analytics & Threat History"] }
    ]
  }
];

function generateSVG(project) {
  const width = 1000;
  const cardWidth = 860;
  const startX = (width - cardWidth) / 2;
  let currentY = 120;
  const nodeGap = 35;
  const nodeHeights = project.nodes.map(n => 60 + n.sub.length * 24);
  const totalHeight = 160 + nodeHeights.reduce((a, b) => a + b, 0) + (project.nodes.length - 1) * nodeGap;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#080C16"/>
      <stop offset="100%" stop-color="#131B2E"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  
  <!-- Title Header -->
  <text x="${width / 2}" y="55" fill="#EAF0FB" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">${project.title}</text>
  <line x1="${startX}" y1="80" x2="${startX + cardWidth}" y2="80" stroke="${project.accentColor}" stroke-opacity="0.4" stroke-width="1.5"/>
`;

  project.nodes.forEach((node, i) => {
    const nodeH = nodeHeights[i];
    const nodeY = currentY;

    // Node Container Box
    svg += `
    <g class="node-group">
      <rect x="${startX}" y="${nodeY}" width="${cardWidth}" height="${nodeH}" rx="14" fill="#131B2E" stroke="${project.accentColor}" stroke-opacity="0.5" stroke-width="1.5" />
      <rect x="${startX + 20}" y="${nodeY + 16}" width="8" height="24" rx="4" fill="${project.accentColor}" />
      <text x="${startX + 40}" y="${nodeY + 33}" fill="#EAF0FB" font-family="Space Grotesk, sans-serif" font-size="16" font-weight="bold">${node.title}</text>
    `;

    // Sub items grid
    const cols = 2;
    node.sub.forEach((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const ix = startX + 40 + col * (cardWidth / 2 - 40);
      const iy = nodeY + 62 + row * 24;

      svg += `
      <circle cx="${ix + 4}" cy="${iy - 4}" r="3" fill="${project.accentColor}" />
      <text x="${ix + 16}" y="${iy}" fill="#8B96AC" font-family="IBM Plex Mono, monospace" font-size="12">${item}</text>
      `;
    });

    svg += `</g>`;

    // Downward Connection Arrow
    if (i < project.nodes.length - 1) {
      const arrowY1 = nodeY + nodeH;
      const arrowY2 = arrowY1 + nodeGap;
      const midX = width / 2;

      svg += `
      <line x1="${midX}" y1="${arrowY1}" x2="${midX}" y2="${arrowY2 - 8}" stroke="${project.accentColor}" stroke-width="2" stroke-dasharray="4,4" opacity="0.8"/>
      <polygon points="${midX - 5},${arrowY2 - 8} ${midX + 5},${arrowY2 - 8} ${midX},${arrowY2}" fill="${project.accentColor}" />
      `;
    }

    currentY += nodeH + nodeGap;
  });

  svg += `</svg>`;
  return svg;
}

// Ensure directories exist
const publicImagesDir = path.join(rootDir, "public", "images");
const imagesDir = path.join(rootDir, "images");

if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

projects.forEach((proj) => {
  const svgContent = generateSVG(proj);
  
  // Write SVG files
  const pubSvgPath = path.join(publicImagesDir, `${proj.name}_architecture.svg`);
  const rootSvgPath = path.join(imagesDir, `${proj.name}_architecture.svg`);
  fs.writeFileSync(pubSvgPath, svgContent);
  fs.writeFileSync(rootSvgPath, svgContent);

  // Write PNG alias (Vite handles SVG inside img tags directly)
  const pubPngPath = path.join(publicImagesDir, `${proj.name}_architecture.png`);
  const rootPngPath = path.join(imagesDir, `${proj.name}_architecture.png`);
  fs.writeFileSync(pubPngPath, svgContent);
  fs.writeFileSync(rootPngPath, svgContent);

  console.log(`Generated architecture diagram for ${proj.name} -> images/${proj.name}_architecture.png`);
});
