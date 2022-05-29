module.exports = {
  reactStrictMode: true,
  resolve: {
    fallback: {
      "fs": false
    },
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}
