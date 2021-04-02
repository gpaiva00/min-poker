import { motion } from 'framer-motion';
import React, { FC } from 'react';

import { Container, Item, ItemsContainer, Title } from './styles'

const LatestRooms: FC = () => {
  const latestRoomsItems = [
    {
      name: 'Todo dia um 7x1 diferente',
      id: 12312,
    },
    {
      name: 'Sala do Gab',
      id: 123,
    },
  ]

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
        {
          latestRoomsItems.map((item, key) => (
            <Item key={key}>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: 'easeInOut', duration: 1, delay: 0.5 }}
                >
                  {item.name}
                </motion.p>
            </Item>
          ))
        }
      </ItemsContainer>
    </Container>
  )
}

export default LatestRooms
