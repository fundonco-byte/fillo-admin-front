/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // ChunkLoadError 해결을 위한 설정
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // 더 안정적인 빌드를 위한 설정
  swcMinify: true,
  // 개발 서버 최적화
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
            chunks: "all",
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
