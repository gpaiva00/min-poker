import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { PageContainer } from '../../styles/Voting.styles'

import ParticipantsPanel from '../../components/ParticipantsPanel'
import Header from '../../components/Header'
import VotingPanel from '../../components/VotingPanel'

import { validateRoomId } from '../../utils/validateRoomId'

const Voting: FC = () => {
  const [roomTitle, setRoomTitle] = useState('chinforinfola')
  const [isVoting, setIsVoting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const { roomId } = router.query

    if (!validateRoomId(roomId)) {
      router.push('/')
    }
  }, [])

  return (
    <div>
      <main>
        <Header showRoomTitle roomTitle={roomTitle} />

        <PageContainer>
          <ParticipantsPanel
            setStartVoting={setIsVoting}
            startVoting={isVoting}
          />
          <VotingPanel startVoting={isVoting} />
        </PageContainer>
      </main>
    </div>
  )
}

export default Voting
