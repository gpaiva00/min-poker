export interface Participant {
  name: string
  id: string
  vote: string
}

interface Ref {
  path: string
}
export interface Room {
  name: string
  id: string
  hostId: string
  hostName: string
  isVoting: boolean
  participants: Participant[]
  ref?: Ref
  hostVote: string
}
