import React, { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { DEFAULT_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { enterRoom } from '../../services/firebase'
import { getUserInfo } from '../../utils'

const Invitation: FC = () => {
  const [message, setMessage] = useState('Loading...')
  const [session, loading] = useSession()
  const router = useRouter()
  const { roomId } = router.query

  const userInfo = getUserInfo(session)

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
