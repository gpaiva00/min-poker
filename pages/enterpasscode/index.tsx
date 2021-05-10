import React, { FC, useCallback, useState } from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import {
  PageContainer,
  InstructionText,
  InputContainer,
} from '../../styles/EnterPasscode.styles'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Header from '../../components/Header'
import { ANIMATION_DURATION } from '../../constants'

const EnterPasscode: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const handleInput = useCallback(event => {
    setInputValue(event.target.value)
  }, [])

  return (
    <div>
      <main>
        <Header />
        <PageContainer>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
          >
            <InstructionText>Enter pass code</InstructionText>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
          >
            <InputContainer>
              <Input
                value={inputValue}
                placeholder="Pass code"
                onInput={handleInput}
              />
              <Button onClick={() => router.push('/')}>Enter</Button>
            </InputContainer>
          </motion.div>
        </PageContainer>
      </main>
    </div>
  )
}

export default EnterPasscode
