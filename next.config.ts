import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  // useCache: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
