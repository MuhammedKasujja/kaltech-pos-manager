import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.vercel.app/blog");
  const data = await res.json();

  return NextResponse.json(data);
}
