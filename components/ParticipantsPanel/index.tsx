import React, { FC, useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { AiFillCheckCircle } from 'react-icons/ai'

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
interface UserProps {
  name: string
  userId: string
}

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({
  setStartVoting,
  isVoting,
  imHost,
  handleDeleteRoom,
  handleExitRoom,
  room,
  userInfo,
  handleChangeMyName,
  showResults,
}) => {
  const [loading, setLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState<ParticipantProps[]>(
    []
  )

  const { participants, hostVote, hostName, hostId } = room
  const { name, userId } = userInfo

  const showParticipantVote = (vote: string) => {
    if (!isVoting) return

    if (!vote.length) return <BiTime size={20} />

    if (vote.length && !showResults) return <AiFillCheckCircle size={20} />
    else return <Vote>{vote}</Vote>
  }

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
              <MyName onClick={handleChangeMyName}>{name} (you)</MyName>
              {showParticipantVote(hostVote)}
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
              <StartVoting onClick={() => setStartVoting(!isVoting)}>
                {isVoting ? 'Finish voting' : 'Start voting'}
              </StartVoting>
            </ButtonContainer>
          )}
        </Panel>

        <ButtonContainer>
          {imHost ? (
            <DeleteRoom onClick={handleDeleteRoom} variant="danger">
              Delete room
            </DeleteRoom>
          ) : (
            <DeleteRoom onClick={handleExitRoom} variant="danger">
              Exit room
            </DeleteRoom>
          )}
        </ButtonContainer>
      </PanelContainer>
    </Container>
  )
}

export default ParticipantsPanel
