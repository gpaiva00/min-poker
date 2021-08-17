import React, { FC, useState } from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'

import { Modal } from '..'
import { STORAGE_TOKEN_KEY } from '../../constants'
import { usePersistedState } from '../../hooks'
import { createUser } from '../../services/firebase'
import { i18n } from '../../translate/i18n'
import { IGoogleUserProps } from '../../typings/IUser'
import Button from '../Button'
import MinPokerTitle from '../MinPokerTitle'
import Toast from '../Toast'
import { Container, Description } from './styles'

interface CreateAccountModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAccountModal: FC<CreateAccountModalProps> = ({
  toggle,
  setToggleModal,
}) => {
  const { storeItem } = usePersistedState()

  const handleSignIn = async (googleUser: GoogleLoginResponse) => {
    try {
      const {
        accessToken,
        profileObj: { googleId, name, email, imageUrl },
      } = googleUser

      storeItem(STORAGE_TOKEN_KEY, accessToken)

      console.warn('googleData', { name, email, imageUrl })

      const { email: returnedEmail } = await createUser({
        id: googleId,
        name,
        avatarURL: imageUrl,
        email,
      })
      console.warn({ returnedEmail })
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

export default CreateAccountModal
