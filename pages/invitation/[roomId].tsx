import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { getDatabase } from '../../services/firebase'

import usePersistedState from '../../hooks/usePersistedState'
import { STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { generateNickName, idGenerator } from '../../utils'
import { useGetRoomById, useGetRooms } from '../../hooks'

const Invitation: FC = () => {
  const [message, setMessage] = useState('Loading...')
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  let { userId, name: userName }: UserInfo = storage && JSON.parse(storage)

  const router = useRouter()
  const { roomId } = router.query

  const db = getDatabase()
  const room = useGetRoomById(db, roomId)

  // useEffect(() => {
  //   console.log({ roomId, room })
  // }, [roomId])

  useEffect(() => {
    const verifyRoomId = async () => {
      if (!room) setMessage('Room not found.')

      try {
        if (!room.hostId) return

        if (!userId) userId = idGenerator()
        if (!userName) userName = generateNickName()

        setStorage(JSON.stringify({ name: userName, userId }))

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
              viewerMode: false,
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

      router.push(`/voting/${roomId}`)
    }

    verifyRoomId()
  }, [room])

  return <p>{message}</p>
}

export default Invitation
