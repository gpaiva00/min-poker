import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { motion } from 'framer-motion'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { createUserIfNotExist } from '../../services/user'

import {
  PageContainer,
  InstructionText,
  ButtonsContainer,
  SignInButton,
  ButtonText,
  MinPokerTitle,
} from '../../styles/SignIn.styles'

import { ANIMATION_DURATION } from '../../constants'
import { MainContainer } from '../../styles/global'
import { i18n } from '../../translate/i18n'
import { Toast } from '../../components'

const SignIn: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const [session] = useSession()

  const redirectTo: string = router.query?.redirectTo || '/'

  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { redirect: false })
    } catch (error) {
      setIsLoading(false)
      console.error('Error trying to sign in', error)
      Toast({ type: 'error', message: i18n.t('toast.errorSignIn') })
    }
  }

  useEffect(() => {
    const createUser = async () => {
      if (!session) return
      setIsLoading(true)

      await createUserIfNotExist({
        email: session?.user?.email,
        name: session?.user?.name,
        avatarURL: session?.user?.image,
      })

      router.push(redirectTo)
      setIsLoading(false)
    }

    createUser()
  }, [session])

  return (
    <MainContainer>
      <main>
        <MinPokerTitle />
        <PageContainer>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
          >
            <InstructionText>
              {i18n.t('descriptions.enterWithAccount')}
            </InstructionText>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: ANIMATION_DURATION }}
          >
            <ButtonsContainer>
              <SignInButton
                loading={isLoading}
                onClick={() => handleSignIn('google')}
              >
                <FaGoogle size="20" />
                <ButtonText>{i18n.t('buttons.signInWithGoogle')}</ButtonText>
              </SignInButton>
              <SignInButton
                loading={isLoading}
                onClick={() => handleSignIn('github')}
              >
                <FaGithub size="20" />
                <ButtonText>{i18n.t('buttons.signInWithGithub')}</ButtonText>
              </SignInButton>
            </ButtonsContainer>
          </motion.div>
        </PageContainer>
      </main>
    </MainContainer>
  )
}

export default SignIn
