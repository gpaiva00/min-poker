import { authenticateAnonymously, db } from './firebase'
import { VerifyIfIsParticipantProps } from '../typings/Services'
import { USER_ROOM_COLLECTION } from './constants'
import { getRoomFromId } from './room'
import { DEFAULT_USER_ROOM } from '../constants'
import { IUpdateUpdateUserRoomProps, IUserRoomProps } from './typings/IUserRoom'

export const getUserRoomFromId = async (roomId: string | string[]) => {
  await authenticateAnonymously()
  try {
    const userRoomRef = await db
      .collection(USER_ROOM_COLLECTION)
      .doc(roomId)
      .get()

    const userRoom: IUserRoomProps = userRoomRef?.data() || DEFAULT_USER_ROOM
    userRoom.roomId = roomId

    return { userRoom, userRoomRef }
  } catch (error) {
    console.error('Cannot find user room', error)
    throw new Error('Cannot find user room.')
  }
}

export const verifyIfIsParticipant = async ({
  userId,
  roomId,
}: VerifyIfIsParticipantProps) => {
  const { userRoom } = await getUserRoomFromId(roomId)

  const findUserIndex = userRoom?.participants?.findIndex(
    participant => participant.id === userId
  )

  return findUserIndex !== -1
}

export const updateUserRoom = async ({
  dataToChange,
  userId,
  roomId,
}: IUpdateUpdateUserRoomProps) => {
  try {
    const sfDocRef = db.collection(USER_ROOM_COLLECTION).doc(roomId)
    await db.runTransaction(async transaction => {
      const sfDoc = await transaction.get(sfDocRef)
      if (!sfDoc.exists) {
        throw 'Cannot find user room document'
      }

      const participants = sfDoc.data().participants
      const userIndex = participants.findIndex(
        participant => participant.id === userId
      )
      participants[userIndex] = {
        ...participants[userIndex],
        ...dataToChange,
      }
      transaction.update(sfDocRef, { participants })
    })
  } catch (error) {
    console.error('Cannot set vote: ', error)
  }
}

export const streamUserRoomByRoomId = (roomId: string | string[], observer) => {
  try {
    return db
      .collection(USER_ROOM_COLLECTION)
      .where('roomId', '==', roomId)
      .onSnapshot(observer)
  } catch (error) {
    console.error('Cannot stream user room', error.message)
  }
}

export const queryTest = async () => {
  try {
    const query = await db.collection('room').doc('_8k0vv88xn').get()

    const query2 = await db.collection('userRoom').doc('_dmihcpa4r').get()

    Promise.all([query, query2])
      // merge the results
      .then(promiseResults => {
        const mergedData = []
        mergedData.push({
          room: promiseResults[0].data(),
          userRoom: promiseResults[1].data(),
        })
        // promiseResults.forEach(snapshot => {
        //   console.log('snap', snapshot.data())
        //   mergedData.push(snapshot.data())
        //   // forEach(doc => mergedData.push(doc.data()))
        // })
        return mergedData
      })
      .then(console.warn)

      .catch(error => {
        console.error('Cannot query test', error)
      })

    // console.warn('QUERY', query.data())
  } catch (error) {
    console.error('Cannot test query', error.message)
  }
}
