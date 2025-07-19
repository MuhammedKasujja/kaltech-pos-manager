import { fetchDataUploads } from "@/lib/data-upload/fetch-data-uploads";
import { NextResponse } from "next/server";

export async function GET() {
  const updates = await fetchDataUploads();
  return NextResponse.json(updates);
}
