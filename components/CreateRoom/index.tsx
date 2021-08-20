import React, { FC, useState } from 'react'
import { useSession } from 'next-auth/client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { validateInputValue } from '../../utils'
import { createRoom, firebaseAnalytics } from '../../services/firebase'
import { ANIMATION_DURATION } from '../../constants'
import { i18n } from '../../translate/i18n'

import { InstructionText, InputContainer } from './styles'
import { Input, Button, Toast } from '..'
import { UserInfo } from '../../typings'

interface CreateRoomProps {
  // userInfo: UserInfo
  // storeItem: (key: string, item: object) => void
}

const CreateRoom: FC<CreateRoomProps> = () => {
  // const [hostId, setHostId] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [toggleSignInModal, setToggleSignInModal] = useState(false)

  const [session] = useSession()
  const router = useRouter()

  const handleCreateRoom = async () => {
    setLoading(true)

    if (!validateInputValue(inputValue)) {
      setLoading(false)
      return Toast({
        type: 'error',
        message: i18n.t('toast.typeValidRoomName'),
      })
    }

    try {
      if (!session) {
        router.push('/signin')
        return
      }

      const roomName = inputValue
      const roomId = await createRoom({
        roomName,
        hostId: session?.user?.email,
      })

      setLoading(false)
      firebaseAnalytics().logEvent('create_room')
      router.push(`voting/${roomId}`)
    } catch (error) {
      setLoading(false)
      Toast({
        type: 'error',
        message: i18n.t('toast.errorCreatingRoom'),
      })
      firebaseAnalytics().logEvent('error_creating_room', {
        error: error.message,
      })
    }
  }

  const handleKeyDown = event => event.key === 'Enter' && handleCreateRoom()

  return (
    <>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
      >
        <InstructionText>
          {i18n.t('descriptions.enterRoomName')}
        </InstructionText>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
      >
        <InputContainer>
          <Input
            value={inputValue}
            placeholder={i18n.t('labels.roomName')}
            onChange={event => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button loading={loading} onClick={handleCreateRoom}>
            {i18n.t('buttons.createRoom')}
          </Button>
        </InputContainer>
      </motion.div>
    </>
  )
}

export default CreateRoom
