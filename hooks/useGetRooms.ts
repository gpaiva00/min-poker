import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Room } from '../typings'

export const useGetRooms = (db: any) => {
  if (!db) return

  try {
    const [rooms, loading, error] = useCollectionData<Room[]>(
      db.collection('rooms'),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
        refField: 'ref',
      }
    )

    return { rooms, loading, error }
  } catch (error) {
    console.error('Cannot find rooms', error)
  }
}
