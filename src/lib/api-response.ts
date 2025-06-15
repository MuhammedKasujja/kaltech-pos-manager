import { NextResponse } from "next/server";

export class ApiResponse {
  static success<T>({ data, message }: { data?: T; message?: string }) {
    return NextResponse.json({ success: true, data: data, message });
  }

  static error({
    error,
    statusCode,
    data,
  }: {
    error: string;
    statusCode?: number;
    data?: unknown;
  }) {
    return NextResponse.json(
      { success: false, error, errors: data },
      { status: statusCode ?? 400 }
    );
  }
}
