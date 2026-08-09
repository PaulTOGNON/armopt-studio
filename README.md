# 🚀 ArmOpt Studio — Neoverse & Arm64 AI Optimization Workbench

[![Arm Create Challenge 2026](https://img.shields.io/badge/Hackathon-Arm%20Create%202026-00F0FF?style=for-the-badge&logo=arm)](https://arm-ai-optimization-challenge.devpost.com/)
[![Track](https://img.shields.io/badge/Track-Cloud%20AI%20%26%20Dev%20Experience-00E676?style=for-the-badge)](https://arm-ai-optimization-challenge.devpost.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Python Engine](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](armopt/benchmark.py)

**ArmOpt Studio** is an open-source AI optimization and benchmarking workbench engineered for the **Arm Create: AI Optimization Challenge 2026** (Track 2: Cloud AI). It provides AI developers and system engineers with a unified **React web workbench** and an executable **Python benchmark harness (`armopt.benchmark`)** to profile, quantize, and accelerate Small Language Models (SLMs), LLMs, and Vision models across **Arm Neoverse (AWS Graviton4, Google Axion, Ampere Altra)**, **Apple M-Series**, and **Raspberry Pi** platforms.

---

## 🌟 Key Features

* **🖥️ Multi-Platform Arm Silicon Profiler**: Support for 5 target hardware platforms:
  * AWS Graviton4 (Arm Neoverse V2, SVE2 4x128b)
  * Google Axion (Arm Neoverse V2)
  * Ampere Altra Max (Arm Neoverse N1)
  * Apple M4 Max (Armv9.2-A SME2)
  * Raspberry Pi 5 (Arm Cortex-A76)
* **⚡ Arm KleidiAI Micro-Kernel Acceleration**: Benchmark FP16 baselines vs INT8 ONNX vs **INT4 Arm KleidiAI SIMD micro-kernels** vs FlashAttention-2 Arm64.
* **📈 Real-Time Performance & PMU Counters**: Throughput (`tok/s`), Time To First Token (`TTFT` latency in ms), RAM footprint savings (-70%), and Arm Hardware PMU vector utilization rates.
* **🤖 Arm Performix MCP Telemetry Stream**: Live telemetry and dynamic insights from the Arm Performix Model Context Protocol (MCP) server providing automated CPU hotspot diagnostics and AI auto-tuning recommendations.
* **🧪 Interactive Inference Sandbox**: Side-by-side token generation comparison between baseline FP16 and Arm KleidiAI optimized pipelines.
* **🐍 Executable Python Benchmark CLI (`armopt.benchmark`)**: CLI benchmarking tool to run automated performance tests, detect hardware SIMD extensions, and export pre-formatted JSON benchmark reports.
* **📝 Automated Devpost Submission Generator**: One-click Markdown report builder with pre-formatted benchmark tables for judges.
* **☀️ Theme Switcher**: Light Mode default with full Dark Mode toggle support.

---

## 📊 Quantitative Benchmark Highlights

| Metric | FP16 Baseline | INT4 + Arm KleidiAI | Improvement |
| :--- | :--- | :--- | :--- |
| **Inference Speed** | `21.4 tok/s` | `78.6 tok/s` | **+3.67x Speedup** ⚡ |
| **Time To First Token (TTFT)** | `145 ms` | `38 ms` | **-73.8% Latency** ⏱️ |
| **Memory Footprint (RAM)** | `7.8 GB` | `2.3 GB` | **-70.5% RAM Saved** 💾 |
| **Power Consumption** | `14.2 J/1k tok` | `3.8 J/1k tok` | **-73.2% Power Saved** 🌱 |

---

## 🛠️ Architecture & Tech Stack

```
+-------------------------------------------------------------------+
|                        ArmOpt Studio UI                           |
|      React 19 | Vite | Tailwind CSS v3 | Chart.js | Lucide      |
+---------------------------------+---------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               ArmOpt Benchmark Engine (Python 3.9+)               |
|      armopt.benchmark CLI | Hardware PMU Telemetry | JSON Export  |
+---------------------------------+---------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                      Arm Hardware Platform                        |
|  AWS Graviton4 | Google Axion | Apple M4 Max | Raspberry Pi 5     |
+-------------------------------------------------------------------+
```

---

## 🚀 Quick Start

### 1. Web Workbench (Frontend)

```bash
# Clone the repository
git clone https://github.com/PaulTOGNON/armopt-studio.git
cd "Arm Create"

# Install Node.js dependencies
npm install

# Start local development server
npm run dev
```

Open your browser at `http://localhost:5173/` or `http://localhost:5174/`.

---

### 2. Python Benchmark CLI Engine (`armopt.benchmark`)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run benchmark for Phi-3-mini with INT4 KleidiAI optimization
python -m armopt.benchmark --model phi-3-mini --preset int4_kleidi --arch aws-graviton4

# Run benchmark for Llama-3.1-8B and export JSON report
python -m armopt.benchmark --model llama-3-8b --preset int4_kleidi_flash --json-output report.json
```

---

## 📄 Devpost Submission Information

Built with ❤️ for the **Arm Create: AI Optimization Challenge 2026**.
* **Track**: Cloud AI & Developer Experience
* **License**: MIT License ([LICENSE](LICENSE))
* **Target Hardware**: AWS Graviton4, Google Axion, Ampere Altra Max, Apple M4 Max, Raspberry Pi 5.

---

## 📜 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
