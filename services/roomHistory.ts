import { RoomHistory, RoomHistoryItems } from '../typings'
import { ROOM_HISTORY_COLLECTION } from './constants'
import { authenticateAnonymously, db } from './firebase'

export const getRoomHistory = async () => {
  try {
    const roomHistoryRef = await db.collection(ROOM_HISTORY_COLLECTION).get()

    const roomHistory: RoomHistory = roomHistoryRef?.docs?.shift().data()
    const roomHistoryPath = roomHistoryRef?.docs[0]?.ref?.path

    return { roomHistory, roomHistoryRef, roomHistoryPath }
  } catch (error) {
    console.error('Cannot find room history', error)
    throw new Error('Cannot find room history.')
  }
}

export const getRoomHistoryFromUserId = async (userId: string | string[]) => {
  await authenticateAnonymously()

  try {
    const roomHistoryRef = await db
      .collection(ROOM_HISTORY_COLLECTION)
      .where('userId', '==', userId)
      .get()

    if (!roomHistoryRef.docs.length)
      return {
        roomHistory: {} as RoomHistory,
      }

    const roomHistory: RoomHistory = roomHistoryRef?.docs?.shift()?.data()
    const roomHistoryPath = roomHistoryRef?.docs[0]?.ref?.path

    return { roomHistory, roomHistoryRef, roomHistoryPath }
  } catch (error) {
    console.error('Cannot find room history', error)
    throw new Error('Cannot find room history.')
  }
}

export const updateRoomHistory = async ({ roomId, userId, roomName }) => {
  try {
    const { roomHistory, roomHistoryPath } = await getRoomHistoryFromUserId(
      userId
    )

    if (!Object.keys(roomHistory).length) {
      const newRegister = {
        userId,
        history: [
          {
            roomId,
            roomName,
            lastVisitDate: new Date(),
          },
        ],
      }
      return await db.collection(ROOM_HISTORY_COLLECTION).add(newRegister)
    }

    const { history } = roomHistory
    const roomIdIndex = history.findIndex(
      (history: RoomHistoryItems) => history.roomId === roomId
    )

    if (roomIdIndex === -1)
      history.push({ roomId, roomName, lastVisitDate: new Date() })
    else {
      history[roomIdIndex] = {
        ...history[roomIdIndex],
        lastVisitDate: new Date(),
        roomName,
      }
    }

    await db.doc(roomHistoryPath).update({
      userId,
      history,
    })
  } catch (error) {
    console.error('Cannot update room history', error)
  }
}

export const deleteRoomHistoryRegister = async ({ userId, roomId }) => {
  try {
    const { roomHistory, roomHistoryPath } = await getRoomHistoryFromUserId(
      userId
    )

    const roomIdIndex = roomHistory.history.findIndex(
      (history: RoomHistoryItems) => history.roomId === roomId
    )

    if (roomIdIndex !== -1) roomHistory.history.splice(roomIdIndex, 1)

    await db.doc(roomHistoryPath).update(roomHistory)
  } catch (error) {
    console.error('Cannot delete room history item', error)
  }
}

export const streamRoomHistory = (userId: string | string[], observer) => {
  try {
    return db
      .collection(ROOM_HISTORY_COLLECTION)
      .where('userId', '==', userId)
      .onSnapshot(observer)
  } catch (error) {
    console.error('Cannot stream room history', error.message)
    throw new Error('Cannot stream room history.')
  }
}
