import { ApiResponse } from "@/lib/api-response";
import { login } from "@/lib/auth/login";
import { NextRequest } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1).trim(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Field validation failed",
        data: parseResult.error.format(),
        statusCode: 400,
      });
    }
    const data = parseResult.data;

    const user = await login(data);
    return ApiResponse.success({ data: user, message: "Login successfully" });
  } catch (error) {
    return ApiResponse.error({ error: error, statusCode: 500 });
  }
}
