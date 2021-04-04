import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { PageContainer } from '../../styles/Voting.styles'

import ParticipantsPanel from '../../components/ParticipantsPanel'
import Header from '../../components/Header'
import VotingPanel from '../../components/VotingPanel'

import { validateRoomId } from '../../utils/validateRoomId'
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore'
import { Room } from '../../typings/Room'
import { getDatabase } from '../../services/firebase'
import usePersistedState from '../../hooks/usePersistedState'
import { DEFAULT_ROOM, STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'

const Voting: FC = () => {
  const [isVoting, setIsVoting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')

  const router = useRouter()
  const { roomId } = router.query

  const db = getDatabase()
  const [rooms, loading, error] = useCollectionData<Room[]>(
    db.collection('rooms').where('id', '==', roomId || ''),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
      refField: 'ref',
    }
  )

  const room: Room = rooms ? rooms[0] : DEFAULT_ROOM

  const userInfo: UserInfo = storage && JSON.parse(storage)
  const imHost = room.hostId === userInfo.userId

  const handleCloseRoom = async () => {
    try {
      await db.doc(room.ref.path).delete()
      router.push('/')
    } catch (error) {
      console.error('Error trying to close room', error)
    }
  }

  const handleExitRoom = async () => {
    try {
      const roomPath = room.ref.path.split('/')[1]
      const roomRef = db.collection('rooms').doc(roomPath)

      const newParticipants = room.participants.filter(
        participant => participant.id !== userInfo.userId
      )

      await roomRef.set(
        { ...room, participants: newParticipants },
        { merge: false }
      )
      router.push('/')
    } catch (error) {
      console.error('Error trying to exit room', error)
    }
  }

  const handleStartVoting = async () => {
    try {
      const roomPath = room.ref.path.split('/')[1]
      const roomRef = db.collection('rooms').doc(roomPath)

      await roomRef.set(
        {
          isVoting: !isVoting,
        },
        { merge: true }
      )

      setIsVoting(!isVoting)
      setShowResults(!showResults)
    } catch (error) {
      window.alert('Error when trying to start voting. Please try later.')
      console.error('Error when trying to start voting', error)
    }
  }

  const handleChangeMyName = async () => {
    const newUserName = prompt('Type your name', userInfo.name)

    if (!newUserName.length || newUserName === null) return

    const newUserInfo = {
      ...userInfo,
      name: newUserName,
    }

    setStorage(JSON.stringify(newUserInfo))

    const { participants } = room
    let dataToChange = {
      ...room,
      hostName: newUserName,
    }

    if (!imHost) {
      const newParticipants = participants.map(participant => {
        if (participant.id === userInfo.userId) {
          return {
            ...participant,
            name: newUserName,
          }
        }

        return participant
      })

      dataToChange = {
        ...room,
        participants: newParticipants,
      }
    }

    const roomPath = room.ref.path.split('/')[1]
    const roomRef = db.collection('rooms').doc(roomPath)

    await roomRef.set(dataToChange, { merge: false })
  }

  useEffect(() => {
    if (!validateRoomId(roomId)) {
      router.push('/')
      return
    }
  }, [roomId])

  return (
    <div>
      <main>
        <Header
          showRoomTitle
          roomTitle={room.name}
          roomId={roomId}
          imHost={imHost}
        />

        <PageContainer>
          <ParticipantsPanel
            handleChangeMyName={handleChangeMyName}
            setStartVoting={handleStartVoting}
            startVoting={isVoting}
            imHost={imHost}
            handleCloseRoom={handleCloseRoom}
            handleExitRoom={handleExitRoom}
            room={room}
            userInfo={userInfo}
          />
          <VotingPanel startVoting={room.isVoting} showResults={showResults} />
        </PageContainer>
      </main>
    </div>
  )
}

export default Voting
