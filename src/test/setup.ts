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

// Mock do navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue('')
  },
  writable: true
})

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock do Firebase
const mockRef = vi.fn()
const mockQuery = vi.fn()
const mockOnValue = vi.fn()
const mockOff = vi.fn()

vi.mock('@/lib/firebase', () => ({
  db: {},
  roomsRef: { toString: () => 'rooms', copy: vi.fn() },
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
  getRoomsByOwnerId: vi.fn().mockResolvedValue([]),
  removeParticipant: vi.fn(),
  updateRoomName: vi.fn(),
  getRoomsByIds: vi.fn().mockResolvedValue({ rooms: [], notFoundIds: [] }),
  listenToRoomRemovals: vi.fn(() => vi.fn()),
  listenToParticipantRemovals: vi.fn(() => vi.fn())
}))

// Mock do firebase/database
vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(),
  ref: mockRef.mockReturnValue({ toString: () => 'ref', copy: vi.fn() }),
  query: mockQuery.mockReturnValue({ toString: () => 'query', copy: vi.fn() }),
  onValue: mockOnValue.mockImplementation((ref, callback) => {
    callback({ val: () => null, exists: () => false })
    return vi.fn()
  }),
  off: mockOff,
  set: vi.fn().mockResolvedValue(undefined),
  push: vi.fn().mockReturnValue({ key: 'mock-key' }),
  update: vi.fn().mockResolvedValue(undefined),
  remove: vi.fn().mockResolvedValue(undefined),
  get: vi.fn().mockResolvedValue({ val: () => null, exists: () => false }),
  orderByChild: vi.fn().mockReturnValue({ toString: () => 'orderByChild' }),
  equalTo: vi.fn().mockReturnValue({ toString: () => 'equalTo' })
}))

// Mock do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  const React = await import('react')
  return {
    ...actual,
    useParams: vi.fn(() => ({ roomId: undefined })),
    useNavigate: vi.fn(() => vi.fn()),
    Link: ({ children, to, ...props }: any) =>
      React.createElement('a', { href: to, ...props }, children),
    BrowserRouter: ({ children }: any) =>
      React.createElement('div', null, children)
  }
})

// Mock parcial do utils (para preservar as funcoes reais)
vi.mock('@/lib/utils', async () => {
  const actual = await vi.importActual('@/lib/utils')
  return {
    ...actual,
    generateFunnyName: vi.fn(() => 'TestUser')
  }
})
