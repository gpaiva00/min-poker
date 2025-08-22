import firebase from 'firebase/firestore'

export interface CalculateVotingProps {
  roomRef: firebase.DocumentReference<firebase.DocumentData>
}
