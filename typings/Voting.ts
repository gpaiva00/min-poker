import firebase from 'firebase'

export interface CalculateVotingProps {
  roomRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}
