import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Item, ItemsContainer, Title } from './styles'
import { streamMyRooms } from '../../services/firebase'
import { LatestRoomsProps } from './typings'
import Link from 'next/link'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../constants'
import { Room } from '../../typings'

const LatestRooms: FC<LatestRoomsProps> = ({ userInfo }) => {
  const [myLatestRooms, setMyLatestRooms] = useState<Room[]>([])

  useEffect(() => {
    const unsubscribe = streamMyRooms(userInfo.userId, {
      next: querySnapshot => {
        const updatedRooms: Room[] = querySnapshot.docs.map(docSnapshot =>
          docSnapshot.data()
        )

        setMyLatestRooms(updatedRooms)
      },
      error: () => console.error('Cannot find my rooms'),
    })
    return unsubscribe
  }, [userInfo, setMyLatestRooms])

  return !myLatestRooms?.length ? (
    <></>
  ) : (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
      >
        <Title>your latest rooms</Title>
      </motion.div>

      <ItemsContainer>
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
    </Container>
  )
}

export default LatestRooms
