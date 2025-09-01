import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
  off,
  get,
  orderByChild,
  equalTo,
  query
} from 'firebase/database'
import { Room, User, Vote, VotingRound } from '../types'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

export const roomsRef = ref(db, 'rooms')

// Funções para gerenciar salas
export async function createRoom(
  roomName: string,
  ownerName: string,
  ownerId: string
): Promise<string> {
  // Validar parâmetros obrigatórios
  if (!roomName || typeof roomName !== 'string') {
    throw new Error('Nome da sala é obrigatório')
  }

  if (!ownerName || typeof ownerName !== 'string') {
    throw new Error('Nome do proprietário é obrigatório')
  }

  if (!ownerId || typeof ownerId !== 'string') {
    throw new Error('ID do proprietário é obrigatório')
  }

  const roomsRef = ref(db, 'rooms')
  const newRoomRef = push(roomsRef)
  const roomId = newRoomRef.key!

  const owner: User = {
    id: ownerId,
    name: ownerName,
    isOwner: true
  }

  const room: Room = {
    id: roomId,
    name: roomName,
    ownerId: owner.id,
    participants: [owner],
    currentRound: null,
    votingHistory: [],
    settings: {
      autoReveal: false,
      revealDelay: 5000
    },
    createdAt: Date.now(),
    lastActivity: Date.now()
  }

  await set(newRoomRef, room)

  return roomId
}

export async function joinRoom(
  roomId: string,
  userId: string,
  userName: string
): Promise<User | null> {
  const roomRef = ref(db, `rooms/${roomId}`)

  return new Promise(resolve => {
    onValue(
      roomRef,
      async snapshot => {
        const room = snapshot.val() as Room
        if (!room) {
          resolve(null)
          return
        }

        // Garantir que participants sempre seja um array válido
        const currentParticipants = Array.isArray(room.participants)
          ? room.participants
          : []

        // Verificar se o usuário já existe pela chave única (ID)
        const existingIndex = currentParticipants.findIndex(
          p => p.id === userId
        )

        let updatedParticipants: User[] = currentParticipants
        let resultingUser: User

        if (existingIndex >= 0) {
          // Usuário já existe: atualizar apenas o nome (preservando isOwner e demais campos)
          updatedParticipants = currentParticipants.map(p =>
            p.id === userId ? { ...p, name: userName } : p
          )
          resultingUser = updatedParticipants[existingIndex]
        } else {
          // Novo participante: adicionar com o ID fornecido
          const newUser: User = {
            id: userId,
            name: userName,
            isOwner: room.ownerId === userId
          }
          updatedParticipants = [...currentParticipants, newUser]
          resultingUser = newUser
        }

        await update(roomRef, {
          participants: updatedParticipants,
          lastActivity: Date.now()
        })

        resolve(resultingUser)
      },
      { onlyOnce: true }
    )
  })
}

export async function leaveRoom(roomId: string, userId: string): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)

  onValue(
    roomRef,
    async snapshot => {
      const room = snapshot.val() as Room
      if (!room) return

      // Garantir que participants sempre seja um array válido
      const currentParticipants = Array.isArray(room.participants)
        ? room.participants
        : []
      const updatedParticipants = currentParticipants.filter(
        p => p.id !== userId
      )

      // Se a sala ficar vazia após o usuário sair, criar notificação de remoção
      if (updatedParticipants.length === 0) {
        const removalNotificationRef = ref(db, `roomRemovals/${roomId}`)
        await set(removalNotificationRef, {
          roomId,
          timestamp: Date.now(),
          action: 'emptied'
        })

        // Remover a notificação após um tempo para limpeza
        setTimeout(async () => {
          try {
            await remove(removalNotificationRef)
          } catch (cleanupError) {
            console.warn('Erro ao limpar notificação de remoção:', cleanupError)
          }
        }, 30000) // 30 segundos
      }

      // Sempre atualizar a sala, mesmo se ficar vazia
      // A sala só deve ser excluída explicitamente pelo owner
      await update(roomRef, {
        participants: updatedParticipants,
        lastActivity: Date.now()
      })
    },
    { onlyOnce: true }
  )
}

