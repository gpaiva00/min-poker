import React, { FC } from 'react'
import Loading from '../Loading'

import { Container, Text } from './styles'
import { ButtonProps } from './typings'


const Button: FC<ButtonProps> = ({ onClick, variant =  'primary', loading, children, ...props }) => (
  <Container variant={variant} onClick={onClick} {...props}>
    { loading ? <Loading color={variant} /> : <Text variant={variant}>{children}</Text> }
  </Container>
)

export default Button
