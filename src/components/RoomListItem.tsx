import { Room, LocalUserData } from '@/types'

interface RoomListItemProps {
  room: Room
  selectedRoomId: string | null
  userData: LocalUserData
  onRoomSelect: (roomId: string) => void
}

export function RoomListItem({
  room,
  selectedRoomId,
  userData,
  onRoomSelect
}: RoomListItemProps) {
  const isSelected = selectedRoomId === room.id
  const isOwner = room.ownerId === userData.userId
  const hasActiveVoting = room.currentRound && !room.currentRound.isRevealed

  return (
    <div
      key={room.id}
      onClick={() => onRoomSelect(room.id)}
      className={`cursor-pointer rounded-lg p-4 transition-colors hover:bg-gray-100 ${
        isSelected ? 'border-r-8 border-r-primary bg-gray-100' : ''
      }`}
    >
      <div className='flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate font-medium text-gray-900'>{room.name}</h3>
          <p className='text-sm font-light text-gray-500'>
            {room.participants.length} participante
            {room.participants.length !== 1 ? 's' : ''}
          </p>
        </div>
        {isOwner && (
          <div className='ml-2 rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary'>
            Dono
          </div>
        )}
      </div>
      {hasActiveVoting && (
        <div className='mt-2 text-xs font-medium text-primary'>
          Votação em andamento
        </div>
      )}
    </div>
  )
}