export async function submitVote(
  roomId: string,
  userId: string,
  value: number | null
): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)

  onValue(
    roomRef,
    async snapshot => {
      const room = snapshot.val() as Room
      if (!room || !room.currentRound) return

      const vote: Vote = {
        userId,
        value,
        timestamp: Date.now()
      }

      // Garantir que votes sempre seja um array válido
      const currentVotes = Array.isArray(room.currentRound.votes)
        ? room.currentRound.votes
        : []
      const existingVoteIndex = currentVotes.findIndex(v => v.userId === userId)
      const updatedVotes = [...currentVotes]

      if (existingVoteIndex >= 0) {
        updatedVotes[existingVoteIndex] = vote
      } else {
        updatedVotes.push(vote)
      }

      const updatedRound: VotingRound = {
        ...room.currentRound,
        votes: updatedVotes
      }

      await update(roomRef, {
        currentRound: updatedRound,
        lastActivity: Date.now()
      })
    },
    { onlyOnce: true }
  )
}

export async function startNewRound(roomId: string): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)

  onValue(
    roomRef,
    async snapshot => {
      const room = snapshot.val() as Room
      if (!room) return

      const newRound: VotingRound = {
        id: Date.now().toString(),
        votes: [],
        isRevealed: false,
        createdAt: Date.now()
      }

      // Garantir que votingHistory sempre seja um array válido
      const currentHistory = Array.isArray(room.votingHistory)
        ? room.votingHistory
        : []
      const updatedHistory = room.currentRound
        ? [...currentHistory, room.currentRound]
        : currentHistory

      await update(roomRef, {
        currentRound: newRound,
        votingHistory: updatedHistory,
        lastActivity: Date.now()
      })
    },
    { onlyOnce: true }
  )
}

export async function revealVotes(roomId: string): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)

  onValue(
    roomRef,
    async snapshot => {
      const room = snapshot.val() as Room
      if (!room || !room.currentRound) return

      const updatedRound: VotingRound = {
        ...room.currentRound,
        isRevealed: true,
        revealedAt: Date.now()
      }

      await update(roomRef, {
        currentRound: updatedRound,
        lastActivity: Date.now()
      })
    },
    { onlyOnce: true }
  )
}

export function listenToRoom(
  roomId: string,
  callback: (room: Room | null) => void
): () => void {
  const roomRef = ref(db, `rooms/${roomId}`)

  const unsubscribe = onValue(roomRef, snapshot => {
    const room = snapshot.val() as Room | null
    callback(room)
  })

  return () => off(roomRef, 'value', unsubscribe)
}

export async function updateRoomSettings(
  roomId: string,
  settings: Partial<Room['settings']>
): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}/settings`)
  await update(roomRef, settings)
}

export async function updateRoomName(
  roomId: string,
  name: string
): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)
  await update(roomRef, {
    name,
    lastActivity: Date.now()
  })
}

export async function removeParticipant(
  roomId: string,
  participantId: string
): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)

  onValue(
    roomRef,
    async snapshot => {
      const room = snapshot.val() as Room
      if (!room) return

      const currentParticipants = Array.isArray(room.participants)
        ? room.participants
        : []
      const updatedParticipants = currentParticipants.filter(
        p => p.id !== participantId
      )

      // Criar notificação específica para o participante removido
      const participantRemovalRef = ref(
        db,
        `participantRemovals/${participantId}_${roomId}`
      )
      await set(participantRemovalRef, {
        roomId,
        participantId,
        timestamp: Date.now(),
        action: 'removed'
      })

      // Remover a notificação após um tempo para limpeza
      setTimeout(async () => {
        try {
          await remove(participantRemovalRef)
        } catch (cleanupError) {
          console.warn(
            'Erro ao limpar notificação de remoção de participante:',
            cleanupError
          )
        }
      }, 30000) // 30 segundos

      await update(roomRef, {
        participants: updatedParticipants,
        lastActivity: Date.now()
      })
    },
    { onlyOnce: true }
  )
}

export async function updateParticipantName(
  roomId: string,
  userId: string,
  newName: string
): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`)

  onValue(
    roomRef,
    async snapshot => {
      const room = snapshot.val() as Room
      if (!room) return

      const currentParticipants = Array.isArray(room.participants)
        ? room.participants
        : []
      const updatedParticipants = currentParticipants.map(participant =>
        participant.id === userId
          ? { ...participant, name: newName }
          : participant
      )

      await update(roomRef, {
        participants: updatedParticipants,
        lastActivity: Date.now()
      })
    },
    { onlyOnce: true }
  )
}

