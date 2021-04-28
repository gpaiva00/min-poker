import styled from 'styled-components'

interface CardProps {
  selected: boolean
}

export const Card = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-width: 0.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightSmoke};
  border-radius: 6px;

  width: 100px;
  height: 100px;

  margin: ${({ theme }) => theme.margins.normal};
  cursor: pointer;
  background: transparent;

  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'transparent'};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.lightText : theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.lightText};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const CardIcon = styled.div``

export const CardText = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.biggest};
`
