import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PageContainer } from '../../styles/Voting.styles'

import {
  Header,
  Modal,
  ParticipantsPanel,
  Toast,
  VotingPanel,
} from '../../components'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  Participant,
  Room,
  UserInfo,
  CalculateVotingProps,
} from '../../typings'
import { getDatabase } from '../../services/firebase'
import usePersistedState from '../../hooks/usePersistedState'
import {
  DEFAULT_PARTICIPANT,
  DEFAULT_ROOM,
  STORAGE_KEY_USER,
} from '../../constants'
import { updateRoom, validateRoomId } from '../../utils'
import OptionsModal from '../../components/OptionsModal'

const Voting: FC = () => {
  const [me, setMe] = useState<Participant>(DEFAULT_PARTICIPANT)
  const [isVoting, setIsVoting] = useState(false)
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')
  const [toggleModal, setToggleModal] = useState(false)

  const router = useRouter()
  const { roomId } = router.query

  const db = getDatabase()
  const [rooms, loading, error] = useCollectionData<Room[]>(
    db.collection('rooms').where('id', '==', roomId || ''),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
      refField: 'ref',
    }
  )

  const room: Room = rooms && rooms[0] ? rooms[0] : DEFAULT_ROOM

  const userInfo: UserInfo = storage && JSON.parse(storage)
  const imHost = room.hostId === userInfo.userId

  const handleDeleteRoom = async () => {
    try {
      setTimeout(async () => {
        await db.doc(room.ref.path).delete()
      }, 500)

      router.push('/')
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to close your room. Sorry :(',
      })
      console.error('Error trying to close room', error)
    }
  }

  const handleExitRoom = async () => {
    try {
      const roomPath = room.ref.path.split('/')[1]
      const roomRef = db.collection('rooms').doc(roomPath)

      const newParticipants = room.participants.filter(
        participant => participant.id !== userInfo.userId
      )

      await roomRef.set(
        {
          ...room,
          participants: newParticipants,
        },
        { merge: false }
      )
      router.push('/')
    } catch (error) {
      Toast({ type: 'error', message: 'Error trying to exit room. Sorry :(' })
      console.error('Error trying to exit room', error)
    }
  }

  const calculateVotingResult = () => {
    try {
      const results = room.participants.reduce((acc, curr) => {
        if (
          !curr.vote.length ||
          curr.vote === 'question' ||
          curr.vote === 'coffee'
        )
          return acc

        const item = {
          id: curr.vote,
          votes: 0,
        }

        item.votes = room.participants.filter(
          ({ vote }) => vote === curr.vote
        ).length

        const itemIndex = acc.findIndex(item => item.id === curr.vote)

        if (itemIndex !== -1) acc[itemIndex] = item
        else acc.push(item)

        return acc
      }, [])

      const resultVotes = results.map(result => parseInt(result.id, 10))

      const votesSum = resultVotes.reduce((acc, curr) => acc + curr, 0)
      const average = votesSum / resultVotes.length || 0

      return { average, results }
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying calculate voting results. Try again.',
      })
      console.error('Error trying to set voting results', error)
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
        const { average, results } = calculateVotingResult()
        newRoom.results = {
          average,
          items: results,
        }
      }

      await updateRoom({
        room,
        newParticipant,
        newRoom,
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

      Toast({ message: 'Options updated with success.' })
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to change your name. Try again.',
      })
      console.error('Error trying to change name', error)
    }

    setToggleModal(false)
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

  useEffect(() => {
    if (!validateRoomId(roomId)) {
      router.push('/')
      return
    }
  }, [roomId])

  useEffect(() => {
    const me = room.participants.find(({ id }) => id === userInfo.userId)
    setMe(me ? me : DEFAULT_PARTICIPANT)
  }, [room])

  return (
    <div>
      <main>
        <OptionsModal
          room={room}
          me={me}
          userInfo={userInfo}
          handleSaveRoomOptions={handleSaveRoomOptions}
          loading={loading}
          toggle={toggleModal}
          setToggleModal={setToggleModal}
          imHost={imHost}
        />
        <Header
          showRoomTitle
          roomTitle={room.name}
          roomId={roomId}
          setToggleModal={setToggleModal}
        />

        <PageContainer>
          <ParticipantsPanel
            setStartVoting={handleStartVoting}
            imHost={imHost}
            handleDeleteRoom={handleDeleteRoom}
            handleExitRoom={handleExitRoom}
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
