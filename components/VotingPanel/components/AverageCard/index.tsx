import React, { FC } from 'react'
import { i18n } from '../../../../translate/i18n'

import { Card } from '../ResultCard/styles'
import { AverageContainer, AverageTitle, AverageValue } from './styles'

interface CardProps {
  average: number
}

const AverageCard: FC<CardProps> = ({ average }) => (
  <Card>
    <AverageContainer>
      <AverageTitle>{i18n.t('titles.average')}</AverageTitle>
      <AverageValue>{average}</AverageValue>
    </AverageContainer>
  </Card>
)

export default AverageCard
