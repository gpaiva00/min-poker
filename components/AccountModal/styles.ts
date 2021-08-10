import styled from 'styled-components'
import { DefaultButton as OriginalButton } from '../Modal/styles'

import { DefaultContainer } from '../Modal/styles'

export const Container = styled(DefaultContainer)`
  height: 340px;
`

export const Button = styled(OriginalButton)`
  /* margin-top: ${({ theme }) => theme.margins.m}; */
`
