/** @type {import('next').NextConfig} */
const nextConfig = {
      experimental: {
        optimizePackageImports: ["react-icons", "lucide-react"],
      },
      async redirects() {
        return [
          {
            source: "/datahub/data-explorer",
            destination: "/lab/explorer",
            permanent: true,
          },
          {
            source: "/myblog-details",
            destination: "/blog",
            permanent: true,
          },
          {
            source: "/myblog-sidebar",
            destination: "/blog",
            permanent: true,
          },
        ];
      },
      poweredByHeader: false,
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
