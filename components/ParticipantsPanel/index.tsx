import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { ParticipantProps, ParticipantsPanelProps } from './typings'

import { ButtonContainer, CloseRoom, Container, List, MyName, Name, Panel, PanelContainer, Participant, StartVoting, Title, Vote } from '../../styles/ParticipantsPanel.styles'
import { generateName } from '../../utils';

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({ setStartVoting, startVoting }) => {
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<ParticipantProps[]>([])
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    const nickname = generateName()
    setNickname(nickname)
  }, [])


  return (
    <Container>
      <Title>Participants</Title>

      <PanelContainer>
        <Panel>
          <List>
            <Participant>
              {/* get from localstorage */}
              <MyName>{nickname}</MyName>
              {/* get from state */}
              <Vote></Vote>
            </Participant>

            { participants.map((item, key) => (
              <Participant>
                <Name>{item.name}</Name>
                <Vote>{item.vote}</Vote>
              </Participant>
            ))}
          </List>
          <ButtonContainer>
            <StartVoting onClick={() => setStartVoting(!startVoting)}>Start voting</StartVoting>
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
