import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getDatabase } from '../../services/firebase'

import { Room } from '../../typings/Room'
import usePersistedState from '../../hooks/usePersistedState'
import { DEFAULT_ROOM, STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'

const Invitation: FC = () => {
  const router = useRouter()
  const { roomId } = router.query
  const [message, setMessage] = useState('Loading...')

  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  const { userId, name }: UserInfo = storage && JSON.parse(storage)

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
        const { hostId, participants, ref } = rooms ? rooms[0] : DEFAULT_ROOM

        if (!hostId) return

        const imHost = hostId === userId

        if (imHost) return router.replace(`/voting/${roomId}`)

        const isNotParticipant =
          participants.indexOf(participant => participant.id === userId) === -1

        if (isNotParticipant) {
          const newParticipant = {
            id: userId,
            name,
            vote: '',
          }
          console.log({ participants, newParticipant })

          const roomPath = ref.path.split('/')[1]
          const roomRef = db.collection('rooms').doc(roomPath)

          await roomRef.set(
            {
              participants: [...participants, newParticipant],
            },
            { merge: false }
          )

          return router.replace(`/voting/${roomId}`)
        }
      } catch (error) {
        console.error('Error trying to set new participant', error)
      }

      console.log('ALREADY PARTICIPANT')
      router.replace(`/voting/${roomId}`)
    }

    verifyRoomId()
  }, [rooms])

  return <p>{message}</p>
}

export default Invitation
