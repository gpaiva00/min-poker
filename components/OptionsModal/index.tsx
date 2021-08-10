import React, { FC, useEffect, useState } from 'react'

import Modal from '../Modal'
import Switch from 'react-switch'

import { Container, Button, SwitchContainer } from './styles'
import theme from '../../styles/themes/light'
import { i18n } from '../../translate/i18n'
import { Participant, Room, UserInfo } from '../../typings'
import { Input, InputContainer, Label } from '../Modal/styles'

interface OptionsModalProps {
  toggle: boolean
  handleSaveRoomOptions({ roomName, viewerMode }): any
  userInfo: UserInfo
  room: Room
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

const OptionsModal: FC<OptionsModalProps> = ({
  toggle,
  room,
  userInfo,
  handleSaveRoomOptions,
  setToggleModal,
  loading,
}) => {
  const { name: originalRoomName } = room
  const { viewerMode: originalViewerMode = false } = userInfo

  const [roomName, setRoomName] = useState(originalRoomName)
  const [viewerMode, setViewerMode] = useState(originalViewerMode)

  useEffect(() => {
    setRoomName(originalRoomName)
  }, [room])

  return (
    <Modal
      height="380"
      toggle={toggle}
      setToggleModal={setToggleModal}
      title={i18n.t('titles.options')}
    >
      <Container>
        <InputContainer>
          <Label>{i18n.t('labels.roomName')}</Label>
          <Input
            placeholder={originalRoomName}
            value={roomName}
            onInput={event => setRoomName(event.target.value)}
          />
        </InputContainer>

        <SwitchContainer>
          <Label>{i18n.t('labels.viewerMode')}</Label>
          <Switch
            checked={viewerMode}
            onChange={setViewerMode}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor={theme.colors.text}
            offColor={theme.colors.smoke}
          />
        </SwitchContainer>

        <Button
          loading={loading}
          onClick={() =>
            handleSaveRoomOptions({
              roomName: roomName.length ? roomName : originalRoomName,
              viewerMode,
            })
          }
        >
          {i18n.t('buttons.save')}
        </Button>
      </Container>
    </Modal>
  )
}

export default OptionsModal
