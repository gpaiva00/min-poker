import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getDatabase } from '../../services/firebase'

import { Room } from '../../typings/Room'
import usePersistedState from '../../hooks/usePersistedState'
import { DEFAULT_ROOM, STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { generateNickName, idGenerator } from '../../utils'

const Invitation: FC = () => {
  const router = useRouter()
  const { roomId } = router.query
  const [message, setMessage] = useState('Loading...')

  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  let { userId, name: userName }: UserInfo = storage && JSON.parse(storage)

  const db = getDatabase()

  const [rooms, loading, error] = useCollectionData<Room[]>(
    db.collection('rooms').where('id', '==', roomId || ''),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
      refField: 'ref',
    }
  )

  useEffect(() => {
    const verifyRoomId = async () => {
      if (rooms && !rooms.length) setMessage('Room not found.')

      try {
        const room: Room = rooms && rooms[0] ? rooms[0] : DEFAULT_ROOM

        if (!room.hostId) return

        if (!userId) userId = idGenerator()
        if (!userName) userName = generateNickName()

        setStorage(JSON.stringify({ name: userName, userId }))

        // const imHost = hostId === userId

        // if (imHost) return router.replace(`/voting/${roomId}`)

        const isNotParticipant =
          room.participants.findIndex(({ id }) => id === userId) === -1

        if (isNotParticipant) {
          const roomPath = room.ref.path.split('/')[1]
          const roomRef = db.collection('rooms').doc(roomPath)

          const newParticipants = [
            ...room.participants,
            {
              id: userId,
              name: userName,
              vote: '',
            },
          ]

          await roomRef.set(
            {
              ...room,
              participants: newParticipants,
            },
            { merge: false }
          )

          return router.push(`/voting/${roomId}`)
        }
      } catch (error) {
        console.error('Error trying to set new participant', error)
      }

      // console.log('ALREADY PARTICIPANT')
      router.push(`/voting/${roomId}`)
    }

    verifyRoomId()
  }, [rooms])

  return <p>{message}</p>
}

export default Invitation
