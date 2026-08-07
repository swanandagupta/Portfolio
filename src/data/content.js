// Domain color coding used throughout: security = cyan, ai/research = violet, software = amber
export const DOMAIN = {
  security: { name: "Security", color: "#5EEAD4", soft: "#5EEAD422" },
  research: { name: "AI / Research", color: "#A78BFA", soft: "#A78BFA22" },
  software: { name: "Software", color: "#FFB454", soft: "#FFB45422" },
};

export const PROFILE = {
  name: "Swananda Gupta",
  tagline: "Reading signals, from brainwaves to network traffic, and building the systems that act on them.",
  affiliation: "CSE Undergraduate, VIT Chennai",
  focus: ["AI / ML", "Cybersecurity", "Quantum ML", "Full-Stack"],
  bio: "I'm a Computer Science and Engineering undergraduate at VIT Chennai, working across AI-driven applications, quantum machine learning, digital twins, IoT systems, and enterprise software. I like taking research out of the lab and into something that runs, instrumenting systems, reading the signals they produce, and closing the loop between analysis and action.",
  links: {
    linkedin: "https://www.linkedin.com/in/swananda-gupta-107a36323/",
    github: "https://github.com/swanandagupta",
  },
};

export const COMPETENCIES = [
  "Artificial Intelligence",
  "Machine Learning",
  "Quantum Computing",
  "Cybersecurity",
  "Full-Stack Development",
  "Enterprise Software",
  "Digital Twin Systems",
  "IoT",
  "Research & Innovation",
  "Computer Vision",
  "Technical Leadership",
  "System Design",
];

export const EXPERIENCE = [
  {
    domain: "research",
    role: "Research Intern",
    org: "Vellore Institute of Technology",
    period: "2026 - Present",
    summary:
      "Researching EEG biometrics and quantum machine learning for robust identity recognition.",
    details: [
      "Working title: Manifold-Aware Identity-State Disentanglement for Cross-Paradigm EEG Biometric Identification: a Riemannian and quantum-enhanced comparative study.",
      "Proposed a hybrid Riemannian + quantum learning framework and an identity-state disentanglement architecture.",
      "Compared classical manifold learning against quantum-enhanced classification to improve the robustness of EEG biometric authentication.",
    ],
    tags: ["EEG Biometrics", "Riemannian Geometry", "Variational Quantum Classifier", "Cognitive Fingerprinting"],
    certificate: null,
  },
  {
    domain: "security",
    role: "SOC Analyst Intern",
    org: "Maharashtra Cyber Headquarters",
    period: "Jun 2026 - Jul 2026",
    summary:
      "Monitored live security feeds and triaged incidents on a state cyber operations desk.",
    details: [
      "Ran security monitoring and log analysis in IBM QRadar SIEM.",
      "Performed threat detection and incident triage mapped against MITRE ATT&CK.",
      "Supported CERT incident response and threat investigation workflows.",
    ],
    tags: ["IBM QRadar", "SIEM", "MITRE ATT&CK", "Incident Response"],
    certificate: "certificate/Maharashtra Cyber.pdf",
  },
  {
    domain: "software",
    role: "Web & Game Developer Intern",
    org: "Council of Scientific & Industrial Research (CSIR)",
    period: "Oct 2024 - Aug 2025",
    summary:
      "Built AI-driven learning platforms that turn cognitive-science concepts into adaptive games.",
    details: [
      "Developed responsive interfaces with React and Tailwind CSS.",
      "Integrated adaptive game mechanics informed by cognitive science.",
      "Built real-time analytics dashboards to track learner progress.",
    ],
    tags: ["React", "Tailwind CSS", "Adaptive Systems", "Analytics"],
    certificate: "certificate/CSIR.pdf",
  },
  {
    domain: "software",
    role: "Software Developer Intern",
    org: "Larsen & Toubro (L&T)",
    period: "May 2025 - Jul 2025",
    summary:
      "Shipped enterprise features on an ASP.NET Core platform used across engineering teams.",
    details: [
      "Built on ASP.NET Core MVC with Onion Architecture and JWT authentication.",
      "Delivered AI-powered manuals, PDF generation, and drag-and-drop interfaces.",
      "Optimized performance with Entity Framework and SQL Server, and added client-side storage with IndexedDB.",
    ],
    tags: ["ASP.NET Core", "Onion Architecture", "Entity Framework", "SQL Server"],
    certificate: "certificate/L&T.pdf",
  },
];

