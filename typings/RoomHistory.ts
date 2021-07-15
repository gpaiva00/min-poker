export interface History {
  roomId: string
  lastVisitDate: Date
}

export interface RoomHistory {
  userId: string
  history: History[]
}
