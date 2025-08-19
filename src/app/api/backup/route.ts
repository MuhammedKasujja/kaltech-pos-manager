import { NextResponse } from "next/server";
import { spawn } from "child_process";
import { env } from "@/data/env/server";

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    const dump = spawn("pg_dump", 
      [
       "-U", env.PGUSER,
       "-h", env.PGHOST,
       "-d", env.PGDATABASE
      ]
    );

    let data = "";
    dump.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    dump.stderr.on("data", (err) => {
      resolve(
        NextResponse.json(
          { success: false, error: err.toString() },
          { status: 500 }
        )
      );
    });

    dump.on("close", () => {
      resolve(
        new NextResponse(data, {
          headers: {
            "Content-Type": "application/sql",
            "Content-Disposition": "attachment; filename=dump.sql",
          },
        })
      );
    });
  });
}
