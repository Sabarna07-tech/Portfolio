/**
 * github.js - Dynamic Data Engine for Curator Portfolio
 * Connects directly to GitHub REST API to populate the portfolio automatically.
 */

// ==========================================
// CONFIGURATION
// ==========================================
// Replace this with your actual GitHub username
const GITHUB_USERNAME = 'Sabarna07-tech';

// ==========================================
// DATA FETCHING & PROCESSING
// ==========================================
async function initDynamicPortfolio() {
    renderLoadingSkeletons();

    try {
        const data = await getGithubData(GITHUB_USERNAME);
        if (data) {
            renderStats(data);
            renderTechStack(data.techStack);
            renderProjects(data.projects);
        } else {
            console.error("Failed to load GitHub data.");
        }
    } catch (e) {
        console.error("Error initializing portfolio:", e);
    }
}

async function getGithubData(username) {
    const cacheKey = `curator_gh_${username}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
        const parsed = JSON.parse(cached);
        // Cache valid for 1 hour to prevent hitting the 60req/hour unauth limit
        if (Date.now() - parsed.timestamp < 3600000) {
            return parsed.data;
        }
    }

    try {
        // Fetch repositories (up to 100 recent)
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!res.ok) throw new Error("GitHub API rate limited or user not found");

        const repos = await res.json();

        // Aggregate statistics
        let totalStars = 0;
        const languages = {};
        const topics = {};

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;

            // Count primary languages
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }

            // Count topics
            if (repo.topics && repo.topics.length > 0) {
                repo.topics.forEach(t => {
                    topics[t] = (topics[t] || 0) + 1;
                });
            }
        });

        // Prepare Tech Stack (Top 5 combinations of languages and specific dev topics)
        const mergedStack = { ...languages };
        // Bring in some popular topics that might represent tech
        const techTopics = ['react', 'nextjs', 'nodejs', 'docker', 'aws', 'vue', 'tailwind', 'graphql'];
        techTopics.forEach(t => {
            if (topics[t]) mergedStack[t.charAt(0).toUpperCase() + t.slice(1)] = topics[t];
        });

        const sortedTech = Object.keys(mergedStack)
            .sort((a, b) => mergedStack[b] - mergedStack[a])
            .slice(0, 5)
            .map(name => ({ name, count: mergedStack[name] }));

        // Prepare Projects 
        // 1. First look for repos with topic 'portfolio'
        let featured = repos.filter(r => r.topics && r.topics.includes('portfolio') && !r.fork);

        // 2. Fallback to top starred repos that have a description
        if (featured.length === 0) {
            featured = repos
                .filter(r => !r.fork && r.description)
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 4);
        }

        // 3. Last fallback: just most recently updated
        if (featured.length === 0) {
            featured = repos.filter(r => !r.fork).slice(0, 4);
        }

        const processedData = {
            totalRepos: repos.length,
            totalStars,
            techStack: sortedTech,
            projects: featured
        };

        // Store in cache
        sessionStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: processedData
        }));

        return processedData;

    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
}

// ==========================================
// RENDERING FUNCTIONS
// ==========================================
function renderStats(data) {
    const reposEl = document.getElementById('gh-repos-count');
    const starsEl = document.getElementById('gh-stars-count');
    const linkEl = document.getElementById('gh-profile-link');

    if (reposEl) reposEl.innerText = data.totalRepos + '+';
    if (starsEl) starsEl.innerText = data.totalStars;
    if (linkEl) linkEl.href = `https://github.com/${GITHUB_USERNAME}`;
}

function getIconForTech(tech) {
    const t = tech.toLowerCase();
    const map = {
        'javascript': 'javascript',
        'typescript': 'javascript',
        'python': 'terminal',
        'java': 'terminal',
        'c++': 'terminal',
        'c#': 'terminal',
        'php': 'terminal',
        'ruby': 'terminal',
        'go': 'cloud',
        'rust': 'memory',
        'html': 'language',
        'css': 'palette',
        'react': 'widgets',
        'nodejs': 'dns',
        'docker': 'cloud',
        'aws': 'cloud'
    };
    return map[t] || 'code';
}

