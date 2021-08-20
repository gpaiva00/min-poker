import firebase from 'firebase/app'

export interface VerifyIfIsParticipantProps {
  room?: firebase.firestore.DocumentData
  userId?: string
  roomId?: string | string[]
}
