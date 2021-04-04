import React, { FC } from 'react'

import { motion } from 'framer-motion'
import { Room } from '../../typings/Room'

import { Container, Item, ItemsContainer, Title } from './styles'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getDatabase } from '../../services/firebase'
import { LatestRoomsProps } from './typings'
import Link from 'next/link'

const LatestRooms: FC<LatestRoomsProps> = ({ userInfo }) => {
  const db = getDatabase()

  const [rooms, loading, error] = useCollectionData<Room[]>(
    db.collection('rooms'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

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
        transition={{ ease: 'easeInOut', duration: 1 }}
      >
        <Title>Latest rooms</Title>
      </motion.div>

      <ItemsContainer>
        {myRooms.map((room, key) => (
          <Link href={`voting/${room.id}`}>
            <Item key={key}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'easeInOut', duration: 1, delay: 0.5 }}
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
