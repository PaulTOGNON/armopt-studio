import React, { useState } from 'react';
import { Terminal, AlertTriangle, CheckCircle, Copy, Check, Wrench, Sparkles } from 'lucide-react';

export default function PerformixConsole({ performixResult, onApplyFix, selectedArch }) {
  const [copied, setCopied] = useState(false);

  if (!performixResult) return null;

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(performixResult.rawPerformixOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-cyan">MCP Protocol</span>
            <h2 className="text-lg font-bold text-[var(--text-main)] font-heading">Arm Performix MCP Diagnostics & Insights</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Live telemetry stream from the Arm Performix MCP Server connected to <span className="text-[var(--color-primary)] font-semibold">{selectedArch.name}</span>.
          </p>
        </div>

        <button
          onClick={handleCopyLogs}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-secondary)]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Log' : 'Copy Trace Log'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Dynamic Insights & Auto-Tuning */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-secondary)]" />
            <span>AI Dynamic Insights & Recommended Tuning</span>
          </h3>

          <div className="space-y-3">
            {performixResult.dynamicInsights.map((insight, idx) => {
              const isOptimal = insight.severity === 'OPTIMAL';
              const isCritical = insight.severity === 'CRITICAL';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    isOptimal
                      ? 'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)]/40 text-[var(--text-main)]'
                      : isCritical
                      ? 'bg-red-500/10 border-red-500/40 text-[var(--text-main)]'
                      : 'bg-amber-500/10 border-amber-500/40 text-[var(--text-main)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isOptimal ? (
                      <CheckCircle className="w-5 h-5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs">{insight.title}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-dark)] border border-[var(--border-color)] text-[var(--text-muted)]">
                          {insight.code}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Fixes */}
          {performixResult.recommendedFixes && performixResult.recommendedFixes.length > 0 && (
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--color-primary)]/30 space-y-3 shadow-sm">
              <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                <span>Recommended Auto-Tuning Action</span>
              </div>
              {performixResult.recommendedFixes.map((fix, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--bg-dark)] p-3 rounded-xl border border-[var(--border-color)]">
                  <div>
                    <div className="font-semibold text-xs text-[var(--text-main)]">{fix.title}</div>
                    <div className="text-[11px] text-[var(--color-secondary)] font-mono font-semibold">{fix.expectedSpeedup}</div>
                  </div>
                  <button
                    onClick={onApplyFix}
                    className="btn-primary text-xs py-1.5 px-3 self-start sm:self-auto"
                  >
                    <span>Apply Tuning</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Live Terminal Console */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-mono flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>arm-performix-mcp.log</span>
            </span>
            <span className="text-[10px] text-[var(--color-secondary)] font-mono font-bold">STREAMING</span>
          </div>

          <div className="terminal-box h-80 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
              {performixResult.rawPerformixOutput}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
