
import React, { FC, useCallback, useState} from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import { PageContainer, VotingContainer } from '../../styles/Voting.styles'

import ParticipantsPanel from '../../components/ParticipantsPanel'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Header from '../../components/Header'

const Voting: FC = () => {
  const [roomTitle, setRoomTitle] = useState('Minha sala pra tudo')

  const router = useRouter()

  return (
    <div>
        <main>
          <Header showRoomTitle roomTitle={roomTitle} />
          <PageContainer>
            <ParticipantsPanel />

            <VotingContainer></VotingContainer>
          </PageContainer>
        </main>
      </div>
    )
}

export default Voting
