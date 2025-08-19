import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function GET() {
  return new Promise((resolve) => {
    const host = "localhost";
    const user = "muhammed";
    const database = "kaltech_poshfhdhfd";

    const dump = spawn("pg_dump", 
      [
       "-U", user,
       "-h", host,
       "-d", database
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
