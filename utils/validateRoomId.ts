import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { Room } from '../typings/Room'

export const validateRoomId = (
  id: string | string[] | Data<Room[], '', ''>[]
) => {
  if (!id) return false

  if (Array.isArray(id) && !id.length) return false

  return true
}
