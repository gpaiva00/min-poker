import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import { motion } from 'framer-motion'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import {
  PageContainer,
  InstructionText,
  ButtonsContainer,
  SignInButton,
  ButtonText,
} from '../../styles/SignIn.styles'

import { ANIMATION_DURATION } from '../../constants'
import { MainContainer } from '../../styles/global'
import MinPokerTitle from '../../components/MinPokerTitle'
import { i18n } from '../../translate/i18n'
import { Toast } from '../../components'

interface SignInProps {
  redirectTo?: string
}

const SignIn: FC<SignInProps> = ({ redirectTo = '/' }) => {
  const router = useRouter()

  const handleSignIn = async (provider: string) => {
    try {
      // TODO find user by email to register if not exist

      await signIn(provider, { redirect: false })
      router.push(redirectTo)
    } catch (error) {
      console.error('Error trying to sign in', error)
      Toast({ type: 'error', message: i18n.t('toast.errorSignIn') })
    }
  }

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
              <SignInButton onClick={() => handleSignIn('google')}>
                <FaGoogle size="20" />
                <ButtonText>{i18n.t('buttons.signInWithGoogle')}</ButtonText>
              </SignInButton>
              <SignInButton onClick={() => handleSignIn('github')}>
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
