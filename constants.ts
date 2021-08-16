import { RoomHistory } from './typings'
import { Participant, Result, Room } from './typings/Room'

export const STORAGE_KEY_USER = '@minPoker'
export const STORAGE_THEME_KEY = '@minPokerTheme'
export const STORAGE_TOKEN_KEY = '@minPokerToken'

export const LIGHTEN_AMOUNT_LOW = 0.05
export const LIGHTEN_AMOUNT_NORMAL = 0.2
export const LIGHTEN_AMOUNT_HIGH = 0.5

export const ANIMATION_DURATION = 0.5
export const DELAY_DURATION = 0.5

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

export const DEFAULT_THEME_OBJ = {
  title: 'light',
}

export const DEFAULT_RESULT: Result = {
  average: 0,
  items: [
    {
      id: '',
      text: '',
      votes: 0,
    },
  ],
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
      viewerMode: false,
    },
  ],
  hostId: '',
  ref: {
    path: '',
  },
  showResults: false,
  results: DEFAULT_RESULT,
}

export const DEFAULT_ROOM_HISTORY: RoomHistory = {
  userId: '',
  history: [
    {
      roomName: '',
      roomId: '',
      lastVisitDate: new Date(),
    },
  ],
}

export const DEFAULT_PARTICIPANT: Participant = {
  id: '',
  name: '',
  vote: '',
  viewerMode: false,
}

export const CARDS_TO_VOTE = [
  {
    text: '1',
    id: '1',
  },
  {
    text: '2',
    id: '2',
  },
  {
    text: '3',
    id: '3',
  },
  {
    text: '5',
    id: '5',
  },
  {
    text: '8',
    id: '8',
  },
  {
    text: '13',
    id: '13',
  },
  {
    text: '21',
    id: '21',
  },
  {
    text: '34',
    id: '34',
  },
  {
    text: '?',
    id: 'question',
  },
  {
    text: '',
    id: 'coffee',
  },
]
