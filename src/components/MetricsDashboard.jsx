import React from 'react';
import { Zap, Clock, HardDrive, BatteryCharging, TrendingUp, Cpu, Activity, BarChart3 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MetricsDashboard({ selectedModel, selectedPreset, selectedArch, isAnalyzing, isDarkMode }) {
  const currentStats = selectedModel.baseStats[selectedPreset.id] || selectedModel.baseStats.int4_kleidi;
  const fp16Stats = selectedModel.baseStats.fp16;

  // Multipliers & Gains
  const speedupTok = (currentStats.tokPerSec / fp16Stats.tokPerSec).toFixed(2);
  const ttftReduction = (((fp16Stats.ttftMs - currentStats.ttftMs) / fp16Stats.ttftMs) * 100).toFixed(1);
  const ramSavedPct = (((fp16Stats.ramGB - currentStats.ramGB) / fp16Stats.ramGB) * 100).toFixed(1);
  const joulesSavedPct = (((fp16Stats.joulesPerKTok - currentStats.joulesPerKTok) / fp16Stats.joulesPerKTok) * 100).toFixed(1);

  // Chart Data Adaptable
  const chartData = {
    labels: ['FP16 Baseline', 'INT8 Quant', 'INT4 KleidiAI', 'INT4 + Kleidi + Flash'],
    datasets: [
      {
        label: 'Inference Speed (Tokens / sec)',
        data: [
          selectedModel.baseStats.fp16.tokPerSec,
          selectedModel.baseStats.int8.tokPerSec,
          selectedModel.baseStats.int4_kleidi.tokPerSec,
          selectedModel.baseStats.int4_kleidi_flash.tokPerSec
        ],
        backgroundColor: isDarkMode
          ? ['rgba(255, 255, 255, 0.15)', 'rgba(0, 145, 255, 0.6)', 'rgba(0, 240, 255, 0.8)', 'rgba(0, 230, 118, 0.9)']
          : ['rgba(148, 163, 184, 0.3)', 'rgba(2, 132, 199, 0.6)', 'rgba(0, 112, 243, 0.8)', 'rgba(5, 150, 105, 0.9)'],
        borderColor: isDarkMode
          ? ['#ffffff', '#0091FF', '#00F0FF', '#00E676']
          : ['#64748B', '#0284C7', '#0070F3', '#059669'],
        borderWidth: 1.5,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDarkMode ? '#0E1424' : '#FFFFFF',
        titleColor: isDarkMode ? '#00F0FF' : '#0284C7',
        bodyColor: isDarkMode ? '#ffffff' : '#0F172A',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: isDarkMode ? '#94A3B8' : '#475569', font: { family: 'Inter', size: 11 } }
      },
      y: {
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: isDarkMode ? '#94A3B8' : '#475569', font: { family: 'JetBrains Mono', size: 11 } },
        title: { display: true, text: 'Tokens per Second (tok/s)', color: isDarkMode ? '#64748B' : '#64748B', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="glass-panel p-6 mb-8 relative overflow-hidden">
      {isAnalyzing && (
        <div className="absolute inset-0 bg-[var(--bg-dark)]/80 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-t-[var(--color-primary)] border-r-transparent border-b-[var(--color-secondary)] border-l-transparent animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-[var(--text-main)]">Profiling Arm Hardware PMU Counters...</p>
            <p className="text-xs text-[var(--text-muted)] font-mono">Analyzing SVE2 vector lanes & memory bandwidth on {selectedArch.name}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-green">Live Performance</span>
            <h2 className="text-lg font-bold text-[var(--text-main)] font-heading">Benchmark & Optimization Metrics</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Real-time inference performance and hardware PMU metrics for <span className="text-[var(--text-main)] font-semibold">{selectedModel.name}</span> on <span className="text-[var(--color-primary)] font-semibold">{selectedArch.name}</span>.
          </p>
        </div>
      </div>

      {/* 4 Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Card 1: Throughput */}
        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Inference Throughput</span>
            <Zap className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="metric-value text-[var(--color-primary)]">
            {currentStats.tokPerSec} <span className="text-xs text-[var(--text-muted)] font-normal">tok/s</span>
          </div>
          <div className="metric-delta metric-delta-positive mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{speedupTok}x Speedup vs FP16</span>
          </div>
        </div>

        {/* Card 2: TTFT Latency */}
        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Time To First Token</span>
            <Clock className="w-4 h-4 text-[var(--color-secondary)]" />
          </div>
          <div className="metric-value text-[var(--color-secondary)]">
            {currentStats.ttftMs} <span className="text-xs text-[var(--text-muted)] font-normal">ms</span>
          </div>
          <div className="metric-delta metric-delta-positive mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>-{ttftReduction}% Latency Reduction</span>
          </div>
        </div>

        {/* Card 3: Memory Footprint */}
        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Memory Footprint</span>
            <HardDrive className="w-4 h-4 text-[var(--color-violet)]" />
          </div>
          <div className="metric-value text-[var(--color-violet)]">
            {currentStats.ramGB} <span className="text-xs text-[var(--text-muted)] font-normal">GB</span>
          </div>
          <div className="metric-delta metric-delta-positive mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>-{ramSavedPct}% RAM Saved</span>
          </div>
        </div>

        {/* Card 4: Energy Efficiency */}
        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Energy Efficiency</span>
            <BatteryCharging className="w-4 h-4 text-[var(--color-warning)]" />
          </div>
          <div className="metric-value text-[var(--color-warning)]">
            {currentStats.joulesPerKTok} <span className="text-xs text-[var(--text-muted)] font-normal">J/1k tok</span>
          </div>
          <div className="metric-delta metric-delta-positive mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>-{joulesSavedPct}% Power Consumption</span>
          </div>
        </div>

      </div>

      {/* Chart & PMU Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Chart */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Throughput Comparison Across Optimization Presets</span>
            </h3>
            <span className="text-xs text-[var(--text-muted)] font-mono">Higher is better</span>
          </div>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Right Col: Arm Hardware PMU Counters */}
        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--color-secondary)]" />
            <span>Arm Hardware PMU Counters</span>
          </h3>

          {/* Progress 1: SIMD Utilization */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-[var(--text-muted)]">SIMD Vector Utilization:</span>
              <span className="text-[var(--color-primary)] font-bold">{currentStats.pmuSimdUtil}%</span>
            </div>
            <div className="w-full h-2.5 bg-[var(--bg-dark)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all"
                style={{ width: `${currentStats.pmuSimdUtil}%` }}
              ></div>
            </div>
          </div>

          {/* Progress 2: L1D Cache Miss Rate */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-[var(--text-muted)]">L1D Cache Miss Rate:</span>
              <span className="text-[var(--color-secondary)] font-bold">{currentStats.pmuCacheMiss}%</span>
            </div>
            <div className="w-full h-2.5 bg-[var(--bg-dark)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-warning)] rounded-full transition-all"
                style={{ width: `${Math.min(currentStats.pmuCacheMiss * 4, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Performix Dynamic Status Box */}
          <div className="p-3 rounded-xl bg-[var(--bg-dark)] border border-[var(--border-color)] space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-mono font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>Arm Performix Status: ACTIVE</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Micro-kernel execution: <span className="text-[var(--text-main)] font-mono">{selectedPreset.id.includes('kleidi') ? 'Arm KleidiAI SVE2 Packed' : 'Generic CPU Fallback'}</span>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
