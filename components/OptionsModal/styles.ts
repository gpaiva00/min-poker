import styled from 'styled-components'

import {
  DefaultButton,
  DefaultContainer,
  InputContainer,
} from '../Modal/styles'
interface ContainerProps {
  imHost: boolean
}

export const Container = styled(DefaultContainer)<ContainerProps>`
  height: ${({ imHost }) => (imHost ? '340px' : '300px')};
`

export const SwitchContainer = styled(InputContainer)`
  align-items: flex-start;
  margin: ${({ theme }) => `${theme.margins.s} 0 `};
`

export const Button = styled(DefaultButton)``
