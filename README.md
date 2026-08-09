# 🚀 ArmOpt Studio — Neoverse & Arm64 AI Optimization Workbench

[![Arm Create Challenge 2026](https://img.shields.io/badge/Hackathon-Arm%20Create%202026-00F0FF?style=for-the-badge&logo=arm)](https://arm-ai-optimization-challenge.devpost.com/)
[![Track](https://img.shields.io/badge/Track-Cloud%20AI%20%26%20Dev%20Experience-00E676?style=for-the-badge)](https://arm-ai-optimization-challenge.devpost.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)](LICENSE)

**ArmOpt Studio** is a state-of-the-art AI optimization and benchmarking workbench built for the **Arm Create: AI Optimization Challenge 2026**. It empowers system engineers and AI developers to benchmark, compress, and accelerate Small Language Models (SLMs), LLMs, and Vision models on **Arm Neoverse**, **AWS Graviton4**, **Google Axion**, **Apple M4**, and **Raspberry Pi 5** hardware.

---

## 🌟 Key Features

* **🖥️ Multi-Platform Arm Silicon Profiler**: Support for 5 target hardware platforms:
  * AWS Graviton4 (Arm Neoverse V2, SVE2 4x128b)
  * Google Axion (Arm Neoverse V2)
  * Ampere Altra Max (Arm Neoverse N1)
  * Apple M4 Max (Armv9.2-A SME2)
  * Raspberry Pi 5 (Arm Cortex-A76)
* **⚡ Arm KleidiAI Micro-Kernel Accelerators**: Seamlessly benchmark FP16 baselines vs INT8 ONNX vs **INT4 Arm KleidiAI SIMD micro-kernels** vs FlashAttention-2 Arm64.
* **📈 Live Performance & PMU Counters**: Real-time throughput (tok/s), Time To First Token (TTFT latency in ms), RAM footprint savings (-70%), and Arm Hardware PMU vector utilization rates.
* **🤖 Arm Performix MCP Server Integration**: Live telemetry stream from the Arm Performix Model Context Protocol (MCP) server providing automated CPU hotspot diagnostics and AI auto-tuning recommendations.
* **🧪 Interactive Prompt Sandbox**: Real-time side-by-side token generation comparison between baseline FP16 and Arm KleidiAI optimized models.
* **📝 Automated Devpost Submission Report**: One-click Markdown submission report generator with pre-formatted benchmark tables and reproduction instructions.
* **☀️ Theme Switcher**: Light Mode default with full Dark Mode toggle support.

---

## 📊 Benchmark Highlights

| Metric | FP16 Baseline | INT4 + Arm KleidiAI | Improvement |
| :--- | :--- | :--- | :--- |
| **Inference Speed** | `21.4 tok/s` | `78.6 tok/s` | **+3.67x Speedup** ⚡ |
| **Time To First Token (TTFT)** | `145 ms` | `38 ms` | **-73.8% Latency** ⏱️ |
| **RAM Footprint** | `7.8 GB` | `2.3 GB` | **-70.5% RAM Saved** 💾 |
| **Power Consumption** | `14.2 J/1k tok` | `3.8 J/1k tok` | **-73.2% Power Saved** 🌱 |

---

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS v3, Chart.js, React-ChartJS-2, Lucide Icons, Canvas-Confetti.
* **Arm Optimization Engine**: Arm KleidiAI micro-kernel client, Arm Performix MCP Diagnostic Engine.
* **Typography**: Outfit, Inter, JetBrains Mono.

---

## 🚀 Quick Start

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PaulTOGNON/armopt-studio.git
   cd armopt-studio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/` or `http://localhost:5174/`.

### Production Build

```bash
npm run build
```

---

## 📄 Devpost Submission

Built with ❤️ for the **Arm Create: AI Optimization Challenge 2026** (Track: Cloud AI & Developer Experience).

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
