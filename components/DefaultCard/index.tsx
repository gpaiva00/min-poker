import React, { FC } from 'react'

import { Card, CardIcon, CardText } from './styles'

interface CardProps {
  text: string | JSX.Element;
  id: string;
}

const DefaultCard: FC<CardProps> = ({ text, id }) => (
  <Card>
    { id === 'coffee'
      ? <CardIcon>{text}</CardIcon>
      : <CardText>{text}</CardText>
    }
  </Card>
)

export default DefaultCard
