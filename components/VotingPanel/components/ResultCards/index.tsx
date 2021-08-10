import React, { FC } from 'react'

import { motion } from 'framer-motion'

import { Container } from './styles'

import { i18n } from '../../../../translate/i18n'
import { ResultCard, Waiting } from '../'
import { Result } from '../../../../typings'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../../../constants'
import { CardsContainer } from '../../styles'
import AverageCard from '../AverageCard'

interface ResultCardsProps {
  results: Result
}

const ResultCards: FC<ResultCardsProps> = ({ results }) => (
  <Container>
    {/* <TitleContainer>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
      >
        <Title>{i18n.t('titles.results')}</Title>
      </motion.h1>

    </TitleContainer> */}

    {!results.items.length && (
      <Waiting description={i18n.t('descriptions.nobodyVoted')} />
    )}

    <CardsContainer>
      {results.items.map((item, key) => (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: ANIMATION_DURATION,
            delay: DELAY_DURATION,
          }}
        >
          <ResultCard id={item.id} key={key} votes={item.votes} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          ease: 'easeInOut',
          duration: ANIMATION_DURATION,
          delay: DELAY_DURATION,
        }}
      >
        <AverageCard average={results.average} />
      </motion.div>
    </CardsContainer>
  </Container>
)

export default ResultCards
