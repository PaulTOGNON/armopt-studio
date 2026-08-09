import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, Download, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportModal({ isOpen, onClose, reportMarkdown }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#0E1424] border border-[#00F0FF]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.25)] relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-dark)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00E676]/10 text-[#00E676]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span>Devpost Hackathon Submission Report</span>
                <span className="badge badge-green">Ready to Submit</span>
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Copy this pre-formatted markdown directly into your Devpost project description.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Markdown Content Box */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-white leading-relaxed space-y-4 bg-[#060913]">
          <pre className="whitespace-pre-wrap selection:bg-[#00F0FF] selection:text-black">
            {reportMarkdown}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[var(--text-muted)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span>Quantitative benchmarks & Arm Performix traces verified.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="btn-secondary text-xs py-2 px-4 w-full sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleCopyReport}
              className="btn-success text-xs font-bold py-2 px-6 flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_20px_rgba(0,230,118,0.4)]"
            >
              {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Devpost Report Markdown'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
