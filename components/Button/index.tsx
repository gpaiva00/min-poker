import React, { FC } from 'react'

import { Container, Text } from './styles'
import { ButtonProps } from './typings'


const Button: FC<ButtonProps> = ({ onClick, variant =  'primary', children, ...props }) => (
  <Container variant={variant} onClick={onClick} {...props}>

    <Text variant={variant}>{children}</Text>
  </Container>
)

export default Button
