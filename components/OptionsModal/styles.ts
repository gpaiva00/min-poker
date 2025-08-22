import styled from 'styled-components'
import { lighten } from 'polished'

import { LIGHTEN_AMOUNT_LOW } from '../../constants'
import { Input as OriginalInput, Button as OriginalButton } from '..'
import { Container as ButtonContainer, Text } from '../Button/styles'
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

  margin-top: ${({ theme }) => theme.margins.small};
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
  background: ${({ theme }) => theme.colors.modalButtonBackground};

  &:hover {
    background: ${({ theme }) => theme.colors.darkButtonHover};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.white};
  }
`

export const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.modalLabel};

  margin-bottom: ${({ theme }) => theme.margins.small};
`
