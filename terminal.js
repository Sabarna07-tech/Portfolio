/**
 * terminal.js - Interactive Portfolio Terminal
 * An easter-egg command-line interface overlaid on the portfolio.
 * Visitors can type commands to explore the portfolio in a hacker-style terminal.
 */

const TERMINAL_COMMANDS = {
    help: {
        desc: 'Show all available commands',
        fn: () => [
            '┌─────────────────────────────────────────┐',
            '│  CURATOR TERMINAL v1.0                  │',
            '│  Interactive Portfolio CLI               │',
            '├─────────────────────────────────────────┤',
            '│  about       → Who is Sabarna?          │',
            '│  skills      → Technical skills          │',
            '│  experience  → Work experience           │',
            '│  education   → Academic background       │',
            '│  certs       → Certifications            │',
            '│  awards      → Honors & awards           │',
            '│  projects    → GitHub repositories       │',
            '│  contact     → Contact information       │',
            '│  socials     → Social media links        │',
            '│  leetcode    → LeetCode stats            │',
            '│  goto <sec>  → Navigate to section       │',
            '│  theme       → Toggle terminal theme     │',
            '│  matrix      → Enter the matrix          │',
            '│  clear       → Clear terminal            │',
            '│  exit        → Close terminal            │',
            '└─────────────────────────────────────────┘'
        ]
    },
    about: {
        desc: 'Display profile summary',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            if (!p) return ['Profile data not loaded.'];
            return [
                `  ╔══════════════════════════════════════╗`,
                `  ║  ${p.name.toUpperCase().padEnd(36)}║`,
                `  ╚══════════════════════════════════════╝`,
                ``,
                `  ${p.headline}`,
                `  📍 ${p.location}`,
                ``,
                `  ${p.bio}`,
                ``
            ];
        }
    },
    skills: {
        desc: 'List technical skills',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            if (!p) return ['Profile data not loaded.'];
            const lines = ['', '  ⚡ SKILLS ARSENAL', '  ─────────────────────'];
            const cats = {
                '🤖 AI/ML': p.skills.ai_ml,
                '💻 Languages': p.skills.languages,
                '📊 Data': p.skills.data,
                '🔧 Tools': p.skills.tools,
                '⚙️ Engineering': p.skills.engineering
            };
            for (const [cat, items] of Object.entries(cats)) {
                lines.push(`  ${cat}: ${items.join(' · ')}`);
            }
            lines.push('');
            return lines;
        }
    },
    experience: {
        desc: 'Show work experience',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            if (!p) return ['Profile data not loaded.'];
            const lines = ['', '  💼 EXPERIENCE', '  ─────────────────────'];
            p.experience.forEach(exp => {
                const status = exp.end === 'Present' ? '🟢' : '⚪';
                lines.push(`  ${status} ${exp.title} @ ${exp.company}`);
                lines.push(`     ${exp.start} — ${exp.end} (${exp.duration})`);
                lines.push(`     ${exp.type} · ${exp.location}`);
                if (exp.skills.length) lines.push(`     Skills: ${exp.skills.join(', ')}`);
                lines.push('');
            });
            return lines;
        }
    },
    education: {
        desc: 'Show education',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            if (!p) return ['Profile data not loaded.'];
            const lines = ['', '  🎓 EDUCATION', '  ─────────────────────'];
            p.education.forEach(edu => {
                lines.push(`  📚 ${edu.school}`);
                lines.push(`     ${edu.degree}${edu.field ? ', ' + edu.field : ''}`);
                if (edu.start) lines.push(`     ${edu.start} — ${edu.end}`);
                if (edu.grade) lines.push(`     CGPA: ${edu.grade}`);
                lines.push('');
            });
            return lines;
        }
    },
    certs: {
        desc: 'Show certifications',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            if (!p) return ['Profile data not loaded.'];
            const lines = ['', '  📜 CERTIFICATIONS', '  ─────────────────────'];
            p.certifications.forEach(c => {
                lines.push(`  ✅ ${c.name}`);
                lines.push(`     Issued by: ${c.issuer} · ${c.date}`);
                lines.push('');
            });
            return lines;
        }
    },
    awards: {
        desc: 'Show honors & awards',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            if (!p) return ['Profile data not loaded.'];
            const lines = ['', '  🏆 HONORS & AWARDS', '  ─────────────────────'];
            p.awards.forEach(a => {
                lines.push(`  🥇 ${a.title}`);
                lines.push(`     ${a.issuer} · ${a.date}`);
                lines.push(`     ${a.description}`);
                lines.push('');
            });
            return lines;
        }
    },
    projects: {
        desc: 'Show GitHub projects',
        fn: () => {
            const count = document.getElementById('gh-repos-count')?.textContent || '?';
            const stars = document.getElementById('gh-stars-count')?.textContent || '?';
            return [
                '', '  📂 GITHUB PROJECTS', '  ─────────────────────',
                `  Repositories: ${count}`,
                `  Total Stars:  ${stars}`,
                `  Profile: https://github.com/Sabarna07-tech`,
                '',
                '  → Type "goto portfolio" to see featured projects',
                ''
            ];
        }
    },
    contact: {
        desc: 'Show contact info',
        fn: () => {
            const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
            return [
                '', '  📬 CONTACT', '  ─────────────────────',
                `  📍 ${p?.location || 'Kolkata, India'}`,
                `  🔗 LinkedIn: linkedin.com/in/sabarnasaha`,
                `  🐙 GitHub: github.com/Sabarna07-tech`,
                `  💻 LeetCode: leetcode.com/u/TryExcept`,
                '',
                '  → Type "goto contact" to navigate there',
                ''
            ];
        }
    },
    socials: {
        desc: 'Open social links',
        fn: () => [
            '', '  🌐 SOCIAL LINKS', '  ─────────────────────',
            '  [1] LinkedIn  → linkedin.com/in/sabarnasaha',
            '  [2] GitHub    → github.com/Sabarna07-tech',
            '  [3] LeetCode  → leetcode.com/u/TryExcept',
            '',
            '  Type "open 1", "open 2", or "open 3" to visit',
            ''
        ]
    },
    leetcode: {
        desc: 'Show LeetCode stats',
        fn: () => {
            const statsEl = document.getElementById('leetcode-stats');
            if (!statsEl || statsEl.querySelector('.animate-pulse')) {
                return ['', '  ⏳ LeetCode stats are still loading...', '  Try again in a few seconds.', ''];
            }
            const text = statsEl.innerText;
            return ['', '  ⌨️ LEETCODE STATS', '  ─────────────────────', `  ${text.replace(/\n/g, '\n  ')}`, ''];
        }
    },
    matrix: {
        desc: 'Enter the matrix',
        fn: (terminal) => {
            terminal.startMatrix();
            return ['', '  🟢 Entering the Matrix...', '  Press any key to exit.', ''];
        }
    },
    theme: {
        desc: 'Toggle terminal theme',
        fn: (terminal) => {
            terminal.toggleTheme();
            return [`  Theme switched to: ${terminal.theme}`];
        }
    },
    clear: {
        desc: 'Clear terminal',
        fn: (terminal) => { terminal.clearOutput(); return []; }
    },
    exit: {
        desc: 'Close terminal',
        fn: (terminal) => { setTimeout(() => terminal.close(), 300); return ['  👋 Closing terminal...']; }
    }
};

