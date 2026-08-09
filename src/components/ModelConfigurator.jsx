import React from 'react';
import { Layers, Sliders, Play, Sparkles, Cpu, RefreshCw } from 'lucide-react';
import { AI_MODELS, OPTIMIZATION_PRESETS } from '../data/armModels';

export default function ModelConfigurator({
  selectedModel,
  onSelectModel,
  selectedPreset,
  onSelectPreset,
  batchSize,
  setBatchSize,
  contextLen,
  setContextLen,
  threads,
  setThreads,
  onRunDiagnostic,
  isAnalyzing
}) {
  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-violet">Pipeline Tuning</span>
            <h2 className="text-lg font-bold text-[var(--text-main)] font-heading">Model & Arm Optimization Configurator</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Configure quantization micro-kernels, SIMD execution engine, and threading parameters on Arm.
          </p>
        </div>

        <button
          onClick={onRunDiagnostic}
          disabled={isAnalyzing}
          className="btn-primary text-xs py-2.5 px-5"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running Arm Performix MCP...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Performix Diagnostic</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Model Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>1. Select AI Model</span>
          </label>
          <div className="space-y-2">
            {AI_MODELS.map((model) => {
              const isSelected = selectedModel.id === model.id;
              return (
                <button
                  key={model.id}
                  onClick={() => onSelectModel(model)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-[var(--text-main)] shadow-sm'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--color-primary)]/40 text-[var(--text-muted)]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-[var(--text-main)]">{model.name}</div>
                    <div className="text-[11px] text-[var(--text-dim)] font-mono">{model.family} • FP16 ({model.fp16SizeGB} GB)</div>
                  </div>
                  <span className="badge badge-cyan text-[10px] font-mono">{model.params}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Optimization Preset Picker */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
            <span>2. Arm Optimization Pipeline</span>
          </label>
          <div className="space-y-2">
            {OPTIMIZATION_PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)] text-[var(--text-main)] shadow-sm'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--color-secondary)]/40 text-[var(--text-muted)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[var(--text-main)]">{preset.name}</span>
                    {preset.id.includes('kleidi') && (
                      <span className="badge badge-green text-[9px]">Arm KleidiAI</span>
                    )}
                  </div>
                  <div className="text-[11px] text-[var(--text-dim)] font-mono">
                    Engine: <span className="text-[var(--color-primary)] font-semibold">{preset.armEngine}</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-dim)] font-mono">
                    SIMD: <span className="text-[var(--text-main)] font-medium">{preset.vectorExt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Hardware Sliders & Threads */}
        <div className="space-y-4 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Sliders className="w-3.5 h-3.5 text-[var(--color-violet)]" />
            <span>3. Runtime & CPU Thread Pinning</span>
          </label>

          {/* Batch Size Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-muted)]">Inference Batch Size:</span>
              <span className="text-[var(--color-primary)] font-mono font-bold">{batchSize}</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              value={batchSize}
              onChange={(e) => setBatchSize(parseInt(e.target.value))}
              className="w-full accent-[var(--color-primary)] bg-[var(--bg-dark)] rounded-lg h-2"
            />
          </div>

          {/* Context Length Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-muted)]">Context Prompt Length:</span>
              <span className="text-[var(--color-secondary)] font-mono font-bold">{contextLen} tokens</span>
            </div>
            <input
              type="range"
              min="512"
              max="8192"
              step="512"
              value={contextLen}
              onChange={(e) => setContextLen(parseInt(e.target.value))}
              className="w-full accent-[var(--color-secondary)] bg-[var(--bg-dark)] rounded-lg h-2"
            />
          </div>

          {/* CPU Core Threads */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-muted)]">Arm CPU Worker Threads:</span>
              <span className="text-[var(--color-violet)] font-mono font-bold">{threads} Threads</span>
            </div>
            <input
              type="range"
              min="1"
              max="64"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              className="w-full accent-[var(--color-violet)] bg-[var(--bg-dark)] rounded-lg h-2"
            />
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg-dark)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            <span>NUMA Node Thread Pinning Enabled for Arm Neoverse cores.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
