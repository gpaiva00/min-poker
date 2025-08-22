import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import usePersistedState from '../../hooks/usePersistedState'
import { DEFAULT_PARTICIPANT, STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { generateNickName, idGenerator } from '../../utils'
import { enterRoom } from '../../services/firebase'

const Invitation: FC = () => {
  const [message, setMessage] = useState('Loading...')
  const { getStoredItem, storeItem } = usePersistedState()

  let { userId, name: userName }: UserInfo = getStoredItem(
    STORAGE_KEY_USER,
    DEFAULT_PARTICIPANT
  )

  const router = useRouter()
  const { roomId } = router.query

  useEffect(() => {
    const verifyRoomId = async () => {
      try {
        if (!roomId) return

        if (!userId) userId = idGenerator()
        if (!userName) userName = generateNickName()

        storeItem(STORAGE_KEY_USER, { name: userName, userId })

        await enterRoom({ roomId, userId, userName })

        return router.push(`/voting/${roomId}`)
      } catch (error) {
        console.error('Error trying to set new participant', error)
        setMessage(error.message)
      }
    }

    verifyRoomId()
  }, [roomId])

  return <p>{message}</p>
}

export default Invitation
