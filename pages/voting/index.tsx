
import React, { FC, useCallback, useEffect, useState} from 'react'

import { motion } from 'framer-motion'


import { PageContainer } from '../../styles/Voting.styles'

import ParticipantsPanel from '../../components/ParticipantsPanel'
import Header from '../../components/Header'
import VotingPanel from '../../components/VotingPanel'


const Voting: FC = () => {
  const [roomTitle, setRoomTitle] = useState('chinforinfola')
  const [startVoting, setStartVoting] = useState(false)

  // useEffect(() => {
  //   const nickname = idGenerator()
  //   setRoomTitle(nickname)
  // }, [])

  return (
    <div>
        <main>
          <Header showRoomTitle roomTitle={roomTitle} />

          <PageContainer>
            <ParticipantsPanel setStartVoting={setStartVoting} startVoting={startVoting} />
            <VotingPanel startVoting={startVoting}/>
          </PageContainer>
        </main>
      </div>
    )
}

export default Voting
