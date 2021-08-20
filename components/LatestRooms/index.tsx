import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Skeleton from 'react-loading-skeleton'
import {
  Container,
  EmptyLatestRoomsLabel,
  Item,
  ItemsContainer,
} from './styles'
import { streamRoomHistory } from '../../services/firebase'
import Link from 'next/link'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../constants'
import { i18n } from '../../translate/i18n'
import { RoomHistory } from '../../typings'
import { DEFAULT_ROOM_HISTORY } from '../../constants'
import { getUserInfo, sortRoomHistoryByDate } from '../../utils'
import { DefaultTitle } from '../../styles/global'
import { useSession } from 'next-auth/client'

const LatestRooms: FC = () => {
  const [roomHistory, setRoomHistory] = useState<RoomHistory>(
    DEFAULT_ROOM_HISTORY
  )
  const [session, loading] = useSession()
  const [isLoading, setIsLoading] = useState(loading)

  const userInfo = getUserInfo(session)

  useEffect(() => {
    setIsLoading(true)
    try {
      if (!session) {
        setIsLoading(false)
        return
      }

      const unsubscribe = streamRoomHistory(userInfo.email, {
        next: querySnapshot => {
          let roomHistory: RoomHistory = querySnapshot.docs.map(docSnapshot =>
            docSnapshot.data()
          )[0]

          if (Array.isArray(roomHistory) || !roomHistory) {
            setIsLoading(false)
            return
          }

          setRoomHistory(sortRoomHistoryByDate(roomHistory))
          setIsLoading(false)
        },
        error: error => {
          console.error('Cannot find room history', error)
          setIsLoading(false)
        },
      })
      return unsubscribe
    } catch {
      setIsLoading(false)
    }
  }, [session, setRoomHistory])

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
      >
        <DefaultTitle>{i18n.t('titles.latestRooms')}</DefaultTitle>
      </motion.div>

      {(!isLoading && !roomHistory.userId) ||
      (roomHistory.userId && !roomHistory.history.length) ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
        >
          <EmptyLatestRoomsLabel>
            {i18n.t('descriptions.yourLatestRoomsWillAppearHere')}
          </EmptyLatestRoomsLabel>
        </motion.p>
      ) : (
        <ItemsContainer>
          {isLoading && <Skeleton width={150} height={16} />}

          {roomHistory.history.map((roomHistory, key) => (
            <Link key={key} href={`voting/${roomHistory.roomId}`}>
              <Item>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: ANIMATION_DURATION,
                    delay: DELAY_DURATION,
                  }}
                >
                  {roomHistory.roomName}
                </motion.p>
              </Item>
            </Link>
          ))}
        </ItemsContainer>
      )}
    </Container>
  )
}

export default LatestRooms
