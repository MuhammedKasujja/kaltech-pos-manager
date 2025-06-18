import { NextResponse } from "next/server";
import { ZodSchema } from "zod";

export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (data: T, req: Request) => Promise<Response>,
) {
  return async (req: Request) => {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 },
      );
    }
    return handler(result.data, req);
  };
}

//example

// export const POST = withValidation(userSchema, async (data, req) => {
//   // data is type-safe and validated here
//   return Response.json({ message: `Hello, ${data.name}` });
// });
