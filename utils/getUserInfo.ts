import { Session } from 'next-auth'
import { generateFakeEmail } from '.'
import { DEFAULT_USER } from '../constants'
import { UserInfo } from '../typings'

export const getUserInfo = (session: Session): UserInfo => {
  if (!session) return DEFAULT_USER

  const user = { ...session?.user }
  user.email = user.email || generateFakeEmail(user.name)

  return user
}
