import React from 'react';
import { Server, CheckCircle2 } from 'lucide-react';
import { ARM_ARCHITECTURES } from '../data/armModels';

export default function ArchitectureSelector({ selectedArch, onSelectArch }) {
  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-cyan">Hardware Target</span>
            <h2 className="text-lg font-bold text-[var(--text-main)] font-heading">Select Arm Compute Platform</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Choose the target Arm silicon platform to profile SIMD vector extensions, PMU counters, and KleidiAI micro-kernels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ARM_ARCHITECTURES.map((arch) => {
          const isSelected = selectedArch.id === arch.id;
          return (
            <button
              key={arch.id}
              onClick={() => onSelectArch(arch)}
              className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[var(--bg-card)] border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)]/20'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-[var(--color-primary)]">
                  <CheckCircle2 className="w-4 h-4 fill-[var(--color-primary)]/20" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--bg-dark)] text-[var(--text-muted)]'}`}>
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-main)] leading-snug">{arch.name}</h3>
                    <span className="text-[10px] text-[var(--color-primary)] font-mono font-semibold">{arch.coreType}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mb-3">
                  {arch.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-color)] space-y-1 text-[11px] font-mono">
                <div className="flex justify-between text-[var(--text-dim)]">
                  <span>Cores:</span>
                  <span className="text-[var(--text-main)] font-semibold">{arch.cores} Cores</span>
                </div>
                <div className="flex justify-between text-[var(--text-dim)]">
                  <span>Vector SIMD:</span>
                  <span className="text-[var(--color-secondary)] font-semibold truncate max-w-[110px]" title={arch.vectorTech}>
                    {arch.vectorTech.split(' ')[0]}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
