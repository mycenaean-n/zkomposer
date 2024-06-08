const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
    }
    config.experiments = { layers: true, asyncWebAssembly: true };
    config.externals.push('pino-pretty');
    return config;
  },
  env: {
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    PRIV_KEY: process.env.PRIV_KEY,
  },
};

module.exports = withPWA(nextConfig);
