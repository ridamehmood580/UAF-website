/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production builds from replacing files used by a running dev server.
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === 'development' ? '.next-dev' : '.next'),
};

module.exports = nextConfig;
