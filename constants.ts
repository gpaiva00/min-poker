import { Participant, Room } from './typings/Room'

export const STORAGE_KEY_USER = '@minPoker'

export const DEFAULT_ROOM: Room = {
  id: '',
  name: '',
  isVoting: false,
  participants: [],
  hostId: '',
  ref: {
    path: '',
  },
  hostVote: '',
}

export const DEFAULT_PARTICIPANT: Participant = {
  id: '',
  name: '',
  vote: '',
}
