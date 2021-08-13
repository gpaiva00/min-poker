import React, { FC, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { ParticipantsPanelProps } from './typings'
import { Participant as ParticipantProps } from '../../typings'

import {
  Container,
  List,
  Panel,
  PanelContainer,
  EditIcon,
  DoneIcon,
  RemoveIcon,
  ViewerModeIcon,
} from '../../styles/ParticipantsPanel.styles'

import { sortParticipants } from '../../utils'
import participantsMock from '../../test/mocks/participantsList.mock'
import Participant from '../Participant'

const ParticipantsPanel: FC<ParticipantsPanelProps> = ({
  imHost,
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

  const { participants, showResults, isVoting, hostId } = room

  const { name, userId } = userInfo

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
    let newParticipants = participantsMock.filter(
      ({ id }) => id !== '' && id !== userId
    )

    if (!newParticipants.length) setIsEditing(false)

    setParticipantsList(sortParticipants(newParticipants))
  }, [participants])

  return (
    <Container>
      {/* <TitleContainer>
        <Title>{i18n.t('titles.participants')}</Title>
        {imHost && showEditOptions()}
      </TitleContainer> */}

      <PanelContainer>
        {loading ? (
          <Skeleton height={30} />
        ) : (
          // <Participant>
          //   <MyName viewerMode={me.viewerMode}>
          //     {imHost && <OwnerIcon size={12} />}
          //     {name}
          //   </MyName>

          //   {me.viewerMode ? (
          //     <ViewerModeIcon size={20} />
          //   ) : (
          //     showParticipantVote(me.vote)
          //   )}
          // </Participant>
          <Participant
            name={me.name}
            vote={me.vote}
            isVoting={isVoting}
            showResults={showResults}
            imHost={imHost}
          />
        )}

        {loading ? (
          <Skeleton height={25} count={5} />
        ) : (
          participantsList.map(({ name, vote, viewerMode, id }, key) => (
            // <Participant key={key}>
            //   <Name viewerMode={viewerMode}>
            //     {id === hostId && <OwnerIcon size={12} />}
            //     {name}
            //   </Name>
            //   {showParticipantsOptions({ vote, viewerMode, id })}
            // </Participant>
            <Participant
              key={key}
              imHost={id === hostId}
              showResults={showResults}
              isVoting={isVoting}
              name={name}
              vote={vote}
            />
          ))
        )}
      </PanelContainer>
    </Container>
  )
}

export default ParticipantsPanel
