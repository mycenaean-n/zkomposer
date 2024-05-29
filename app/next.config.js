const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
    }
    config.experiments = { layers: true, asyncWebAssembly: true };
    return config;
  },
};

module.exports = withPWA(nextConfig);
