import React from 'react';
import { Cpu, Zap, ExternalLink, Activity, Sun, Moon } from 'lucide-react';

export default function Header({ onOpenReport, isDarkMode, onToggleTheme }) {
  return (
    <header className="border-b border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0070F3] dark:from-[#00F0FF] dark:to-[#0091FF] p-[2px] shadow-sm">
            <div className="w-full h-full bg-[var(--bg-card)] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-[var(--color-primary)] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heading tracking-tight text-[var(--text-main)] flex items-center gap-2">
                ArmOpt<span className="text-[var(--color-primary)]">Studio</span>
              </h1>
              <span className="badge badge-cyan text-[10px]">v2.4 Neoverse</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-2">
              <span>Arm Create AI Optimization Workbench</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[var(--text-dim)]"></span>
              <span className="text-[var(--color-secondary)] font-mono flex items-center gap-1">
                <Activity className="w-3 h-3" /> Performix MCP Active
              </span>
            </p>
          </div>
        </div>

        {/* Right: Actions & Theme Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)] text-[var(--text-main)] hover:border-[var(--color-primary)] transition-all flex items-center gap-2 text-xs font-semibold shadow-sm"
            title={isDarkMode ? "Switch to Light Mode (Default)" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          <a 
            href="https://arm-ai-optimization-challenge.devpost.com/" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-dark)] transition-colors border border-[var(--border-color)] shadow-sm"
          >
            <span>Devpost Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenReport}
            className="btn-success text-xs font-bold py-2.5 px-4 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Generate Devpost Report</span>
          </button>
        </div>

      </div>
    </header>
  );
}
