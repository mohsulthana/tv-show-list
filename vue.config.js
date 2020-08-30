module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "~@/scss/global.scss";
            `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete('eslint');
  },
};

// @import "~@/scss/setup/variables.scss";
