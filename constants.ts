import { Participant, Result, Room } from './typings/Room'

export const STORAGE_KEY_USER = '@minPoker'

export const RESULTS_TEXT = {
  1: '1',
  2: '2',
  3: '3',
  5: '5',
  8: '8',
  13: '13',
  21: '21',
  34: '34',
  question: '?',
}

export const DEFAULT_RESULT: Result = {
  id: '',
  text: '',
  votes: 0,
}

export const DEFAULT_ROOM: Room = {
  id: '',
  name: '',
  isVoting: false,
  participants: [
    {
      id: '',
      name: '',
      vote: '',
    },
  ],
  hostId: '',
  ref: {
    path: '',
  },
  showResults: false,
  results: [DEFAULT_RESULT],
}

export const DEFAULT_PARTICIPANT: Participant = {
  id: '',
  name: '',
  vote: '',
}
