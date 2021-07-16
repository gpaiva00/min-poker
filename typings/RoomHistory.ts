export interface RoomHistoryItems {
  roomId: string
  roomName: string
  lastVisitDate: Date
}

export interface RoomHistory {
  userId: string
  history: RoomHistoryItems[]
}
