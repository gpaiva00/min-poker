import styled from 'styled-components'
import Button from '../components/Button'

import { MdEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import { RiVipCrownFill } from 'react-icons/ri'

import {
  AiFillMinusCircle,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai'

import { lighten } from 'polished'
import { LIGHTEN_AMOUNT_NORMAL } from '../constants'

interface NameProps {
  viewerMode?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin: ${({ theme }) => `0 ${theme.margins.xl}`};

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    align-items: center;
  }

  /* background: darkgray; */
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`

export const EditIcon = styled(MdEdit)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => lighten(LIGHTEN_AMOUNT_NORMAL, theme.colors.text)};
  }
`

export const DoneIcon = styled(FaCheck)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => lighten(LIGHTEN_AMOUNT_NORMAL, theme.colors.text)};
  }
`

export const ViewerModeIcon = styled(FaRegEye)`
  color: ${({ theme }) => theme.colors.smoke};
`

export const NoVoteIcon = styled(AiFillCloseCircle)`
  color: ${({ theme }) => theme.colors.danger};
`

export const VotedIcon = styled(AiFillCheckCircle)``

export const RemoveIcon = styled(AiFillMinusCircle)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};

  &:hover {
    color: ${({ theme }) =>
      lighten(LIGHTEN_AMOUNT_NORMAL, theme.colors.danger)};
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.s};

  margin-bottom: ${({ theme }) => theme.margins.s};
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`

export const PanelContainer = styled.div`
  width: 300px;
  height: 700px;

  @media (max-width: 768px) {
    width: 100%;
    height: 80vh;
    ${({ theme }) => `padding: 0 ${theme.margins.s}`};
    margin-bottom: 100px;
  }

  /* background: lightblue; */
`

export const Panel = styled.div`
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightSmoke};
  border-radius: 6px;

  height: 550px;
  overflow: hidden;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;

  height: 450px;
  width: 100%;

  padding-top: ${({ theme }) => theme.paddings.s};

  overflow: auto;

  @media (max-width: 768px) {
    height: 57vh;
  }
`

export const MyName = styled.p<NameProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
  padding-top: 5px;

  color: ${({ theme, viewerMode }) =>
    viewerMode ? theme.colors.smoke : theme.colors.primary};
`

export const OwnerIcon = styled(RiVipCrownFill)`
  position: absolute;
  margin-top: -10px;
`

export const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => `padding: ${theme.paddings.s} ${theme.margins.s}`};

  &:last-child {
    padding-bottom: 0;
  }
`

export const Name = styled.p<NameProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${({ theme }) => theme.fontSizes.s};

  color: ${({ theme, viewerMode }) =>
    viewerMode ? theme.colors.smoke : theme.colors.primary};
`

export const Vote = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
`
