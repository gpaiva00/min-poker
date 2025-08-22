import { RoomHistory } from '../typings'

const timestampToDate = (timestamp: any) => new Date(timestamp * 1000)

export const sortRoomHistoryByDate = (roomHistory: RoomHistory) => {
  roomHistory.history.sort(
    (a, b) =>
      timestampToDate(b.lastVisitDate).getTime() -
      timestampToDate(a.lastVisitDate).getTime()
  )

  return roomHistory
}
