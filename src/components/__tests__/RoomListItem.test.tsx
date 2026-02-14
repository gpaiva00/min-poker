import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RoomListItem } from '../RoomListItem'
import { Room, LocalUserData } from '@/types'

const mockRoom: Room = {
  id: 'room-123',
  name: 'Test Room',
  ownerId: 'owner-123',
  participants: [
    { id: 'owner-123', name: 'Owner', isOwner: true },
    { id: 'user-456', name: 'User 2', isOwner: false }
  ],
  currentRound: null,
  votingHistory: [],
  settings: {
    autoReveal: false,
    revealDelay: 5000
  },
  createdAt: Date.now(),
  lastActivity: Date.now()
}

const mockUserData: LocalUserData = {
  name: 'Test User',
  userId: 'user-789'
}

describe('RoomListItem', () => {
  it('deve renderizar nome da sala', () => {
    render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.getByText('Test Room')).toBeInTheDocument()
  })

  it('deve renderizar número de participantes', () => {
    render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.getByText('2 participantes')).toBeInTheDocument()
  })

  it('deve renderizar no singular quando houver 1 participante', () => {
    const roomWithOneParticipant = {
      ...mockRoom,
      participants: [{ id: 'owner-123', name: 'Owner', isOwner: true }]
    }

    render(
      <RoomListItem
        room={roomWithOneParticipant}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.getByText('1 participante')).toBeInTheDocument()
  })

  it('deve mostrar badge "Dono" quando usuário for proprietário', () => {
    const ownerUserData: LocalUserData = {
      name: 'Owner',
      userId: 'owner-123'
    }

    render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={ownerUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.getByText('Dono')).toBeInTheDocument()
  })

  it('não deve mostrar badge "Dono" quando usuário não for proprietário', () => {
    render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.queryByText('Dono')).not.toBeInTheDocument()
  })

  it('deve mostrar indicador de votação ativa', () => {
    const roomWithActiveVoting = {
      ...mockRoom,
      currentRound: {
        id: 'round-1',
        votes: [],
        isRevealed: false,
        createdAt: Date.now()
      }
    }

    render(
      <RoomListItem
        room={roomWithActiveVoting}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.getByText('Votação em andamento')).toBeInTheDocument()
  })

  it('não deve mostrar indicador quando votação foi revelada', () => {
    const roomWithRevealedVoting = {
      ...mockRoom,
      currentRound: {
        id: 'round-1',
        votes: [],
        isRevealed: true,
        createdAt: Date.now()
      }
    }

    render(
      <RoomListItem
        room={roomWithRevealedVoting}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.queryByText('Votação em andamento')).not.toBeInTheDocument()
  })

  it('não deve mostrar indicador quando não houver rodada ativa', () => {
    render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    expect(screen.queryByText('Votação em andamento')).not.toBeInTheDocument()
  })

  it('deve chamar onRoomSelect quando clicado', () => {
    const onRoomSelect = vi.fn()

    render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={onRoomSelect}
      />
    )

    const roomItem = screen.getByText('Test Room').closest('div')
    fireEvent.click(roomItem!)

    expect(onRoomSelect).toHaveBeenCalledWith('room-123')
  })

  it('deve aplicar estilos de seleção quando sala está selecionada', () => {
    const { container } = render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId='room-123'
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    const roomItem = container.firstChild as HTMLElement
    expect(roomItem).toHaveClass('border-r-8')
    expect(roomItem).toHaveClass('border-r-primary')
    expect(roomItem).toHaveClass('bg-gray-100')
  })

  it('não deve aplicar estilos de seleção quando sala não está selecionada', () => {
    const { container } = render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId='other-room'
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    const roomItem = container.firstChild as HTMLElement
    expect(roomItem).not.toHaveClass('border-r-8')
  })

  it('deve ter cursor pointer para indicar que é clicável', () => {
    const { container } = render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    const roomItem = container.firstChild as HTMLElement
    expect(roomItem).toHaveClass('cursor-pointer')
  })

  it('deve ter efeito hover', () => {
    const { container } = render(
      <RoomListItem
        room={mockRoom}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    const roomItem = container.firstChild as HTMLElement
    expect(roomItem).toHaveClass('hover:bg-gray-100')
  })

  it('deve truncar nome longo da sala', () => {
    const roomWithLongName = {
      ...mockRoom,
      name: 'This is a very long room name that should be truncated'
    }

    render(
      <RoomListItem
        room={roomWithLongName}
        selectedRoomId={null}
        userData={mockUserData}
        onRoomSelect={vi.fn()}
      />
    )

    const nameElement = screen.getByText(roomWithLongName.name)
    expect(nameElement).toHaveClass('truncate')
  })
})
