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

const defaultRoom: Room = {
  id: '',
  name: '',
  isVoting: false,
  participants: [],
  hostId: '',
}

const Voting: FC = () => {
  const [isVoting, setIsVoting] = useState(false)
  const [showResults, setShowResults] = useState(false)

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

  // console.log('SALINHA', rooms)

  const room: Room = rooms ? rooms[0] : defaultRoom

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

  useEffect(() => {
    if (!validateRoomId(roomId)) {
      router.push('/')
      return
    }
  }, [])

  return (
    <div>
      <main>
        <Header showRoomTitle roomTitle={room.name} />

        <PageContainer>
          <ParticipantsPanel
            setStartVoting={handleStartVoting}
            startVoting={isVoting}
          />
          <VotingPanel startVoting={room.isVoting} showResults={showResults} />
        </PageContainer>
      </main>
    </div>
  )
}

export default Voting
