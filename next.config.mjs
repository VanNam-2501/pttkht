/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: ['3001-idx-pttkhtgit-1745141611497.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev'],
  },
}

export default nextConfig
