import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import { exitRoom, getRoomFromId } from './room'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

export let db: firebase.firestore.Firestore = null
let app = null

if (!firebase.apps.length) {
  try {
    app = firebase.initializeApp(firebaseConfig)
    db = firebase.firestore()
  } catch (error) {
    console.error(error.code, error.message)
  }
} else {
  app = firebase.app()
  db = firebase.firestore(app)
}

export const firebaseAnalytics = firebase.analytics

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously()
}

export const removeParticipant = async (roomId: string, participantId) => {
  try {
    await exitRoom(roomId, participantId)
  } catch (error) {
    console.error('Cannot remove participant', error)
  }
}
