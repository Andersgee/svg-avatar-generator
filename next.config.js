const svgrconfig = {
  test: /\.svg$/i,
  issuer: { and: [/\.(js|ts|md)x?$/] },
  use: [
    {
      loader: "@svgr/webpack",
      options: {
        //https://react-svgr.com/docs/options/
        svgo: true, //use svg Optimizer
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                //https://github.com/svg/svgo#default-preset
                //use preset-default but with some overrides
                overrides: {
                  cleanupIDs: false,
                  prefixIds: false,
                  removeTitle: false,
                },
              },
            },
          ],
        },
      },
    },
  ],
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(svgrconfig);
    return config;
  },
};

module.exports = nextConfig;
