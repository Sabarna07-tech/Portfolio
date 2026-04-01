/**
 * linkedin.js - Profile Data Renderer for Curator Portfolio
 * Injects REAL LinkedIn-sourced data into the page.
 * Data is embedded inline to work with file:// protocol (no CORS).
 */

const PROFILE_DATA = {
    name: "Sabarna Saha",
    headline: "AI/ML Engineer · Power Engineering @ Jadavpur University",
    tagline: "Architect of Digital Experiences",
    bio: "AI/ML Engineer with hands-on experience in Retrieval-Augmented Generation, deep learning, and NLP. Currently pursuing Power Engineering at Jadavpur University while building intelligent systems that bridge research and real-world impact.",
    location: "Kolkata, West Bengal, India",
    email: "",
    linkedin: "https://www.linkedin.com/in/sabarnasaha/",
    github: "https://github.com/Sabarna07-tech",
    leetcode: "https://leetcode.com/u/TryExcept/",

    experience: [
        {
            title: "AI/ML Engineer",
            company: "AiSPRY",
            type: "Internship",
            location: "Hyderabad, Telangana, India · On-site",
            start: "Oct 2024",
            end: "Jul 2025",
            duration: "10 mos",
            description: "Built production-grade AI systems leveraging Retrieval-Augmented Generation (RAG), TensorFlow, ChromaDB, and Redis. Worked on deep learning models using RNNs, LSTMs, and GRUs for real-world NLP and time-series applications.",
            skills: ["RAG", "TensorFlow", "ChromaDB", "Redis", "GRU", "LSTM"]
        },
        {
            title: "Member",
            company: "GDSC Jadavpur University",
            type: "Part-time",
            location: "Kolkata, India",
            start: "Oct 2023",
            end: "Present",
            duration: "2 yrs 7 mos",
            description: "Active member of Google Developer Student Clubs at Jadavpur University, contributing to open-source projects and collaborative tech initiatives.",
            skills: ["Open Source", "Community"]
        },
        {
            title: "Member",
            company: "Institution of Engineering and Technology (IET)",
            type: "Part-time",
            location: "Kolkata, West Bengal, India",
            start: "May 2023",
            end: "Present",
            duration: "3 yrs",
            description: "Member of the multidisciplinary professional engineering institution with authority to establish professional registration for Chartered Engineer, Incorporated Engineer, and Engineering Technician.",
            skills: ["Engineering", "Professional Development"]
        },
        {
            title: "Organizing Committee Member",
            company: "SRIJAN, Jadavpur University",
            type: "Part-time",
            location: "Kolkata, India",
            start: "Feb 2023",
            end: "Present",
            duration: "3 yrs 3 mos",
            description: "Part of the organizing committee for SRIJAN — Jadavpur University's flagship technical festival. Drove event planning, coordination, and teamwork across departments.",
            skills: ["Teamwork", "Event Management"]
        }
    ],

    education: [
        {
            school: "Jadavpur University",
            degree: "Bachelor of Engineering - BE",
            field: "Power Engineering",
            start: "Nov 2022",
            end: "Jun 2026",
            grade: "7.5",
            skills: ["Microprocessors", "8051 Microcontroller", "x86 Assembly", "MATLAB", "Ansys Fluent", "C", "Python"]
        },
        {
            school: "Sri Aurobindo Vidyamandir",
            degree: "Secondary Education",
            field: "",
            start: "",
            end: "",
            grade: "",
            skills: []
        }
    ],

    certifications: [
        {
            name: "Oracle Cloud Infrastructure 2024 Generative AI Professional",
            issuer: "Oracle",
            date: "Jul 2024",
            expires: "Jul 2026",
            credentialId: "100756890OCI2024GAIOCP",
            skills: ["Generative AI", "LLM"]
        },
        {
            name: "Keras & TensorFlow for Deep Learning",
            issuer: "Scaler",
            date: "Sep 2024",
            credentialId: "",
            skills: ["Keras", "LSTM", "RNN"]
        },
        {
            name: "Problem Solving (Intermediate)",
            issuer: "HackerRank",
            date: "Sep 2024",
            credentialId: "93DCB5FD47AB",
            skills: ["Problem Solving"]
        },
        {
            name: "Python (Basic)",
            issuer: "HackerRank",
            date: "Sep 2024",
            credentialId: "F5E0A902D202",
            skills: ["Python"]
        },
        {
            name: "Supervised Machine Learning: Regression and Classification",
            issuer: "Coursera",
            date: "May 2024",
            credentialId: "",
            skills: ["Gradient Descent", "Linear Regression", "Logistic Regression"]
        },
        {
            name: "Foundations of Cybersecurity",
            issuer: "Google",
            date: "Feb 2024",
            credentialId: "R3PZHU2ZW8QH",
            skills: ["Cybersecurity"]
        },
        {
            name: "Foundations of Prompt Engineering",
            issuer: "Amazon Web Services (AWS)",
            date: "Nov 2023",
            credentialId: "",
            skills: ["Prompt Engineering"]
        },
        {
            name: "Excel for Data & Analytics",
            issuer: "Chegg India",
            date: "Nov 2023",
            credentialId: "",
            skills: ["Excel", "Data Analytics"]
        },
        {
            name: "The Data Science Course: Complete Data Science Bootcamp",
            issuer: "Udemy",
            date: "Sep 2023",
            credentialId: "",
            skills: ["Machine Learning", "Data Science"]
        }
    ],

    skills: {
        ai_ml: ["TensorFlow", "Keras", "RAG", "NLP", "RNN", "LSTM", "GRU", "Generative AI", "LLM", "Machine Learning", "Time Series Forecasting"],
        languages: ["Python", "C", "C++", "Go", "HTML5", "x86 Assembly"],
        data: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Statsmodels"],
        tools: ["ChromaDB", "Redis", "Apache Airflow", "Django REST Framework", "MATLAB", "Ansys Fluent", "Adobe Premiere Pro"],
        engineering: ["Microprocessors", "8051 Microcontroller", "Power Engineering"]
    },

    awards: [
        {
            title: "COMSYS Hackathon-1 — 4th Place",
            issuer: "COMSYS Educational Trust & SCEE IIT Mandi",
            date: "Oct 2023",
            association: "Jadavpur University",
            description: "Team placed 4th in COMSYS Hackathon-1 held at IIT Mandi, organized by SCEE IIT Mandi and COMSYS Educational Trust, Kolkata, as part of the 4th International Conference on Frontiers in Computing and Systems (COMSYS-2023)."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const profile = PROFILE_DATA;
    renderHero(profile);
    renderExperience(profile.experience);
    renderEducation(profile.education);
    renderCertifications(profile.certifications);
    renderSkillsSection(profile.skills);
    renderAwards(profile.awards);
    renderContactInfo(profile);
});

// ==========================================
// HERO SECTION
// ==========================================
function renderHero(profile) {
    // Update the subtitle
    const subtitle = document.querySelector('#hero p[style]');
    if (subtitle) subtitle.textContent = profile.tagline;

    // Update the bio paragraph
    const bioPara = document.querySelector('#hero .max-w-2xl');
    if (bioPara) bioPara.textContent = profile.bio;
}

// ==========================================
// EXPERIENCE TIMELINE
// ==========================================
function renderExperience(experience) {
    const container = document.getElementById('experience-timeline');
    if (!container || !experience.length) return;

    const colors = ['primary', 'secondary', 'tertiary', 'primary'];
    const glows = [
        'rgba(208,188,255,0.6)', 'rgba(76,215,246,0.6)',
        'rgba(255,184,105,0.6)', 'rgba(208,188,255,0.6)'
    ];

    let html = '';
    experience.forEach((exp, i) => {
        const color = colors[i % colors.length];
        const glow = glows[i % glows.length];
        const isAlt = i % 2 !== 0;
        const isCurrent = exp.end === 'Present';

        const infoSide = `
            <div class="${isAlt ? 'hidden md:block w-[45%] pl-12' : 'hidden md:block w-[45%] text-right pr-12'}">
                <p class="text-sm font-bold text-${color}">${exp.start} — ${exp.end}</p>
                <h4 class="font-headline font-black text-xl mb-2">${exp.title}</h4>
                <p class="text-on-surface-variant text-sm">${exp.company}</p>
            </div>
        `;

        const detailSide = `
            <div class="w-full md:w-[45%] ${isAlt ? 'pr-8 md:pr-12' : 'pl-8 md:pl-12'}">
                <p class="md:hidden text-xs font-bold text-${color} mb-2">${exp.start} — ${exp.end}</p>
                <div class="glass-panel p-6 rounded-lg transform hover:-translate-y-1 transition-transform ${isAlt ? 'text-left md:text-right' : ''}">
                    <p class="md:hidden font-headline font-black text-lg mb-1">${exp.title}</p>
                    <p class="md:hidden text-on-surface-variant text-xs mb-3">${exp.company}</p>
                    <p class="text-on-surface-variant text-sm leading-relaxed mb-3">${exp.description}</p>
                    <div class="flex flex-wrap gap-2 ${isAlt ? 'md:justify-end' : ''}">
                        <span class="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-outline-variant/20 text-${color}">${exp.type}</span>
                        ${isCurrent ? `<span class="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-${color}/10 text-${color} font-bold">Active</span>` : ''}
                    </div>
                    ${exp.skills.length ? `
                    <div class="flex flex-wrap gap-1.5 mt-3 ${isAlt ? 'md:justify-end' : ''}">
                        ${exp.skills.map(s => `<span class="text-[9px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">${s}</span>`).join('')}
                    </div>` : ''}
                </div>
            </div>
        `;

        html += `
            <div class="relative flex flex-col md:flex-row md:justify-between items-start md:items-center">
                ${isAlt ? detailSide : infoSide}
                <div class="absolute left-0 md:left-1/2 w-4 h-4 bg-${color} border-4 border-surface rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_${glow}]"></div>
                ${isAlt ? infoSide : detailSide}
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// EDUCATION
// ==========================================
function renderEducation(education) {
    const container = document.getElementById('education-container');
    if (!container || !education.length) return;

    let html = '';
    education.forEach((edu, i) => {
        const isMain = i === 0;
        html += `
            <div class="${isMain ? 'md:col-span-2' : ''} glass-panel p-8 rounded-xl hover:bg-surface-container-high/50 transition-colors group relative overflow-hidden">
                ${isMain ? `<div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span class="material-symbols-outlined text-[120px]">school</span>
                </div>` : ''}
                <div class="relative z-10">
                    <h4 class="font-headline font-black text-xl mb-2 group-hover:text-primary transition-colors">${edu.school}</h4>
                    <p class="text-secondary text-sm font-bold mb-1">${edu.degree}${edu.field ? `, ${edu.field}` : ''}</p>
                    ${edu.start ? `<p class="text-on-surface-variant/60 text-xs mb-3">${edu.start} — ${edu.end}</p>` : ''}
                    ${edu.grade ? `
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-highest mb-4">
                        <span class="material-symbols-outlined text-sm text-tertiary">grade</span>
                        <span class="text-xs font-bold text-on-surface">CGPA: ${edu.grade}</span>
                    </div>` : ''}
                    ${edu.skills.length ? `
                    <div class="flex flex-wrap gap-1.5 mt-2">
                        ${edu.skills.map(s => `<span class="text-[9px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">${s}</span>`).join('')}
                    </div>` : ''}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// CERTIFICATIONS
// ==========================================
function renderCertifications(certs) {
    const container = document.getElementById('certs-container');
    if (!container || !certs.length) return;

    const issuerColors = {
        'Oracle': '#ff0000', 'Google': '#4285f4', 'Coursera': '#0056d2',
        'HackerRank': '#00ea64', 'Scaler': '#5c4aff', 'AWS': '#ff9900',
        'Amazon Web Services (AWS)': '#ff9900', 'Udemy': '#a435f0',
        'Chegg India': '#f57b24'
    };

    let html = '';
    certs.forEach(cert => {
        const color = issuerColors[cert.issuer] || '#d0bcff';
        html += `
            <div class="glass-panel p-5 rounded-xl hover:bg-surface-container-high/50 transition-all hover:-translate-y-1 group">
                <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${color}20;border:1px solid ${color}30">
                        <span class="material-symbols-outlined text-lg" style="color:${color}">verified</span>
                    </div>
                    <div class="min-w-0 flex-1">
                        <h4 class="font-headline font-bold text-sm text-on-surface mb-1 leading-tight">${cert.name}</h4>
                        <p class="text-xs text-on-surface-variant mb-2">${cert.issuer} · ${cert.date}</p>
                        ${cert.skills.length ? `
                        <div class="flex flex-wrap gap-1">
                            ${cert.skills.map(s => `<span class="text-[9px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">${s}</span>`).join('')}
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// SKILLS (Merged with existing tech stack)
// ==========================================
function renderSkillsSection(skills) {
    const container = document.getElementById('linkedin-skills');
    if (!container) return;

    const categories = [
        { name: 'AI & Machine Learning', items: skills.ai_ml, icon: 'psychology', color: '#d0bcff' },
        { name: 'Programming Languages', items: skills.languages, icon: 'code', color: '#4cd7f6' },
        { name: 'Data Science', items: skills.data, icon: 'analytics', color: '#ffb869' },
        { name: 'Tools & Frameworks', items: skills.tools, icon: 'build', color: '#7afcff' },
        { name: 'Engineering', items: skills.engineering, icon: 'precision_manufacturing', color: '#ff7eb3' }
    ];

    let html = '';
    categories.forEach(cat => {
        html += `
            <div class="glass-panel p-6 rounded-xl">
                <div class="flex items-center gap-3 mb-4">
                    <span class="material-symbols-outlined text-lg" style="color:${cat.color}">${cat.icon}</span>
                    <h4 class="font-headline font-bold text-sm uppercase tracking-wider">${cat.name}</h4>
                </div>
                <div class="flex flex-wrap gap-2">
                    ${cat.items.map(skill => `
                        <span class="text-xs px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface hover:border-primary/50 hover:text-primary transition-colors cursor-default">${skill}</span>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// HONORS & AWARDS
// ==========================================
function renderAwards(awards) {
    const container = document.getElementById('awards-container');
    if (!container || !awards.length) return;

    let html = '';
    awards.forEach(award => {
        html += `
            <div class="glass-panel p-8 rounded-xl relative overflow-hidden group">
                <div class="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span class="material-symbols-outlined text-7xl text-tertiary">emoji_events</span>
                </div>
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest mb-4">
                        <span class="material-symbols-outlined text-sm">emoji_events</span> ${award.date}
                    </div>
                    <h4 class="font-headline font-black text-xl mb-3">${award.title}</h4>
                    <p class="text-on-surface-variant text-sm leading-relaxed mb-4">${award.description}</p>
                    <div class="flex flex-wrap gap-3">
                        <span class="text-xs text-secondary font-bold">${award.issuer}</span>
                        ${award.association ? `<span class="text-xs text-on-surface-variant">· ${award.association}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// CONTACT INFO
// ==========================================
function renderContactInfo(profile) {
    const emailDisplay = document.getElementById('email-display');
    const emailBtn = document.getElementById('email-copy-btn');
    const ghLink = document.getElementById('gh-profile-link');

    if (profile.email) {
        if (emailDisplay) emailDisplay.textContent = profile.email;
        if (emailBtn) emailBtn.setAttribute('onclick', `navigator.clipboard.writeText('${profile.email}')`);
    }

    if (ghLink && profile.github) {
        ghLink.href = profile.github;
    }

    // Update social links in contact section
    const socialContainer = document.querySelector('#contact .flex.justify-center');
    if (socialContainer) {
        socialContainer.innerHTML = `
            <a class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                href="${profile.linkedin}" target="_blank">
                <span class="material-symbols-outlined text-sm">link</span> LinkedIn
            </a>
            <a class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                href="${profile.github}" target="_blank">
                <span class="material-symbols-outlined text-sm">code</span> GitHub
            </a>
            <a class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                href="${profile.leetcode}" target="_blank">
                <span class="material-symbols-outlined text-sm">terminal</span> LeetCode
            </a>
        `;
    }

    // Update footer links
    const footerLinks = document.querySelector('footer .flex.space-x-8');
    if (footerLinks) {
        footerLinks.innerHTML = `
            <a class="font-['Inter'] text-xs tracking-widest uppercase text-gray-500 hover:text-[#d0bcff] opacity-80 hover:opacity-100 transition-all"
                href="${profile.github}" target="_blank">GitHub</a>
            <a class="font-['Inter'] text-xs tracking-widest uppercase text-gray-500 hover:text-[#d0bcff] opacity-80 hover:opacity-100 transition-all"
                href="${profile.linkedin}" target="_blank">LinkedIn</a>
            <a class="font-['Inter'] text-xs tracking-widest uppercase text-gray-500 hover:text-[#d0bcff] opacity-80 hover:opacity-100 transition-all"
                href="${profile.leetcode}" target="_blank">LeetCode</a>
        `;
    }
}
