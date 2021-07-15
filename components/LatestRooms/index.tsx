import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import {
  Container,
  EmptyLatestRoomsLabel,
  Item,
  ItemsContainer,
  Title,
} from './styles'
import { streamRoomHistory } from '../../services/firebase'
import { LatestRoomsProps } from './typings'
import Link from 'next/link'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../constants'
import { i18n } from '../../translate/i18n'
import { Room } from '../../typings'

const LatestRooms: FC<LatestRoomsProps> = ({ userInfo }) => {
  const [myLatestRooms, setMyLatestRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = streamRoomHistory(userInfo.userId, {
      next: querySnapshot => {
        const updatedRooms: Room[] = querySnapshot.docs.map(docSnapshot =>
          docSnapshot.data()
        )

        console.warn({ updatedRooms })

        setMyLatestRooms(updatedRooms)
        setIsLoading(false)
      },
      error: error => {
        console.error('Cannot find my rooms', error)
        setIsLoading(false)
      },
    })
    return unsubscribe
  }, [userInfo, setMyLatestRooms])

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
      >
        <Title>{i18n.t('titles.latestRooms')}</Title>
      </motion.div>

      {!isLoading && !myLatestRooms?.length ? (
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
          {isLoading && !!myLatestRooms?.length && (
            <Skeleton width={150} height={16} />
          )}
          {myLatestRooms.map((room, key) => (
            <Link key={key} href={`voting/${room.id}`}>
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
                  {room.name}
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
