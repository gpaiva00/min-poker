import styled from 'styled-components'
import { Input as OriginalInput, Button as OriginalButton } from '..'

interface InputContainerProps {
  imHost: boolean
}

export const Container = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: ${({ imHost }) => (imHost ? '400px' : '300px')};
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
`

export const SwitchContainer = styled(InputContainer)`
  align-items: flex-end;
`

export const Input = styled(OriginalInput)`
  width: 100%;
  margin-right: 0;
`

export const Button = styled(OriginalButton)`
  width: 100%;
`

export const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};

  margin-bottom: ${({ theme }) => theme.margins.small};
`
