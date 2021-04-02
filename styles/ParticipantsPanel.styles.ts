import styled from 'styled-components'
import Button from '../components/Button'

export const Container = styled.div`
  margin-left: ${({ theme }) => theme.margins.medium};
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  margin-bottom: ${({ theme }) => theme.margins.normal};
  color: ${({ theme }) => theme.colors.smoke};
`

export const PanelContainer = styled.div`
  width: 300px;
  height: 700px;

`

export const Panel = styled.div`
  border-width: 0.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightSmoke};

  height: 90%;
  overflow: hidden;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;

  height: 84%;
  width: 100%;

  padding-top: ${({ theme }) => theme.paddings.normal};

  overflow: auto;
`

export const MyName = styled.p`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.regular};

`

export const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => `padding: ${theme.paddings.normal} ${theme.margins.normal}`}
`

export const Name = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};

`

export const Vote =  styled.p`
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

export const CloseRoom = styled(StartVoting)``
