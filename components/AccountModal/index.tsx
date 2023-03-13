import React, { FC, useEffect, useState } from 'react'
import { signOut } from 'next-auth/client'

import { Modal } from '..'
import { i18n } from '../../translate/i18n'
import { UserAvatar } from '../Header/styles'
import { Input, InputContainer, Label } from '../Modal/styles'
import { Container, Button } from './styles'
import { updateUser } from '../../services/user'
import Toast from '../Toast'
import { useUserInfo } from '../../hooks/useUserInfo'
import { updateUserRoom } from '../../services/userRoom'
import { IUserProps } from '../../typings'

interface AccountModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  roomId?: string | string[]
  me?: IUserProps
}

const AccountModal: FC<AccountModalProps> = ({
  toggle,
  setToggleModal,
  roomId,
  me,
}) => {
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
      if (!roomId) await updateUser({ name: userName, email })
      else
        await updateUserRoom({
          userId: email,
          roomId,
          dataToChange: { name: userName },
        })

      Toast({ message: i18n.t('toast.profileUpdated') })
      setToggleModal(false)
    } catch (error) {
      Toast({ type: 'error', message: i18n.t('toast.errorUpdatingUser') })
      console.log(error)
    }
  }

  useEffect(() => {
    console.warn('accoutmodal', me)

    setUserName(me ? me.name : originalUserName)
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
          <Label>
            {roomId
              ? i18n.t('labels.yourNameInThisRoom')
              : i18n.t('labels.yourName')}
          </Label>
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
