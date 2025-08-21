export interface User {
  id: string
  name: string
  isOwner: boolean
}

export interface Vote {
  userId: string
  value: number | null
  timestamp: number
}

export interface VotingRound {
  id: string
  votes: Vote[]
  isRevealed: boolean
  createdAt: number
  revealedAt?: number
}

export interface Room {
  id: string
  name: string
  ownerId: string
  participants: User[]
  currentRound: VotingRound | null
  votingHistory: VotingRound[]
  settings: {
    autoReveal: boolean
    revealDelay: number
  }
  createdAt: number
  lastActivity: number
}

export interface LocalUserData {
  name: string
  userId: string
}