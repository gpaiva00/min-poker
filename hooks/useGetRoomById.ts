import { useCollectionData } from 'react-firebase-hooks/firestore'
import { DEFAULT_ROOM } from '../constants'
import { Room } from '../typings'

export const useGetRoomById = (db: any, roomId: string | string[]) => {
  console.log('inside functino', { db, roomId })

  if (!db || !roomId) return { room: DEFAULT_ROOM, loading: false, error: null }

  try {
    const [rooms, loading, error] = useCollectionData<Room[]>(
      db.collection('rooms').where('id', '==', roomId),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
        refField: 'ref',
      }
    )

    const room: Room = rooms && rooms[0] ? rooms[0] : DEFAULT_ROOM

    return { room, loading, error }
  } catch (error) {
    console.error('Cannot find room', error)
  }
}
