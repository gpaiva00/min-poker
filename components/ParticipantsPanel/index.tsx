import React, { FC, useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi'

import { ParticipantsPanelProps } from './typings'
import { Participant as ParticipantProps } from '../../typings'

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
  TitleContainer,
  EditIcon,
  DoneIcon,
  RemoveIcon,
  ViewerModeIcon,
  NoVoteIcon,
  VotedIcon,
} from '../../styles/ParticipantsPanel.styles'

import { FiCoffee } from 'react-icons/fi'
import { RESULTS_TEXT } from '../../constants'

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({
  setStartVoting,
  imHost,
  handleDeleteRoom,
  handleExitRoom,
  handleRemoveParticipant,
  room,
  userInfo,
  loading,
  me,
}) => {
  const [participantsList, setParticipantsList] = useState<ParticipantProps[]>(
    []
  )

  const [isEditing, setIsEditing] = useState(false)

  const { participants, showResults, isVoting } = room
  const { name, userId } = userInfo

  const showParticipantVote = (vote: string) => {
    if (!isVoting && !showResults) return

    if (showResults && !vote.length) return <NoVoteIcon size={20} />

    if (!vote.length) return <BiTime size={20} />

    if (vote.length && !showResults) return <VotedIcon size={20} />
    else
      return vote === 'coffee' ? (
        <Vote>
          <FiCoffee size={20} />
        </Vote>
      ) : (
        <Vote>{RESULTS_TEXT[vote]}</Vote>
      )
  }

  const showEditOptions = () => {
    if (!participantsList.length) return

    if (isEditing)
      return <DoneIcon onClick={() => setIsEditing(false)} size={20} />

    return <EditIcon onClick={() => setIsEditing(true)} size={20} />
  }

  const showParticipantsOptions = ({ vote, viewerMode, id }) => {
    if (isEditing)
      return (
        <RemoveIcon onClick={() => handleRemoveParticipant(id)} size={20} />
      )

    if (viewerMode) return <ViewerModeIcon size={20} />

    return showParticipantVote(vote)
  }

  useEffect(() => {
    let newParticipants = participants.filter(
      ({ id }) => id !== '' && id !== userId
    )

    if (!newParticipants.length) setIsEditing(false)

    setParticipantsList(newParticipants)
  }, [participants])

  return (
    <Container>
      <TitleContainer>
        <Title>Participants</Title>
        {imHost && showEditOptions()}
      </TitleContainer>

      <PanelContainer>
        <Panel>
          <List>
            <Participant>
              <MyName viewerMode={me.viewerMode}>{name}</MyName>
              {me.viewerMode ? (
                <ViewerModeIcon size={20} />
              ) : (
                showParticipantVote(me.vote)
              )}
            </Participant>

            {participantsList.map(({ name, vote, viewerMode, id }, key) => (
              <Participant key={key}>
                <Name viewerMode={viewerMode}>{name}</Name>
                {showParticipantsOptions({ vote, viewerMode, id })}
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
