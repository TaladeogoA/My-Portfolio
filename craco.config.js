const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove CRA's default file-loader rule for .md/.mdx
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.filter((r) => {
            return !(
              r.test &&
              r.test.toString().includes("mdx") // remove md/mdx from file loader
            );
          });

          // Add MDX loader
          rule.oneOf.unshift({
            test: /\.mdx?$/,
            use: [
              {
                loader: require.resolve("babel-loader"),
              },
              {
                loader: require.resolve("@mdx-js/loader"),
              },
            ],
          });
        }
      });

      return webpackConfig;
    },
  },
};
