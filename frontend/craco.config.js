// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      // Remove ForkTsCheckerWebpackPlugin and ESLintWebpackPlugin since this is a pure JS/JSX project
      webpackConfig.plugins = (webpackConfig.plugins || []).filter(
        (p) =>
          !p ||
          !p.constructor ||
          (!p.constructor.name.includes("ForkTsChecker") &&
            !p.constructor.name.includes("ESLintWebpackPlugin"))
      );
      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
};
