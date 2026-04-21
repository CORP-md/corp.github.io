import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Line = {
  role: string;
  text: string;
};

const script: Line[] = [
  { role: "CEO", text: "Scope the feature. Ship by Friday." },
  { role: "ARCH", text: "Data model ready. Contracts defined." },
  { role: "DEV", text: "Implementing now. Three files changed." },
  { role: "QA", text: "Tests passing. Ready for review." },
];

function useTypewriter(lines: Line[], speed = 28, loopDelay = 3200) {
  const [output, setOutput] = useState<Line[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (lineIndex >= lines.length) {
      timeout = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
        setOutput([]);
      }, loopDelay);
      return () => clearTimeout(timeout);
    }

    const current = lines[lineIndex];

    timeout = setTimeout(() => {
      setOutput((prev) => {
        const copy = [...prev];
        const updatedText = current.text.slice(0, charIndex + 1);
        copy[lineIndex] = {
          role: current.role,
          text: updatedText,
        };
        return copy;
      });

      if (charIndex < current.text.length) {
        setCharIndex((c) => c + 1);
      } else {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, lines, speed, loopDelay]);

  return { output, isTyping: lineIndex < lines.length };
}

function IconOrchestrate() {
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} fill="none">
      <circle cx="32" cy="32" r="4" fill="#e4e4e7" />
      <circle cx="32" cy="32" r="10" stroke="#e4e4e7" strokeWidth="0.5" opacity="0.3" />
      <circle cx="14" cy="14" r="3" stroke="#71717a" strokeWidth="1.5" fill="#111113" />
      <circle cx="50" cy="14" r="3" stroke="#71717a" strokeWidth="1.5" fill="#111113" />
      <circle cx="14" cy="50" r="3" stroke="#71717a" strokeWidth="1.5" fill="#111113" />
      <circle cx="50" cy="50" r="3" stroke="#71717a" strokeWidth="1.5" fill="#111113" />
      <line x1="32" y1="32" x2="14" y2="14" stroke="#52525b" strokeWidth="1" />
      <line x1="32" y1="32" x2="50" y2="14" stroke="#52525b" strokeWidth="1" />
      <line x1="32" y1="32" x2="14" y2="50" stroke="#52525b" strokeWidth="1" />
      <line x1="32" y1="32" x2="50" y2="50" stroke="#52525b" strokeWidth="1" />
    </svg>
  );
}

function IconRoles() {
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} fill="none">
      <rect x="8" y="8" width="22" height="22" stroke="#71717a" strokeWidth="1.5" rx="2" />
      <rect x="34" y="8" width="22" height="22" stroke="#52525b" strokeWidth="1.5" rx="2" />
      <rect x="8" y="34" width="22" height="22" stroke="#52525b" strokeWidth="1.5" rx="2" />
      <rect x="34" y="34" width="22" height="22" stroke="#71717a" strokeWidth="1.5" rx="2" />
      <text x="19" y="24" fontFamily="monospace" fontSize="8" fill="#e4e4e7" textAnchor="middle">CEO</text>
      <text x="45" y="24" fontFamily="monospace" fontSize="6" fill="#a1a1aa" textAnchor="middle">ARCH</text>
      <text x="19" y="50" fontFamily="monospace" fontSize="8" fill="#a1a1aa" textAnchor="middle">DEV</text>
      <text x="45" y="50" fontFamily="monospace" fontSize="8" fill="#e4e4e7" textAnchor="middle">QA</text>
    </svg>
  );
}

function IconIntegrate() {
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} fill="none">
      <path d="M12 32 L24 32" stroke="#71717a" strokeWidth="1.5" />
      <path d="M40 32 L52 32" stroke="#71717a" strokeWidth="1.5" />
      <path d="M22 28 L26 32 L22 36" stroke="#52525b" strokeWidth="1.5" />
      <path d="M42 28 L38 32 L42 36" stroke="#52525b" strokeWidth="1.5" />
      <rect x="24" y="20" width="16" height="24" stroke="#e4e4e7" strokeWidth="1.5" rx="2" />
      <circle cx="32" cy="32" r="3" fill="#e4e4e7" />
    </svg>
  );
}

function IconRealtime() {
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} fill="none">
      <circle cx="32" cy="32" r="20" stroke="#71717a" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="14" stroke="#52525b" strokeWidth="1" opacity="0.5" />
      <circle cx="32" cy="32" r="8" stroke="#3f3f46" strokeWidth="0.5" opacity="0.5" />
      <circle cx="32" cy="32" r="3" fill="#e4e4e7" />
      <path d="M32 12 L32 16" stroke="#71717a" strokeWidth="1.5" />
      <path d="M32 48 L32 52" stroke="#71717a" strokeWidth="1.5" />
      <path d="M12 32 L16 32" stroke="#71717a" strokeWidth="1.5" />
      <path d="M48 32 L52 32" stroke="#71717a" strokeWidth="1.5" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ flexShrink: 0 }} fill="currentColor">
      <path d="M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.796 24 17.3 24 12c0-6.626-5.374-12-12-12z"/>
    </svg>
  );
}

const features = [
  { n: "01", title: "Agent Orchestration", desc: "Tasks route through a dispatcher that reads the relevant agent file and executes with full context. No glue code.", icon: IconOrchestrate },
  { n: "02", title: "Role-Based Logic", desc: "CEO, Architect, Dev, QA, Design — each agent runs distinct reasoning, tooling, and decision boundaries defined in markdown.", icon: IconRoles },
  { n: "03", title: "Zero Dependencies", desc: "Just markdown files in a .claude/ folder. No framework, no npm packages, no orchestration layer to maintain.", icon: IconIntegrate },
  { n: "04", title: "Observable Execution", desc: "Tagged outputs — [CEO], [DEV], [QA] — so you always know which agent is responding and why.", icon: IconRealtime },
];

