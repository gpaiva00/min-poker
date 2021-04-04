import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { ParticipantProps, ParticipantsPanelProps } from './typings'

import {
  ButtonContainer,
  CloseRoom,
  Container,
  List,
  MyName,
  Name,
  Panel,
  PanelContainer,
  Participant,
  StartVoting,
  Title,
  Vote,
} from '../../styles/ParticipantsPanel.styles'
import { generateName } from '../../utils'
import usePersistedState from '../../hooks/usePersistedState'
import { STORAGE_KEY_USER } from '../../constants'
interface UserProps {
  name: string
  userId: string
}

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({
  setStartVoting,
  startVoting,
}) => {
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')

  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<ParticipantProps[]>([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const userInfo: UserProps = storage && JSON.parse(storage)

    if (!userInfo) {
      const nickname = generateName()
      setUserName(nickname)
      return
    }

    const { name } = userInfo
    setUserName(name)
  }, [])

  return (
    <Container>
      <Title>Participants</Title>

      <PanelContainer>
        <Panel>
          <List>
            <Participant>
              <MyName>{userName}</MyName>
              {/* get from state */}
              <Vote></Vote>
            </Participant>

            {participants.map((item, key) => (
              <Participant>
                <Name>{item.name}</Name>
                <Vote>{item.vote}</Vote>
              </Participant>
            ))}
          </List>
          <ButtonContainer>
            <StartVoting onClick={() => setStartVoting(!startVoting)}>
              {startVoting ? 'Finish voting' : 'Start voting'}
            </StartVoting>
          </ButtonContainer>
        </Panel>

        <ButtonContainer>
          <CloseRoom variant="danger">Close room</CloseRoom>
        </ButtonContainer>
      </PanelContainer>
    </Container>
  )
}

export default ParticipantsPanel
