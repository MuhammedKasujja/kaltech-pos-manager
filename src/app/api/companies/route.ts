import { getAllCompanies } from "@/lib/company/get-all-companies";
import { NextResponse } from "next/server";

export async function GET() {
  const companies = await getAllCompanies();
  return NextResponse.json(companies);
}
