import firebase from 'firebase'
import { DEFAULT_RESULT } from '../constants'
import { Room } from '../typings'
import { idGenerator } from '../utils'
import { ROOM_COLLECTION, USER_ROOM_COLLECTION } from './constants'
import { authenticateAnonymously, db } from './firebase'
import { updateRoomHistory } from './roomHistory'
import { IEnterRoomProps } from './typings/IRoomService'
import { getUserRoomFromId, verifyIfIsParticipant } from './userRoom'

export const getRoomFromId = async (roomId: string | string[]) => {
  await authenticateAnonymously()

  try {
    const roomRef = await db
      .collection(ROOM_COLLECTION)
      .where('id', '==', roomId)
      .get()

    const room = roomRef?.docs?.shift()?.data()
    const roomPath = roomRef?.docs[0]?.ref?.path

    return { room, roomRef, roomPath }
  } catch (error) {
    console.error('Cannot find room', error.message)
    throw new Error('Cannot find room.')
  }
}

export const createRoom = async ({ roomName, hostId }): Promise<string> => {
  await authenticateAnonymously()
  const roomId = idGenerator()

  try {
    const room = {
      created: firebase.firestore.FieldValue.serverTimestamp(),
      id: roomId,
      name: roomName,
      hostId,
      isVoting: false,
      showResults: false,
      results: DEFAULT_RESULT,
    }

    await db.collection(ROOM_COLLECTION).doc(roomId).set(room)
    await updateRoomHistory({ roomId, userId: hostId, roomName })
    return roomId
  } catch (error) {
    console.error('Error creating room', error)
  }
}

export const updateRoom = async (room: Room) => {
  try {
    await db.collection(ROOM_COLLECTION).doc(room.id).set(room)
  } catch (error) {
    console.error('Cannot update room', error)
  }
}

export const enterRoom = async ({
  roomId,
  userId,
  userName,
}: IEnterRoomProps) => {
  if (!roomId || !userId) return

  try {
    const { room } = await getRoomFromId(roomId)
    const { userRoom } = await getUserRoomFromId(roomId)

    const isParticipant = await verifyIfIsParticipant({ roomId, userId })

    if (!isParticipant) {
      const newUserRoomItem = {
        ...userRoom,
        participants: [
          ...userRoom.participants,
          {
            id: userId,
            vote: '',
            viewerMode: false,
            name: userName,
          },
        ],
      }

      await db.collection(USER_ROOM_COLLECTION).doc(roomId).set(newUserRoomItem)
    }

    await updateRoomHistory({ roomId, userId, roomName: room.name })
  } catch (error) {
    console.error('Cannot enter room', error.message)
    throw new Error('Cannot enter room. Try later.')
  }
}

export const exitRoom = async (roomId: string, userId: string) => {
  try {
    const { room, roomPath } = await getRoomFromId(roomId)

    const newParticipants = room.participants.filter(
      participant => participant.id !== userId
    )

    await db.doc(roomPath).update({
      ...room,
      participants: newParticipants,
    })
  } catch (error) {
    console.error('Cannot exit from room', error)
  }
}

export const deleteRoom = async (roomId: string) => {
  try {
    const { roomPath } = await getRoomFromId(roomId)

    await db.doc(roomPath).delete()
  } catch (error) {
    console.error('Cannot delete room', error)
  }
}

export const streamRoomById = (roomId: string | string[], observer) => {
  try {
    return db
      .collection(ROOM_COLLECTION)
      .where('id', '==', roomId)
      .onSnapshot(observer)
  } catch (error) {
    console.error('Cannot stream room', error.message)
  }
}
