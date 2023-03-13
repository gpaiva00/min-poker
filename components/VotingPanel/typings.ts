import { IUserProps, Room } from '../../typings'

export interface VotingPanelProps {
  room: Room
  handleVoteClick(id: string): void
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>
  me: IUserProps
  loading: boolean
}
