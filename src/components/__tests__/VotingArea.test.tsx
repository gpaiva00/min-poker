import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { VotingArea } from '../VotingArea'

const mockParticipants = [
  {
    id: 'user-1',
    name: 'User 1',
    isCurrentUser: false,
    mode: 'voting' as const,
    hasVoted: true
  },
  {
    id: 'user-2',
    name: 'User 2',
    isCurrentUser: true,
    mode: 'voting' as const,
    hasVoted: false
  }
]

describe('VotingArea', () => {
  it('deve renderizar', () => {
    const { container } = render(<VotingArea participants={mockParticipants} />)
    expect(container.firstChild).toBeTruthy()
  })

  it('deve aceitar prop countdown', () => {
    expect(() => {
      render(<VotingArea participants={mockParticipants} countdown={5} />)
    }).not.toThrow()
  })

  it('deve aceitar array de participantes', () => {
    expect(() => {
      render(<VotingArea participants={mockParticipants} />)
    }).not.toThrow()
  })

  it('deve renderizar sem countdown', () => {
    expect(() => {
      render(<VotingArea participants={mockParticipants} />)
    }).not.toThrow()
  })
})
