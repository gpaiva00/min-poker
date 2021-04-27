import styled from 'styled-components'

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

  width: 100px;
  height: 100px;

  margin: ${({ theme }) => theme.margins.normal};
`

export const CardIcon = styled.div`
  /* margin-top: ${({ theme }) => theme.margins.small}; */
`

export const TextContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;

  /* background: lightgray; */
`

export const CardText = styled.h1`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.big};
`

export const Votes = styled.small`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};

  margin-bottom: 5px;
`
