const LEETCODE_USERNAME = 'TryExcept';

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number | string;
}

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    const [profileRes, solvedRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`, { next: { revalidate: 3600 } }),
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`, { next: { revalidate: 3600 } })
    ]);

    if (!profileRes.ok || !solvedRes.ok) {
      throw new Error('Failed to fetch LeetCode data');
    }

    const profile = await profileRes.json();
    const solved = await solvedRes.json();

    return {
      totalSolved: solved.solvedProblem || 0,
      easySolved: solved.easySolved || 0,
      totalEasy: 824, // Approximation if the API doesn't return totals
      mediumSolved: solved.mediumSolved || 0,
      totalMedium: 1709,
      hardSolved: solved.hardSolved || 0,
      totalHard: 728,
      ranking: profile.ranking || '—'
    };
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return null;
  }
}
