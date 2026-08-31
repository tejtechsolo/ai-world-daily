import Link from "next/link";

const demoQueue = [
  { category: "AI", title: "AI developments to review", score: 94, status: "DISCOVERED" },
  { category: "India", title: "India current affairs to research", score: 91, status: "QUEUED" },
  { category: "World", title: "International affairs briefing", score: 88, status: "QUEUED" },
];

export default function ContentQueuePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div><p className="text-sm font-medium">Editorial workflow</p><h1 className="text-3xl font-bold">Content Queue</h1><p className="mt-2 text-sm opacity-70">Stories waiting for research, verification and editorial review.</p></div>
        <Link href="/admin" className="rounded-lg border px-4 py-2 text-sm">Dashboard</Link>
      </div>
      <div className="space-y-4">
        {demoQueue.map((story) => (
          <article key={story.title} className="rounded-xl border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><span className="text-xs font-semibold uppercase opacity-60">{story.category}</span><h2 className="mt-1 text-xl font-semibold">{story.title}</h2></div>
              <div className="text-right"><div className="text-2xl font-bold">{story.score}</div><div className="text-xs opacity-60">score</div></div>
            </div>
            <div className="mt-4 flex items-center gap-3"><span className="rounded-full border px-3 py-1 text-xs">{story.status}</span><button className="rounded-lg border px-3 py-1.5 text-sm" disabled>Research</button><button className="rounded-lg border px-3 py-1.5 text-sm" disabled>Ignore</button></div>
          </article>
        ))}
      </div>
      <p className="mt-8 text-xs opacity-60">Database persistence is the next wiring step; these entries are intentionally demo-only until Prisma migrations are confirmed.</p>
    </main>
  );
}
