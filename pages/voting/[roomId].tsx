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
import { calculateVotingResult, validateRoomId } from '../../utils'
import OptionsModal from '../../components/OptionsModal'
import RemoveParticipantModal from '../../components/RemoveParticipantModal'
import {
  deleteRoom,
  exitRoom,
  removeParticipant,
  streamRoomById,
  updateRoom,
} from '../../services/firebase'

const Voting: FC = () => {
  const [me, setMe] = useState<Participant>(DEFAULT_PARTICIPANT)
  const [room, setRoom] = useState<Room>(DEFAULT_ROOM)
  const [isVoting, setIsVoting] = useState(false)
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  const [toggleOptionsModal, setToggleOptionsModal] = useState(false)
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false)
  const [participantIdToRemove, setParticipantIdToRemove] = useState('')

  const router = useRouter()
  const { roomId } = router.query

  const loading = false

  const userInfo: UserInfo = storage && JSON.parse(storage)
  const imHost = room.hostId === userInfo.userId

  const handleDeleteRoom = async () => {
    try {
      setTimeout(() => {
        deleteRoom(room.id)
      }, 200)

      router.push('/')
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to close your room. Sorry :(',
      })
    }
  }

  const handleExitRoom = async () => {
    try {
      await exitRoom(room.id, userInfo.userId)

      router.push('/')
    } catch (error) {
      Toast({ type: 'error', message: 'Error trying to exit room. Sorry :(' })
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
            message: 'Error trying calculate voting results. Try again.',
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
        userId: userInfo.userId,
      })

      setIsVoting(!isVoting)
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to start voting. Try again.',
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

      setStorage(JSON.stringify(newUserInfo))

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

      Toast({ message: 'Options updated successfully.' })
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to change your name. Try again.',
      })
      console.error('Error trying to change name', error)
    }

    setToggleOptionsModal(false)
  }

  const handleVoteClick = async (voteId: string) => {
    try {
      const newParticipant = {
        vote: voteId,
      }

      await updateRoom({
        room,
        newParticipant,
        userId: userInfo.userId,
      })
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to set your vote. Try again.',
      })
      console.error('Error trying to set your vote', error)
    }
  }

  const handleRemoveParticipant = async () => {
    try {
      await removeParticipant(room.id, participantIdToRemove)

      setToggleConfirmModal(false)

      Toast({
        message: 'Participant removed from your room',
      })
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to remove participant. Try again.',
      })
      console.error('Error trying to remove participant room', error)
    }
  }

  const handleShowConfirmModal = (participantId: string) => {
    setToggleConfirmModal(true)
    setParticipantIdToRemove(participantId)
  }

  useEffect(() => {
    if (!validateRoomId(roomId)) {
      router.push('/')
      return
    }
  }, [roomId])

  // console.warn({ room: room.name, me })

  useEffect(() => {
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
      },
      error: () => console.error('Cannot find room'),
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
          me={me}
          userInfo={userInfo}
          handleSaveRoomOptions={handleSaveRoomOptions}
          loading={loading}
          imHost={imHost}
        />
        <RemoveParticipantModal
          toggle={toggleConfirmModal}
          setToggleModal={setToggleConfirmModal}
          handlePressConfirm={handleRemoveParticipant}
          loading={loading}
        />
        <Header
          showRoomTitle
          roomTitle={room.name}
          roomId={room.id}
          setToggleModal={setToggleOptionsModal}
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
            loading={loading}
          />
          <VotingPanel
            handleVoteClick={handleVoteClick}
            room={room}
            me={me}
            showResults={room.showResults}
          />
        </PageContainer>
      </main>
    </div>
  )
}

export default Voting
