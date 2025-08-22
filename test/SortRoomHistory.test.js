import { sortRoomHistoryByDate } from '../utils'

import roomHistoryMock from './mocks/roomHistory.mock'

const expectedListSort = {
  userId: '1',
  history: [
    {
      roomId: '3',
      roomName: 'room3',
      lastVisitDate: new Date('2018-01-03T00:00:00.000Z'),
    },
    {
      roomId: '2',
      roomName: 'room2',
      lastVisitDate: new Date('2018-01-02T00:00:00.000Z'),
    },
    {
      roomId: '1',
      roomName: 'room1',
      lastVisitDate: new Date('2018-01-01T00:00:00.000Z'),
    },
  ],
}

describe('Sort Room History List', () => {
  it('Sort list', () => {
    const sortedList = sortRoomHistoryByDate(roomHistoryMock)
    expect(sortedList).toEqual(expectedListSort)
  })
})
