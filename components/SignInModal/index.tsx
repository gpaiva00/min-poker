import React, { FC, useState } from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'

import { Modal } from '..'
import { STORAGE_TOKEN_KEY } from '../../constants'
import { usePersistedState } from '../../hooks'
import { useToken } from '../../hooks/useToken'
import { createUser } from '../../services/firebase'
import { i18n } from '../../translate/i18n'
import Button from '../Button'
import MinPokerTitle from '../MinPokerTitle'
import Toast from '../Toast'
import { Container, Description } from './styles'

interface SignInModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  setHostId: React.Dispatch<React.SetStateAction<string>>
}

const SignInModal: FC<SignInModalProps> = ({
  toggle,
  setToggleModal,
  setHostId,
}) => {
  const { setToken } = useToken()

  const handleSignIn = async (googleUser: GoogleLoginResponse) => {
    try {
      const {
        accessToken,
        profileObj: { googleId, name, email, imageUrl },
      } = googleUser

      console.warn('googleData', { name, email, imageUrl })

      const { email: returnedEmail } = await createUser({
        id: googleId,
        name,
        avatarURL: imageUrl,
        email,
      })

      console.warn({ returnedEmail })
      setHostId(googleId)
      setToken(accessToken)
      setToggleModal(false)
    } catch (error) {
      console.error('Error creating error', error)
      Toast({
        type: 'error',
        message: i18n.t('toast.errorCreatingUser'),
      })
    }
  }

  const handleSignInError = error => {
    // mostrar modal de erro
    console.log('signInError', error)
  }

  return (
    <Modal
      height="400"
      toggle={toggle}
      setToggleModal={setToggleModal}
      title={i18n.t('titles.createAccount')}
    >
      <Container>
        <MinPokerTitle />
        <Description>
          {i18n.t('descriptions.createAccountToAccessRoom')}
        </Description>

        <Button
          onClick={() =>
            createUser({
              name: 'Gab',
              email: 'paivadepaiva00@gmail.com',
              avatarURL: 'https://google.com',
            })
          }
        >
          Entrar
        </Button>

        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          buttonText={i18n.t('buttons.signInWithGoogle')}
          onSuccess={handleSignIn}
          onFailure={handleSignInError}
          style={{ width: '100%' }}
        />
      </Container>
    </Modal>
  )
}

export default SignInModal
