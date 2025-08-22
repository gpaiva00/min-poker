import React, { FC } from 'react'

import { WaitingContainer, Description } from './styles'

import { motion } from 'framer-motion'
import { ANIMATION_DURATION } from '../../../../constants'

interface WaitingProps {
  description: string
}

const Waiting: FC<WaitingProps> = ({ description }) => (
  <WaitingContainer>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
    >
      <Description>{description}</Description>
    </motion.div>
  </WaitingContainer>
)

export default Waiting
