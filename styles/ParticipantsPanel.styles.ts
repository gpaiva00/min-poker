import styled from 'styled-components'
import Button from '../components/Button'

import { MdEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { AiFillMinusCircle } from 'react-icons/ai'

import { lighten } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin-left: ${({ theme }) => theme.margins.normal};

  @media (max-width: 768px) {
    /* height: 100vh; */
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
  margin-right: ${({ theme }) => theme.margins.small};

  &:hover {
    color: ${({ theme }) => lighten(0.2, theme.colors.text)};
  }
`

export const DoneIcon = styled(FaCheck)`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.margins.small};

  &:hover {
    color: ${({ theme }) => lighten(0.2, theme.colors.text)};
  }
`

export const RemoveIcon = styled(AiFillMinusCircle)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};

  &:hover {
    color: ${({ theme }) => lighten(0.1, theme.colors.danger)};
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.small};

  margin-bottom: ${({ theme }) => theme.margins.normal};
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`

export const PanelContainer = styled.div`
  width: 300px;
  height: 700px;

  @media (max-width: 768px) {
    width: 100%;
    height: 80vh;
    ${({ theme }) => `padding: 0 ${theme.margins.normal}`};
    margin-bottom: 100px;
  }
`

export const Panel = styled.div`
  border-width: 0.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightSmoke};
  border-radius: 6px;

  height: 90%;
  overflow: hidden;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;

  height: 530px;
  width: 100%;

  padding-top: ${({ theme }) => theme.paddings.normal};

  overflow: auto;

  @media (max-width: 768px) {
    height: 60vh;
  }
`

export const MyName = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  /* &:hover {
    text-decoration: underline;
  } */
`

export const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => `padding: ${theme.paddings.normal} ${theme.margins.normal}`};

  &:last-child {
    padding-bottom: 0;
  }
`

export const Name = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
`

export const Vote = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.regular};
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.margins.normal};
  width: 100%;
`

export const StartVoting = styled(Button)`
  width: 100%;
`

export const DeleteRoom = styled(StartVoting)`
  outline: none;
`
