export interface VotingPanelProps {
  isVoting?: boolean
  handleVoteClick(id: string): void
  showResults: boolean
}
