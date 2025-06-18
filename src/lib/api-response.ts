import { NextResponse } from "next/server";

export class ApiResponse {
  static success<T>({ data, message }: { data?: T; message?: string }) {
    return NextResponse.json(
      { success: true, data: data, message },
      { status: 200 },
    );
  }

  static error({
    error,
    statusCode,
    data,
  }: {
    error: unknown;
    statusCode?: number;
    data?: unknown;
  }): NextResponse {
    let message = error;
    if (typeof error === "string") message = error;

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, error: message?.toString(), errors: data },
      { status: statusCode ?? 400 },
    );
  }
}
