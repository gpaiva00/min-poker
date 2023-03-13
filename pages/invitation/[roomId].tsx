import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { enterRoom } from '../../services/room'
import { useUserInfo } from '../../utils'
import { i18n } from '../../translate/i18n'

const Invitation: FC = () => {
  const [message, setMessage] = useState(i18n.t('descriptions.loading'))
  const router = useRouter()
  const { roomId } = router.query

  const { userInfo, session } = useUserInfo()

  useEffect(() => {
    const verifyParticipant = async () => {
      try {
        if (!roomId || !userInfo.email) return

        if (!session) return router.push(`/signin?redirectTo=/voting/${roomId}`)

        setTimeout(async () => {
          await enterRoom({
            roomId,
            userId: userInfo.email,
            userName: userInfo.name,
          })

          router.push(`/voting/${roomId}`)
        }, 1000)
      } catch (error) {
        console.error('Error trying to set new participant', error)
        setMessage(error.message)
      }
    }

    verifyParticipant()
  }, [roomId, userInfo])

  return <p>{message}</p>
}

export default Invitation
