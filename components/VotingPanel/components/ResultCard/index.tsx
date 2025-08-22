import React, { FC } from 'react'
import { FiCoffee } from 'react-icons/fi'
import { i18n } from '../../../../translate/i18n'
import { RESULTS_TEXT } from '../../../../constants'

import { Card, CardIcon, CardText, TextContainer, Votes } from './styles'

interface CardProps {
  id: string
  votes: number
}

const ResultCard: FC<CardProps> = ({ id, votes }) => (
  <Card>
    <TextContainer>
      {id === 'coffee' ? (
        <CardIcon>
          <FiCoffee size={40} />
        </CardIcon>
      ) : (
        <CardText>{RESULTS_TEXT[id]}</CardText>
      )}
    </TextContainer>
    <Votes>
      {votes}{' '}
      {votes === 1 ? i18n.t('descriptions.vote') : i18n.t('descriptions.votes')}
    </Votes>
  </Card>
)

export default ResultCard
