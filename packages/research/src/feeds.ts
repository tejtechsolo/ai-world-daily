import type { FeedConfig } from "./rss";

// Start with public RSS feeds so discovery can run without a paid news API.
// Replace/add feeds only after checking their current publisher terms.
export const defaultFeeds: FeedConfig[] = [
  { name: "Google News AI", url: "https://news.google.com/rss/search?q=AI%20artificial%20intelligence&hl=en-IN&gl=IN&ceid=IN:en", category: "AI" },
  { name: "Google News India", url: "https://news.google.com/rss/search?q=India%20current%20affairs&hl=en-IN&gl=IN&ceid=IN:en", category: "INDIA" },
  { name: "Google News World", url: "https://news.google.com/rss/search?q=world%20international%20affairs&hl=en-IN&gl=IN&ceid=IN:en", category: "WORLD" },
  { name: "Google News Business", url: "https://news.google.com/rss/search?q=business%20economy&hl=en-IN&gl=IN&ceid=IN:en", category: "BUSINESS" },
  { name: "Google News Technology", url: "https://news.google.com/rss/search?q=technology%20software&hl=en-IN&gl=IN&ceid=IN:en", category: "TECHNOLOGY" },
  { name: "Google News Science", url: "https://news.google.com/rss/search?q=science%20space&hl=en-IN&gl=IN&ceid=IN:en", category: "SCIENCE" },
];
