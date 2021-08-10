import styled from 'styled-components'

interface CardProps {
  selected: boolean
}

const CARD_MARGIN_BOTTOM = '25px'
export const DEFAULT_CARD_SIZE = '58px'

export const Card = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.lightSmoke};
  border-radius: 8px;

  margin-bottom: ${({ selected }) => (selected ? CARD_MARGIN_BOTTOM : 0)};
  margin-right: ${({ theme }) => theme.margins.s};

  width: ${DEFAULT_CARD_SIZE};
  height: ${DEFAULT_CARD_SIZE};

  cursor: pointer;

  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'white'};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.lightText : theme.colors.primary};

  transition: margin-bottom 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${CARD_MARGIN_BOTTOM};
  }
`

export const CardIcon = styled.div``

export const CardText = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
`