export async function deleteRoom(roomId: string): Promise<void> {
  try {
    const roomRef = ref(db, `rooms/${roomId}`)

    // Criar notificação de remoção antes de deletar a sala
    const removalNotificationRef = ref(db, `roomRemovals/${roomId}`)
    await set(removalNotificationRef, {
      roomId,
      timestamp: Date.now(),
      action: 'deleted'
    })
    await remove(roomRef)

    // Remover a notificação após um tempo para limpeza
    setTimeout(async () => {
      try {
        await remove(removalNotificationRef)
      } catch (cleanupError) {
        console.error('Erro ao limpar notificação de remoção:', cleanupError)
      }
    }, 30000) // 30 segundos
  } catch (error) {
    console.error('Erro ao deletar sala:', error)
    throw error
  }
}

export async function getRoomsByOwnerId(ownerId: string): Promise<Room[]> {
  const roomsRef = ref(db, `rooms`)

  const _query = query(roomsRef, orderByChild('ownerId'), equalTo(ownerId))
  const rooms: Room[] = []
  try {
    onValue(
      _query,
      snapshot => {
        if (snapshot.exists()) {
          // snapshot.val() retorna todos os dados como um objeto JavaScript.
          // Você pode iterar sobre eles para acessar cada room.
          snapshot.val()
          // Para iterar sobre cada room individualmente:
          snapshot.forEach(childSnapshot => {
            // const roomKey = childSnapshot.key; // O ID da room (ex: roomId1)
            const roomData = childSnapshot.val() // Os dados da room
            rooms.push(roomData)
          })
        }
      },
      error => {
        console.error('Erro ao buscar rooms:', error)
      }
    )
    return rooms
  } catch (error) {
    console.warn('Erro geral ao sincronizar com Firebase:', error)

    return []
  }
}

export async function getRoomsByIds(
  roomIds: string[]
): Promise<{ rooms: Room[]; notFoundIds: string[] }> {
  if (roomIds.length === 0) return { rooms: [], notFoundIds: [] }

  const rooms: Room[] = []
  const notFoundIds: string[] = []

  for (const roomId of roomIds) {
    try {
      const roomRef = ref(db, `rooms/${roomId}`)
      const snapshot = await get(roomRef)
      const room = snapshot.val() as Room

      if (room) {
        rooms.push(room)
      } else {
        notFoundIds.push(roomId)
      }
    } catch (error) {
      console.error(`Erro ao buscar sala ${roomId}:`, error)
      notFoundIds.push(roomId)
    }
  }

  return { rooms, notFoundIds }
}

// Função para escutar notificações de remoção de salas
export function listenToRoomRemovals(
  callback: (roomId: string, action: string) => void
): () => void {
  const removalNotificationsRef = ref(db, 'roomRemovals')

  const unsubscribe = onValue(removalNotificationsRef, snapshot => {
    if (snapshot.exists()) {
      const removals = snapshot.val()
      Object.keys(removals).forEach(roomId => {
        const removal = removals[roomId]
        if (removal && removal.action) {
          callback(roomId, removal.action)
        }
      })
    }
  })

  return () => off(removalNotificationsRef, 'value', unsubscribe)
}

// Função para escutar notificações de remoção de participantes específicos
export function listenToParticipantRemovals(
  userId: string,
  callback: (roomId: string, action: string) => void
): () => void {
  const participantRemovalsRef = ref(db, 'participantRemovals')

  const unsubscribe = onValue(participantRemovalsRef, snapshot => {
    if (snapshot.exists()) {
      const removals = snapshot.val()
      Object.keys(removals).forEach(key => {
        const removal = removals[key]
        if (removal && removal.participantId === userId && removal.action) {
          callback(removal.roomId, removal.action)
        }
      })
    }
  })

  return () => off(participantRemovalsRef, 'value', unsubscribe)
}
