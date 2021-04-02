
import React, { FC, useCallback, useState} from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import { PageContainer, LetsStartText, InputContainer } from '../../styles/Home.styles'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Footer from '../../components/Footer'

const EnterPasscode: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const handleInput = useCallback((event) => {

    setInputValue(event.target.value)

  }, [])

  return (
    <div>
        <main>
          <PageContainer>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <LetsStartText>Enter pass code</LetsStartText>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <InputContainer>
                <Input value={inputValue} placeholder="Pass code" onInput={handleInput}/>
                <Button onClick={() => router.push('/')}>Enter</Button>
              </InputContainer>
            </motion.div>
          </PageContainer>
        </main>
      </div>
    )
}

export default EnterPasscode
