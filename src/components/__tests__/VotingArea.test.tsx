import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VotingArea } from '../VotingArea'
import { Room } from '@/types'

const mockRoom: Room = {
  id: 'room-123',
  name: 'Test Room',
  ownerId: 'owner-123',
  participants: [
    { id: 'user-1', name: 'User 1', isOwner: false },
    { id: 'user-2', name: 'User 2', isOwner: true }
  ],
  currentRound: null,
  votingHistory: [],
  settings: { autoReveal: false, revealDelay: 5000 },
  createdAt: Date.now(),
  lastActivity: Date.now()
}

describe('VotingArea', () => {
  it('deve renderizar', () => {
    const { container } = render(
      <VotingArea
        room={mockRoom}
        currentUser='User 1'
        countdown={null}
        onVote={vi.fn()}
        onStartNewRound={vi.fn()}
        onRevealVotes={vi.fn()}
      />
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('deve aceitar prop countdown', () => {
    expect(() => {
      render(
        <VotingArea
          room={mockRoom}
          currentUser='User 1'
          countdown={5}
          onVote={vi.fn()}
          onStartNewRound={vi.fn()}
          onRevealVotes={vi.fn()}
        />
      )
    }).not.toThrow()
  })

  it('deve aceitar callbacks', () => {
    expect(() => {
      render(
        <VotingArea
          room={mockRoom}
          currentUser='User 1'
          countdown={null}
          onVote={vi.fn()}
          onStartNewRound={vi.fn()}
          onRevealVotes={vi.fn()}
        />
      )
    }).not.toThrow()
  })

  it('deve renderizar sem countdown', () => {
    expect(() => {
      render(
        <VotingArea
          room={mockRoom}
          currentUser='User 1'
          countdown={null}
          onVote={vi.fn()}
          onStartNewRound={vi.fn()}
          onRevealVotes={vi.fn()}
        />
      )
    }).not.toThrow()
  })
})
