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
import { LatestRoomsProps } from './typings'
import Link from 'next/link'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../constants'
import { i18n } from '../../translate/i18n'
import { RoomHistory } from '../../typings'
import { DEFAULT_ROOM_HISTORY } from '../../constants'
import { sortRoomHistoryByDate } from '../../utils'
import { DefaultTitle } from '../../styles/global'

const LatestRooms: FC<LatestRoomsProps> = ({ userInfo }) => {
  const [roomHistory, setRoomHistory] = useState<RoomHistory>(
    DEFAULT_ROOM_HISTORY
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    try {
      const unsubscribe = streamRoomHistory(userInfo.userId, {
        next: querySnapshot => {
          let roomHistory: RoomHistory = querySnapshot.docs.map(docSnapshot =>
            docSnapshot.data()
          )[0]

          if (Array.isArray(roomHistory)) roomHistory = DEFAULT_ROOM_HISTORY

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
  }, [userInfo, setRoomHistory])

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
          {isLoading && !roomHistory.userId && (
            <Skeleton width={150} height={16} />
          )}
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
