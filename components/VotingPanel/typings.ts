import { Participant, Room } from '../../typings'

export interface VotingPanelProps {
  room: Room
  handleVoteClick(id: string): void
  showResults: boolean
  me: Participant
  loading: boolean
}
