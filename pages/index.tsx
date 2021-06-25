import React, { FC, useState } from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import {
  PageContainer,
  InstructionText,
  InputContainer,
} from '../styles/Home.styles'

import {
  Button,
  Footer,
  Header,
  Input,
  LatestRooms,
  Toast,
} from '../components'

import usePersistedState from '../hooks/usePersistedState'

import {
  ANIMATION_DURATION,
  DEFAULT_PARTICIPANT,
  STORAGE_KEY_USER,
} from '../constants'
import { generateNickName, idGenerator, validateInputValue } from '../utils'

import { UserInfo } from '../typings'
import { createRoom } from '../services/firebase'

const Home: FC = () => {
  const { storeItem, getStoredItem } = usePersistedState()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const userInfo: UserInfo = getStoredItem(
    STORAGE_KEY_USER,
    DEFAULT_PARTICIPANT
  )

  const handleCreateRoom = async () => {
    setLoading(true)
    let hostName: string, hostId: string

    if (!validateInputValue(inputValue))
      return Toast({
        type: 'warning',
        message: 'Type a valid name for your room!',
      })

    try {
      if (!userInfo.userId) {
        hostName = generateNickName()
        hostId = idGenerator()

        storeItem(STORAGE_KEY_USER, { name: hostName, userId: hostId })
      } else {
        const { name, userId } = userInfo
        hostName = name
        hostId = userId
      }

      const roomId = idGenerator()
      const roomName = inputValue

      await createRoom({ roomId, roomName, hostId, hostName })
      setLoading(false)
      router.push(`voting/${roomId}`)
    } catch (error) {
      setLoading(false)
      Toast({
        type: 'error',
        message: 'There was an error to create your room. Try later.',
      })
    }
  }

  const handleKeyDown = event => event.key === 'Enter' && handleCreateRoom()

  return (
    <div>
      <main>
        <Header />
        <LatestRooms userInfo={userInfo} />

        <PageContainer>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
          >
            <InstructionText>Enter a name for your room</InstructionText>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
          >
            <InputContainer>
              <Input
                value={inputValue}
                placeholder="Room name"
                onInput={event => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button loading={loading} onClick={handleCreateRoom}>
                Create room
              </Button>
            </InputContainer>
          </motion.div>
        </PageContainer>
        <Footer />
      </main>
    </div>
  )
}

export default Home