function renderTechStack(techStack) {
    const grid = document.getElementById('tech-stack-grid');
    if (!grid || techStack.length === 0) return;

    let html = '';

    techStack.forEach((tech, index) => {
        const icon = getIconForTech(tech.name);

        if (index === 0) {
            html += `
                <div class="col-span-2 row-span-2 glass-panel p-10 rounded-xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span class="material-symbols-outlined text-9xl" data-icon="${icon}">${icon}</span>
                    </div>
                    <h3 class="font-headline text-2xl font-black mb-6">${tech.name} Mastery</h3>
                    <p class="text-on-surface-variant leading-relaxed">Primary focus area across most open source contributions.</p>
                    <div class="mt-8">
                       <span class="px-4 py-2 bg-surface-container-highest text-primary rounded-full text-xs font-bold uppercase tracking-widest">${tech.count} Repositories</span>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="glass-panel p-8 rounded-xl hover:bg-surface-container-high transition-colors group">
                    <span class="material-symbols-outlined text-secondary mb-4 group-hover:scale-110 transition-transform" data-icon="${icon}">${icon}</span>
                    <h4 class="font-headline font-bold text-on-surface mb-2">${tech.name}</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">Frequently utilized in ${tech.count} recent projects.</p>
                </div>
            `;
        }
    });

    grid.innerHTML = html;
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container || projects.length === 0) return;

    let html = '';

    projects.forEach((repo, index) => {
        // Alternate layout for visual asymmetry
        const isAlternate = index % 2 !== 0;

        const imagePanel = `
            <div class="relative rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] aspect-[16/9] bg-surface-container-highest transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-on-surface border border-outline-variant/20">
                    <span class="material-symbols-outlined text-7xl text-primary/40 mb-6 drop-shadow-[0_0_15px_rgba(208,188,255,0.4)]">api</span>
                    <h4 class="font-headline font-bold text-2xl tracking-tight opacity-80 uppercase">${repo.name.replace(/-/g, ' ')}</h4>
                </div>
                <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        `;

        const infoPanel = `
            <div class="z-10 glass-panel p-10 rounded-xl ${isAlternate ? 'md:-mr-12' : 'md:-ml-12'} shadow-2xl backdrop-blur-xl bg-[#171f33]/80">
                <span class="text-xs font-bold text-${isAlternate ? 'secondary' : 'primary'} tracking-widest uppercase mb-4 block">${repo.language || 'Application'}</span>
                <h3 class="font-headline text-3xl font-black text-on-surface mb-6 uppercase tracking-tighter">${repo.name.replace(/-/g, ' ')}</h3>
                <p class="text-on-surface-variant mb-8 leading-relaxed">
                    ${repo.description || 'An open-source installation driven by continuous technical iteration.'}
                </p>
                <div class="flex flex-wrap gap-4">
                    <a class="text-on-surface hover:text-${isAlternate ? 'secondary' : 'primary'} transition-colors flex items-center gap-2 text-sm font-bold bg-surface-container-highest px-4 py-2 rounded-md hover:bg-surface-container-high" href="${repo.html_url}" target="_blank">
                        <span class="material-symbols-outlined text-sm">code</span> REPOSITORY
                    </a>
                    ${repo.homepage ? `
                    <a class="text-on-surface hover:text-${isAlternate ? 'secondary' : 'primary'} transition-colors flex items-center gap-2 text-sm font-bold border border-outline-variant/30 px-4 py-2 rounded-md hover:bg-surface-container-highest" href="${repo.homepage}" target="_blank">
                        <span class="material-symbols-outlined text-sm">launch</span> LIVE DEMO
                    </a>` : ''}
                </div>
            </div>
        `;

        html += `
            <div class="grid md:grid-cols-12 gap-8 items-center group perspective-1000 mb-20 md:mb-40 last:mb-0">
                <div class="md:col-span-7 ${isAlternate ? 'order-1 md:order-2' : ''}">
                    ${imagePanel}
                </div>
                <div class="md:col-span-5 ${isAlternate ? 'order-2 md:order-1' : ''}">
                    ${infoPanel}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderLoadingSkeletons() {
    const tsGrid = document.getElementById('tech-stack-grid');
    const pContainer = document.getElementById('projects-container');

    if (tsGrid) {
        tsGrid.innerHTML = `
            <div class="col-span-2 row-span-2 glass-panel p-10 rounded-xl relative overflow-hidden">
                <div class="w-2/3 h-8 bg-surface-container-high rounded animate-pulse mb-6"></div>
                <div class="w-full h-4 bg-surface-container-high rounded animate-pulse mb-3"></div>
                <div class="w-4/5 h-4 bg-surface-container-high rounded animate-pulse"></div>
            </div>
            <div class="glass-panel p-8 rounded-xl"><div class="w-full h-12 bg-surface-container-high rounded animate-pulse"></div></div>
            <div class="glass-panel p-8 rounded-xl"><div class="w-full h-12 bg-surface-container-high rounded animate-pulse"></div></div>
            <div class="glass-panel p-8 rounded-xl"><div class="w-full h-12 bg-surface-container-high rounded animate-pulse"></div></div>
            <div class="glass-panel p-8 rounded-xl"><div class="w-full h-12 bg-surface-container-high rounded animate-pulse"></div></div>
        `;
    }

    if (pContainer) {
        pContainer.innerHTML = `
            <div class="grid md:grid-cols-12 gap-12 items-center opacity-50">
                <div class="md:col-span-7">
                    <div class="aspect-[16/9] rounded-xl bg-surface-container-highest animate-pulse"></div>
                </div>
                <div class="md:col-span-5 z-10 glass-panel p-10 rounded-xl h-64 animate-pulse"></div>
            </div>
        `;
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', initDynamicPortfolio);
