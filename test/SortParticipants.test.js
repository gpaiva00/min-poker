import { sortParticipants } from '../utils'

import participantsList from './mocks/participantsList.mock'

const expectedListSort = [
  {
    id: '1',
    name: 'Gab',
    vote: '2',
    viewerMode: false,
  },
  {
    id: '2',
    name: 'John',
    vote: '5',
    viewerMode: false,
  },
  {
    id: '4',
    name: 'Carl',
    vote: '3',
    viewerMode: false,
  },
  {
    id: '6',
    name: 'Mike',
    vote: 'question',
    viewerMode: false,
  },
  {
    id: '3',
    name: 'Betty',
    vote: '3',
    viewerMode: true,
  },
  {
    id: '5',
    name: 'Bishop',
    vote: '1',
    viewerMode: true,
  },
]

describe('Sort Participants List', () => {
  it('Sort list', () => {
    const sortedList = sortParticipants(participantsList)
    expect(sortedList).toEqual(expectedListSort)
  })
})
