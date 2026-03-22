import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@hassan-sads/ui', '@hassan-sads/db', '@hassan-sads/questionnaire'],
};

export default nextConfig;
