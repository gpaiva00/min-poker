import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Sidebar } from '../Sidebar'
import { Room, LocalUserData } from '@/types'
import { BrowserRouter } from 'react-router-dom'

const mockUserData: LocalUserData = {
  name: 'Test User',
  userId: 'user-123'
}

const mockRoom: Room = {
  id: 'room-1',
  name: 'Test Room',
  ownerId: 'user-123',
  participants: [],
  currentRound: null,
  votingHistory: [],
  settings: { autoReveal: false, revealDelay: 5000 },
  createdAt: Date.now(),
  lastActivity: Date.now()
}

describe('Sidebar', () => {
  it('deve renderizar', () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar
          ownedRooms={[]}
          participatedRooms={[]}
          selectedRoomId={null}
          onRoomSelect={vi.fn()}
          userData={mockUserData}
          onUpdateUserData={vi.fn()}
          onUpdateUserName={vi.fn()}
          setRoom={vi.fn()}
        />
      </BrowserRouter>
    )

    expect(container.firstChild).toBeTruthy()
  })

  it('deve renderizar lista de salas', () => {
    render(
      <BrowserRouter>
        <Sidebar
          ownedRooms={[mockRoom]}
          participatedRooms={[]}
          selectedRoomId={null}
          onRoomSelect={vi.fn()}
          userData={mockUserData}
          onUpdateUserData={vi.fn()}
          onUpdateUserName={vi.fn()}
          setRoom={vi.fn()}
        />
      </BrowserRouter>
    )

    expect(screen.getByText('Test Room')).toBeInTheDocument()
  })

  it('deve ter links de navegação', () => {
    render(
      <BrowserRouter>
        <Sidebar
          ownedRooms={[]}
          participatedRooms={[]}
          selectedRoomId={null}
          onRoomSelect={vi.fn()}
          userData={mockUserData}
          onUpdateUserData={vi.fn()}
          onUpdateUserName={vi.fn()}
          setRoom={vi.fn()}
        />
      </BrowserRouter>
    )

    const homeLink = screen.getAllByText(/minPoker/i)[0]
    expect(homeLink).toBeInTheDocument()
  })

  it('deve renderizar com userData', () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar
          ownedRooms={[]}
          participatedRooms={[]}
          selectedRoomId={null}
          onRoomSelect={vi.fn()}
          userData={mockUserData}
          onUpdateUserData={vi.fn()}
          onUpdateUserName={vi.fn()}
          setRoom={vi.fn()}
        />
      </BrowserRouter>
    )

    expect(container.textContent).toContain('minPoker')
  })

  it('deve ter componente de footer', () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar
          ownedRooms={[]}
          participatedRooms={[]}
          selectedRoomId={null}
          onRoomSelect={vi.fn()}
          userData={mockUserData}
          onUpdateUserData={vi.fn()}
          onUpdateUserName={vi.fn()}
          setRoom={vi.fn()}
        />
      </BrowserRouter>
    )

    expect(container.textContent).toContain('Todos os direitos reservados')
  })
})
