import firebase from 'firebase/app'

export interface VerifyIfIsNotParticipantProps {
  room?: firebase.firestore.DocumentData
  userId?: string
  roomId?: string
}
