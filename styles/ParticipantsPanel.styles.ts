import styled from 'styled-components'
import Button from '../components/Button'

export const Container = styled.div`
  margin-left: ${({ theme }) => theme.margins.medium};
  /* background: darkgray; */
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

  /* background: lightgray; */
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

  height: 85%;
  width: 100%;

  padding-top: ${({ theme }) => theme.paddings.normal};

  overflow: auto;
`

export const MyName = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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
  padding: ${({ theme }) => theme.margins.normal};
  width: 100%;
`

export const StartVoting = styled(Button)`
  width: 100%;
`

export const CloseRoom = styled(StartVoting)`
  outline: none;
`
