import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PageContainer } from '../../styles/Voting.styles'

import {
  Header,
  ParticipantsPanel,
  RoomTitle,
  Toast,
  VotingPanel,
} from '../../components'

import { Participant, Room, UserInfo } from '../../typings'

import {
  DEFAULT_PARTICIPANT,
  DEFAULT_ROOM,
  DEFAULT_USER,
  STORAGE_KEY_USER,
} from '../../constants'
import { i18n } from '../../translate/i18n'
import { calculateVotingResult, useUserInfo, validateRoomId } from '../../utils'
import OptionsModal from '../../components/OptionsModal'
import RemoveParticipantModal from '../../components/RemoveParticipantModal'
import {
  deleteRoom,
  deleteRoomHistoryRegister,
  exitRoom,
  firebaseAnalytics,
  removeParticipant,
  streamRoomById,
  updateRoom,
  updateRoomHistory,
  updateVote,
  verifyIfIsParticipant,
} from '../../services/firebase'
import { MainContainer } from '../../styles/global'
import AccountModal from '../../components/AccountModal'

const Voting: FC = () => {
  const [room, setRoom] = useState<Room>(DEFAULT_ROOM)
  const [isVoting, setIsVoting] = useState(false)

  const [toggleOptionsModal, setToggleOptionsModal] = useState(false)
  const [toggleAccountModal, setToggleAccountModal] = useState(false)
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false)

  const [participantIdToRemove, setParticipantIdToRemove] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { roomId } = router.query

  const { userInfo, session, loading } = useUserInfo()
  const imHost = room.hostId === userInfo?.email

  const handleDeleteRoom = async () => {
    try {
      setTimeout(() => {
        deleteRoom(room.id)
        deleteRoomHistoryRegister({ roomId, userId: userInfo.userId })
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

  const handleExitRoom = async () => {
    try {
      await exitRoom(room.id, userInfo.userId)
      deleteRoomHistoryRegister({ roomId, userId: userInfo.userId })
      firebaseAnalytics().logEvent('exit_room')
      router.push('/')
    } catch (error) {
      Toast({ type: 'error', message: i18n.t('toast.errorExitingRoom') })
    }
  }

  const handleStartVoting = async () => {
    try {
      const newIsVoting = !isVoting
      const showResults = !newIsVoting

      const newRoom = {
        ...room,
        isVoting: newIsVoting,
        showResults,
      }

      let newParticipant = null

      if (!isVoting) {
        newParticipant = {
          vote: '',
        }
      }

      if (showResults) {
        const calculateResult = calculateVotingResult(room.participants)

        if (!calculateResult)
          return Toast({
            type: 'error',
            message: i18n.t('toast.errorCalculatingResults'),
          })

        const { average, results: items } = calculateResult
        console.warn({ calculateResult })

        newRoom.results = {
          average,
          items,
        }
      }

      await updateRoom({
        room,
        newParticipant,
        newRoom,
      })

      firebaseAnalytics().logEvent('handle_start_voting', {
        totalParticipants: room.participants.length,
      })

      setIsVoting(!isVoting)
    } catch (error) {
      Toast({
        type: 'error',
        message: i18n.t('toast.errorToStartVoting'),
      })
      console.error('Error when trying to start voting', error)
    }
  }

  const handleSaveRoomOptions = async ({ roomName, viewerMode }) => {
    try {
      // const newUserInfo = {
      //   ...userInfo,
      //   name: userName || userInfo.name,
      //   viewerMode,
      // }

      // storeItem(STORAGE_KEY_USER, newUserInfo)

      // const newParticipant: Participant = {
      //   name: userInfo.name || userInfo.name,
      //   viewerMode,
      //   vote: viewerMode ? '' : me.vote,
      // }

      const newRoom = {
        ...room,
        name: roomName,
      }

      await updateRoom({
        room,
        userId: userInfo.userId,
        newRoom,
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

    setToggleOptionsModal(false)
  }

  const handleSaveUserData = async ({ userName }) => {
    try {
      const newUserInfo = {
        ...userInfo,
        name: userName,
      }

      storeItem(STORAGE_KEY_USER, newUserInfo)
      // TODO dividir as funcs de salvar options e dados do usuário
      // Criar também uma collection para salvar os dados do usuário

      // const newParticipant: Participant = {
      //   name: userName || userInfo.name,
      //   viewerMode,
      //   vote: viewerMode ? '' : me.vote,
      // }

      // const newRoom = {
      //   ...room,
      //   name: roomName,
      // }

      await updateRoom({
        room,
        userId: userInfo.userId,
        newRoom,
        newParticipant,
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

    setToggleOptionsModal(false)
  }

  const handleVoteClick = async (voteId: string) => {
    try {
      await updateVote({
        roomId: room.id,
        voteId,
        userId: userInfo.userId,
      })

      firebaseAnalytics().logEvent('vote_click', {
        voteId,
      })
    } catch (error) {
      Toast({
        type: 'error',
        message: i18n.t('toast.errorSettingVote'),
      })
      console.error('Error trying to set your vote', error)
    }
  }

  const handleRemoveParticipant = async () => {
    try {
      await removeParticipant(room.id, participantIdToRemove)

      firebaseAnalytics().logEvent('remove_participant')

      setToggleConfirmModal(false)

      Toast({
        message: i18n.t('toast.participanteRemovedFromRoom'),
      })
    } catch (error) {
      Toast({
        type: 'error',
        message: i18n.t('toast.errorRemovingParticipantFromRoom'),
      })
      console.error('Error trying to remove participant room', error)
    }
  }

  const handleShowConfirmModal = (participantId: string) => {
    setToggleConfirmModal(true)
    setParticipantIdToRemove(participantId)
  }

  const setLoadingToFalse = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    setIsLoading(true)
    const verifyParticipant = async () => {
      // console.warn({
      //   user: userInfo,
      //   userEmail: !!userInfo.email,
      //   roomId: !!roomId,
      // })

      if (!session) return router.push(`/signin?redirectTo=${router.asPath}`)

      if (!userInfo.email || !roomId) {
        router.push('/')
        return
      }

      const isParticipant = await verifyIfIsParticipant({
        userId: userInfo.email,
        roomId,
      })

      if (!isParticipant) {
        router.push(`/invitation/${roomId}`)
        return
      }
    }

    verifyParticipant()

    updateRoomHistory({ roomId, userId: userInfo.email, roomName: room.name })

    const unsubscribe = streamRoomById(roomId, {
      next: querySnapshot => {
        const updatedRoom: Room = querySnapshot.docs
          .map(docSnapshot => docSnapshot.data())
          .shift()

        setRoom(updatedRoom)
        setIsLoading(false)
      },
      error: () => {
        setIsLoading(false)
      },
    })
    return unsubscribe
  }, [roomId, userInfo, session])

  return (
    <MainContainer>
      <main>
        <OptionsModal
          toggle={toggleOptionsModal}
          setToggleModal={setToggleOptionsModal}
          room={room}
          userInfo={userInfo}
          handleSaveRoomOptions={handleSaveRoomOptions}
          loading={isLoading}
        />
        <RemoveParticipantModal
          toggle={toggleConfirmModal}
          setToggleModal={setToggleConfirmModal}
          handlePressConfirm={handleRemoveParticipant}
          loading={isLoading}
        />
        <AccountModal
          toggle={toggleAccountModal}
          setToggleModal={setToggleAccountModal}
        />

        <Header
          setToggleOptionsModal={setToggleOptionsModal}
          setToggleAccountModal={setToggleAccountModal}
          loading={isLoading || loading}
          showOptions={imHost}
          user={{
            name: userInfo.name,
            image: userInfo.image,
          }}
        />

        <RoomTitle
          isLoading={isLoading}
          room={room}
          imHost={imHost}
          handleDeleteRoom={handleDeleteRoom}
          handleExitRoom={handleExitRoom}
        />

        <PageContainer>
          {/* <ParticipantsPanel
            handleRemoveParticipant={handleShowConfirmModal}
            room={room}
            imHost={imHost}
            me={userInfo}
            userInfo={userInfo}
            loading={isLoading}
          /> */}
          <VotingPanel
            setStartVoting={handleStartVoting}
            handleVoteClick={handleVoteClick}
            room={room}
            me={userInfo}
            imHost={imHost}
            loading={isLoading}
          />
        </PageContainer>
      </main>
    </MainContainer>
  )
}

export default Voting
