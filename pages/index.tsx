import React, { FC, useState } from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import {
  PageContainer,
  InstructionText,
  InputContainer,
} from '../styles/Home.styles'

import LatestRooms from '../components/LatestRooms'
import Button from '../components/Button'
import Input from '../components/Input'
import Footer from '../components/Footer'
import Header from '../components/Header'

import usePersistedState from '../hooks/usePersistedState'

import {
  DEFAULT_PARTICIPANT,
  DEFAULT_RESULT,
  STORAGE_KEY_USER,
} from '../constants'
import { generateNickName, idGenerator } from '../utils'

import { getDatabase } from '../services/firebase'
import { UserInfo } from '../typings/UserInfo'
import { toast } from 'react-toastify'

const Home: FC = () => {
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const db = getDatabase()

  const userInfo: UserInfo = storage && JSON.parse(storage)

  const validateInputValue = inputValue => !!inputValue.length

  const handleCreateRoom = async () => {
    setLoading(true)
    let hostName: string, hostId: string

    if (!validateInputValue(inputValue))
      return toast.warning('Type a valid name for your room!', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })

    try {
      if (!userInfo) {
        hostName = generateNickName()
        hostId = idGenerator()

        setStorage(JSON.stringify({ name: hostName, userId: hostId }))
      } else {
        const { name, userId } = userInfo
        hostName = name
        hostId = userId
      }

      const roomId = idGenerator()
      const roomName = inputValue

      const saveOnDB = {
        id: roomId,
        name: roomName,
        hostId,
        isVoting: false,
        showResults: false,
        results: [DEFAULT_RESULT],
        participants: [
          {
            id: hostId,
            name: hostName,
            vote: '',
          },
        ],
      }

      await db.collection('rooms').add(saveOnDB)
      setLoading(false)
      router.push(`voting/${roomId}`)
    } catch (error) {
      setLoading(false)
      toast.error('There was an error to create your room. Try later.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      console.error('Error trying to create room', error)
    }
  }

  return (
    <div>
      <main>
        <Header />
        <LatestRooms userInfo={userInfo} />

        <PageContainer>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <InstructionText>Enter a name for your room</InstructionText>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <InputContainer>
              <Input
                value={inputValue}
                placeholder="Room name"
                onInput={event => setInputValue(event.target.value)}
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
