import React, { FC } from 'react'
import { FiCoffee } from 'react-icons/fi'

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
      <CardIcon>
        <FiCoffee size={30} />
      </CardIcon>
    ) : (
      <CardText>{text}</CardText>
    )}
  </Card>
)

export default DefaultCard
