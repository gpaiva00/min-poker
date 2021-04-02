import React, { FC, useCallback, useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore/'

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

import { STORAGE_KEY_USER } from '../constants'
import { generateName, idGenerator } from '../utils'

import firebase from 'firebase/app'

const Home: FC = () => {
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  const [inputValue, setInputValue] = useState('')
  const [latestRooms, setLatestRooms] = useState<any>([])

  const router = useRouter()

  const handleCreateRoom = () => {
    const userInfo = storage && JSON.parse(storage)
    let userName: string, hostId: string

    if (!userInfo) {
      userName = generateName()
      hostId = idGenerator()

      setStorage(JSON.stringify({ name: userName, userId: hostId }))
    } else {
      const { name, userId } = userInfo
      userName = name
      hostId = userId
    }

    const roomId = idGenerator()
    const roomName = inputValue

    const saveOnDB = {
      roomId,
      roomName,
      hostId,
      isVoting: false,
    }

    console.log(saveOnDB)
    router.push({ pathname: 'voting', query: { roomId } })
  }

  useEffect(() => {
    const firestore = firebase.firestore()

    const roomsRef = firestore.collection('rooms')
    const query = roomsRef.orderBy('createdAt').limit(5)

    const [latestRoomsData] = useCollectionData(query, { idField: 'roomId' })
    setLatestRooms(latestRoomsData)
  }, [])

  return (
    <div>
      <main>
        <Header />
        <LatestRooms items={latestRooms} />

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
              <Button onClick={handleCreateRoom}>Create room</Button>
            </InputContainer>
          </motion.div>
        </PageContainer>
        <Footer />
      </main>
    </div>
  )
}

export default Home
