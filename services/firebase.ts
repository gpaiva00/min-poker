import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'

import { DEFAULT_RESULT } from '../constants'
import {
  ROOM_COLLECTION,
  ROOM_HISTORY_COLLECTION,
  USER_COLLECTION,
  USER_ROOM_COLLECTION,
} from './constants'
import { VerifyIfIsParticipantProps } from '../typings/Services'
import {
  IUserProps,
  Participant,
  RoomHistory,
  RoomHistoryItems,
} from '../typings'
import { generateFakeEmail, idGenerator } from '../utils'
import { ICreateUserProps, IUpdateUserProps } from './typings/IUserService'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

let db: firebase.firestore.Firestore = null
let app = null

if (!firebase.apps.length) {
  try {
    app = firebase.initializeApp(firebaseConfig)
    db = firebase.firestore()
  } catch (error) {
    console.error(error.code, error.message)
  }
} else {
  app = firebase.app()
  db = firebase.firestore(app)
}

export const firebaseAnalytics = firebase.analytics

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously()
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

export const createUserIfNotExist = async ({
  id = idGenerator(),
  name,
  avatarURL,
  email,
}: ICreateUserProps): Promise<IUserProps> => {
  await authenticateAnonymously()
  const userEmail = email || generateFakeEmail(name)

  const { user } = await findUserByEmail(userEmail)
  if (user) return user

  try {
    const user = {
      id,
      name,
      email: userEmail,
      avatarURL,
    }

    await db.collection(USER_COLLECTION).doc(id).set(user)
    return user
  } catch (error) {
    console.error('Error trying to create user', error)
  }
}

export const updateUser = async ({
  name,
  email,
}: IUpdateUserProps): Promise<IUserProps> => {
  try {
    const { user } = await findUserByEmail(email)
    user.name = name

    await db.collection(USER_COLLECTION).doc(user.id).update(user)
    // await db.doc(roomPath).update({
    //   ...updateRoom,
    //   participants: newParticipants,
    // })
    return user
  } catch (error) {
    console.error('Error trying to update user', error)
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    const userRef = await db
      .collection(USER_COLLECTION)
      .where('email', '==', email)
      .get()

    const user: IUserProps = userRef?.docs?.shift()?.data()
    const userPath = userRef?.docs[0]?.ref?.path

    return { user, userRef, userPath }
  } catch (error) {
    console.error('Cannot find user', error.message)
    throw new Error('Cannot find user.')
  }
}

export const updateRoom = async ({
  room,
  userId = null,
  newRoom = null,
  newParticipant,
}) => {
  try {
    const { roomPath } = await getRoomFromId(room.id)

    const { participants } = room

    let newParticipants = participants
    let updateRoom = room

    if (newParticipant) {
      newParticipants = participants.map(participant => {
        if (!userId) {
          return {
            ...participant,
            ...newParticipant,
          }
        }

        if (participant.id === userId) {
          return {
            ...participant,
            ...newParticipant,
          }
        }

        return participant
      })
    }

    if (newRoom) updateRoom = newRoom

    await db.doc(roomPath).update({
      ...updateRoom,
      participants: newParticipants,
    })
  } catch (error) {
    console.error('Cannot update room', error)
  }
}

export const updateVote = async ({ voteId, userId, roomId }) => {
  const { roomPath } = await getRoomFromId(roomId)

  try {
    const sfDocRef = db.doc(roomPath)
    await db.runTransaction(async transaction => {
      const sfDoc = await transaction.get(sfDocRef)
      if (!sfDoc.exists) {
        throw 'Cannot find document'
      }

      const participants = sfDoc.data().participants
      const userIndex = participants.findIndex(
        participant => participant.id === userId
      )
      participants[userIndex] = {
        ...participants[userIndex],
        vote: voteId,
      }
      transaction.update(sfDocRef, { participants })
    })
  } catch (error) {
    console.error('Cannot set vote: ', error)
  }
}

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

export const getUserRoomFromIds = async (
  roomId: string | string[],
  userId: string
) => {
  await authenticateAnonymously()

  try {
    const userRoomRef = await db
      .collection(USER_ROOM_COLLECTION)
      .where('userId', '==', userId)
      .where('roomId', '==', roomId)
      .get()

    const userRoom = userRoomRef?.docs?.shift()?.data()
    const userRoomPath = userRoomRef?.docs[0]?.ref?.path

    return { room: userRoom, userRoomRef, roomPath: userRoomPath }
  } catch (error) {
    console.error('Cannot find user room', error)
    throw new Error('Cannot find user room.')
  }
}

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

export const verifyIfIsParticipant = async ({
  userId,
  roomId,
}: VerifyIfIsParticipantProps) => {
  const { room } = await getUserRoomFromIds(roomId, userId)

  return !!room
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
      history[roomIdIndex].lastVisitDate = new Date()
    }

    await db.doc(roomHistoryPath).update({
      userId,
      history,
    })
  } catch (error) {
    console.error('Cannot update room history', error)
  }
}

export const enterRoom = async ({ roomId, userId }) => {
  if (!roomId || !userId) return

  try {
    const { room } = await getRoomFromId(roomId)

    console.warn('enter room Room', { room, roomId })

    const isParticipant = await verifyIfIsParticipant({ roomId, userId })
    const userRoomId = idGenerator()

    if (!isParticipant) {
      const userRoom = {
        id: userRoomId,
        userId,
        roomId,
        vote: '',
        viewerMode: false,
      }

      await db.collection(USER_ROOM_COLLECTION).doc(userRoomId).set(userRoom)
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

export const deleteRoom = async (roomId: string) => {
  try {
    const { roomPath } = await getRoomFromId(roomId)

    await db.doc(roomPath).delete()
  } catch (error) {
    console.error('Cannot delete room', error)
  }
}

export const removeParticipant = async (roomId: string, participantId) => {
  try {
    await exitRoom(roomId, participantId)
  } catch (error) {
    console.error('Cannot remove participant', error)
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