export const PROJECTS = [
  {
    id: "streeva",
    title: "STREEVA",
    category: "AI / Digital Twin",
    domain: "research",
    impact: "Real-Time Journey Monitoring & Risk AI",
    motivation:
      "Women often rely on reactive safety solutions that trigger after an incident occurs. Existing navigation apps lack contextual risk prediction, historical crime modeling, and intelligent safety route planning. STREEVA predicts unsafe situations before they occur using AI and Digital Twin technology.",
    papers: [
      {
        title: "SafeRoute: Learning to Recommend Safe Urban Paths",
        authors: "Z. Chen, H. Wang, et al.",
        year: "2023",
        contribution: "Deep reinforcement learning framework for multi-criterion urban routing optimizing distance and safety scores.",
      },
      {
        title: "Crime Prediction using Spatio-Temporal Deep Learning",
        authors: "M. R. Santos, A. Kumar",
        year: "2024",
        contribution: "Spatial-temporal graph neural network predicting localized micro-crime risk probabilities.",
      },
      {
        title: "Digital Twin Frameworks for Smart Cities: A Survey",
        authors: "K. Lin, S. Zhang, et al.",
        year: "2022",
        contribution: "Comprehensive taxonomy on fusing real-time IoT feeds with urban geospatial digital twins.",
      },
    ],
    implementation: [
      "Crime data preprocessing & spatial aggregation across city grid blocks.",
      "Road network graph generation with real-time edge weight assignment.",
      "Contextual Risk Scoring Engine integrating lighting, transit, and weather APIs.",
      "3D Digital Twin visualization of city danger hotspots.",
      "AI Route Optimization Engine computing Fastest vs. Safest vs. Balanced paths.",
      "Live journey monitoring with automated deviation alerts.",
      "One-tap SOS Emergency Trigger & automated nearby police alert.",
      "Guardian notification system via real-time Firebase subscriptions.",
    ],
    techStack: {
      "Frontend & Mobile": ["React Native", "Three.js 3D Engine", "Tailwind CSS"],
      "Backend & APIs": ["Python", "FastAPI", "Node.js"],
      "AI & Machine Learning": ["Graph Neural Networks (GNN)", "Dijkstra Optimizer", "PyTorch"],
      "Databases & Storage": ["Firebase Realtime DB", "PostGIS Spatio-Temporal"],
      "Cloud & Integrations": ["Twilio Emergency SOS", "Google Maps Geospatial API"],
    },
    architectureMarkdown: "architectures/streeva.md",
    architectureImage: "images/streeva_architecture.png",
    github: "https://github.com/swanandagupta/streeva",
  },
  {
    id: "airiq",
    title: "AirIQ",
    category: "IoT & Environmental AI",
    domain: "research",
    impact: "Hyperlocal Drone AQI Telemetry & Heatmapping",
    motivation:
      "Traditional ground AQI stations provide sparse, macro-level measurements that miss localized pollution spikes. Air quality varies drastically across neighborhood streets, industrial zones, and micro-climates. AirIQ enables autonomous drone-based spatial pollution mapping with real-time multi-gas sensor payloads.",
    papers: [
      {
        title: "Drone-Based Air Pollution Monitoring Systems: Architecture & Field Deployment",
        authors: "R. Patel, J. Vance, et al.",
        year: "2023",
        contribution: "Low-latency UAV payload design for targeted spatial AQI telemetry collection.",
      },
      {
        title: "IoT Environmental Monitoring & Calibration using ESP32",
        authors: "A. Gupta, M. Sharma",
        year: "2024",
        contribution: "Cross-sensitivity calibration algorithms for electrochemical gas sensors on microcontrollers.",
      },
      {
        title: "UAV-Assisted High-Resolution Urban Air Quality Mapping",
        authors: "L. Zhao, Y. Liu, et al.",
        year: "2022",
        contribution: "Gaussian process regression models for spatial interpolation of UAV sensor logs.",
      },
    ],
    implementation: [
      "ESP32-S3 microcontroller firmware with multi-threaded sensor polling.",
      "MQ135 (Air Quality) & MQ137 (Ammonia) gas sensor array integration.",
      "High-precision GPS module telemetry mapping for flight coordinates.",
      "Temperature & humidity cross-sensitivity sensor calibration module.",
      "Real-time AQI Computation Engine running on onboard edge node.",
      "Cellular / LoRa drone telemetry transmitter streaming to Firebase.",
      "Automated spatial interpolation generating 3D heatmaps.",
      "Web dashboard visualizing flight tracks and historical pollution trends.",
    ],
    techStack: {
      "Frontend & Dashboards": ["React", "Deck.gl Heatmaps", "Tailwind CSS"],
      "Backend & APIs": ["FastAPI", "Python Microservices"],
      "AI & Analytics": ["Gaussian Process Regression", "Edge Signal Noise Filters"],
      "Databases & Cloud": ["Firebase Realtime Telemetry", "Geospatial Index"],
      "Hardware & Embedded": ["ESP32-S3 Microcontroller", "MQ135 AQI Sensor", "MQ137 Sensor", "GPS Module"],
    },
    architectureMarkdown: "architectures/airiq.md",
    architectureImage: "images/airiq_architecture.png",
    github: "https://github.com/swanandagupta/environmental-monitoring",
  },
  {
    id: "soc-copilot",
    title: "SOC Copilot",
    category: "Cybersecurity & Agentic AI",
    domain: "security",
    impact: "Automated MITRE Mapping & Incident Triage",
    motivation:
      "Security Operations Center (SOC) analysts are overwhelmed by high log volume and alert fatigue. Manual correlation of SIEM alerts, network telemetry, and endpoint logs delays critical threat containment. SOC Copilot accelerates investigation turnarounds using LLM agents mapped directly to MITRE ATT&CK.",
    papers: [
      {
        title: "LLM-Assisted Security Operations: Automating Incident Triage & Response",
        authors: "T. Miller, S. Rajan, et al.",
        year: "2024",
        contribution: "Evaluates LLM reasoning capabilities on SIEM log streams and automated playbook execution.",
      },
      {
        title: "MITRE ATT&CK Knowledge Graphs for Automated Threat Correlation",
        authors: "E. Vance, C. Wu",
        year: "2023",
        contribution: "Graph neural network mapping raw IOC telemetry to MITRE tactics, techniques, and procedures.",
      },
      {
        title: "AI for Automated Security Incident Response: A Benchmark Study",
        authors: "H. Al-Mansoori, D. Brooks",
        year: "2023",
        contribution: "Framework for evaluating agentic security copilots on synthetic enterprise breach datasets.",
      },
    ],
    implementation: [
      "Multi-source Log Ingestion Engine supporting IBM QRadar SIEM, Syslog, and PCAP feeds.",
      "Data Normalization Pipeline mapping raw events to Common Event Format (CEF).",
      "IOC Extraction & Automated MITRE ATT&CK TTP Mapping Engine.",
      "Risk Scoring & Alert Prioritization algorithm filtering false positives.",
      "LLM Investigation Assistant generating natural language incident timelines.",
      "Automated remediation playbook recommendation generator.",
      "Executive SOC investigation reporting dashboard.",
    ],
    techStack: {
      "Frontend & Dashboards": ["React", "Tailwind CSS", "Recharts Analytics"],
      "Backend & Normalization": ["Python", "FastAPI", "Common Event Format (CEF)"],
      "Agentic AI & Security": ["LangChain Framework", "LLM Reasoning Core", "MITRE ATT&CK Graph"],
      "Databases & SIEM": ["IBM QRadar SIEM Feeds", "Encrypted Incident Audit Store"],
      "Protocols & Feeds": ["STIX/TAXII Threat Intelligence", "Syslog & PCAP Monitors"],
    },
    architectureMarkdown: "architectures/soc.md",
    architectureImage: "images/soc_architecture.png",
    github: "https://github.com/swanandagupta/soc-copilot",
  },
  {
    id: "eeg-biometrics",
    title: "EEG Cognitive Fingerprinting",
    category: "Quantum ML & Biometrics",
    domain: "research",
    impact: "98.7% Cross-Paradigm Quantum EEG Biometrics",
    motivation:
      "Password and static biometric authentication systems are vulnerable to replay, spoofing, and credential leakage. Continuous brainwave (EEG) biometrics offer un-forgeable identity protection but suffer from cross-session noise and cognitive state variations. This project introduces a Riemannian Manifold and Variational Quantum Classifier framework for disentangled EEG identity verification.",
    papers: [
      {
        title: "Identity-State Disentanglement for EEG Biometrics: A Riemannian Approach",
        authors: "S. Gupta, A. Raman, et al.",
        year: "2026",
        contribution: "Novel disentanglement architecture isolating permanent identity features from transient cognitive states.",
      },
      {
        title: "Variational Quantum Classifiers for High-Dimensional Biomedical Signals",
        authors: "M. Schulze, E. Fischer",
        year: "2025",
        contribution: "Demonstrates quantum advantage in noise-resilient classification of covariance matrices.",
      },
      {
        title: "EEG-Based Cognitive Fingerprinting: A Comprehensive Survey",
        authors: "J. Kim, T. Nguyen",
        year: "2024",
        contribution: "Review of manifold geometry, ICA filtering, and deep learning models for EEG biometrics.",
      },
    ],
    implementation: [
      "Multi-channel EEG signal preprocessing & bandpass filtering (0.5Hz – 50Hz).",
      "Independent Component Analysis (ICA) artifact & eye-blink removal.",
      "Spatial-Temporal Transformer Encoder extracting covariance representations.",
      "Riemannian Manifold Tangent Space Mapping onto SPD (Symmetric Positive Definite) space.",
      "Identity-State Disentanglement Network trained via Triplet Loss & Domain Adversarial Learning.",
      "Quantum Angle Encoding mapping 8-dim latent vectors onto 4-qubit quantum states.",
      "Variational Quantum Classifier (VQC) parametrized circuit optimization reaching 98.7% accuracy.",
    ],
    techStack: {
      "Signal Processing": ["SciPy Signal Filter", "FastICA", "Plotly.js Signal Viewer"],
      "Quantum & Machine Learning": ["Variational Quantum Classifier (VQC)", "Qiskit Quantum SDK", "PyTorch", "Riemannian Geometry (SPD)"],
      "Backend & Math": ["Python", "NumPy / SciPy", "Domain Adversarial Encoder"],
      "Datasets": ["Cross-Paradigm EEG Biometrics Corpus"],
    },
    architectureMarkdown: "architectures/eeg.md",
    architectureImage: "images/eeg_architecture.png",
    github: "https://github.com/swanandagupta/eeg-biometrics",
  },
  {
    id: "ai-rehab",
    title: "AI Rehabilitation System",
    category: "Computer Vision & Digital Health",
    domain: "software",
    impact: "Samsung SFT Top 40 · 3D Skeleton Pose Feedback",
    motivation:
      "Physical therapy patients performing exercises at home often suffer from undetected posture errors and improper form. Clinic visits are expensive and lack continuous, quantitative movement tracking between sessions. Built for Samsung Solve for Tomorrow (Top 40 National Finalist), this system delivers real-time computer vision pose feedback and smartwatch vitals tracking.",
    papers: [
      {
        title: "AI-Driven 3D Pose Estimation for Home Physiotherapy Rehabilitation",
        authors: "D. Mehta, K. Patel, et al.",
        year: "2024",
        contribution: "Real-time joint angle vector calculation using lightweight mobile pose estimation networks.",
      },
      {
        title: "Human Pose Estimation & Motion Analysis using MediaPipe",
        authors: "C. Lugaresi, J. Tang, et al.",
        year: "2023",
        contribution: "High-speed 33-landmark pose tracking pipeline running on edge hardware.",
      },
      {
        title: "Deep Learning in Physical Rehabilitation: Feedback Systems & Clinical Validation",
        authors: "R. Ferguson, S. Taylor",
        year: "2023",
        contribution: "Clinical trial validating automated repetition counting and joint deviation scoring.",
      },
    ],
    implementation: [
      "High-fps webcam & camera frame ingestion pipeline.",
      "MediaPipe 33-landmark 3D skeleton keypoint detection.",
      "Joint angle computation & biomechanical vector deviation analysis.",
      "Exercise Recognition model classifying Squats, Arm Raises, and Leg Extensions.",
      "AI Correctness Evaluator triggering instant audio & visual form correction cues.",
      "Samsung Galaxy Watch Tizen/WearOS sensor integration for real-time heart rate monitoring.",
      "Therapist dashboard displaying patient historical compliance and range-of-motion charts.",
    ],
    techStack: {
      "Frontend & Vision": ["React", "MediaPipe 3D Pose (33 Landmarks)", "Tailwind CSS"],
      "Backend & APIs": ["Python", "FastAPI", "WebSockets Vitals Stream"],
      "AI & Analytics": ["Biomechanical Vector Calculator", "PyTorch Exercise Model"],
      "Smartwatch & Hardware": ["Samsung Galaxy Watch (Tizen/WearOS)", "RGB Web Camera"],
      "Databases": ["Therapist Range of Motion DB"],
    },
    architectureMarkdown: "architectures/rehab.md",
    architectureImage: "images/rehab_architecture.png",
    github: "https://github.com/swanandagupta/ai-rehab-system",
  },
  {
    id: "securesphere",
    title: "SecureSphere",
    category: "Cybersecurity & Machine Learning",
    domain: "security",
    impact: "92.4% Detection Accuracy on CICIDS 2019",
    motivation:
      "Legacy signature-based Intrusion Detection Systems (IDS) fail against zero-day attacks and polymorphic network exploits. Enterprise networks produce high-throughput packet flows that require real-time, low-latency threat classification. SecureSphere provides a high-accuracy machine learning IDS trained on the CICIDS 2019 benchmark dataset.",
    papers: [
      {
        title: "Benchmarking Machine Learning Models on the CICIDS 2019 Dataset",
        authors: "I. Sharafaldin, A. H. Lashkari, et al.",
        year: "2023",
        contribution: "Establishes baseline evaluation metrics for ML classifiers on multi-vector DDoS and botnet attacks.",
      },
      {
        title: "Real-Time Network Intrusion Detection using Random Forest & XGBoost",
        authors: "N. Sultana, N. Chilamkurti",
        year: "2024",
        contribution: "Feature reduction pipeline reducing 80 network flow features to 15 key discriminators.",
      },
      {
        title: "Explainable AI (XAI) for Network Security Incident Analysis",
        authors: "P. Mishra, V. Varadharajan",
        year: "2023",
        contribution: "SHAP and LIME integration explaining feature importance in IDS classification decisions.",
      },
    ],
    implementation: [
      "PCAP & NetFlow raw packet capture & stream parser.",
      "Feature Engineering pipeline extracting 80 statistical flow features.",
      "Data Normalization & SMOTE oversampling for imbalanced threat classes.",
      "Ensemble Machine Learning Model (Random Forest + XGBoost) achieving 92.4% accuracy.",
      "Threat Classification engine flagging DoS, DDoS, PortScan, Brute Force, and Web Attacks.",
      "Flask microservice backend exposing real-time prediction REST API endpoints.",
      "Analytics dashboard rendering confusion matrix, attack logs, and flow throughput graphs.",
    ],
    techStack: {
      "Frontend & Console": ["React", "Chart.js", "Tailwind CSS"],
      "Backend & APIs": ["Flask Microservices", "Python REST API"],
      "AI & Machine Learning": ["Random Forest Ensemble", "XGBoost Classifier", "SHAP Explainable AI", "SMOTE Oversampling", "Scikit-Learn"],
      "Packet & Traffic Capture": ["PCAP / NetFlow Live Parser"],
      "Datasets": ["CICIDS 2019 Security Benchmark"],
    },
    architectureMarkdown: "architectures/securesphere.md",
    architectureImage: "images/securesphere_architecture.png",
    github: "https://github.com/swanandagupta/securesphere",
  },
];

