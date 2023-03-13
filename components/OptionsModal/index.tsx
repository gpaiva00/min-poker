import React, { FC, useEffect, useState } from 'react'

import Modal from '../Modal'
import Switch from 'react-switch'

import { Container, Button, SwitchContainer } from './styles'
import theme from '../../styles/themes/light'
import { i18n } from '../../translate/i18n'
import { IUserProps, Room } from '../../typings'
import { Input, InputContainer, Label } from '../Modal/styles'
import { useRouter } from 'next/router'
import { deleteRoom, exitRoom, updateRoom } from '../../services/room'
import {
  deleteRoomHistoryRegister,
  updateRoomHistory,
} from '../../services/roomHistory'
import { firebaseAnalytics } from '../../services/firebase'
import { Toast } from '..'
import { updateUserRoom } from '../../services/userRoom'

interface OptionsModalProps {
  toggle: boolean
  me: IUserProps
  room: Room
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

const OptionsModal: FC<OptionsModalProps> = ({
  toggle,
  room,
  me,
  setToggleModal,
  loading,
}) => {
  const { name: originalRoomName } = room
  const { viewerMode: originalViewerMode } = me

  const [roomName, setRoomName] = useState(originalRoomName)
  const [viewerMode, setViewerMode] = useState(originalViewerMode)

  const router = useRouter()

  const handleDeleteRoom = async () => {
    try {
      setTimeout(async () => {
        await deleteRoom(room.id)
        await deleteRoomHistoryRegister({ roomId: room.id, userId: me.id })
      }, 200)
      firebaseAnalytics().logEvent('delete_room')
      router.push('/')
    } catch (error) {
      Toast({
        type: 'error',
        message: i18n.t('toast.errorDeletingRoom'),
      })
    }
  }

  const handleLeaveRoom = async () => {
    try {
      await exitRoom(room.id, me.id)
      await deleteRoomHistoryRegister({ roomId: room.id, userId: me.id })
      firebaseAnalytics().logEvent('exit_room')
      router.push('/')
    } catch (error) {
      Toast({ type: 'error', message: i18n.t('toast.errorExitingRoom') })
    }
  }

  const handleSaveRoomOptions = async ({ viewerMode }) => {
    try {
      const newRoomName = roomName.length ? roomName : originalRoomName

      const newRoom = {
        ...room,
        name: newRoomName,
      }

      await updateRoom(newRoom)
      await updateUserRoom({
        userId: me.id,
        roomId: room.id,
        dataToChange: { viewerMode, vote: viewerMode ? '' : me.vote },
      })
      await updateRoomHistory({
        userId: me.id,
        roomId: room.id,
        roomName: newRoomName,
      })

      firebaseAnalytics().logEvent('room_options_saved')

      Toast({ message: i18n.t('toast.optionsUpdated') })
    } catch (error) {
      Toast({
        type: 'error',
        message: i18n.t('toast.errorChangingName'),
      })
      console.error('Error trying to change name', error)
    }

    setToggleModal(false)
  }

  useEffect(() => {
    setRoomName(originalRoomName)
    setViewerMode(originalViewerMode)
  }, [room, me])

  return (
    <Modal
      height={me.imHost ? 400 : 380}
      toggle={toggle}
      setToggleModal={setToggleModal}
      title={i18n.t('titles.options')}
    >
      <Container imHost={me.imHost}>
        {me.imHost && (
          <InputContainer>
            <Label>{i18n.t('labels.roomName')}</Label>
            <Input
              placeholder={originalRoomName}
              value={roomName}
              onInput={event => setRoomName(event.target.value)}
            />
          </InputContainer>
        )}

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
              viewerMode,
            })
          }
        >
          {i18n.t('buttons.save')}
        </Button>

        <Button
          loading={loading}
          onClick={me.imHost ? handleDeleteRoom : handleLeaveRoom}
          variant="danger"
        >
          {me.imHost
            ? i18n.t('buttons.deleteRoom')
            : i18n.t('buttons.leaveRoom')}
        </Button>
      </Container>
    </Modal>
  )
}

export default OptionsModal
