import React, { FC } from 'react';

import { Container, Credits, Name } from './styles'

const Footer: FC = () => {
  return (
    <Container>
      <Credits>Designed by <Name href="https://github.com/gpaiva00" target="_blank">Gabriel Paiva</Name></Credits>
    </Container>
  )
}

export default Footer
