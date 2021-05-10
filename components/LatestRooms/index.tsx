import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Container, Item, ItemsContainer, Title } from './styles'
import { getDatabase } from '../../services/firebase'
import { LatestRoomsProps } from './typings'
import Link from 'next/link'
import { useGetRooms } from '../../hooks'
import { ANIMATION_DURATION, DELAY_DURATION } from '../../constants'

const LatestRooms: FC<LatestRoomsProps> = ({ userInfo }) => {
  const db = getDatabase()
  const { rooms } = useGetRooms(db)

  const myRooms =
    !rooms || !userInfo
      ? []
      : rooms.filter(room => room.hostId === userInfo.userId)

  return !myRooms.length ? (
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
        {myRooms.map((room, key) => (
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
