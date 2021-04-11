import React, { FC, useEffect } from 'react'

import { Container } from './styles'
import { VotingPanelProps } from './typings'

import { Waiting, VotingCards } from './components'
import ResultCards from './components/ResultCards'

const VotingPanel: FC<VotingPanelProps> = ({ room, me, handleVoteClick }) => {
  const { isVoting, showResults, results } = room

  const renderPage = () => {
    if (!isVoting && !showResults)
      return <Waiting description="waiting voting to start" />

    if (me.viewerMode && !showResults)
      return <Waiting description="Voting is running" />
    else if (!me.viewerMode && !showResults)
      return (
        <VotingCards
          handleVoteClick={handleVoteClick}
          showResults={showResults}
        />
      )

    if (showResults && !isVoting) return <ResultCards results={results} />
  }

  return <Container>{renderPage()}</Container>
}

export default VotingPanel
