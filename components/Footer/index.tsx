import React, { FC } from 'react'

import { Container, Credits, Name } from './styles'
import { ThemeButton } from '../ThemeButton'

interface FooterProps {
  showCredits?: boolean
}

const Footer: FC<FooterProps> = ({ showCredits = true }) => (
  <Container>
    {showCredits && (
      <Credits>
        Designed by{' '}
        <Name href="https://github.com/gpaiva00" target="_blank">
          Gabriel Paiva
        </Name>
      </Credits>
    )}

    <ThemeButton />
  </Container>
)

export default Footer
