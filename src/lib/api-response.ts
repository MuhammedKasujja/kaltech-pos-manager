import { NextResponse } from "next/server";

export class ApiResponse {
  static success<T>(data?: T, message?: string) {
    return NextResponse.json({ success: true, data, message });
  }

  static error(error: string, statusCode?: number) {
    return NextResponse.json(
      { success: false, error },
      { status: statusCode ?? 400 }
    );
  }
}
