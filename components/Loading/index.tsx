import React, { FC } from 'react'
import styled from 'styled-components'

import { motion } from 'framer-motion'
import { AiOutlineLoading } from 'react-icons/ai'
import { LoadingProps } from './typings'


const LoadingIcon = styled(AiOutlineLoading)`
  color: ${({ theme, color }) => color === 'primary' ? theme.colors.lightText : theme.colors[color]};
`

const Loading: FC<LoadingProps> = ({ size = 20, color }) => (
  <motion.div
    initial={{ rotate: 0 }}
    animate={{ rotate: 359 }}
    transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
  >
    <LoadingIcon size={size} color={color} />
  </motion.div>
)

export default Loading
