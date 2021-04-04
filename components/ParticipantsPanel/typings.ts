import { Room } from '../../typings/Room'
import { UserInfo } from '../../typings/UserInfo'

export interface ParticipantsPanelProps {
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>
  startVoting: boolean
  imHost: boolean
  handleCloseRoom(): void
  userInfo: UserInfo
  room: Room
  handleChangeMyName(): void
}

export interface ParticipantProps {
  name: string
  id: string
  vote: string
}
