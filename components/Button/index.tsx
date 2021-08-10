import React, { FC } from 'react'
import Loading from '../Loading'

import { Container, Text } from './styles'
import { ButtonProps } from './typings'

const Button: FC<ButtonProps> = ({
  onClick,
  variant = 'primary',
  loading,
  children,
  size = 's',
  ...props
}) => (
  <Container variant={variant} onClick={onClick} disabled={loading} {...props}>
    {loading ? (
      <Loading color={variant} />
    ) : (
      <Text size={size} variant={variant}>
        {children}
      </Text>
    )}
  </Container>
)

export default Button
