const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
  typescript: {
    ignoreBuildErrors: true,
  }
})
