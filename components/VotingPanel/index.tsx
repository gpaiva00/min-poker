import React, { FC } from 'react'
import { motion } from 'framer-motion'

import { FiCoffee } from 'react-icons/fi'
import DefaultCard from '../DefaultCard'
import ResultCard from '../ResultCard'

import {
  CardsContainer,
  Container,
  Title,
  TitleContainer,
  Waiting,
  WaitingContainer,
} from './styles'
import { VotingPanelProps } from './typings'

const VotingPanel: FC<VotingPanelProps> = ({
  startVoting = true,
  showResults = false,
}) => {
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

  const resultCards = [
    {
      text: '1',
      id: 'question',
      votes: 3,
    },
    {
      text: '4',
      id: 'question',
      votes: 2,
    },
    {
      text: '1',
      id: 'question',
      votes: 1,
    },
    {
      text: <FiCoffee size={40} />,
      id: 'coffee',
      votes: 1,
    },
  ]

  return (
    <Container>
      g
      {!startVoting && (
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
      {startVoting && (
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
            {/* {
              resultCards.map((item, key) => (
                <ResultCard text={item.text} id={item.id} key={key} votes={item.votes} />
              ))
            } */}
            {cardsToVote.map((item, key) => (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.5 }}
              >
                <DefaultCard text={item.text} id={item.id} key={key} />
              </motion.div>
            ))}
          </CardsContainer>
        </>
      )}
    </Container>
  )
}

export default VotingPanel
