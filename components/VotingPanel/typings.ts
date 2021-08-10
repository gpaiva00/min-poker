import { Participant, Room } from '../../typings'

export interface VotingPanelProps {
  room: Room
  handleVoteClick(id: string): void
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>
  showResults: boolean
  me: Participant
  loading: boolean
  imHost: boolean
}
