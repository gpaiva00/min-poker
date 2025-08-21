import {DocumentData, DocumentReference} from 'firebase/firestore'

export interface CalculateVotingProps {
  roomRef: DocumentReference<DocumentData>
}
