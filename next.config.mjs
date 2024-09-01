/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.html$/,
            use: ['html-loader'],
        });
        return config;
    },
};

export default nextConfig;
