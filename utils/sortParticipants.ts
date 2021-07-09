import { Participant } from '../typings'

export const sortParticipants = (participantsList: Participant[]) =>
  participantsList.sort((a, b) =>
    a.viewerMode > b.viewerMode ? 1 : b.viewerMode > a.viewerMode ? -1 : 0
  )
