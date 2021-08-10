import React, { FC, useState } from 'react'

import { Modal } from '..'
import { i18n } from '../../translate/i18n'
import { UserAvatar } from '../Header/styles'
import { Input, InputContainer, Label } from '../Modal/styles'
import { Container, Button } from './styles'

interface AccountModalProps {
  toggle: boolean
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  userName: string
  isLoading: boolean
  handleSaveRoomOptions({ userName }): any
}

const AccountModal: FC<AccountModalProps> = ({
  toggle,
  setToggleModal,
  userName: originalUserName,
  isLoading,
  handleSaveRoomOptions,
}) => {
  const [userName, setUserName] = useState(originalUserName)

  return (
    <Modal
      height="400"
      toggle={toggle}
      setToggleModal={setToggleModal}
      title="Perfil"
    >
      <Container>
        <UserAvatar name={userName} size="60" color="black" round />
        <InputContainer>
          <Label>{i18n.t('labels.yourName')}</Label>
          <Input
            placeholder={originalUserName}
            value={userName}
            onInput={event => setUserName(event.target.value)}
          />
        </InputContainer>
        <Button
          loading={isLoading}
          onClick={() =>
            handleSaveRoomOptions({
              userName: userName.length ? userName : originalUserName,
            })
          }
        >
          {i18n.t('buttons.save')}
        </Button>
        <Button loading={isLoading} variant="danger" onClick={() => {}}>
          {i18n.t('buttons.exit')}
        </Button>
      </Container>
    </Modal>
  )
}

export default AccountModal
