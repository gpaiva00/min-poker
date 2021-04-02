import { motion } from 'framer-motion'
import React, { FC } from 'react'

import { Container, Item, ItemsContainer, Title } from './styles'
import { LatestRoomsProps } from './typings'

const LatestRooms: FC<LatestRoomsProps> = ({ rooms = [] }) => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: 1 }}
      >
        <Title>Latest rooms</Title>
      </motion.div>

      <ItemsContainer>
        {rooms.map((item, key) => (
          <Item key={key}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: 'easeInOut', duration: 1, delay: 0.5 }}
            >
              {item.name}
            </motion.p>
          </Item>
        ))}
      </ItemsContainer>
    </Container>
  )
}

export default LatestRooms
