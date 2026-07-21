import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Screenshot fallback on /projects when a local image fails to load
      { protocol: 'https', hostname: 's0.wp.com', pathname: '/mshots/**' },
    ],
  },
}

export default nextConfig
