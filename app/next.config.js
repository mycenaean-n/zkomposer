/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
    }
    config.experiments = { layers: true, asyncWebAssembly: true };
    config.externals.push("pino-pretty")
    return config;
  },
};

module.exports = nextConfig;
