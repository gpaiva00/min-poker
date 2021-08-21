import { Session } from 'next-auth'
import { UserInfo } from '../../typings'

export interface IUseUserInfoProps {
  loading: boolean
  userInfo: UserInfo
  session: Session
}
