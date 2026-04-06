const GITHUB_USERNAME = 'Sabarna07-tech';

export interface TechStackItem {
  name: string;
  count: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
  language: string;
  topics: string[];
  homepage: string;
  updated_at: string;
}

export interface GithubData {
  totalRepos: number;
  totalStars: number;
  techStack: TechStackItem[];
  projects: GithubRepo[];
}

export async function getGithubData(): Promise<GithubData | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: process.env.GITHUB_TOKEN ? {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      } : {}
    });

    if (!res.ok) {
      console.error('GitHub API rate limited or user not found');
      return null;
    }

    const repos: GithubRepo[] = await res.json();

    let totalStars = 0;
    const languages: Record<string, number> = {};
    const topics: Record<string, number> = {};

    repos.forEach(repo => {
      totalStars += repo.stargazers_count;

      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }

      if (repo.topics && repo.topics.length > 0) {
        repo.topics.forEach(t => {
          topics[t] = (topics[t] || 0) + 1;
        });
      }
    });

    const mergedStack = { ...languages };
    const techTopics = ['react', 'nextjs', 'nodejs', 'docker', 'aws', 'vue', 'tailwind', 'graphql'];
    
    techTopics.forEach(t => {
      if (topics[t]) {
        mergedStack[t.charAt(0).toUpperCase() + t.slice(1)] = topics[t];
      }
    });

    const sortedTech = Object.keys(mergedStack)
      .sort((a, b) => mergedStack[b] - mergedStack[a])
      .slice(0, 5)
      .map(name => ({ name, count: mergedStack[name] }));

    let featured = repos.filter(r => r.topics?.includes('portfolio') && !r.fork);

    if (featured.length === 0) {
      featured = repos
        .filter(r => !r.fork && r.description)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4);
    }

    if (featured.length === 0) {
      featured = repos.filter(r => !r.fork).slice(0, 4);
    }

    // Sort to keep newest first based on updated_at
    featured.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return {
      totalRepos: repos.length,
      totalStars,
      techStack: sortedTech,
      projects: featured.slice(0, 4) // Ensure we only return top 4
    };
  } catch (error) {
    console.error('API Fetch Error:', error);
    return null;
  }
}
