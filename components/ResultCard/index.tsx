import React, { FC } from 'react'

import { Card, CardIcon, CardText, TextContainer, Votes } from './styles'

interface CardProps {
  text: string | JSX.Element;
  id: string;
  votes: number;
}

const ResultCard: FC<CardProps> = ({ text, id, votes }) => (
  <Card>
    <TextContainer>
      { id === 'coffee'
        ? <CardIcon>{text}</CardIcon>
        : <CardText>{text}</CardText>
      }
    </TextContainer>
    <Votes>{votes} {votes === 1 ? 'vote' : 'votes'}</Votes>
  </Card>
)

export default ResultCard
