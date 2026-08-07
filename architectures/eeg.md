# EEG Cognitive Fingerprinting System Architecture Flow

```text
Multi-Channel Raw EEG Data Streams
        ↓
Signal Preprocessing Pipeline
├── Bandpass Filtering (0.5Hz - 50Hz)
├── ICA Artifact & Eye-Blink Removal
└── Channel Standardization
        ↓
Spatial-Temporal Transformer Encoder
        ↓
Riemannian Manifold Tangent Space Mapping
        ↓
Identity-State Disentanglement Network
├── Identity Feature Branch (Triplet Loss)
├── Cognitive State Branch
└── Domain Adversarial Learning
        ↓
Quantum Angle Encoding (4-Qubit Map)
        ↓
Variational Quantum Classifier (VQC) Circuit
        ↓
Disentangled Identity Authentication Output
```
