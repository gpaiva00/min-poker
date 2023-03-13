import { Session } from 'next-auth'
import { Dispatch, SetStateAction } from 'react'
import { IUserProps } from '../../typings'

export interface IUseUserInfoProps {
  loading: boolean
  userInfo: IUserProps
  session: Session
  // setUserInfo: Dispatch<SetStateAction<IUserProps>>
}
