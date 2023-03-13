import React, { FC } from 'react'
import styled from 'styled-components'

import { motion } from 'framer-motion'
import { AiOutlineLoading } from 'react-icons/ai'
import { LoadingProps } from './typings'
import { ANIMATION_DURATION } from '../../constants'

const LoadingIcon = styled(AiOutlineLoading)`
  color: ${({ theme, color }) =>
    color === 'primary' ? theme.colors.lightText : theme.colors[color]};
`

const Loading: FC<LoadingProps> = ({ size = 20, color = 'primary' }) => (
  <motion.div
    initial={{ rotate: 0 }}
    animate={{ rotate: 359 }}
    transition={{
      repeat: Infinity,
      duration: ANIMATION_DURATION,
      ease: 'linear',
    }}
  >
    <LoadingIcon size={size} color={color} />
  </motion.div>
)

export default Loading
