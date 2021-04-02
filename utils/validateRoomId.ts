export const validateRoomId = (id: string | string[]) => {
  console.log('ID', id)

  if (!id) return false

  return true
  // search on DB for this ID
  // if has id, get into Voting page
  // else returns false
}
