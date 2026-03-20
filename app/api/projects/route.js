/**
 * app/api/projects/route.js  — Next.js Route Handler (Server)
 * ─────────────────────────────────────────────────────────
 * Server-side API endpoint that fetches GitHub repos and
 * filters by the "portfolio" topic. This runs on the server
 * so the GITHUB_TOKEN is never exposed to the client.
 *
 * Uses Next.js ISR: results are cached for 1 hour.
 *
 * GET /api/projects
 * ─────────────────────────────────────────────────────────
 */
import { getPortfolioProjects } from "@/lib/github";
import { NextResponse } from "next/server";

// ISR: revalidate this route every 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    const projects = await getPortfolioProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("[/api/projects] GitHub fetch error:", error.message);
    return NextResponse.json(
      { error: error.message, projects: [] },
      { status: 500 }
    );
  }
}
