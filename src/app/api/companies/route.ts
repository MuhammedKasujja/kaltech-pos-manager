import { accountSearchParamsCache } from "@/features/accounts/types";
import { getCompanies } from "@/features/company/actions/get-all-companies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = accountSearchParamsCache.parse(searchParams as any);
  console.log({ query });
  const companies = await getCompanies(query);
  return NextResponse.json(companies);
}
