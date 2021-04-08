import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PageContainer } from '../../styles/Voting.styles'

import ParticipantsPanel from '../../components/ParticipantsPanel'
import Header from '../../components/Header'
import VotingPanel from '../../components/VotingPanel'

import { validateRoomId } from '../../utils/validateRoomId'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Room } from '../../typings/Room'
import { getDatabase } from '../../services/firebase'
import usePersistedState from '../../hooks/usePersistedState'
import { DEFAULT_ROOM, STORAGE_KEY_USER } from '../../constants'
import { UserInfo } from '../../typings/UserInfo'
import { CalculateVotingProps } from '../../typings/Voting'
import { toast } from 'react-toastify'

const Voting: FC = () => {
  const [isVoting, setIsVoting] = useState(false)
  const [storage, setStorage] = usePersistedState(STORAGE_KEY_USER, '')

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
      toast.error('Error trying to close your room. Sorry :(', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
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
      toast.error('Error trying to exit room. Sorry :(', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
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

      await roomRef.set(
        {
          results,
        },
        { merge: true }
      )
    } catch (error) {
      toast.error('Error trying calculate voting results. Try again.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
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
      toast.error('Error trying to start voting. Try again.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      console.error('Error when trying to start voting', error)
    }
  }

  const handleChangeMyName = async () => {
    try {
      const newUserName = prompt('Type your name', userInfo.name)

      if (!newUserName.length || newUserName === null) return

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
    } catch (error) {
      toast.error('Error trying to change your name. Try again.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      console.error('Error trying to change name', error)
    }
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
      toast.error('Error trying to set your vote. Try again.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
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
        <Header
          showRoomTitle
          roomTitle={room.name}
          roomId={roomId}
          imHost={imHost}
        />

        <PageContainer>
          <ParticipantsPanel
            handleChangeMyName={handleChangeMyName}
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
