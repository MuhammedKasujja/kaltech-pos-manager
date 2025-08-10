import { fetchDataUploads } from "@/features/data-uploads/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const updates = await fetchDataUploads();
  return NextResponse.json(updates);
}
