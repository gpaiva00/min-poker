import React, { FC, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/client'

import { Modal } from '..'
import { i18n } from '../../translate/i18n'
import { UserAvatar } from '../Header/styles'
import { Input, InputContainer, Label } from '../Modal/styles'
import { Container, Button } from './styles'
import { updateUser } from '../../services/firebase'
import Toast from '../Toast'
import { useUserInfo } from '../../hooks/useUserInfo'

interface AccountModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountModal: FC<AccountModalProps> = ({ toggle, setToggleModal }) => {
  const {
    userInfo: { email, name: originalUserName, image },
    loading,
  } = useUserInfo()
  const [userName, setUserName] = useState('')

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const handleUpdateUser = async () => {
    try {
      await updateUser({ name: userName, email })
      Toast({ message: i18n.t('toast.profileUpdated') })
      setToggleModal(false)
    } catch (error) {
      Toast({ type: 'error', message: i18n.t('toast.errorUpdatingUser') })
      console.log(error)
    }
  }

  useEffect(() => {
    setUserName(originalUserName)
  }, [originalUserName])

  return (
    <Modal
      height={400}
      toggle={toggle}
      setToggleModal={setToggleModal}
      title={i18n.t('titles.profile')}
    >
      <Container>
        <UserAvatar name={userName} src={image} size="60" color="black" round />
        <InputContainer>
          <Label>{i18n.t('labels.yourName')}</Label>
          <Input
            placeholder={originalUserName}
            value={userName}
            onInput={event => setUserName(event.target.value)}
          />
        </InputContainer>
        <Button loading={loading} onClick={handleUpdateUser}>
          {i18n.t('buttons.save')}
        </Button>
        <Button loading={loading} variant="danger" onClick={handleSignOut}>
          {i18n.t('buttons.signOut')}
        </Button>
      </Container>
    </Modal>
  )
}

export default AccountModal
