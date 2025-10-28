/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.112.19:3000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
