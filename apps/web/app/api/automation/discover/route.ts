import { NextRequest, NextResponse } from "next/server";
import { defaultFeeds } from "../../../../../../../packages/research/src/feeds";
import { discoverFromFeeds } from "../../../../../../../packages/research/src/rss";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest) {
  const configured = process.env.CRON_SECRET;
  if (!configured) return process.env.NODE_ENV !== "production";
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return supplied === configured;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.AUTOMATION_ENABLED === "false") return NextResponse.json({ ok: false, message: "Automation is disabled" }, { status: 503 });

  const result = await discoverFromFeeds(defaultFeeds);
  const categories = await prisma.category.findMany();
  const author = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });

  if (!author) return NextResponse.json({ ok: false, message: "Create an editor user before discovery." }, { status: 400 });
  if (!categories.length) return NextResponse.json({ ok: false, message: "Create at least one category before discovery." }, { status: 400 });

  const categoryMap = new Map(categories.map((category) => [category.name.toLowerCase(), category]));
  const queued = [];

  for (const story of result.stories.slice(0, 100)) {
    const duplicate = await prisma.article.findFirst({ where: { sources: { some: { sourceUrl: story.url } } }, select: { id: true } });
    if (duplicate) continue;

    const category = categoryMap.get(story.category.toLowerCase()) || categories[0];
    const parsedUrl = new URL(story.url);
    const domain = parsedUrl.hostname.replace(/^www\./, "");
    const source = await prisma.source.upsert({
      where: { url: story.url },
      update: { isActive: true },
      create: { name: domain, domain, url: story.url, sourceType: "NEWS", trustScore: 50 },
    });

    const score = Math.min(100, 60 + Math.min(25, story.title.length / 4) + (story.publishedAt ? 15 : 0));
    const article = await prisma.article.create({
      data: {
        title: story.title,
        slug: `${slugify(story.title)}-${Date.now()}-${queued.length}`,
        excerpt: story.description || null,
        content: "",
        status: "DISCOVERED",
        categoryId: category.id,
        authorId: author.id,
        sourceScore: source.trustScore,
        qualityScore: Math.round(score),
        sources: { create: { sourceId: source.id, sourceUrl: story.url, publishedAt: story.publishedAt ? new Date(story.publishedAt) : null } },
      },
    });
    queued.push({ id: article.id, title: article.title, category: category.name, score: article.qualityScore });
  }

  return NextResponse.json({ ok: true, discovered: result.stories.length, created: queued.length, errors: result.errors, queued });
}
