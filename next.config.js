/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn-icons-png.flaticon.com",
            pathname: "/**", // Allows all images from this domain
          },
          {
            protocol: "https",
            hostname: "wordpress.elormdokosi.com",
            pathname: "/**", // Allows all images from this domain
          },
          {
            protocol: "https",
            hostname: "wordpress.com",
            pathname: "/**", // Allows all images from this domain
          }
        ],
      },
}

module.exports = nextConfig
