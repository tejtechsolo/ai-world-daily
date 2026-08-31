export type DiscoveredStory = {
  title: string;
  url: string;
  sourceName: string;
  sourceDomain: string;
  publishedAt?: string;
  summary?: string;
  category: "AI" | "TECHNOLOGY" | "INDIA" | "WORLD" | "BUSINESS" | "SCIENCE";
};

export type FeedConfig = {
  name: string;
  url: string;
  category: DiscoveredStory["category"];
};

const DEFAULT_TIMEOUT_MS = 10_000;

function stripTags(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function readTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? stripTags(match[1]) : undefined;
}

function readLink(block: string) {
  const atom = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  if (atom?.[1]) return atom[1];
  return readTag(block, "link") || readTag(block, "guid");
}

export async function fetchFeed(feed: FeedConfig, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<DiscoveredStory[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(feed.url, {
      signal: controller.signal,
      headers: { "user-agent": "AI-World-Daily/1.0 (+content-research)" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`${feed.name}: HTTP ${response.status}`);

    const xml = await response.text();
    const blocks = [...xml.matchAll(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi)].map((m) => m[0]);

    return blocks.flatMap((block) => {
      const title = readTag(block, "title");
      const url = readLink(block);
      if (!title || !url) return [];

      let sourceDomain = "unknown";
      try { sourceDomain = new URL(url).hostname.replace(/^www\./, ""); } catch {}

      return [{
        title,
        url,
        sourceName: feed.name,
        sourceDomain,
        publishedAt: readTag(block, "pubDate") || readTag(block, "published") || readTag(block, "updated"),
        summary: readTag(block, "description") || readTag(block, "summary"),
        category: feed.category,
      }];
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function discoverFromFeeds(feeds: FeedConfig[]) {
  const results = await Promise.allSettled(feeds.map((feed) => fetchFeed(feed)));
  const stories: DiscoveredStory[] = [];
  const errors: string[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") stories.push(...result.value);
    else errors.push(result.reason instanceof Error ? result.reason.message : String(result.reason));
  }

  const unique = new Map<string, DiscoveredStory>();
  for (const story of stories) {
    const key = story.url.replace(/\/$/, "").toLowerCase();
    if (!unique.has(key)) unique.set(key, story);
  }

  return { stories: [...unique.values()], errors };
}
