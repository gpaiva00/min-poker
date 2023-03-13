import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { useUserInfo, validateInputValue } from '../../utils'
import { firebaseAnalytics } from '../../services/firebase'
import { ANIMATION_DURATION } from '../../constants'
import { i18n } from '../../translate/i18n'

import { InstructionText, InputContainer } from './styles'
import { Input, Button, Toast } from '..'
import { createRoom } from '../../services/room'

const CreateRoom: FC = () => {
  const {
    session,
    userInfo: { email: userEmail },
  } = useUserInfo()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

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
        hostId: userEmail,
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
