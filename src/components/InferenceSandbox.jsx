import React, { useState } from 'react';
import { Play, Zap, RefreshCw, Cpu } from 'lucide-react';
import { SAMPLE_PROMPTS } from '../data/armModels';

export default function InferenceSandbox({ selectedModel, selectedPreset, selectedArch }) {
  const [promptText, setPromptText] = useState(SAMPLE_PROMPTS[0].prompt);
  const [isStreaming, setIsStreaming] = useState(false);
  const [baselineOutput, setBaselineOutput] = useState('');
  const [optOutput, setOptOutput] = useState('');
  const [baselineTokSec, setBaselineTokSec] = useState(0);
  const [optTokSec, setOptTokSec] = useState(0);

  const sampleResponse = `To implement high-performance matrix multiplication on Arm Neoverse / Armv9 architecture using NEON SIMD intrinsics:

1. Block-quantize weights into 4-bit vectors.
2. Load 128-bit vector registers using vld1q_f32() or SVE2 ld1w.
3. Utilize Arm KleidiAI dot-product micro-kernel (vdotq_s32 / kleidi_matmul_sve2).
4. Unroll inner loops to eliminate pipeline branch stalls.

Performance Result: 78.6 tokens/sec (3.67x faster than scalar float16).`;

  const handleRunInference = () => {
    setIsStreaming(true);
    setBaselineOutput('');
    setOptOutput('');
    setBaselineTokSec(selectedModel.baseStats.fp16.tokPerSec);
    const targetStats = selectedModel.baseStats[selectedPreset.id] || selectedModel.baseStats.int4_kleidi;
    setOptTokSec(targetStats.tokPerSec);

    let charIndex = 0;
    const words = sampleResponse.split(' ');

    const interval = setInterval(() => {
      if (charIndex < words.length) {
        const nextChunk = words.slice(0, charIndex + 1).join(' ');
        setOptOutput(nextChunk);
        const baseIndex = Math.floor(charIndex / 3);
        setBaselineOutput(words.slice(0, baseIndex + 1).join(' '));
        charIndex++;
      } else {
        setBaselineOutput(sampleResponse);
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 60);
  };

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-cyan">Real-time Testing</span>
            <h2 className="text-lg font-bold text-[var(--text-main)] font-heading">Interactive Prompt & Inference Sandbox</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Compare live token generation speed between Baseline FP16 and your Arm KleidiAI optimized pipeline.
          </p>
        </div>
      </div>

      {/* Preset Prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SAMPLE_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setPromptText(p.prompt)}
            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--color-primary)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all shadow-sm"
          >
            <span className="text-[var(--color-primary)] font-semibold mr-1">{p.category}:</span>
            <span className="truncate max-w-[220px] inline-block align-bottom">{p.prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-3 mb-6">
        <textarea
          rows={2}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Enter custom prompt to test Arm model response..."
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--color-primary)] rounded-xl p-3 text-xs text-[var(--text-main)] placeholder:text-[var(--text-dim)] focus:outline-none transition-all font-mono shadow-sm"
        />
        <button
          onClick={handleRunInference}
          disabled={isStreaming}
          className="btn-success shrink-0 text-xs px-5 py-3"
        >
          {isStreaming ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>{isStreaming ? 'Streaming...' : 'Test Generation'}</span>
        </button>
      </div>

      {/* Side by Side Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Unoptimized FP16 Baseline */}
        <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Unoptimized Baseline (FP16 PyTorch)</span>
            </span>
            <span className="font-mono text-xs text-[var(--text-dim)] font-semibold">
              {baselineTokSec > 0 ? `${baselineTokSec} tok/s` : 'Idle'}
            </span>
          </div>

          <div className="min-h-[140px] font-mono text-xs text-[var(--text-main)] leading-relaxed bg-[var(--bg-dark)] p-3 rounded-lg border border-[var(--border-color)]">
            {baselineOutput || <span className="text-[var(--text-dim)] italic">Click "Test Generation" to stream output...</span>}
          </div>
        </div>

        {/* Right: Arm KleidiAI Optimized */}
        <div className="bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/30 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--color-secondary)]/20 pb-2">
            <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>Arm KleidiAI Optimized ({selectedPreset.name})</span>
            </span>
            <span className="badge badge-green font-mono text-xs font-bold">
              {optTokSec > 0 ? `${optTokSec} tok/s` : 'Accelerated'}
            </span>
          </div>

          <div className="min-h-[140px] font-mono text-xs text-[var(--text-main)] leading-relaxed bg-[var(--bg-dark)] p-3 rounded-lg border border-[var(--color-secondary)]/20">
            {optOutput || <span className="text-[var(--text-dim)] italic">Click "Test Generation" to stream accelerated output...</span>}
          </div>
        </div>

      </div>

    </div>
  );
}
