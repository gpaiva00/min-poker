
import React, { FC, useCallback, useState} from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import { PageContainer, InstructionText, InputContainer } from '../styles/Home.styles'

import LatestRooms from '../components/LatestRooms'
import Button from '../components/Button'
import Input from '../components/Input'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const handleInput = useCallback((event) => {

    setInputValue(event.target.value)

  }, [])

  return (
    <div>
        <main>
          <Header />
          <LatestRooms />

          <PageContainer>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <InstructionText>Enter room name</InstructionText>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <InputContainer>
                <Input value={inputValue} placeholder="Room name" onInput={handleInput}/>
                <Button onClick={() => router.push('/')}>Enter</Button>
              </InputContainer>
            </motion.div>
          </PageContainer>
          <Footer />
        </main>
      </div>
    )
}

export default Home
