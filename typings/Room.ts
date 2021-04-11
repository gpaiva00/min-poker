export interface Participant {
  name?: string
  id?: string
  vote?: string
  viewerMode?: boolean
}

export interface RoomRef {
  path: string
}
export interface Room {
  name: string
  id: string
  hostId: string
  isVoting: boolean
  showResults?: boolean
  participants: Participant[]
  ref?: RoomRef
  results: Result
}
interface ResultItems {
  id: string
  text: string
  votes: number
}
export interface Result {
  average: number
  items: ResultItems[]
}
