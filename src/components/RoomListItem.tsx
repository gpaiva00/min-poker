import { Room, LocalUserData } from "@/types";

interface RoomListItemProps {
  room: Room;
  selectedRoomId: string | null;
  userData: LocalUserData;
  onRoomSelect: (roomId: string) => void;
}

export function RoomListItem({
  room,
  selectedRoomId,
  userData,
  onRoomSelect,
}: RoomListItemProps) {
  const isSelected = selectedRoomId === room.id;
  const isOwner = room.ownerId === userData.userId;
  const hasActiveVoting = room.currentRound && !room.currentRound.isRevealed;

  return (
    <div
      key={room.id}
      onClick={() => onRoomSelect(room.id)}
      className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg ${
        isSelected ? "bg-gray-100 border-r-8 border-r-primary" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{room.name}</h3>
          <p className="text-sm font-light text-gray-500">
            {room.participants.length} participante
            {room.participants.length !== 1 ? "s" : ""}
          </p>
        </div>
        {isOwner && (
          <div className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded font-medium">
            Dono
          </div>
        )}
      </div>
      {hasActiveVoting && (
        <div className="mt-2 text-xs font-medium text-primary">
          Votação em andamento
        </div>
      )}
    </div>
  );
}
