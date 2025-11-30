/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname], // Dynamically extract the hostname
  },
};

export default nextConfig;