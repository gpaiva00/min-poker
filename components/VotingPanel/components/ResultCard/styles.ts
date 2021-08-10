import styled from 'styled-components'
import { DEFAULT_CARD_SIZE } from '../DefaultCard/styles'

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  border-width: 0.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.lightText};
  border-radius: 6px;

  width: ${DEFAULT_CARD_SIZE};
  height: ${DEFAULT_CARD_SIZE};

  margin: ${({ theme }) => theme.margins.s};
`

export const CardIcon = styled.div``

export const TextContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;

  /* background: lightgray; */
`

export const Votes = styled.small`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  margin-bottom: 5px;
`
