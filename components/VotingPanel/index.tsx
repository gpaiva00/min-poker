import React, { FC } from 'react'

import { Container, ImageContainer, MinPokerImage } from './styles'
import { VotingPanelProps } from './typings'
import { i18n } from '../../translate/i18n'

import { Waiting, VotingCards } from './components'
import ResultCards from './components/ResultCards'

const VotingPanel: FC<VotingPanelProps> = ({
  room,
  me,
  handleVoteClick,
  loading,
}) => {
  const { isVoting, showResults, results } = room

  const renderPage = () => {
    if (!isVoting && !showResults)
      return (
        <Waiting description={i18n.t('descriptions.waitingVotingToStart')} />
      )

    if (me.viewerMode && !showResults)
      return <Waiting description={i18n.t('descriptions.votingIsRunning')} />
    else if (!me.viewerMode && !showResults)
      return (
        <VotingCards
          handleVoteClick={handleVoteClick}
          showResults={showResults}
        />
      )

    if (showResults && !isVoting) return <ResultCards results={results} />
  }

  return loading ? (
    <ImageContainer>
      <MinPokerImage src="/minPoker.png" />
    </ImageContainer>
  ) : (
    <Container>{renderPage()}</Container>
  )
}

export default VotingPanel
