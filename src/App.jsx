import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArchitectureSelector from './components/ArchitectureSelector';
import ModelConfigurator from './components/ModelConfigurator';
import MetricsDashboard from './components/MetricsDashboard';
import PerformixConsole from './components/PerformixConsole';
import InferenceSandbox from './components/InferenceSandbox';
import ReportModal from './components/ReportModal';

import { ARM_ARCHITECTURES, AI_MODELS, OPTIMIZATION_PRESETS } from './data/armModels';
import { ArmPerformixMcpClient } from './utils/performixMcp';
import { generateDevpostReport } from './utils/reportGenerator';
import { Sparkles, Cpu } from 'lucide-react';

export default function App() {
  // Light mode is DEFAULT (false)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [selectedArch, setSelectedArch] = useState(ARM_ARCHITECTURES[0]); // AWS Graviton4
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]); // Phi-3 Mini
  const [selectedPreset, setSelectedPreset] = useState(OPTIMIZATION_PRESETS[2]); // INT4 KleidiAI
  
  const [batchSize, setBatchSize] = useState(1);
  const [contextLen, setContextLen] = useState(2048);
  const [threads, setThreads] = useState(16);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [performixResult, setPerformixResult] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Sync body class for Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Initialize & update Performix Client
  useEffect(() => {
    runPerformixAnalysis(selectedArch, selectedModel, selectedPreset);
  }, [selectedArch, selectedModel, selectedPreset]);

  const runPerformixAnalysis = (arch, model, preset) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const client = new ArmPerformixMcpClient(arch.id);
      const result = client.analyzeWorkload(model, preset);
      setPerformixResult(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleApplyFix = () => {
    const ultimatePreset = OPTIMIZATION_PRESETS[3];
    setSelectedPreset(ultimatePreset);
  };

  const reportMarkdown = generateDevpostReport({
    model: selectedModel,
    arch: selectedArch,
    preset: selectedPreset,
    baselinePreset: OPTIMIZATION_PRESETS[0],
    analysisResult: performixResult
  });

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)] flex flex-col font-body selection:bg-[var(--color-primary)] selection:text-white transition-colors duration-300">
      
      {/* Top Header Navigation */}
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Hero - Fixed Light & Dark Mode gradient */}
        <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-sky-100 via-indigo-50 to-blue-100 dark:from-[#080225] dark:via-[#0E1424] dark:to-[#0A1120] border border-sky-200 dark:border-[#00F0FF]/30 overflow-hidden shadow-sm transition-all">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-200/80 dark:bg-[#00F0FF]/10 border border-sky-300 dark:border-[#00F0FF]/30 text-sky-900 dark:text-[#00F0FF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Arm Create AI Optimization Challenge 2026</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
              Neoverse & Arm64 <span className="text-gradient-arm">AI Optimization Workbench</span>
            </h1>
            
            <p className="text-sm text-slate-700 dark:text-[var(--text-muted)] leading-relaxed font-medium">
              Accelerate LLMs, SLMs, and Vision models on Arm silicon. Benchmark real-time throughput (tok/s), latency (TTFT), and RAM reduction using <strong className="text-slate-900 dark:text-white">Arm KleidiAI SIMD micro-kernels</strong> and <strong className="text-sky-700 dark:text-[#00F0FF]">Arm Performix MCP telemetry</strong>.
            </p>
          </div>
        </div>

        {/* 1. Target Arm Architecture Picker */}
        <ArchitectureSelector
          selectedArch={selectedArch}
          onSelectArch={setSelectedArch}
        />

        {/* 2. Model & Pipeline Configurator */}
        <ModelConfigurator
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          selectedPreset={selectedPreset}
          onSelectPreset={setSelectedPreset}
          batchSize={batchSize}
          setBatchSize={setBatchSize}
          contextLen={contextLen}
          setContextLen={setContextLen}
          threads={threads}
          setThreads={setThreads}
          onRunDiagnostic={() => runPerformixAnalysis(selectedArch, selectedModel, selectedPreset)}
          isAnalyzing={isAnalyzing}
        />

        {/* 3. Live Benchmark Dashboard */}
        <MetricsDashboard
          selectedModel={selectedModel}
          selectedPreset={selectedPreset}
          selectedArch={selectedArch}
          isAnalyzing={isAnalyzing}
          isDarkMode={isDarkMode}
        />

        {/* 4. Arm Performix MCP Diagnostics & Insights */}
        <PerformixConsole
          performixResult={performixResult}
          onApplyFix={handleApplyFix}
          selectedArch={selectedArch}
        />

        {/* 5. Real-time Inference Sandbox */}
        <InferenceSandbox
          selectedModel={selectedModel}
          selectedPreset={selectedPreset}
          selectedArch={selectedArch}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-8 text-center text-xs text-[var(--text-muted)] transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-semibold text-[var(--text-main)]">ArmOpt Studio</span>
            <span>— Built for the Arm Create AI Optimization Challenge 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://arm-ai-optimization-challenge.devpost.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1 font-medium"
            >
              <span>Devpost Official Challenge</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Devpost Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportMarkdown={reportMarkdown}
      />

    </div>
  );
}
