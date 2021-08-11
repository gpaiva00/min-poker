import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { DefaultCard } from '../'
import {
  ANIMATION_DURATION,
  CARDS_TO_VOTE,
  DELAY_DURATION,
} from '../../../../constants'
import { CardsContainer } from '../../styles'

interface VotingCardsProps {
  handleVoteClick(id: string): void
  showResults: boolean
}

const VotingCards: FC<VotingCardsProps> = ({
  handleVoteClick,
  showResults,
}) => {
  const [isCardSelected, setIsCardSelected] = useState('')

  const handleCardClick = (voteId: string) => {
    handleVoteClick(voteId)
    setIsCardSelected(voteId)
  }

  useEffect(() => {
    if (showResults) {
      setIsCardSelected('')
    }
  }, [showResults])

  return (
    <CardsContainer>
      {CARDS_TO_VOTE.map((item, key) => (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: ANIMATION_DURATION,
            delay: DELAY_DURATION,
          }}
        >
          <DefaultCard
            handleVoteClick={handleCardClick}
            text={item.text}
            id={item.id}
            key={key}
            isSelected={isCardSelected}
          />
        </motion.div>
      ))}
    </CardsContainer>
  )
}

export default VotingCards
