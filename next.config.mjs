/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname], 
  },
};

export default nextConfig;