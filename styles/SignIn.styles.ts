import styled from 'styled-components'
import { Button as OriginalButton } from '../components'
import { Text } from '../components/Button/styles'
import OriginalMinPokerTitle from '../components/MinPokerTitle'

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-top: 15%;
  height: 100%;
  padding-bottom: ${({ theme }) => theme.margins.m};
`

export const InstructionText = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.s};
`

export const SignInButton = styled(OriginalButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ButtonText = styled(Text)`
  display: inline;

  margin-left: ${({ theme }) => theme.margins.s};
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 150px;
  width: 340px;
  margin-top: ${({ theme }) => theme.margins.m};
`

export const MinPokerTitle = styled(OriginalMinPokerTitle)`
  padding-top: ${({ theme }) => theme.margins.m};
`
