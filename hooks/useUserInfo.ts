import { Session } from 'next-auth'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { generateFakeEmail } from '../utils'
import { DEFAULT_USER } from '../constants'
import { IUseUserInfoProps } from './typings/IUseUserInfoProps'
import { findUserByEmail } from '../services/firebase'
import { UserInfo } from '../typings'

export const useUserInfo = (): IUseUserInfoProps => {
  const [session, loading] = useSession()

  const [userInfo, setUserInfo] = useState<UserInfo>(
    session?.user || DEFAULT_USER
  )

  useEffect(() => {
    const getUser = async () => {
      const user = { ...session?.user }
      user.email = user.email || generateFakeEmail(user.name)

      const foundUser = await findUserByEmail(user.email)
      user.name = foundUser?.user?.name || user.name

      setUserInfo(user)
    }

    getUser()
  }, [session])

  return { loading, userInfo, session }
}
