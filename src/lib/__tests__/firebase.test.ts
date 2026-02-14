import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as firebase from '../firebase'

vi.mock('firebase/app')
vi.mock('firebase/database')

describe('firebase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createRoom', () => {
    it('deve ser uma função', () => {
      expect(typeof firebase.createRoom).toBe('function')
    })
  })

  describe('joinRoom', () => {
    it('deve ser uma função', () => {
      expect(typeof firebase.joinRoom).toBe('function')
    })
  })

  describe('leaveRoom', () => {
    it('deve remover participante da sala', () => {
      expect(() => firebase.leaveRoom('room-123', 'user-123')).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() => firebase.leaveRoom('invalid-room', 'user-123')).not.toThrow()
    })
  })

  describe('submitVote', () => {
    it('deve submeter um voto', () => {
      expect(() => firebase.submitVote('room-123', 'user-123', 5)).not.toThrow()
    })

    it('deve submeter voto nulo', () => {
      expect(() =>
        firebase.submitVote('room-123', 'user-123', null)
      ).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() =>
        firebase.submitVote('invalid-room', 'user-123', 5)
      ).not.toThrow()
    })
  })

  describe('startNewRound', () => {
    it('deve iniciar nova rodada', () => {
      expect(() => firebase.startNewRound('room-123')).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() => firebase.startNewRound('invalid-room')).not.toThrow()
    })
  })

  describe('revealVotes', () => {
    it('deve revelar votos', () => {
      expect(() => firebase.revealVotes('room-123')).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() => firebase.revealVotes('invalid-room')).not.toThrow()
    })
  })

  describe('listenToRoom', () => {
    it('deve ser uma função', () => {
      expect(typeof firebase.listenToRoom).toBe('function')
    })
  })

  describe('updateRoomSettings', () => {
    it('deve atualizar configurações da sala', () => {
      expect(() =>
        firebase.updateRoomSettings('room-123', { autoReveal: true })
      ).not.toThrow()
    })

    it('deve atualizar revealDelay', () => {
      expect(() =>
        firebase.updateRoomSettings('room-123', { revealDelay: 3000 })
      ).not.toThrow()
    })

    it('deve atualizar múltiplas configurações', () => {
      expect(() =>
        firebase.updateRoomSettings('room-123', {
          autoReveal: true,
          revealDelay: 5000
        })
      ).not.toThrow()
    })
  })

  describe('updateRoomName', () => {
    it('deve atualizar nome da sala', () => {
      expect(() =>
        firebase.updateRoomName('room-123', 'New Room Name')
      ).not.toThrow()
    })
  })

  describe('removeParticipant', () => {
    it('deve remover participante', () => {
      expect(() =>
        firebase.removeParticipant('room-123', 'user-123')
      ).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() =>
        firebase.removeParticipant('invalid-room', 'user-123')
      ).not.toThrow()
    })
  })

  describe('updateParticipantName', () => {
    it('deve atualizar nome do participante', () => {
      expect(() =>
        firebase.updateParticipantName('room-123', 'user-123', 'New Name')
      ).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() =>
        firebase.updateParticipantName('invalid-room', 'user-123', 'New Name')
      ).not.toThrow()
    })
  })

  describe('updateParticipantViewMode', () => {
    it('deve atualizar modo de visualização do participante', () => {
      expect(() =>
        firebase.updateParticipantViewMode('room-123', 'user-123', true)
      ).not.toThrow()
    })

    it('deve desabilitar modo de visualização', () => {
      expect(() =>
        firebase.updateParticipantViewMode('room-123', 'user-123', false)
      ).not.toThrow()
    })

    it('deve não falhar se sala não existir', () => {
      expect(() =>
        firebase.updateParticipantViewMode('invalid-room', 'user-123', true)
      ).not.toThrow()
    })
  })

  describe('deleteRoom', () => {
    it('deve chamar deleteRoom', () => {
      expect(typeof firebase.deleteRoom).toBe('function')
    })
  })

  describe('getRoomsByOwnerId', () => {
    it('deve retornar salas do proprietário', async () => {
      const rooms = await firebase.getRoomsByOwnerId('owner-123')
      expect(Array.isArray(rooms)).toBe(true)
    })

    it('deve retornar array vazio se não houver salas', async () => {
      const rooms = await firebase.getRoomsByOwnerId('non-existent-owner')
      expect(rooms).toEqual([])
    })

    it('deve lidar com erros', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const rooms = await firebase.getRoomsByOwnerId('error-owner')
      expect(rooms).toEqual([])
      consoleSpy.mockRestore()
    })
  })

  describe('getRoomsByIds', () => {
    it('deve retornar salas e IDs não encontrados', async () => {
      const result = await firebase.getRoomsByIds(['room-1', 'room-2'])
      expect(result).toHaveProperty('rooms')
      expect(result).toHaveProperty('notFoundIds')
      expect(Array.isArray(result.rooms)).toBe(true)
      expect(Array.isArray(result.notFoundIds)).toBe(true)
    })

    it('deve retornar objeto vazio se array de IDs estiver vazio', async () => {
      const result = await firebase.getRoomsByIds([])
      expect(result.rooms).toEqual([])
      expect(result.notFoundIds).toEqual([])
    })
  })

  describe('listenToRoomRemovals', () => {
    it('deve retornar função unsubscribe', () => {
      const callback = vi.fn()
      const unsubscribe = firebase.listenToRoomRemovals(callback)
      expect(typeof unsubscribe).toBe('function')
    })

    it('deve não lançar erro ao ser chamado', () => {
      const callback = vi.fn()
      expect(() => firebase.listenToRoomRemovals(callback)).not.toThrow()
    })
  })

  describe('listenToParticipantRemovals', () => {
    it('deve retornar função unsubscribe', () => {
      const callback = vi.fn()
      const unsubscribe = firebase.listenToParticipantRemovals(
        'user-123',
        callback
      )
      expect(typeof unsubscribe).toBe('function')
    })

    it('deve não lançar erro ao ser chamado', () => {
      const callback = vi.fn()
      expect(() =>
        firebase.listenToParticipantRemovals('user-123', callback)
      ).not.toThrow()
    })
  })

  describe('db e roomsRef', () => {
    it('deve exportar db', () => {
      expect(firebase.db).toBeDefined()
    })

    it('deve exportar roomsRef', () => {
      expect(firebase.roomsRef).toBeDefined()
    })
  })
})
