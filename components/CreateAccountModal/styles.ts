import styled from 'styled-components'
import { DefaultDescription } from '../../styles/global'
import { DefaultButton as OriginalButton } from '../Modal/styles'

import { DefaultContainer } from '../Modal/styles'

export const Container = styled(DefaultContainer)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 340px;
`

export const Description = styled(DefaultDescription)`
  text-align: center;
`
