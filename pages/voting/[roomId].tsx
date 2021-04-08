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
import { Room } from '../../typings/Room'
import { getDatabase } from '../../services/firebase'
import usePersistedState from '../../hooks/usePersistedState'
import { DEFAULT_ROOM, STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { CalculateVotingProps } from '../../typings/Voting'
import { validateInputValue, validateRoomId } from '../../utils'
import ChangeNameModal from '../../components/ChangeNameModal'

const Voting: FC = () => {
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
      }, 1500)

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
        { ...room, participants: newParticipants },
        { merge: false }
      )
      router.push('/')
    } catch (error) {
      Toast({ type: 'error', message: 'Error trying to exit room. Sorry :(' })
      console.error('Error trying to exit room', error)
    }
  }

  const calculateVotingResult = async ({ roomRef }: CalculateVotingProps) => {
    try {
      const results = room.participants.reduce((acc, curr) => {
        if (!curr.vote.length) return acc

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

      await roomRef.set(
        {
          results: {
            average,
            items: results,
          },
        },
        { merge: true }
      )
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
      const roomPath = room.ref.path.split('/')[1]
      const roomRef = db.collection('rooms').doc(roomPath)
      const newIsVoting = !isVoting
      const showResults = !newIsVoting

      let dataToChange = {
        ...room,
        isVoting: newIsVoting,
        showResults,
      }

      if (!isVoting) {
        const newParticipants = room.participants.map(participant => {
          return {
            ...participant,
            vote: '',
          }
        })

        dataToChange = {
          ...dataToChange,
          participants: newParticipants,
        }
      }

      await roomRef.set(dataToChange, { merge: false })

      if (showResults) calculateVotingResult({ roomRef })

      setIsVoting(!isVoting)
    } catch (error) {
      Toast({
        type: 'error',
        message: 'Error trying to start voting. Try again.',
      })
      console.error('Error when trying to start voting', error)
    }
  }

  const handleChangeName = async (newUserName: string) => {
    try {
      if (newUserName !== null && !validateInputValue(newUserName))
        return Toast({ type: 'warning', message: 'Type a valid name.' })

      if (!newUserName || newUserName === null) return

      const newUserInfo = {
        ...userInfo,
        name: newUserName,
      }

      setStorage(JSON.stringify(newUserInfo))

      const { participants } = room

      // TODO abstract this into a function to modify participants passing key, value
      const newParticipants = participants.map(participant => {
        if (participant.id === userInfo.userId) {
          return {
            ...participant,
            name: newUserName,
          }
        }

        return participant
      })

      const roomPath = room.ref.path.split('/')[1]
      const roomRef = db.collection('rooms').doc(roomPath)

      await roomRef.set(
        {
          ...room,
          participants: newParticipants,
        },
        { merge: false }
      )

      Toast({ message: 'Name updated with success.' })
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
      const { participants } = room

      const newParticipants = participants.map(participant => {
        if (participant.id === userInfo.userId) {
          return {
            ...participant,
            vote: voteId,
          }
        }

        return participant
      })

      const roomPath = room.ref.path.split('/')[1]
      const roomRef = db.collection('rooms').doc(roomPath)

      await roomRef.set(
        {
          ...room,
          participants: newParticipants,
        },
        { merge: false }
      )
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

  return (
    <div>
      <main>
        <ChangeNameModal
          toggle={toggleModal}
          inputValue={userInfo.name}
          handleChangeName={handleChangeName}
        />
        <Header showRoomTitle roomTitle={room.name} roomId={roomId} />

        <PageContainer>
          <ParticipantsPanel
            handleChangeMyName={() => setToggleModal(true)}
            setStartVoting={handleStartVoting}
            imHost={imHost}
            handleDeleteRoom={handleDeleteRoom}
            handleExitRoom={handleExitRoom}
            room={room}
            userInfo={userInfo}
            loading={loading}
          />
          <VotingPanel
            handleVoteClick={handleVoteClick}
            room={room}
            showResults={room.showResults}
          />
        </PageContainer>
      </main>
    </div>
  )
}

export default Voting
