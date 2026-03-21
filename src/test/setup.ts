import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Configurar DOM para os testes
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
})

global.window = dom.window as any
global.document = dom.window.document
global.navigator = dom.window.navigator

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

// Define localStorage globalmente para os testes
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
})

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock do Firebase
vi.mock('@/lib/firebase', () => ({
  createRoom: vi.fn(),
  joinRoom: vi.fn(),
  leaveRoom: vi.fn(),
  submitVote: vi.fn(),
  startNewRound: vi.fn(),
  revealVotes: vi.fn(),
  listenToRoom: vi.fn(),
  updateRoomSettings: vi.fn(),
  updateParticipantName: vi.fn(),
  updateParticipantViewMode: vi.fn(),
  deleteRoom: vi.fn(),
  getRoomsByOwnerId: vi.fn(),
  removeParticipant: vi.fn(),
  updateRoomName: vi.fn(),
  roomsRef: {},
  getRoomsByIds: vi.fn(),
  listenToRoomRemovals: vi.fn(),
  listenToParticipantRemovals: vi.fn()
}))

// Mock do react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ roomId: undefined }))
}))

// Mock do utils
vi.mock('@/lib/utils', () => ({
  generateFunnyName: vi.fn(() => 'TestUser')
}))
