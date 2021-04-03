export interface Participant {
  name: string
  id: string
}

export interface Room {
  name: string
  id: string
  hostId: string
  isVoting: boolean
  participants: Participant[]
}
