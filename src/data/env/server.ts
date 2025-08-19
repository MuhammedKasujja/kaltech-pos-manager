import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PGUSER: z.string().min(1),
    PGDATABASE: z.string().min(1),
    PGHOST: z.string().min(1),
    SEED_SECRET: z.string().min(1),
    SESSION_EXPIRY_TIME: z.string().min(1),
    SESSION_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
