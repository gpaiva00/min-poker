import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

export const getDatabase = () => {
  let db: firebase.firestore.Firestore = null

  if (!firebase.apps.length) {
    const app = firebase.initializeApp(config)
    db = firebase.firestore(app)
  } else {
    const app = firebase.app()
    firebase
      .auth(app)
      .signInAnonymously()
      .then(() => {
        db = firebase.firestore(app)
      })
      .catch(error => console.error(error.code, error.message))
  }

  return db
}
