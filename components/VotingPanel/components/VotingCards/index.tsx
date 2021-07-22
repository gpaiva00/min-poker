import React, { FC, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { FiCoffee } from 'react-icons/fi'

import { CardsContainer, Title, TitleContainer } from './styles'
import { DefaultCard } from '../'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../../../constants'
import { i18n } from '../../../../translate/i18n'

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

  const cardsToVote = [
    {
      text: '1',
      id: '1',
    },
    {
      text: '2',
      id: '2',
    },
    {
      text: '3',
      id: '3',
    },
    {
      text: '5',
      id: '5',
    },
    {
      text: '8',
      id: '8',
    },
    {
      text: '13',
      id: '13',
    },
    {
      text: '21',
      id: '21',
    },
    {
      text: '34',
      id: '34',
    },
    {
      text: '?',
      id: 'question',
    },
    {
      text: <FiCoffee size={40} />,
      id: 'coffee',
    },
  ]

  useEffect(() => {
    if (showResults) {
      setIsCardSelected('')
    }
  }, [showResults])

  return (
    <>
      <TitleContainer>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
        >
          <Title>{i18n.t('titles.chooseAnOptions')}</Title>
        </motion.h1>
      </TitleContainer>

      <CardsContainer>
        {cardsToVote.map((item, key) => (
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
    </>
  )
}

export default VotingCards
