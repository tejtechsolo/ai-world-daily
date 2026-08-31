import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    automationEnabled: process.env.AUTOMATION_ENABLED !== "false",
    autoPublishEnabled: process.env.AUTO_PUBLISH_ENABLED === "true",
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    authSecretConfigured: Boolean(process.env.AUTH_SECRET),
  });
}