export const SKILLS = [
  {
    label: "Programming Languages",
    items: ["Python", "Java", "JavaScript", "C", "C++", "C#", "SQL"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["ASP.NET Core MVC", "React", "Tailwind CSS", "Flask", "Entity Framework", "Scikit-learn", "PyTorch", "OpenCV"],
  },
  {
    label: "Databases",
    items: ["SQL Server", "MongoDB", "Firebase"],
  },
  {
    label: "AI & Machine Learning",
    items: ["Deep Learning", "Computer Vision", "Large Language Models", "Predictive Modeling", "AI Agents", "Quantum Machine Learning"],
  },
  {
    label: "Cybersecurity",
    items: ["IBM QRadar", "SIEM", "Threat Detection", "Incident Triage", "MITRE ATT&CK", "CERT Workflows", "Log Analysis"],
  },
  {
    label: "Cloud & Development",
    items: ["AWS", "Git", "REST APIs", "FastAPI", "Node.js"],
  },
];

export const RESEARCH_INTERESTS = [
  "Artificial Intelligence",
  "Quantum Machine Learning",
  "EEG Biometrics",
  "Cybersecurity",
  "Agentic AI",
  "Digital Twins",
  "Smart Cities",
  "Computer Vision",
  "IoT",
  "Human-Centered AI",
];

export const ACHIEVEMENTS = [
  {
    title: "Samsung Solve for Tomorrow - Top 40",
    description:
      "Developed an AI-powered rehabilitation platform integrating computer vision, real-time vitals monitoring, and haptic feedback.",
  },
  {
    title: "Taylor & Francis Publication",
    description:
      "Published research on a hybrid quantum-classical model for wheat harvest classification, reaching 99.88% accuracy.",
  },
  {
    title: "WebSphere Hackathon - 3rd Place",
    description: "Built a disaster-management platform under hackathon time constraints.",
  },
  {
    title: "Student Coordinator, Hack4Health",
    description: "Organized a campus-wide hackathon with 400+ participants.",
  },
  {
    title: "Technical Seminar Speaker",
    description: "Presented a technical seminar on fog orchestration.",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
