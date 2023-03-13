import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { generateFakeEmail } from '../utils'
import { DEFAULT_USER } from '../constants'
import { IUseUserInfoProps } from './typings/IUseUserInfoProps'
import { findUserByEmail } from '../services/user'
import { IUserProps } from '../typings'

export const useUserInfo = (): IUseUserInfoProps => {
  const [session, loading] = useSession()

  const [userInfo, setUserInfo] = useState<IUserProps>(
    session?.user || DEFAULT_USER
  )

  useEffect(() => {
    const getUser = async () => {
      const sessionUser: IUserProps = { ...session?.user }
      sessionUser.email =
        sessionUser.email || generateFakeEmail(sessionUser.name)
      sessionUser.id = sessionUser.email

      const foundUser = await findUserByEmail(sessionUser.email)
      sessionUser.name = foundUser?.user?.name || sessionUser.name

      setUserInfo(sessionUser)
    }

    getUser()
  }, [session])

  return { loading, userInfo, session }
}
