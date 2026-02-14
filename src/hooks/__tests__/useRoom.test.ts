import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useRoom } from '../useRoom'
import * as firebase from '../../lib/firebase'
import { Room, User, VotingRound } from '../../types'

vi.mock('../../lib/firebase')

const mockFirebase = firebase as any

const mockUser: User = {
  id: 'user-1',
  name: 'Test User',
  isOwner: false
}

const mockOwner: User = {
  id: 'owner-1',
  name: 'Owner User',
  isOwner: true
}

const mockVotingRound: VotingRound = {
  id: 'round-1',
  votes: [],
  isRevealed: false,
  createdAt: Date.now(),
  revealedAt: undefined
}

const mockRoom: Room = {
  id: 'test-room-id',
  name: 'Test Room',
  ownerId: 'owner-1',
  participants: [mockOwner, mockUser],
  currentRound: mockVotingRound,
  votingHistory: [],
  settings: {
    autoReveal: false,
    revealDelay: 5000
  },
  createdAt: Date.now(),
  lastActivity: Date.now()
}

describe('useRoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Testes básicos de tipos e configuração
  it('deve ter tipos definidos corretamente', () => {
    expect(mockUser).toBeDefined()
    expect(mockOwner).toBeDefined()
    expect(mockVotingRound).toBeDefined()
    expect(mockRoom).toBeDefined()
  })

  it('deve ter estrutura de User correta', () => {
    expect(mockUser.id).toBe('user-1')
    expect(mockUser.name).toBe('Test User')
    expect(mockUser.isOwner).toBe(false)
  })

  it('deve ter estrutura de Room correta', () => {
    expect(mockRoom.id).toBe('test-room-id')
    expect(mockRoom.name).toBe('Test Room')
    expect(mockRoom.ownerId).toBe('owner-1')
    expect(mockRoom.participants).toHaveLength(2)
  })

  // Teste básico com renderHook
  it('deve inicializar com valores padrão', () => {
    // Garantir que o DOM está disponível
    if (typeof document === 'undefined') {
      const { JSDOM } = require('jsdom')
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
      global.document = dom.window.document
      global.window = dom.window as any
    }

    const { result } = renderHook(() => useRoom())

    expect(result.current.room).toBeNull()
    expect(result.current.currentUser).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  describe('Estado inicial', () => {
    it('deve inicializar com valores padrão completos', () => {
      const { result } = renderHook(() => useRoom())

      expect(result.current.room).toBeNull()
      expect(result.current.currentUser).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.wasRemoved).toBe(false)
      expect(result.current.wasDeleted).toBe(false)
    })
  })

  describe('createNewRoom', () => {
    it('deve criar uma nova sala com sucesso', async () => {
      const roomId = 'new-room-123'
      mockFirebase.createRoom.mockResolvedValue(roomId)

      let listenCallback: (room: Room | null) => void
      mockFirebase.listenToRoom.mockImplementation(
        (id: string, callback: (room: Room | null) => void) => {
          listenCallback = callback
          return vi.fn()
        }
      )

      const { result } = renderHook(() => useRoom())

      let createdRoomId: string | null = null

      await act(async () => {
        createdRoomId = await result.current.createNewRoom(
          'Test Room',
          'Owner Name',
          'owner-id'
        )
      })

      expect(mockFirebase.createRoom).toHaveBeenCalledWith(
        'Test Room',
        'Owner Name',
        'owner-id'
      )
      expect(createdRoomId).toBe(roomId)
      expect(result.current.loading).toBe(false)

      act(() => {
        listenCallback!({
          ...mockRoom,
          id: roomId,
          participants: [{ id: 'owner-id', name: 'Owner Name', isOwner: true }]
        })
      })

      expect(result.current.room?.id).toBe(roomId)
      expect(result.current.currentUser?.isOwner).toBe(true)
    })

    it('deve lidar com erro ao criar sala', async () => {
      mockFirebase.createRoom.mockRejectedValue(new Error('Firebase error'))

      const { result } = renderHook(() => useRoom())

      let createdRoomId: string | null = null

      await act(async () => {
        createdRoomId = await result.current.createNewRoom(
          'Test Room',
          'Owner Name',
          'owner-id'
        )
      })

      expect(createdRoomId).toBeNull()
      expect(result.current.error).toBe('Erro ao criar sala')
      expect(result.current.loading).toBe(false)
    })
  })

  describe('joinExistingRoom', () => {
    it('deve entrar em uma sala existente com sucesso', async () => {
      mockFirebase.joinRoom.mockResolvedValue(mockUser)

      let listenCallback: (room: Room | null) => void
      mockFirebase.listenToRoom.mockImplementation(
        (id: string, callback: (room: Room | null) => void) => {
          listenCallback = callback
          return vi.fn()
        }
      )

      const { result } = renderHook(() => useRoom())

      let joinResult: boolean = false

      await act(async () => {
        joinResult = await result.current.joinExistingRoom(
          'room-123',
          'user-1',
          'Test User'
        )
      })

      expect(mockFirebase.joinRoom).toHaveBeenCalledWith(
        'room-123',
        'user-1',
        'Test User'
      )
      expect(joinResult).toBe(true)
      expect(result.current.currentUser).toEqual(mockUser)
      expect(result.current.loading).toBe(false)

      act(() => {
        listenCallback!(mockRoom)
      })

      expect(result.current.room).toEqual(mockRoom)
    })

    it('deve lidar com sala não encontrada', async () => {
      mockFirebase.joinRoom.mockResolvedValue(null)

      const { result } = renderHook(() => useRoom())

      let joinResult: boolean = true

      await act(async () => {
        joinResult = await result.current.joinExistingRoom(
          'invalid-room',
          'user-1',
          'Test User'
        )
      })

      expect(joinResult).toBe(false)
      expect(result.current.error).toBe('Sala não encontrada')
      expect(result.current.loading).toBe(false)
    })
  })

  describe('leaveCurrentRoom', () => {
    it('não deve fazer nada se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.leaveCurrentRoom()
      })

      expect(mockFirebase.leaveRoom).not.toHaveBeenCalled()
    })
  })

  describe('vote', () => {
    it('não deve votar se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.vote(5)
      })

      expect(mockFirebase.submitVote).not.toHaveBeenCalled()
    })
  })

  describe('startRound', () => {
    it('não deve iniciar rodada se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.startRound()
      })

      expect(mockFirebase.startNewRound).not.toHaveBeenCalled()
    })
  })

  describe('reveal', () => {
    it('não deve revelar se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.reveal()
      })

      expect(mockFirebase.revealVotes).not.toHaveBeenCalled()
    })
  })

  describe('updateSettings', () => {
    it('não deve fazer nada se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.updateSettings({ autoReveal: true })
      })

      expect(mockFirebase.updateRoomSettings).not.toHaveBeenCalled()
    })
  })

  describe('updateUserName', () => {
    it('não deve fazer nada se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.updateUserName('New Name')
      })

      expect(mockFirebase.updateParticipantName).not.toHaveBeenCalled()
    })
  })

  describe('toggleViewMode', () => {
    it('não deve fazer nada se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.toggleViewMode(true)
      })

      expect(mockFirebase.updateParticipantViewMode).not.toHaveBeenCalled()
    })
  })

  describe('deleteCurrentRoom', () => {
    it('não deve fazer nada se não estiver em uma sala', async () => {
      const { result } = renderHook(() => useRoom())

      await act(async () => {
        await result.current.deleteCurrentRoom()
      })

      expect(mockFirebase.deleteRoom).not.toHaveBeenCalled()
    })
  })

  describe('clearRemovedState e clearDeletedState', () => {
    it('deve limpar estado de removido', () => {
      const { result } = renderHook(() => useRoom())

      act(() => {
        result.current.clearRemovedState()
      })

      expect(result.current.wasRemoved).toBe(false)
    })

    it('deve limpar estado de deletado', () => {
      const { result } = renderHook(() => useRoom())

      act(() => {
        result.current.clearDeletedState()
      })

      expect(result.current.wasDeleted).toBe(false)
    })
  })

  describe('Cleanup', () => {
    it('deve limpar listener ao desmontar', () => {
      const unsubscribeMock = vi.fn()
      ;(window as any).roomUnsubscribe = unsubscribeMock

      const { unmount } = renderHook(() => useRoom())

      unmount()

      expect(unsubscribeMock).toHaveBeenCalled()
      expect((window as any).roomUnsubscribe).toBeNull()
    })
  })
})
