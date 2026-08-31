import { NextRequest, NextResponse } from "next/server";
import { defaultFeeds } from "../../../../../../../packages/research/src/feeds";
import { discoverFromFeeds } from "../../../../../../../packages/research/src/rss";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest) {
  const configured = process.env.CRON_SECRET;
  if (!configured) return process.env.NODE_ENV !== "production";
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return supplied === configured;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.AUTOMATION_ENABLED === "false") {
    return NextResponse.json({ ok: false, message: "Automation is disabled" }, { status: 503 });
  }

  const result = await discoverFromFeeds(defaultFeeds);
  return NextResponse.json({
    ok: true,
    discovered: result.stories.length,
    errors: result.errors,
    stories: result.stories,
  });
}
