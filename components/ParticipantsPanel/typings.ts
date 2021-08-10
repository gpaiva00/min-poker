import { Participant, Room, UserInfo } from '../../typings'

export interface ParticipantsPanelProps {
  imHost: boolean
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
