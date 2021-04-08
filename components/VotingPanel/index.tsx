import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { FiCoffee } from 'react-icons/fi'
import DefaultCard from '../DefaultCard'
import ResultCard from '../ResultCard'

import {
  AverageContainer,
  AverageTitle,
  AverageValue,
  CardsContainer,
  Container,
  Title,
  TitleContainer,
  Waiting,
  WaitingContainer,
} from './styles'
import { VotingPanelProps } from './typings'

const VotingPanel: FC<VotingPanelProps> = ({ room, handleVoteClick }) => {
  const [isCardSelected, setIsCardSelected] = useState('')

  const { isVoting, showResults, results } = room

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
    <Container>
      {!isVoting && !showResults && (
        <WaitingContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <Waiting>waiting voting to start</Waiting>
          </motion.div>
        </WaitingContainer>
      )}

      {isVoting && !showResults && (
        <>
          <TitleContainer>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 1 }}
            >
              <Title>Choose an option</Title>
            </motion.h1>
          </TitleContainer>

          <CardsContainer>
            {cardsToVote.map((item, key) => (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.5 }}
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
      )}

      {showResults && !isVoting && (
        <>
          <TitleContainer>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 1 }}
            >
              <Title>Results</Title>
            </motion.h1>

            <AverageContainer>
              <AverageTitle>Average:</AverageTitle>
              <AverageValue>{results.average}</AverageValue>
            </AverageContainer>
          </TitleContainer>

          {!results.items.length && (
            <WaitingContainer>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 1 }}
              >
                <Waiting>Nobody voted</Waiting>
              </motion.div>
            </WaitingContainer>
          )}

          <CardsContainer>
            {results.items.map((item, key) => (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.5 }}
              >
                <ResultCard id={item.id} key={key} votes={item.votes} />
              </motion.div>
            ))}
          </CardsContainer>
        </>
      )}
    </Container>
  )
}

export default VotingPanel
