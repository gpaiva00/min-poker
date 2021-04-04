const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
  env: {
    API_KEY: 'AIzaSyBcVS0gDDjQkks1NYgmKCfKctGtHG6ZWcY',
    AUTH_DOMAIN: 'minpoker-fc7fa.firebaseapp.com',
    PROJECT_ID: 'minpoker-fc7fa',
    STORAGE_BUCKET: 'minpoker-fc7fa.appspot.com',
    MESSAGING_SENDER_ID: '672134937405',
    APP_ID: '1:672134937405:web:ec8a089f7d2eb254096354',
    MEASUREMENT_ID: 'G-7DTECLBR8J',
  }
})
