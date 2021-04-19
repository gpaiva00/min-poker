import { calculateVotingResult } from '../utils'

import { mock } from './mocks/calculateResult.mock'

describe('Calculate result', () => {
  mock.forEach((mockItem, index) => {
    const { average, results } = calculateVotingResult(mockItem.items)

    it(`Average test ${index + 1}`, () => {
      expect(average).toEqual(mockItem.average)
    })

    it(`Results test ${index + 1}`, () => {
      expect(results).toEqual(mockItem.results)
    })
  })
})
