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

import { Room } from '../../typings'

import {
  DEFAULT_PARTICIPANT,
  DEFAULT_ROOM,
  DEFAULT_USER,
  DEFAULT_USER_ROOM,
} from '../../constants'
import { i18n } from '../../translate/i18n'
import { calculateVotingResult } from '../../utils'
import OptionsModal from '../../components/OptionsModal'
import RemoveParticipantModal from '../../components/RemoveParticipantModal'
import { firebaseAnalytics, removeParticipant } from '../../services/firebase'
import { MainContainer } from '../../styles/global'
import AccountModal from '../../components/AccountModal'
import { streamRoomById, updateRoom } from '../../services/room'
import { updateRoomHistory } from '../../services/roomHistory'
import {
  streamUserRoomByRoomId,
  updateUserRoom,
  verifyIfIsParticipant,
} from '../../services/userRoom'
import { IUserRoomProps } from '../../services/typings/IUserRoom'
import { useUserInfo } from '../../hooks'

const Voting: FC = () => {
  const [room, setRoom] = useState<Room>(DEFAULT_ROOM)
  const [meInThisRoom, setMeInThisRoom] = useState(DEFAULT_PARTICIPANT)
  const [userRoom, setUserRoom] = useState<IUserRoomProps>(DEFAULT_USER_ROOM)
  const [isVoting, setIsVoting] = useState(false)
  const [toggleOptionsModal, setToggleOptionsModal] = useState(false)
  const [toggleAccountModal, setToggleAccountModal] = useState(false)
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false)
  const [participantIdToRemove, setParticipantIdToRemove] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { userInfo, session, loading } = useUserInfo()
  const router = useRouter()
  const { roomId } = router.query

  const handleStartVoting = async () => {
    try {
      const newIsVoting = !isVoting
      const showResults = !newIsVoting

      const newRoom = {
        ...room,
        isVoting: newIsVoting,
        showResults,
      }

      if (!isVoting) {
        await updateUserRoom({
          userId: me.email,
          roomId,
          dataToChange: { vote: '' },
        })
      }

      if (showResults) {
        const calculateResult = calculateVotingResult(userRoom.participants)

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

      await updateRoom(newRoom)

      firebaseAnalytics().logEvent('handle_start_voting', {
        totalParticipants: userRoom.participants.length,
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

  const handleVoteClick = async (voteId: string) => {
    try {
      await updateUserRoom({
        roomId: room.id,
        dataToChange: { vote: voteId },
        userId: me.email,
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

  console.warn({ room })

  useEffect(() => {
    setIsLoading(true)
    const verifyParticipant = async () => {
      // console.warn('enterRoom', {
      //   // session: !!session,
      //   userEmail: !!userInfo.email,
      //   // roomId: !!roomId,
      //   // userName: userInfo.name,
      // })

      if (!session) return router.push(`/signin?redirectTo=${router.asPath}`)

      if (!roomId) {
        router.push('/')
        return
      }

      if (!userInfo.email) return

      const isParticipant = await verifyIfIsParticipant({
        userId: userInfo.email,
        roomId,
      })

      if (!isParticipant) {
        router.push(`/invitation/${roomId}`)
        return
      }

      setMeInThisRoom({
        ...meInThisRoom,
        imHost: room.hostId === userInfo.email,
      })
    }

    verifyParticipant()

    updateRoomHistory({ roomId, userId: userInfo.email, roomName: room.name })

    const roomStream = streamRoomById(roomId, {
      next: querySnapshot => {
        const updatedRoom: Room = querySnapshot.docs
          .map(docSnapshot => docSnapshot.data())
          .shift()

        setRoom(updatedRoom)
      },
      error: () => {
        setIsLoading(false)
      },
    })

    const userRoomStream = streamUserRoomByRoomId(roomId, {
      next: querySnapshot => {
        const updatedUserRoom: IUserRoomProps = querySnapshot.docs
          .map(docSnapshot => docSnapshot.data())
          .shift()

        setUserRoom(updatedUserRoom)

        const findMe = updatedUserRoom.participants.find(
          participant => participant.id === userInfo.email
        )
        console.warn('findMe', findMe)
        // TODO não está atualizando o componente depois que setta o meInThisRoom
        // TODO talvez seja melhor entra na sala com o voto zerado
        setMeInThisRoom({
          ...meInThisRoom,
          viewerMode: findMe?.viewerMode,
          vote: findMe?.vote,
          name: findMe?.name,
        })

        console.warn({ meInThisRoom })

        setIsLoading(false)
      },
      error: () => {
        setIsLoading(false)
      },
    })

    return () => {
      roomStream
      userRoomStream
    }
  }, [roomId, userInfo])

  return (
    <MainContainer>
      <main>
        <OptionsModal
          toggle={toggleOptionsModal}
          setToggleModal={setToggleOptionsModal}
          room={room}
          me={meInThisRoom}
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
          roomId={roomId}
          me={meInThisRoom}
        />

        <Header
          setToggleOptionsModal={setToggleOptionsModal}
          setToggleAccountModal={setToggleAccountModal}
          loading={isLoading || loading}
          showOptions={true}
          session={session}
          user={{
            name: meInThisRoom.name,
            image: userInfo.image,
          }}
        />

        {!isLoading && (
          <>
            <RoomTitle isLoading={isLoading} room={room} />

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
                me={meInThisRoom}
                loading={isLoading}
              />
            </PageContainer>
          </>
        )}
      </main>
    </MainContainer>
  )
}

export default Voting
