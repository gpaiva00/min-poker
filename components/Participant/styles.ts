import styled from 'styled-components'
import { RiVipCrownFill } from 'react-icons/ri'

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: ${({ theme }) => `0 ${theme.margins.m}`};
`
export const VoteContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  width: 40px;

  margin-top: -70px;
  margin-left: 60px;

  background: #2f2f30;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px #38383b;
`

export const ClockGif = styled.img`
  background-color: transparent;
  width: 50px;
`

export const CoffeeContainer = styled(VoteContainer)`
  background: #916648;
`

export const WhileVotingContainer = styled(VoteContainer)`
  background: ${({ theme }) => theme.colors.smoke};
  color: #6f6f6f;
`
export const OwnerIcon = styled(RiVipCrownFill)``

export const Name = styled.p`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.margins.xs};
`

export const Vote = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.m};
  color: ${({ theme }) => theme.colors.white};
`

export const NoVoteIcon = styled(AiFillCloseCircle)`
  color: ${({ theme }) => theme.colors.danger};
`

export const VotedIcon = styled(AiFillCheckCircle)`
  color: #37ed47;
`
