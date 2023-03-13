import { Participant } from '../../typings'

export interface IUserRoomProps {
  roomId: string
  participants: Participant[]
}

interface IUpdateName {
  name: string
}
interface IUpdateVote {
  vote: string
}
interface IUpdateViewerMode {
  viewerMode: string
}

export interface IUpdateUpdateUserRoomProps {
  dataToChange: IUpdateName | IUpdateVote | IUpdateViewerMode
  roomId: string | string[]
  userId: string
}
