import type { DiscoveredStory } from "../../research/src/rss";

const HIGH_SIGNAL_WORDS = [
  "launch", "announces", "new", "update", "policy", "election", "government",
  "war", "agreement", "economy", "market", "research", "study", "ai", "artificial intelligence",
];

export function scoreStory(story: DiscoveredStory) {
  const text = `${story.title} ${story.summary ?? ""}`.toLowerCase();
  const signalHits = HIGH_SIGNAL_WORDS.reduce((n, word) => n + (text.includes(word) ? 1 : 0), 0);
  const freshness = story.publishedAt ? 20 : 8;
  const signal = Math.min(45, signalHits * 7);
  const categoryWeight = story.category === "AI" || story.category === "INDIA" || story.category === "WORLD" ? 25 : 18;
  const sourceBonus = story.sourceDomain !== "unknown" ? 10 : 0;

  return Math.min(100, freshness + signal + categoryWeight + sourceBonus);
}

export function rankStories(stories: DiscoveredStory[]) {
  return stories
    .map((story) => ({ story, score: scoreStory(story) }))
    .sort((a, b) => b.score - a.score);
}
