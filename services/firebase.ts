import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import { DEFAULT_RESULT } from '../constants'
import { ROOM_COLLECTION } from './constants'
import { VerifyIfIsNotParticipantProps } from '../typings/Services'

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
    // firebase
    //   .auth(app)
    //   .signInAnonymously()
    //   .then(() => (db = firebase.firestore(app)))
  } catch (error) {
    console.error(error.code, error.message)
  }
} else {
  app = firebase.app()
  db = firebase.firestore(app)
}

export const firebaseAnalytics = firebase.analytics()

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously()
}

export const createRoom = async ({ roomId, roomName, hostId, hostName }) => {
  await authenticateAnonymously()

  try {
    const saveOnDB = {
      created: firebase.firestore.FieldValue.serverTimestamp(),
      id: roomId,
      name: roomName,
      hostId,
      isVoting: false,
      showResults: false,
      results: DEFAULT_RESULT,
      participants: [
        {
          vote: '',
          name: hostName,
          id: hostId,
          viewerMode: false,
        },
      ],
    }

    await db.collection(ROOM_COLLECTION).add(saveOnDB)
  } catch (error) {}
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

    const room = roomRef.docs.shift().data()
    const roomPath = roomRef.docs[0].ref.path

    return { room, roomRef, roomPath }
  } catch (error) {
    console.error('Cannot find room', error)
    throw new Error('Cannot find room.')
  }
}

export const verifyIfIsNotParticipant = async ({
  room,
  userId,
  roomId,
}: VerifyIfIsNotParticipantProps) => {
  let myRoom = room

  if (!room) {
    const { room } = await getRoomFromId(roomId)
    myRoom = room
  }

  return myRoom.participants.findIndex(({ id }) => id === userId) === -1
}

export const enterRoom = async ({ roomId, userName, userId }) => {
  try {
    const { room, roomPath } = await getRoomFromId(roomId)

    if (verifyIfIsNotParticipant({ room, userId })) {
      const newParticipants = [
        ...room.participants,
        {
          id: userId,
          name: userName,
          vote: '',
          viewerMode: false,
        },
      ]

      await db.doc(roomPath).update({
        ...room,
        participants: newParticipants,
      })
    }
  } catch (error) {
    console.error('Cannot enter room', error)
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

export const removeParticipant = async (roomId: string, participantId) => {
  try {
    await exitRoom(roomId, participantId)
  } catch (error) {
    console.error('Cannot remove participant', error)
  }
}

export const streamMyRooms = (userId: string | string[], observer) => {
  try {
    return db
      .collection(ROOM_COLLECTION)
      .where('hostId', '==', userId)
      .onSnapshot(observer)
  } catch (error) {
    console.error('Cannot stream my rooms', error.message)
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
