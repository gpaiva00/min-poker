import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBcVS0gDDjQkks1NYgmKCfKctGtHG6ZWcY',
  authDomain: 'minpoker-fc7fa.firebaseapp.com',
  projectId: 'minpoker-fc7fa',
  storageBucket: 'minpoker-fc7fa.appspot.com',
  messagingSenderId: '672134937405',
  appId: '1:672134937405:web:ec8a089f7d2eb254096354',
  measurementId: 'G-7DTECLBR8J',
}

export const getDatabase = () => {
  let db: firebase.firestore.Firestore = null

  if (!firebase.apps.length) {
    const app = firebase.initializeApp(config)
    db = firebase.firestore(app)
    // firebase.analytics()
  } else {
    const app = firebase.app()
    db = firebase.firestore(app)
  }

  return db
}
