import React, { FC, useState } from 'react'
import GoogleLogin from 'react-google-login'

import { Modal } from '..'
import { i18n } from '../../translate/i18n'
import MinPokerTitle from '../MinPokerTitle'
import { Container, Description } from './styles'

interface CreateAccountModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAccountModal: FC<CreateAccountModalProps> = ({
  toggle,
  setToggleModal,
}) => {
  // const [userName, setUserName] = useState(originalUserName)

  const handleSignIn = googleUser => {
    console.log('signIn', googleUser)
    // salvar usuário no banco de dados
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