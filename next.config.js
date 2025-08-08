/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router는 Next.js 14에서 기본적으로 활성화됨
  
  // 이미지 도메인 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // 개발 서버 설정
  experimental: {
    // Fast Refresh 최적화
    optimizePackageImports: ['@/components', '@/lib', '@/hooks'],
  },
  
  // 웹팩 설정 (핫 리로드 최적화)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 개발 모드에서 핫 리로드 최적화
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

module.exports = nextConfig
