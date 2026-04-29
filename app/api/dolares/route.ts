import { NextRequest, NextResponse } from "next/server";
import { fetchAllDolars } from "@/app/services/dolar";
import { createRateLimiter } from "@/app/utils/rate-limiter";

export const revalidate = 60;

const isRateLimited = createRateLimiter({ limit: 30, windowMs: 60_000, maxIps: 1000 });

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  const { data, isStale } = await fetchAllDolars();
  return NextResponse.json({ data, isStale });
}
