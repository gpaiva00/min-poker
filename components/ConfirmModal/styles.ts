import styled from 'styled-components'
import { Button as OriginalButton } from '..'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  text-align: center;
  width: 100%;
  height: 170px;
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  margin-top: ${({ theme }) => theme.margins.normal};
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`

export const Button = styled(OriginalButton)`
  width: 100%;
`
