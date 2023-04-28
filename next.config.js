/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        VERCEL_URL: process.env.VERCEL_URL
    },
    images: {
        domains: ['pbs.twimg.com']
    }
};

module.exports = nextConfig;
