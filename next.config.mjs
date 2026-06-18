/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Lokale Bilder liegen in /public/media. Externe Quelle nur fuer
    // Admin-Uploads in Supabase Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
