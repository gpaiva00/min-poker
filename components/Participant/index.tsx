import React, { FC } from 'react'

import { FiCoffee } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'

import {
  Container,
  OwnerIcon,
  NoVoteIcon,
  Vote,
  VotedIcon,
  Name,
  VoteContainer,
  CoffeeContainer,
  WhileVotingContainer,
  ClockGif,
} from './styles'
import { ANIMATION_DURATION, RESULTS_TEXT } from '../../constants'
import { UserAvatar } from '../Header/styles'
import { motion } from 'framer-motion'

interface ParticipantProps {
  name: string
  vote: string
  imHost: boolean
  isVoting: boolean
  showResults: boolean
}

const Participant: FC<ParticipantProps> = ({
  name,
  vote,
  imHost,
  isVoting,
  showResults,
}) => {
  const showParticipantVote = (vote: string) => {
    let voteResult: unknown

    if (!isVoting && !showResults) return

    if (showResults && !vote.length) voteResult = <NoVoteIcon size={28} />
    else if (!vote.length)
      return (
        <WhileVotingContainer>
          <BiTime size={28} />
        </WhileVotingContainer>
      )
    else if (vote.length && !showResults) voteResult = <VotedIcon size={28} />
    else if (vote === 'coffee')
      return (
        <CoffeeContainer>
          <Vote>
            <FiCoffee size={28} />
          </Vote>
        </CoffeeContainer>
      )
    else voteResult = RESULTS_TEXT[vote]

    return (
      <VoteContainer>
        <Vote>{voteResult}</Vote>
      </VoteContainer>
    )
  }

  return (
    <Container>
      {showParticipantVote(vote)}
      {imHost && <OwnerIcon size={16} />}
      <UserAvatar round name={name} size="130" />
      <Name>{name}</Name>
    </Container>
  )
}

export default Participant
