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
import { generateNickName } from '../../utils'
import usePersistedState from '../../hooks/usePersistedState'
import { STORAGE_KEY_USER } from '../../constants'
interface UserProps {
  name: string
  userId: string
}

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({
  setStartVoting,
  startVoting,
  imHost,
  handleCloseRoom,
  room,
  userInfo,
}) => {
  const [loading, setLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState<ParticipantProps[]>(
    []
  )

  const { participants, hostVote, hostName, hostId } = room
  const { name, userId } = userInfo

  useEffect(() => {
    let newParticipants = participants.filter(
      ({ id }) => id !== '' && id !== userId
    )

    if (!imHost) {
      const hostData = {
        name: hostName,
        id: hostId,
        vote: hostVote,
      }

      newParticipants = [hostData, ...newParticipants]
    }

    setParticipantsList(newParticipants)
  }, [participants])

  return (
    <Container>
      <Title>Participants</Title>

      <PanelContainer>
        <Panel>
          <List>
            <Participant>
              <MyName>{name}</MyName>
              <Vote></Vote>
            </Participant>

            {participantsList.map((item, key) => (
              <Participant key={key}>
                <Name>{item.name}</Name>
                <Vote>{item.vote}</Vote>
              </Participant>
            ))}
          </List>
          {imHost && (
            <ButtonContainer>
              <StartVoting onClick={() => setStartVoting(!startVoting)}>
                {startVoting ? 'Finish voting' : 'Start voting'}
              </StartVoting>
            </ButtonContainer>
          )}
        </Panel>

        <ButtonContainer>
          {imHost ? (
            <CloseRoom onClick={handleCloseRoom} variant="danger">
              Close room
            </CloseRoom>
          ) : (
            <CloseRoom variant="danger">Exit room</CloseRoom>
          )}
        </ButtonContainer>
      </PanelContainer>
    </Container>
  )
}

export default ParticipantsPanel
