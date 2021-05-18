import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import usePersistedState from '../../hooks/usePersistedState'
import { STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { generateNickName, idGenerator } from '../../utils'
import { enterRoom } from '../../services/firebase'

const Invitation: FC = () => {
  const [message, setMessage] = useState('Loading...')
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  let { userId, name: userName }: UserInfo = storage && JSON.parse(storage)

  const router = useRouter()
  const { roomId } = router.query

  useEffect(() => {
    const verifyRoomId = async () => {
      try {
        if (!roomId) return

        if (!userId) userId = idGenerator()
        if (!userName) userName = generateNickName()

        setStorage(JSON.stringify({ name: userName, userId }))

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
