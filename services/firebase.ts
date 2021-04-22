import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

export const getDatabase = () => {
  let db: firebase.firestore.Firestore = null

  if (!firebase.apps.length) {
    const app = firebase.initializeApp(config)
    db = firebase.firestore(app)
  } else {
    const app = firebase.app()
    db = firebase.firestore(app)
  }

  return db
}
