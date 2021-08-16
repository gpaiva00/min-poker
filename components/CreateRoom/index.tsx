import React, { FC, useState } from 'react'

import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { generateNickName, idGenerator, validateInputValue } from '../../utils'
import { createRoom, firebaseAnalytics } from '../../services/firebase'
import {
  ANIMATION_DURATION,
  STORAGE_KEY_USER,
  STORAGE_TOKEN_KEY,
} from '../../constants'
import { i18n } from '../../translate/i18n'

import { InstructionText, InputContainer } from './styles'
import { Input, Button, Toast } from '..'
import { UserInfo } from '../../typings'
import { usePersistedState } from '../../hooks'
import CreateAccountModal from '../CreateAccountModal'

interface CreateRoomProps {
  userInfo: UserInfo
  storeItem: (key: string, item: object) => void
}

const CreateRoom: FC<CreateRoomProps> = ({ userInfo, storeItem }) => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [toggleCreateAccountModal, setToggleCreateAccountModal] = useState(
    false
  )

  const { getStoredItem } = usePersistedState()
  const router = useRouter()

  const handleCreateRoom = async () => {
    setLoading(true)
    let hostName: string, hostId: string

    if (!validateInputValue(inputValue)) {
      setLoading(false)
      return Toast({
        type: 'error',
        message: i18n.t('toast.typeValidRoomName'),
      })
    }

    try {
      if (!getStoredItem(STORAGE_TOKEN_KEY)) {
        setToggleCreateAccountModal(true)
        setLoading(false)
        return
        // throw new Error()
      }
      // if (!userInfo.userId) {
      //   hostName = generateNickName()
      //   hostId = idGenerator()

      //   storeItem(STORAGE_KEY_USER, { name: hostName, userId: hostId })
      // } else {
      //   const { name, userId } = userInfo
      //   hostName = name
      //   hostId = userId
      // }

      const roomId = idGenerator()
      const roomName = inputValue

      await createRoom({ roomId, roomName, hostId, hostName })
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
      <CreateAccountModal
        toggle={toggleCreateAccountModal}
        setToggleModal={setToggleCreateAccountModal}
      />

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
