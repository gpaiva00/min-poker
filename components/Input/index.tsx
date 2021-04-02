import React, { ButtonHTMLAttributes, FC } from 'react'

import { Container, StyledInput } from './styles'
import { InputProps } from './typings'


const Input: FC<InputProps> = ({ value, placeholder, variant =  'primary', children, ...props }) => (
  <Container variant={variant}>
    <StyledInput type="text" value={value} placeholder={placeholder} {...props}/>
  </Container>
)

export default Input
