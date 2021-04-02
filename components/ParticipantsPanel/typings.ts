export interface ParticipantsPanelProps {
  setStartVoting: React.Dispatch<React.SetStateAction<boolean>>;
  startVoting: boolean;
}

export interface ParticipantProps {
  name: string;
  id: string;
  vote: string;
}
