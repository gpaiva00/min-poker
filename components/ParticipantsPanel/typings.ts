import { Room } from '../../typings/Room'
import { UserInfo } from '../../typings/UserInfo'

export interface ParticipantsPanelProps {
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>
  imHost: boolean
  handleDeleteRoom(): void
  handleExitRoom(): void
  userInfo: UserInfo
  room: Room
  handleChangeMyName(): void
  loading: boolean
}

export interface ParticipantProps {
  name: string
  id: string
  vote: string
}
