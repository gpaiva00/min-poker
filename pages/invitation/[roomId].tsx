import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { enterRoom } from '../../services/firebase'
import { useUserInfo } from '../../utils'

const Invitation: FC = () => {
  const [message, setMessage] = useState('Loading...')
  const router = useRouter()
  const { roomId } = router.query

  const { userInfo, session } = useUserInfo()

  useEffect(() => {
    const verifyRoomId = async () => {
      try {
        if (!roomId) return

        if (!session) {
          router.push(`/signin?redirectTo=/voting/${roomId}`)
          return
        }

        await enterRoom({ roomId, userId: userInfo.email })

        router.push(`/voting/${roomId}`)
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
