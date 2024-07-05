/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "40mb"
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "utfs.io",
        pathname: "/**"
      },
      {
        protocol: "https",
        port: "",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
