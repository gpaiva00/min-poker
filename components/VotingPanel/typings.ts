export interface VotingPanelProps {
  isVoting?: boolean
  showResults?: boolean
  handleVoteClick(id: string): void
}
