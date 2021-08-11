import React, { FC } from 'react'

import {
  ButtonContainer,
  Container,
  ImageContainer,
  InfoContainer,
  InfoText,
  InfoTextContainer,
  MinPokerImage,
  Panel,
  PlayStopButton,
  PlayStopButtonText,
  StartVoting,
} from './styles'

import { FaPlay, FaStop } from 'react-icons/fa'
import { VotingPanelProps } from './typings'
import { i18n } from '../../translate/i18n'

import { Waiting, VotingCards } from './components'
import ResultCards from './components/ResultCards'

const VotingPanel: FC<VotingPanelProps> = ({
  room,
  me,
  handleVoteClick,
  imHost,
  setStartVoting,
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

  const renderInfoText = () => {
    if (!isVoting && !showResults) return ''

    if (!me.viewerMode && !showResults) return i18n.t('titles.chooseAnOption')
    else if (showResults && !isVoting) return i18n.t('titles.results')
  }

  return (
    <Container>
      <InfoTextContainer>
        <InfoText>{renderInfoText()}</InfoText>
      </InfoTextContainer>
      <Panel imHost={imHost}>
        {imHost && (
          <ButtonContainer>
            <PlayStopButton onClick={() => setStartVoting(!isVoting)}>
              {isVoting ? <FaStop size={20} /> : <FaPlay size={20} />}

              <PlayStopButtonText>
                {isVoting
                  ? i18n.t('buttons.finishVoting')
                  : i18n.t('buttons.startVoting')}
              </PlayStopButtonText>
            </PlayStopButton>
          </ButtonContainer>
        )}
        <InfoContainer>{renderPage()}</InfoContainer>
      </Panel>
    </Container>
  )
}

export default VotingPanel
