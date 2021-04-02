import styled from 'styled-components'

export const Card = styled.div`
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

  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.lightText};
    border-color: ${({ theme }) => theme.colors.blue};
  }
`

export const CardIcon = styled.div``

export const CardText =  styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.biggest};
`