const installSteps = [
  { n: "01", label: "Install via Claude Code plugin", cmd: "claude plugin install github:zblauser/CORP", shell: true },
  { n: "02", label: "Or clone manually", cmd: "git clone https://github.com/zblauser/CORP .corp-tmp && cp -r .corp-tmp/.claude ./ && rm -rf .corp-tmp", shell: true },
];

const corpCommands = [
  { n: "01", label: "Run setup wizard", cmd: "corp:init" },
  { n: "02", label: "View agent map", cmd: "corp" },
  { n: "03", label: "Add a specialist", cmd: "corp:add-agent" },
];

const stats = [
  { value: "6", label: "Agent Roles" },
  { value: "0", label: "Dependencies" },
  { value: "MIT", label: "Licensed" },
  { value: "∞", label: "Extensible" },
];

export default function App() {
  const { output, isTyping } = useTypewriter(script);

  return (
    <div className="text-white font-mono overflow-x-hidden relative min-h-screen">

      {/* NAV */}
      <nav className="nav-bar">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="font-bebas text-xl tracking-widest text-white">CORP</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="#capabilities" className="nav-link hidden md:inline-block">CAPABILITIES</a>
            <a href="#install" className="nav-link hidden md:inline-block">INSTALL</a>
            <a
              href="https://github.com/zblauser/CORP"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-2"
            >
              <GithubIcon />
              GITHUB
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="h-screen flex flex-col items-center justify-center text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <p className="section-label mb-6">// CLAUDE CODE AGENT FRAMEWORK</p>
          <h1 className="hero-logo text-6xl md:text-8xl mb-6">CORP</h1>
		  <div className="flex items-center justify-center min-h-[200px]">
			<img src={`${import.meta.env.BASE_URL}CORP-main.svg`} height="250" width="250" alt="CORP" />
          </div>
		  <p className="text-zinc-400 text-lg md:text-xl font-bebas tracking-[0.3em] mb-8">
            STRUCTURED ROLES BUILT FOR AI CODING AGENTS
          </p>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Drop in markdown files. CEO sets direction. Architect defines contracts. Dev ships. QA validates. Tasks route automatically — no framework, no dependencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/zblauser/CORP"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              <GithubIcon />
              <span>Get Started</span>
              <span>→</span>
            </a>
            <a href="#capabilities" className="cta-secondary">
              <span>Learn More</span>
            </a>
          </div>
        </motion.div>
        <div className="scroll-indicator">SCROLL ↓</div>
      </section>

      {/* STATS STRIP */}
      <section className="px-6 py-16 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="stat-block"
            >
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOARDROOM SYNC */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">// LIVE DEMO</p>
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide">Boardroom Sync</h2>
          </div>
          <div className="terminal-window">
            <div className="terminal-chrome">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">corp — agents@boardroom</span>
            </div>
            <div className="terminal-body">
              {output.length === 0 ? (
                <p className="terminal-prompt">
                  <span className="terminal-role">corp</span>
                  <span>@boardroom</span>
                  <span>:~$ </span>
                  <span className="terminal-text">initializing agents...</span>
                  <span className="terminal-cursor" />
                </p>
              ) : (
                output.map((line, i) => (
                  <p key={i} className="terminal-prompt">
                    <span className="terminal-role">{line.role.toLowerCase()}</span>
                    <span>@boardroom</span>
                    <span>:~$ </span>
                    <span className="terminal-text">{line.text}</span>
                    {i === output.length - 1 && isTyping && <span className="terminal-cursor" />}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* CAPABILITIES */}
      <section id="capabilities" className="px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">// CAPABILITIES</p>
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide">What it does</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="feature-card"
                >
                  <div className="feature-number">{feat.n} /</div>
                  <Icon />
                  <h3 className="text-white font-bebas text-2xl mt-6 mb-3 tracking-wide">{feat.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* INSTALL */}
      <section id="install" className="px-6 py-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">// QUICKSTART</p>
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide">Install</h2>
          </div>
          <div className="terminal-window">
            <div className="terminal-chrome">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">install.sh — zsh</span>
            </div>
            <div className="terminal-body space-y-6">
              {installSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-zinc-600 text-xs tracking-widest">{step.n}</span>
                    <span className="text-zinc-500 text-xs tracking-widest uppercase">{step.label}</span>
                  </div>
                  <div className="code-block">{step.cmd}</div>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-white/5">
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-4">Then in Claude Code</p>
                {corpCommands.map((cmd, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (installSteps.length + i) * 0.08 }}
                    className="mb-3"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-zinc-600 text-xs tracking-widest">{cmd.n}</span>
                      <span className="text-zinc-500 text-xs tracking-widest uppercase">{cmd.label}</span>
                    </div>
                    <div className="code-block cmd">{cmd.cmd}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="px-6 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">// SHIP IT</p>
          <h2 className="text-5xl md:text-6xl font-bebas text-white mb-6 tracking-wide">Ready to build?</h2>
          <p className="text-zinc-500 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Clone the repo. Run the setup wizard. Fork it and define your own agents.
          </p>
          <a
            href="https://github.com/zblauser/CORP"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary"
          >
            <GithubIcon />
            <span>View on GitHub</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bebas text-lg tracking-widest text-white">CORP</span>
            <span className="text-zinc-700 text-xs tracking-wider">© 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/zblauser/CORP"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-2"
            >
              <GithubIcon />
              GITHUB
            </a>
            <span className="text-zinc-700 text-xs tracking-wider">MIT LICENSED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