class PortfolioTerminal {
    constructor() {
        this.isOpen = false;
        this.theme = 'hacker'; // hacker | retro | cyber
        this.history = [];
        this.historyIndex = -1;
        this.matrixInterval = null;
        this.createDOM();
        this.bindEvents();
    }

    createDOM() {
        // Overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'terminal-overlay';
        this.overlay.className = 'fixed inset-0 z-[999] hidden';
        this.overlay.innerHTML = `
            <div class="absolute inset-0 bg-black/80 backdrop-blur-md" id="terminal-backdrop"></div>
            <div class="relative z-10 flex items-center justify-center h-full px-4">
                <div id="terminal-window" class="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-[#00ff4130] terminal-hacker"
                     style="height:70vh;max-height:600px;">
                    <!-- Title Bar -->
                    <div class="flex items-center justify-between px-4 py-2 bg-[#0a0f0a] border-b border-[#00ff4120]">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer hover:brightness-125" id="terminal-close-dot"></div>
                            <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
                        </div>
                        <span class="text-[10px] font-mono text-[#00ff41]/60 uppercase tracking-widest">sabarna@curator:~</span>
                        <div class="w-16"></div>
                    </div>
                    <!-- Matrix Canvas (hidden by default) -->
                    <canvas id="matrix-canvas" class="absolute inset-0 hidden" style="top:32px;"></canvas>
                    <!-- Output -->
                    <div id="terminal-output" class="p-4 font-mono text-sm leading-relaxed overflow-y-auto" style="height:calc(100% - 80px);"></div>
                    <!-- Input -->
                    <div class="flex items-center px-4 py-3 bg-[#0a0f0a] border-t border-[#00ff4120]">
                        <span class="text-[#00ff41] font-mono text-sm mr-2 flex-shrink-0">❯</span>
                        <input id="terminal-input" type="text" class="flex-1 bg-transparent border-none outline-none text-[#00ff41] font-mono text-sm caret-[#00ff41] placeholder-[#00ff41]/30"
                               placeholder="type 'help' to get started..." autocomplete="off" spellcheck="false" />
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.overlay);

        // Add terminal styles
        const style = document.createElement('style');
        style.textContent = `
            .terminal-hacker { background: #0a0f0a; color: #00ff41; }
            .terminal-retro { background: #1a0a2e; color: #ff6600; border-color: #ff660030 !important; }
            .terminal-retro .text-\\[\\#00ff41\\] { color: #ff6600 !important; }
            .terminal-retro .text-\\[\\#00ff41\\]\\/60 { color: rgba(255,102,0,0.6) !important; }
            .terminal-retro .text-\\[\\#00ff41\\]\\/30 { color: rgba(255,102,0,0.3) !important; }
            .terminal-retro .border-\\[\\#00ff4120\\] { border-color: #ff660020 !important; }
            .terminal-retro .border-\\[\\#00ff4130\\] { border-color: #ff660030 !important; }
            .terminal-retro .bg-\\[\\#0a0f0a\\] { background: #1a0a2e !important; }
            .terminal-retro .caret-\\[\\#00ff41\\] { caret-color: #ff6600 !important; }
            .terminal-retro input { color: #ff6600 !important; }
            .terminal-retro input::placeholder { color: rgba(255,102,0,0.3) !important; }
            .terminal-cyber { background: #0a0a1a; color: #4cd7f6; border-color: #4cd7f630 !important; }
            .terminal-cyber .text-\\[\\#00ff41\\] { color: #4cd7f6 !important; }
            .terminal-cyber .text-\\[\\#00ff41\\]\\/60 { color: rgba(76,215,246,0.6) !important; }
            .terminal-cyber .text-\\[\\#00ff41\\]\\/30 { color: rgba(76,215,246,0.3) !important; }
            .terminal-cyber .border-\\[\\#00ff4120\\] { border-color: #4cd7f620 !important; }
            .terminal-cyber .border-\\[\\#00ff4130\\] { border-color: #4cd7f630 !important; }
            .terminal-cyber .bg-\\[\\#0a0f0a\\] { background: #0a0a1a !important; }
            .terminal-cyber .caret-\\[\\#00ff41\\] { caret-color: #4cd7f6 !important; }
            .terminal-cyber input { color: #4cd7f6 !important; }
            .terminal-cyber input::placeholder { color: rgba(76,215,246,0.3) !important; }
            #terminal-output::-webkit-scrollbar { width: 6px; }
            #terminal-output::-webkit-scrollbar-track { background: transparent; }
            #terminal-output::-webkit-scrollbar-thumb { background: #00ff4130; border-radius: 3px; }
            #terminal-window { animation: terminalOpen 0.3s ease-out; }
            @keyframes terminalOpen { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
            @keyframes terminalClose { from { transform: scale(1); opacity: 1; } to { transform: scale(0.9) translateY(20px); opacity: 0; } }
            .terminal-line { animation: lineAppear 0.05s ease-out; }
            @keyframes lineAppear { from { opacity: 0; transform: translateX(-5px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
            .terminal-cursor::after { content: '█'; animation: blink 1s step-end infinite; }
        `;
        document.head.appendChild(style);

        this.outputEl = document.getElementById('terminal-output');
        this.inputEl = document.getElementById('terminal-input');
        this.windowEl = document.getElementById('terminal-window');
    }

    bindEvents() {
        // Terminal button in nav
        const termBtn = document.querySelector('[data-icon="terminal"]')?.closest('button');
        if (termBtn) termBtn.addEventListener('click', () => this.toggle());

        // Close dot
        document.getElementById('terminal-close-dot')?.addEventListener('click', () => this.close());

        // Backdrop click
        document.getElementById('terminal-backdrop')?.addEventListener('click', () => this.close());

        // Input
        this.inputEl?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.inputEl.value.trim();
                if (cmd) {
                    this.history.push(cmd);
                    this.historyIndex = this.history.length;
                    this.execute(cmd);
                }
                this.inputEl.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputEl.value = this.history[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.inputEl.value = this.history[this.historyIndex];
                } else {
                    this.historyIndex = this.history.length;
                    this.inputEl.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            }
        });

        // Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });

        // Keyboard shortcut: Ctrl+` to toggle
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.inputEl.focus();
        if (this.outputEl.children.length === 0) {
            this.printWelcome();
        }
    }

    close() {
        this.windowEl.style.animation = 'terminalClose 0.2s ease-in forwards';
        this.stopMatrix();
        setTimeout(() => {
            this.isOpen = false;
            this.overlay.classList.add('hidden');
            document.body.style.overflow = '';
            this.windowEl.style.animation = '';
        }, 200);
    }

    printWelcome() {
        const lines = [
            '',
            '  ███████╗ █████╗ ██████╗  █████╗ ██████╗ ███╗   ██╗ █████╗ ',
            '  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗',
            '  ███████╗███████║██████╔╝███████║██████╔╝██╔██╗ ██║███████║',
            '  ╚════██║██╔══██║██╔══██╗██╔══██║██╔══██╗██║╚██╗██║██╔══██║',
            '  ███████║██║  ██║██████╔╝██║  ██║██║  ██║██║ ╚████║██║  ██║',
            '  ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝',
            '',
            '  Welcome to the Curator Terminal v1.0',
            '  AI/ML Engineer · Jadavpur University',
            '',
            '  Type "help" to see available commands.',
            '  Shortcut: Ctrl+` to toggle terminal anytime.',
            ''
        ];
        this.printLines(lines);
    }

    execute(cmdStr) {
        // Echo the command
        this.printLine(`<span class="opacity-50">❯</span> ${this.escapeHtml(cmdStr)}`, 'opacity-80');

        const parts = cmdStr.toLowerCase().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        // Handle special commands with args
        if (cmd === 'goto' && args.length) {
            this.handleGoto(args.join(' '));
            return;
        }
        if (cmd === 'open' && args.length) {
            this.handleOpen(args[0]);
            return;
        }
        if (cmd === 'echo') {
            this.printLine(`  ${args.join(' ')}`);
            return;
        }
        if (cmd === 'whoami') {
            this.printLine('  Sabarna Saha — AI/ML Engineer & Power Engineer');
            return;
        }
        if (cmd === 'date') {
            this.printLine(`  ${new Date().toLocaleString()}`);
            return;
        }
        if (cmd === 'neofetch' || cmd === 'fetch') {
            this.printNeofetch();
            return;
        }
        if (cmd === 'sudo') {
            this.printLines(['', '  🚫 Nice try! You don\'t have sudo access here.', '  But I appreciate the effort 😄', '']);
            return;
        }
        if (cmd === 'rm') {
            this.printLines(['', '  ⚠️  Whoa! Let\'s not delete anything here.', '  This portfolio took effort to build! 😅', '']);
            return;
        }
        if (cmd === 'ls') {
            this.printLines(['', '  about.txt  skills.dat  experience.log  education.md', '  certs.json  awards.txt  projects/  contact.cfg', '']);
            return;
        }
        if (cmd === 'cat') {
            if (args.length) {
                const file = args[0].replace(/\.\w+$/, '');
                if (TERMINAL_COMMANDS[file]) {
                    const lines = TERMINAL_COMMANDS[file].fn(this);
                    this.printLines(lines);
                    return;
                }
            }
            this.printLine('  cat: file not found. Try "ls" to see available files.');
            return;
        }
        if (cmd === 'pwd') {
            this.printLine('  /home/sabarna/portfolio');
            return;
        }
        if (cmd === 'fortune' || cmd === 'quote') {
            const quotes = [
                '"The only way to do great work is to love what you do." — Steve Jobs',
                '"Talk is cheap. Show me the code." — Linus Torvalds',
                '"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke',
                '"First, solve the problem. Then, write the code." — John Johnson',
                '"The best error message is the one that never shows up." — Thomas Fuchs',
                '"Code is like humor. When you have to explain it, it\'s bad." — Cory House'
            ];
            this.printLine(`  ${quotes[Math.floor(Math.random() * quotes.length)]}`);
            return;
        }

        // Standard commands
        if (TERMINAL_COMMANDS[cmd]) {
            const lines = TERMINAL_COMMANDS[cmd].fn(this);
            this.printLines(lines);
        } else {
            this.printLines([
                `  command not found: ${cmd}`,
                `  Type "help" for available commands.`
            ]);
        }
    }

    handleGoto(section) {
        const map = {
            'hero': '#hero', 'home': '#hero', 'top': '#hero',
            'process': '#process', 'portfolio': '#portfolio', 'projects': '#portfolio',
            'timeline': '#timeline', 'experience': '#timeline',
            'tech': '#tech', 'stack': '#tech',
            'contact': '#contact',
            'education': '#education', 'edu': '#education',
            'certs': '#certifications', 'certifications': '#certifications',
            'skills': '#linkedin-skills-section',
            'awards': '#awards', 'honors': '#awards',
            'contributions': '#contributions', 'heatmap': '#contributions',
            'activity': '#activity'
        };
        const target = map[section];
        if (target) {
            this.printLine(`  📍 Navigating to ${section}...`);
            this.close();
            setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }), 300);
        } else {
            this.printLines([`  Unknown section: "${section}"`, '  Available: hero, portfolio, timeline, tech, education, certs, skills, awards, contact']);
        }
    }

    handleOpen(num) {
        const links = {
            '1': 'https://www.linkedin.com/in/sabarnasaha/',
            '2': 'https://github.com/Sabarna07-tech',
            '3': 'https://leetcode.com/u/TryExcept/',
            'linkedin': 'https://www.linkedin.com/in/sabarnasaha/',
            'github': 'https://github.com/Sabarna07-tech',
            'leetcode': 'https://leetcode.com/u/TryExcept/'
        };
        if (links[num]) {
            this.printLine(`  🔗 Opening ${links[num]}...`);
            window.open(links[num], '_blank');
        } else {
            this.printLine('  Usage: open 1 (LinkedIn) | open 2 (GitHub) | open 3 (LeetCode)');
        }
    }

    printNeofetch() {
        const p = typeof PROFILE_DATA !== 'undefined' ? PROFILE_DATA : null;
        const lines = [
            '',
            '       ██████╗ ██╗   ██╗██████╗   ' + `  ${p?.name || 'Sabarna Saha'}@curator`,
            '      ██╔════╝ ██║   ██║██╔══██╗  ' + `  ─────────────────────────`,
            '      ██║      ██║   ██║██████╔╝  ' + `  OS: Portfolio v2.0`,
            '      ██║      ██║   ██║██╔══██╗  ' + `  Host: ${p?.location || 'Kolkata, India'}`,
            '      ╚██████╗ ╚██████╔╝██║  ██║  ' + `  Shell: curator-terminal`,
            '       ╚═════╝  ╚═════╝ ╚═╝  ╚═╝  ' + `  Theme: ${this.theme}`,
            '                                   ' + `  Uptime: since 2022`,
            '  ███ ███ ███ ███ ███ ███ ███ ███  ' + `  Packages: ${p?.certifications?.length || 0} certs`,
            ''
        ];
        this.printLines(lines);
    }

    autocomplete() {
        const val = this.inputEl.value.toLowerCase();
        if (!val) return;
        const matches = Object.keys(TERMINAL_COMMANDS).filter(c => c.startsWith(val));
        const extras = ['goto', 'open', 'echo', 'whoami', 'date', 'neofetch', 'sudo', 'rm', 'ls', 'cat', 'pwd', 'fortune', 'quote', 'fetch'];
        const allMatches = [...new Set([...matches, ...extras.filter(c => c.startsWith(val))])];
        if (allMatches.length === 1) {
            this.inputEl.value = allMatches[0];
        } else if (allMatches.length > 1) {
            this.printLine(`  ${allMatches.join('  ')}`);
        }
    }

    printLine(html, extraClass = '') {
        const div = document.createElement('div');
        div.className = `terminal-line ${extraClass}`;
        div.innerHTML = html;
        this.outputEl.appendChild(div);
        this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }

    printLines(lines) {
        lines.forEach(line => this.printLine(this.escapeHtml(line)));
    }

    clearOutput() {
        this.outputEl.innerHTML = '';
    }

    toggleTheme() {
        const themes = ['hacker', 'retro', 'cyber'];
        const idx = themes.indexOf(this.theme);
        this.theme = themes[(idx + 1) % themes.length];
        this.windowEl.className = this.windowEl.className.replace(/terminal-\w+/, `terminal-${this.theme}`);
    }

    // Matrix rain effect
    startMatrix() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        canvas.classList.remove('hidden');
        const ctx = canvas.getContext('2d');
        canvas.width = this.windowEl.offsetWidth;
        canvas.height = this.windowEl.offsetHeight - 32;

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        this.matrixInterval = setInterval(draw, 50);

        const stopHandler = (e) => {
            if (this.matrixInterval) {
                this.stopMatrix();
                document.removeEventListener('keydown', stopHandler);
            }
        };
        document.addEventListener('keydown', stopHandler);
    }

    stopMatrix() {
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
            this.matrixInterval = null;
        }
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) canvas.classList.add('hidden');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.curatorTerminal = new PortfolioTerminal();
});
