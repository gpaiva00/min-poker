import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PageContainer } from '../../styles/Voting.styles'

import { Header, ParticipantsPanel, Toast, VotingPanel } from '../../components'

import { Participant, Room, UserInfo } from '../../typings'
import usePersistedState from '../../hooks/usePersistedState'
import {
  DEFAULT_PARTICIPANT,
  DEFAULT_ROOM,
  STORAGE_KEY_USER,
} from '../../constants'
import { i18n } from '../../translate/i18n'
import { calculateVotingResult, validateRoomId } from '../../utils'
import OptionsModal from '../../components/OptionsModal'
import RemoveParticipantModal from '../../components/RemoveParticipantModal'
import {
  deleteRoom,
  exitRoom,
  firebaseAnalytics,
  removeParticipant,
  streamRoomById,
  updateRoom,
  updateVote,
  verifyIfIsNotParticipant,
} from '../../services/firebase'

const Voting: FC = () => {
  const [me, setMe] = useState<Participant>(DEFAULT_PARTICIPANT)
  const [room, setRoom] = useState<Room>(DEFAULT_ROOM)
  const [isVoting, setIsVoting] = useState(false)
  const { storeItem, getStoredItem } = usePersistedState()
  const [toggleOptionsModal, setToggleOptionsModal] = useState(false)
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false)
  const [participantIdToRemove, setParticipantIdToRemove] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { roomId } = router.query

  const userInfo: UserInfo = getStoredItem(
    STORAGE_KEY_USER,
    DEFAULT_PARTICIPANT
  )

  const imHost = room.hostId === userInfo.userId

  const handleDeleteRoom = async () => {
    try {
      setTimeout(() => {
        deleteRoom(room.id)
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

  const handleSaveRoomOptions = async ({ userName, roomName, viewerMode }) => {
    try {
      const newUserInfo = {
        ...userInfo,
        name: userName,
        viewerMode,
      }

      storeItem(STORAGE_KEY_USER, newUserInfo)

      const newParticipant: Participant = {
        name: userName,
        viewerMode,
        vote: viewerMode ? '' : me.vote,
      }

      const newRoom = {
        ...room,
        name: roomName,
      }

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

  useEffect(() => {
    setIsLoading(true)
    const verifyParticipant = async () => {
      if (
        roomId &&
        (await verifyIfIsNotParticipant({ userId: userInfo.userId, roomId }))
      ) {
        router.push(`/invitation/${roomId}`)
        return
      }
    }

    verifyParticipant()

    const unsubscribe = streamRoomById(roomId, {
      next: querySnapshot => {
        const updatedRoom: Room = querySnapshot.docs
          .map(docSnapshot => docSnapshot.data())
          .shift()

        setRoom(updatedRoom)
        const me = updatedRoom.participants.find(
          ({ id }) => id === userInfo.userId
        )
        setMe(me ? me : DEFAULT_PARTICIPANT)
        setIsLoading(false)
      },
      error: () => {
        console.error('Cannot find room')
        setIsLoading(false)
      },
    })
    return unsubscribe
  }, [roomId, setRoom])

  return (
    <div>
      <main>
        <OptionsModal
          toggle={toggleOptionsModal}
          setToggleModal={setToggleOptionsModal}
          room={room}
          userInfo={userInfo}
          handleSaveRoomOptions={handleSaveRoomOptions}
          loading={isLoading}
          imHost={imHost}
        />
        <RemoveParticipantModal
          toggle={toggleConfirmModal}
          setToggleModal={setToggleConfirmModal}
          handlePressConfirm={handleRemoveParticipant}
          loading={isLoading}
        />
        <Header
          roomTitle={room.name}
          roomId={room.id}
          setToggleModal={setToggleOptionsModal}
          isLoading={isLoading}
        />

        <PageContainer>
          <ParticipantsPanel
            setStartVoting={handleStartVoting}
            imHost={imHost}
            handleDeleteRoom={handleDeleteRoom}
            handleExitRoom={handleExitRoom}
            handleRemoveParticipant={handleShowConfirmModal}
            room={room}
            me={me}
            userInfo={userInfo}
            loading={isLoading}
          />
          <VotingPanel
            handleVoteClick={handleVoteClick}
            room={room}
            me={me}
            showResults={room.showResults}
            loading={isLoading}
          />
        </PageContainer>
      </main>
    </div>
  )
}

export default Voting
