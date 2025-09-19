import { getAllCompanies } from "@/features/company/actions/get-all-companies";
import { NextResponse } from "next/server";

export async function GET() {
  const companies = await getAllCompanies();
  return NextResponse.json(companies);
}
