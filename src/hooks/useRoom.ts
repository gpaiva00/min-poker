import { useState, useEffect, useCallback } from "react";
import { Room, User } from "../types";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  submitVote,
  startNewRound,
  revealVotes,
  listenToRoom,
  updateRoomSettings,
  updateParticipantName,
  deleteRoom,
} from "../lib/firebase";

export function useRoom() {
  const [room, setRoom] = useState<Room | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wasRemoved, setWasRemoved] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);

  const createNewRoom = useCallback(
    async (
      roomName: string,
      ownerName: string,
      ownerId: string
    ): Promise<string | null> => {
      try {
        setLoading(true);
        setError(null);

        const roomId = await createRoom(roomName, ownerName, ownerId);

        // Encontrar o usuário owner na sala criada
        const unsubscribe = listenToRoom(roomId, (roomData) => {
          if (roomData) {
            setRoom(roomData);
            const owner = roomData.participants.find((p) => p.isOwner);
            if (owner) {
              setCurrentUser(owner);
            }
          }
          unsubscribe();
        });

        return roomId;
      } catch (err) {
        setError("Erro ao criar sala");
        console.error("Erro ao criar sala:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const joinExistingRoom = useCallback(
    async (
      roomId: string,
      userId: string,
      userName: string
    ): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        setWasDeleted(false); // Reset removed state when joining

        const user = await joinRoom(roomId, userId, userName);

        if (!user) {
          setError("Sala não encontrada");
          return false;
        }

        setCurrentUser(user);

        // Iniciar listener da sala
        const unsubscribe = listenToRoom(roomId, (roomData) => {
          if (roomData && user) {
            // Verificar se o usuário atual ainda está na sala
            const userStillInRoom = roomData.participants.find(
              (p) => p.id === user.id
            );

            // Usuário foi removido da sala (mas sala ainda existe)
            if (!userStillInRoom) {
              // Só mostrar alerta de remoção se o usuário NÃO for proprietário
              if (!user.isOwner) {
                setWasRemoved(true);
              }
              setRoom(null);
              setCurrentUser(null);

              // Limpar listener
              unsubscribe();
              (window as any).roomUnsubscribe = null;
            } else {
              setRoom(roomData);
            }
          } else if (roomData === null && user) {
            // Sala foi deletada completamente
            if (!user.isOwner) {
              setWasDeleted(true);
            }
            setRoom(null);
            setCurrentUser(null);

            // Limpar listener
            unsubscribe();
            (window as any).roomUnsubscribe = null;
          } else {
            setRoom(roomData);
          }
        });

        // Salvar unsubscribe para limpeza posterior
        (window as any).roomUnsubscribe = unsubscribe;

        return true;
      } catch (err) {
        setError("Erro ao entrar na sala");
        console.error("Erro ao entrar na sala:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const leaveCurrentRoom = useCallback(async () => {
    if (!room || !currentUser) return;

    try {
      await leaveRoom(room.id, currentUser.id);

      // Limpar listener
      if ((window as any).roomUnsubscribe) {
        (window as any).roomUnsubscribe();
        (window as any).roomUnsubscribe = null;
      }

      setRoom(null);
      setCurrentUser(null);
    } catch (err) {
      setError("Erro ao sair da sala");
      console.error("Erro ao sair da sala:", err);
    }
  }, [room, currentUser]);

  const vote = useCallback(
    async (value: number | null): Promise<void> => {
      if (!room || !currentUser) return;

      try {
        await submitVote(room.id, currentUser.id, value);
      } catch (err) {
        setError("Erro ao votar");
        console.error("Erro ao votar:", err);
      }
    },
    [room, currentUser]
  );

  const startRound = useCallback(async (): Promise<void> => {
    if (!room || !currentUser?.isOwner) return;

    try {
      await startNewRound(room.id);
    } catch (err) {
      setError("Erro ao iniciar nova rodada");
      console.error("Erro ao iniciar nova rodada:", err);
    }
  }, [room, currentUser]);

  const reveal = useCallback(async (): Promise<void> => {
    if (!room || !currentUser?.isOwner) return;

    try {
      await revealVotes(room.id);
    } catch (err) {
      setError("Erro ao revelar votos");
      console.error("Erro ao revelar votos:", err);
    }
  }, [room, currentUser]);

  const updateSettings = useCallback(
    async (settings: Partial<Room["settings"]>): Promise<void> => {
      if (!room || !currentUser?.isOwner) return;

      try {
        await updateRoomSettings(room.id, settings);
      } catch (err) {
        setError("Erro ao atualizar configurações");
        console.error("Erro ao atualizar configurações:", err);
      }
    },
    [room, currentUser]
  );

  const updateUserName = useCallback(
    async (newName: string): Promise<void> => {
      if (!room || !currentUser) return;

      try {
        await updateParticipantName(room.id, currentUser.id, newName);
      } catch (err) {
        setError("Erro ao atualizar nome");
        console.error("Erro ao atualizar nome:", err);
      }
    },
    [room, currentUser]
  );

  const clearRemovedState = useCallback(() => {
    setWasRemoved(false);
  }, []);

  const clearDeletedState = useCallback(() => {
    setWasDeleted(false);
  }, []);

  const deleteCurrentRoom = useCallback(async (): Promise<void> => {
    if (!room || !currentUser?.isOwner) return;

    try {
      await deleteRoom(room.id);

      // Limpar listener
      if ((window as any).roomUnsubscribe) {
        (window as any).roomUnsubscribe();
        (window as any).roomUnsubscribe = null;
      }

      setRoom(null);
      setCurrentUser(null);
    } catch (err) {
      setError("Erro ao excluir sala");
      console.error("Erro ao excluir sala:", err);
    }
  }, [room, currentUser]);

  // Limpeza ao desmontar componente
  useEffect(() => {
    return () => {
      if ((window as any).roomUnsubscribe) {
        (window as any).roomUnsubscribe();
        (window as any).roomUnsubscribe = null;
      }
    };
  }, []);

  return {
    room,
    currentUser,
    loading,
    error,
    wasRemoved,
    wasDeleted,
    createNewRoom,
    joinExistingRoom,
    leaveCurrentRoom,
    vote,
    startRound,
    reveal,
    updateSettings,
    updateUserName,
    deleteCurrentRoom,
    clearRemovedState,
    clearDeletedState,
  };
}
