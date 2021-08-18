import React, { FC, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/client'

import { Modal } from '..'
import { i18n } from '../../translate/i18n'
import { UserAvatar } from '../Header/styles'
import { Input, InputContainer, Label } from '../Modal/styles'
import { Container, Button } from './styles'

interface AccountModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountModal: FC<AccountModalProps> = ({ toggle, setToggleModal }) => {
  const [session, loading] = useSession()
  const originalUsername = session?.user?.name

  const [userName, setUserName] = useState(originalUsername)

  const handleSignOut = () => {
    signOut()
  }

  useEffect(() => {
    setUserName(originalUsername)
  }, [originalUsername])

  return (
    <Modal
      height="400"
      toggle={toggle}
      setToggleModal={setToggleModal}
      title="Perfil"
    >
      <Container>
        <UserAvatar
          name={userName}
          src={session?.user?.image}
          size="60"
          color="black"
          round
        />
        <InputContainer>
          <Label>{i18n.t('labels.yourName')}</Label>
          <Input
            placeholder={originalUsername}
            value={userName}
            onInput={event => setUserName(event.target.value)}
          />
        </InputContainer>
        <Button loading={loading} onClick={() => {}}>
          {i18n.t('buttons.save')}
        </Button>
        <Button loading={loading} variant="danger" onClick={handleSignOut}>
          {i18n.t('buttons.exit')}
        </Button>
      </Container>
    </Modal>
  )
}

export default AccountModal
