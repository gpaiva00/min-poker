import styled from 'styled-components'

import { Text } from '../Button/styles'
import {
  DefaultButton,
  DefaultContainer,
  InputContainer,
} from '../Modal/styles'

export const Container = styled(DefaultContainer)`
  height: 300px;
`

export const SwitchContainer = styled(InputContainer)`
  align-items: flex-end;
`

export const Button = styled(DefaultButton)`
  background: ${({ theme }) => theme.colors.modalButtonBackground};

  &:hover {
    background: ${({ theme }) => theme.colors.darkButtonHover};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.white};
  }
`
