import React, { FC } from 'react';

import { FiCoffee } from 'react-icons/fi'
import DefaultCard from '../DefaultCard';
import ResultCard from '../ResultCard';

import { CardsContainer, Container, Title, TitleContainer, Waiting, WaitingContainer } from './styles';
import { VotingPanelProps } from './typings';

const VotingPanel: FC<VotingPanelProps> = ({ startVoting = true }) => {

  const cardsToVote = [
    {
      text: '1',
      id: '1'
    },
    {
      text: '2',
      id: '2'
    },
    {
      text: '3',
      id: '3'
    },
    {
      text: '5',
      id: '5'
    },
    {
      text: '8',
      id: '8'
    },
    {
      text: '13',
      id: '13'
    },
    {
      text: '21',
      id: '21'
    },
    {
      text: '34',
      id: '34'
    },
    {
      text: '?',
      id: 'question'
    },
    {
      text: <FiCoffee size={40} />,
      id: 'coffee'
    },
  ]

  const resultCards = [
    {
      text: '1',
      id: 'question',
      votes: 3
    },
    {
      text: '4',
      id: 'question',
      votes: 2
    },
    {
      text: '1',
      id: 'question',
      votes: 1
    },
    {
      text: <FiCoffee size={40} />,
      id: 'coffee',
      votes: 1
    },
  ]

  return (
    <Container>
      {
        !startVoting && (
          <WaitingContainer>
            <Waiting>waiting voting to start</Waiting>
          </WaitingContainer>
        )
      }

      { startVoting && (
        <>
          <TitleContainer>
            <Title>Choose an option</Title>
          </TitleContainer>

          <CardsContainer>
            {
              resultCards.map((item, key) => (
                <ResultCard text={item.text} id={item.id} key={key} votes={item.votes} />
              ))
            }
          </CardsContainer>
        </>
      )}


    </Container>
  )
}

export default VotingPanel
