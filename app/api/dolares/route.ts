import { NextResponse } from "next/server";
import { fetchAllDolars } from "@/app/services/dolar";

export const revalidate = 60;

export async function GET() {
  const { data, isStale } = await fetchAllDolars();
  return NextResponse.json({ data, isStale });
}
