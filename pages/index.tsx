
import React, { FC, useCallback, useState} from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import { PageContainer, LetsStartText, InputContainer } from '../styles/Home.styles'

import LatestRooms from '../components/LatestRooms'
import Button from '../components/Button'
import Input from '../components/Input'

const Home: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const handleInput = useCallback((event) => {

    setInputValue(event.target.value)

  }, [])

  return (
    <div>
        <main>
          <LatestRooms />

          <PageContainer>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <LetsStartText>Enter room name</LetsStartText>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <InputContainer>
                <Input value={inputValue} placeholder="Room name" onInput={handleInput}/>
                <Button onClick={() => router.push('/typing')}>Enter</Button>
              </InputContainer>
            </motion.div>
          </PageContainer>
        </main>
      </div>
    )
}

export default Home
