import { parseToFloat, parseToInt } from '.'
import { Participant } from '../typings'

interface Result {
  id: string
  votes: number
}

interface CalculateReturn {
  results: Result[]
  average: number
}

export const calculateVotingResult = (
  participants: Participant[]
): CalculateReturn | false => {
  try {
    const { results, votesSum, votesQuantity } = participants.reduce(
      (acc, curr) => {
        // TODO aceitar esses votos, mostrar na tela mas usar no cálculo
        if (
          !curr.vote.length ||
          curr.vote === 'question' ||
          curr.vote === 'coffee'
        )
          return acc

        const item = {
          id: curr.vote,
          votes: 0,
        }

        item.votes = participants.filter(
          ({ vote }) => vote === curr.vote
        ).length

        const itemIndex = acc.results.findIndex(item => item.id === curr.vote)

        if (itemIndex !== -1) acc.results[itemIndex] = item
        else acc.results.push(item)

        acc.votesSum += parseToInt(curr.vote)
        acc.votesQuantity++

        return acc
      },
      {
        votesSum: 0,
        votesQuantity: 0,
        results: [],
      }
    )

    const average = parseToFloat((votesSum / votesQuantity).toFixed(2)) || 0

    return { average, results }
  } catch (error) {
    console.error('Error trying to set voting results', error)
    return false
  }
}
