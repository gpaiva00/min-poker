import { Room } from '../../typings/Room'

export interface VotingPanelProps {
  room: Room
  handleVoteClick(id: string): void
  showResults: boolean
}
