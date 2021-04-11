import { getDatabase } from '../services/firebase'
import { Room, Participant } from '../typings'

export interface updateRoomProps {
  room: Room
  userId?: string
  newRoom?: Room
  newParticipant?: Participant
}

export const updateRoom = async ({
  room,
  userId,
  newRoom,
  newParticipant,
}: updateRoomProps) => {
  const db = getDatabase()

  const { participants } = room

  const roomPath = room.ref.path.split('/')[1]
  const roomRef = db.collection('rooms').doc(roomPath)

  let newParticipants = participants
  let updateRoom = room

  if (newParticipant) {
    newParticipants = participants.map(participant => {
      if (!userId) {
        return {
          ...participant,
          ...newParticipant,
        }
      }

      if (participant.id === userId) {
        return {
          ...participant,
          ...newParticipant,
        }
      }

      return participant
    })
  }

  if (newRoom) updateRoom = newRoom

  await roomRef.set(
    {
      ...updateRoom,
      participants: newParticipants,
    },
    { merge: false }
  )
}
