import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const category = searchParams.get("category") || undefined;

  const articles = await prisma.article.findMany({
    where: {
      ...(status ? { status: status as any } : {}),
      ...(category ? { category: { slug: category } } : {}),
    },
    include: { category: true, sources: { include: { source: true } }, seoData: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ count: articles.length, articles });
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "");
  const categoryId = String(body.categoryId || "");
  const authorId = String(body.authorId || "");

  if (!title || !content || !categoryId || !authorId) {
    return NextResponse.json({ error: "title, content, categoryId and authorId are required" }, { status: 400 });
  }

  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;
  const article = await prisma.article.create({
    data: {
      title,
      slug,
      content,
      excerpt: body.excerpt || null,
      categoryId,
      authorId,
      status: "IDEA",
      primaryKeyword: body.primaryKeyword || null,
      secondaryKeywords: Array.isArray(body.secondaryKeywords) ? body.secondaryKeywords : [],
    },
    include: { category: true },
  });

  return NextResponse.json({ article }, { status: 201 });
}
