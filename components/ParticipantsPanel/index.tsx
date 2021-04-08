import React, { FC, useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

import { ParticipantProps, ParticipantsPanelProps } from './typings'

import {
  ButtonContainer,
  DeleteRoom,
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
import { FiCoffee } from 'react-icons/fi'
import { RESULTS_TEXT } from '../../constants'

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({
  setStartVoting,
  imHost,
  handleDeleteRoom,
  handleExitRoom,
  room,
  userInfo,
  handleChangeMyName,
  loading,
}) => {
  const [participantsList, setParticipantsList] = useState<ParticipantProps[]>(
    []
  )
  const [myVote, setMyVote] = useState('')

  const { participants, showResults, isVoting } = room
  const { name, userId } = userInfo

  const showParticipantVote = (vote: string) => {
    if (!isVoting && !showResults) return

    if (showResults && !vote.length) return <AiFillCloseCircle size={20} />

    if (!vote.length) return <BiTime size={20} />

    if (vote.length && !showResults) return <AiFillCheckCircle size={20} />
    else
      return vote === 'coffee' ? (
        <Vote>
          <FiCoffee size={20} />
        </Vote>
      ) : (
        <Vote>{RESULTS_TEXT[vote]}</Vote>
      )
  }

  useEffect(() => {
    const me = participants.find(({ id }) => id === userId)
    setMyVote(me ? me.vote : '')

    let newParticipants = participants.filter(
      ({ id }) => id !== '' && id !== userId
    )

    setParticipantsList(newParticipants)
  }, [participants])

  return (
    <Container>
      <Title>Participants</Title>

      <PanelContainer>
        <Panel>
          <List>
            <Participant>
              <MyName onClick={handleChangeMyName}>{name} (you)</MyName>
              {showParticipantVote(myVote)}
            </Participant>

            {participantsList.map(({ name, vote }, key) => (
              <Participant key={key}>
                <Name>{name}</Name>
                {showParticipantVote(vote)}
              </Participant>
            ))}
          </List>
          {imHost && (
            <ButtonContainer>
              <StartVoting
                loading={loading}
                onClick={() => setStartVoting(!isVoting)}
              >
                {isVoting ? 'Finish voting' : 'Start voting'}
              </StartVoting>
            </ButtonContainer>
          )}
        </Panel>

        <ButtonContainer>
          {imHost ? (
            <DeleteRoom
              loading={loading}
              onClick={handleDeleteRoom}
              variant="danger"
            >
              Delete room
            </DeleteRoom>
          ) : (
            <DeleteRoom
              loading={loading}
              onClick={handleExitRoom}
              variant="danger"
            >
              Exit room
            </DeleteRoom>
          )}
        </ButtonContainer>
      </PanelContainer>
    </Container>
  )
}

export default ParticipantsPanel
