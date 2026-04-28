import { NextRequest, NextResponse } from "next/server";
import { fetchAllDolars } from "@/app/services/dolar";

export const revalidate = 60;

const RATE_LIMIT = 30;
const WINDOW_MS = 60_000;
const MAX_IPS = 1000;
const ipLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, times] of ipLog) {
    if (times.every(t => now - t >= WINDOW_MS)) ipLog.delete(key);
  }
  if (ipLog.size >= MAX_IPS && !ipLog.has(ip)) {
    const oldest = ipLog.keys().next().value!;
    ipLog.delete(oldest);
  }
  const timestamps = (ipLog.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  ipLog.set(ip, [...timestamps, now]);
  return false;
}

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
