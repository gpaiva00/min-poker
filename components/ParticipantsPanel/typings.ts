import { Participant } from '../../typings/Room'

export interface ParticipantsPanelProps {
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>
  startVoting: boolean
  imHost: boolean
  handleCloseRoom(): void
  participants: Participant[]
}

export interface ParticipantProps {
  name: string
  id: string
  vote: string
}
