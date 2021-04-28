import React, { FC, useEffect, useState } from 'react'

import Modal from '../Modal'
import Switch from 'react-switch'

import {
  Container,
  Input,
  Button,
  InputContainer,
  Label,
  SwitchContainer,
} from './styles'
import theme from '../../styles/theme'
import { Participant, Room, UserInfo } from '../../typings'

interface OptionsModalProps {
  toggle: boolean
  handleSaveRoomOptions({ userName, roomName, viewerMode }): any
  userInfo: UserInfo
  room: Room
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  imHost: boolean
  loading: boolean
  me: Participant
}

const OptionsModal: FC<OptionsModalProps> = ({
  toggle,
  room,
  userInfo,
  handleSaveRoomOptions,
  setToggleModal,
  imHost,
  loading,
  me,
}) => {
  const { name: originalRoomName } = room
  const { name: originalUserName } = userInfo

  const [userName, setUserName] = useState(originalUserName)
  const [roomName, setRoomName] = useState(originalRoomName)
  const [viewerMode, setViewerMode] = useState(false)

  useEffect(() => {
    setRoomName(room.name)

    if (me) setViewerMode(me.viewerMode)
  }, [room, me])

  return (
    <Modal
      height={imHost ? '480' : '380'}
      toggle={toggle}
      setToggleModal={setToggleModal}
      title="options"
    >
      <Container imHost={imHost}>
        {imHost && (
          <InputContainer>
            <Label>Room name</Label>
            <Input
              placeholder={originalRoomName}
              value={roomName}
              onInput={event => setRoomName(event.target.value)}
            />
          </InputContainer>
        )}

        <InputContainer>
          <Label>Your name</Label>
          <Input
            placeholder={userName}
            value={userName}
            onInput={event => setUserName(event.target.value)}
          />
        </InputContainer>
        <SwitchContainer>
          <Label>Viewer mode</Label>
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
              userName: userName.length ? userName : originalUserName,
              roomName: roomName.length ? roomName : originalRoomName,
              viewerMode,
            })
          }
        >
          Save
        </Button>
      </Container>
    </Modal>
  )
}

export default OptionsModal
