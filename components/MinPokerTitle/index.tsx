import React, { FC } from 'react'
import Link from 'next/link'

import { Container, MinText, Title } from './styles'

const MinPokerTitle: FC = () => (
  <Link href="/">
    <Container>
      <MinText>min</MinText>
      <Title>POKER</Title>
      {/* <HeaderImage src="/minPoker.png" /> */}
    </Container>
  </Link>
)

export default MinPokerTitle
