import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';

import { ButtonContainer, CloseRoom, Container, List, MyName, Name, Panel, PanelContainer, Participant, StartVoting, Title, Vote } from '../../styles/ParticipantsPanel.styles'

const ParticipantsPanel: FC = () => {
  const [loading, setLoading] = useState(true)

  const participants = [
    {
      name: 'John',
      vote: '2',
    },
    {
      name: 'Buba',
      vote: '5',
    },
    {
      name: 'Mike',
      vote: '2',
    },
    {
      name: 'Jessika',
      vote: '34',
    },
    {
      name: 'Bob',
      vote: '34',
    },
    {
      name: 'Ana',
      vote: '1',
    },
    {
      name: 'Kassy',
      vote: '5',
    },
    {
      name: 'Jessika',
      vote: '34',
    },
    {
      name: 'Kassy',
      vote: '5',
    },
    {
      name: 'Jessika',
      vote: '34',
    },
    {
      name: 'Kassy',
      vote: '5',
    },
  ]

  return (
    <Container>
      <Title>Participants</Title>

      <PanelContainer>
        <Panel>
          <List>
            <Participant>
              <MyName>Gab</MyName>
              <Vote>13</Vote>
            </Participant>

            { participants.map((item, key) => (
              <Participant>
                <Name>{item.name}</Name>
                <Vote>{item.vote}</Vote>
              </Participant>
            ))}
          </List>
          <ButtonContainer>
            <StartVoting>Start voting</StartVoting>
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
