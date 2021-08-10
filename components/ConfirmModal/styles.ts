import styled from 'styled-components'
import { DefaultContainer } from '../Modal/styles'

export const Container = styled(DefaultContainer)`
  text-align: center;
  height: 170px;
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.s};

  margin-top: ${({ theme }) => theme.margins.s};
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`
