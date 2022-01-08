import { getRandomBetween } from "@drstrain/drutil";

function diffLength(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  const minLength = Math.min(a.length, b.length);
  return maxLength / minLength;
}

// Caution: Alot of magic here
export function contentSimilarityScore(a: string, b: string): number {
  if ((a.length > 50 || b.length > 50) && diffLength(a, b) >= 1.5) return 0; // Length too different, must be different
  let score = 0;
  for (let i = 0; i < 100; ++i) {
    const start = getRandomBetween(0, Math.max(a.length - 30, 0));
    const end = getRandomBetween(7, 30);
    const subs = a.slice(start, start + end);
    score += +b.includes(subs);
  }
  return score;
}
