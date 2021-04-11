import React, { FC } from 'react'

import { motion } from 'framer-motion'

import {
  AverageContainer,
  AverageTitle,
  AverageValue,
  CardsContainer,
  Title,
  TitleContainer,
} from './styles'
import { ResultCard, Waiting } from '../'
import { Result } from '../../../../typings'

interface ResultCardsProps {
  results: Result
}

const ResultCards: FC<ResultCardsProps> = ({ results }) => (
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

    {!results.items.length && <Waiting description="nobody voted" />}

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
)

export default ResultCards
