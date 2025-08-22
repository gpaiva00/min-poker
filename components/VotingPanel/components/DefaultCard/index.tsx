import React, { FC, useState } from 'react'

import { Card, CardIcon, CardText } from './styles'

interface CardProps {
  text: string | JSX.Element
  id: string
  handleVoteClick(id: string): void
  isSelected: string
}

const DefaultCard: FC<CardProps> = ({
  text,
  id,
  handleVoteClick,
  isSelected,
}) => (
  <Card selected={isSelected === id} onClick={() => handleVoteClick(id)}>
    {id === 'coffee' ? (
      <CardIcon>{text}</CardIcon>
    ) : (
      <CardText>{text}</CardText>
    )}
  </Card>
)

export default DefaultCard
