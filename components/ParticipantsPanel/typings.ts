import { Participant, Room, UserInfo } from '../../typings'

export interface ParticipantsPanelProps {
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>
  imHost: boolean
  handleDeleteRoom(): void
  handleExitRoom(): void
  handleRemoveParticipant(id: string): void
  userInfo: UserInfo
  room: Room
  loading: boolean
  me: Participant
}

export interface ParticipantProps {
  name: string
  id: string
  vote: string
}
