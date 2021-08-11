import React, { FC } from 'react'
import { FiCoffee } from 'react-icons/fi'
import { i18n } from '../../../../translate/i18n'
import { RESULTS_TEXT } from '../../../../constants'

import { Card, CardIcon, TextContainer, Votes } from './styles'
import { CardText as DefaultCardText } from '../DefaultCard/styles'

interface CardProps {
  id: string
  votes: number
}

const ResultCard: FC<CardProps> = ({ id, votes }) => (
  <Card>
    <TextContainer>
      {id === 'coffee' ? (
        <CardIcon>
          <FiCoffee size={30} />
        </CardIcon>
      ) : (
        <DefaultCardText>{RESULTS_TEXT[id]}</DefaultCardText>
      )}
    </TextContainer>
    <Votes>
      {votes}{' '}
      {votes === 1 ? i18n.t('descriptions.vote') : i18n.t('descriptions.votes')}
    </Votes>
  </Card>
)

export default ResultCard
