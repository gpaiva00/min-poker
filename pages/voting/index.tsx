
import React, { FC, useCallback, useState} from 'react'

import { motion } from 'framer-motion'


import { PageContainer } from '../../styles/Voting.styles'

import ParticipantsPanel from '../../components/ParticipantsPanel'
import Header from '../../components/Header'
import VotingPanel from '../../components/VotingPanel'

const Voting: FC = () => {
  const [roomTitle, setRoomTitle] = useState('chinforinfola')

  return (
    <div>
        <main>
          <Header showRoomTitle roomTitle={roomTitle} />

          <PageContainer>
            <ParticipantsPanel />
            <VotingPanel />
          </PageContainer>
        </main>
      </div>
    )
}

export default Voting
