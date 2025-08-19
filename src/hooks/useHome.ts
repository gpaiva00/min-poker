import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRoom } from "@/hooks/useRoom";
import { LocalUserData, Room } from "@/types";
import { generateFunnyName } from "@/lib/utils";
import {
  listenToRoom,
  getRoomsByOwnerId,
  removeParticipant,
  updateRoomName,
  roomsRef,
  getRoomsByIds,
  listenToRoomRemovals,
  listenToParticipantRemovals,
} from "@/lib/firebase";
import {
  DataSnapshot,
  equalTo,
  off,
  onValue,
  orderByChild,
  query,
} from "firebase/database";

export function useHome() {
  const {
    room: selectedRoom,
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
  } = useRoom();

  const { roomId } = useParams();
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);
  const [pendingRoomName, setPendingRoomName] = useState<string>("");
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [participatedRooms, setParticipatedRooms] = useState<Room[]>([]);

  const [userData, setUserData] = useLocalStorage<LocalUserData>(
    "minPoker_userData",
    {
      name: generateFunnyName(),
      userId: Date.now().toString(),
    }
  );

  // IDs de salas em que o usuário participou (histórico)
  const [participatedRoomIds, setParticipatedRoomIds] = useLocalStorage<
    string[]
  >("minPoker_participatedRooms", []);

  // Garantir que userData sempre tenha um userId válido
  useEffect(() => {
    if (!userData.userId) {
      console.warn("userData.userId estava undefined, gerando novo ID");
      setUserData((prev) => ({
        ...prev,
        userId: Date.now().toString(),
      }));
    }
  }, [userData.userId, setUserData]);

  useEffect(() => {
    const ownerId = userData.userId;

    if (!ownerId) {
      setUserRooms([]);
      return;
    }

    const _query = query(roomsRef, orderByChild("ownerId"), equalTo(ownerId));

    const unsubscribe = onValue(
      _query,
      (snapshot: DataSnapshot) => {
        const fetchedRooms: Room[] = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const roomData = childSnapshot.val();
            fetchedRooms.push({ id: childSnapshot.key as string, ...roomData });
          });
        }
        setUserRooms(fetchedRooms);
      },
      (error) => {
        console.error("Erro ao buscar rooms em tempo real:", error);
        setUserRooms([]);
      }
    );

    return () => {
      off(_query, "value", unsubscribe);
    };
  }, [userData.userId]);

  // Buscar detalhes das salas participadas a partir dos IDs armazenados
  useEffect(() => {
    let isMounted = true;
    async function fetchParticipated() {
      try {
        if (!participatedRoomIds || participatedRoomIds.length === 0) {
          if (isMounted) setParticipatedRooms([]);
          return;
        }

        const { rooms, notFoundIds } = await getRoomsByIds(participatedRoomIds);
        if (!isMounted) return;

        // Remover duplicatas e ordenar por lastActivity (mais recente primeiro), se disponível
        const uniqueMap = new Map<string, Room>();
        rooms.forEach((r) => {
          uniqueMap.set(r.id, r);
        });
        const uniqueRooms = Array.from(uniqueMap.values()).sort((a, b) => {
          const aTs = (a as any).lastActivity ?? 0;
          const bTs = (b as any).lastActivity ?? 0;
          return bTs - aTs;
        });
        setParticipatedRooms(uniqueRooms);

        // Limpar IDs que não existem mais
        if (notFoundIds.length > 0) {
          setParticipatedRoomIds((prev) =>
            prev.filter((id) => !notFoundIds.includes(id))
          );
        }
      } catch (e) {
        console.error("Erro ao buscar salas participadas:", e);
      }
    }
    fetchParticipated();
    return () => {
      isMounted = false;
    };
  }, [participatedRoomIds]);

  // Escutar notificações de remoção de salas
  useEffect(() => {
    const unsubscribe = listenToRoomRemovals((roomId) => {
      // Remover a sala da lista de salas participadas
      setParticipatedRoomIds((prev) => {
        const updated = prev.filter((id) => id !== roomId);
        return updated;
      });

      // Remover da lista de salas participadas em tempo real
      setParticipatedRooms((prev) => prev.filter((room) => room.id !== roomId));
    });

    return unsubscribe;
  }, [selectedRoom]);

  // Escutar notificações de remoção específicas do usuário atual
  useEffect(() => {
    if (!userData.userId) return;

    const unsubscribe = listenToParticipantRemovals(
      userData.userId,
      (roomId) => {
        // Remover a sala da lista de salas participadas
        setParticipatedRoomIds((prev) => {
          const updated = prev.filter((id) => id !== roomId);
          return updated;
        });

        // Remover da lista de salas participadas em tempo real
        setParticipatedRooms((prev) =>
          prev.filter((room) => room.id !== roomId)
        );
      }
    );

    return unsubscribe;
  }, [userData.userId, selectedRoom]);

  // Handle room URL parameter
  useEffect(() => {
    if (roomId && !selectedRoom) {
      setPendingRoomId(roomId);

      // Buscar o nome real da sala
      const unsubscribe = listenToRoom(roomId, (roomData) => {
        if (roomData) {
          setPendingRoomName(roomData.name);
        } else {
          setPendingRoomName(`Sala ${roomId.slice(0, 6)}`);
        }
        unsubscribe();
      });

      if (!userData.name) {
        setShowJoinDialog(true);
      } else {
        joinExistingRoom(roomId, userData.name, userData.userId);
      }
    }
  }, [roomId, selectedRoom, userData.name, userData.userId, joinExistingRoom]);

  async function handleCreateRoom(roomName: string) {
    // Validar dados antes de criar a sala
    if (!userData.name || !userData.userId) {
      console.error("Dados do usuário inválidos:", userData);
      alert("Erro: Dados do usuário não encontrados. Recarregue a página.");
      return;
    }

    if (!roomName.trim()) {
      alert("Nome da sala é obrigatório");
      return;
    }

    try {
      const roomId = await createNewRoom(
        roomName.trim(),
        userData.name,
        userData.userId
      );
      if (roomId) {
        // Recarregar a lista de salas do usuário
        try {
          const rooms = await getRoomsByOwnerId(userData.userId);
          setUserRooms(rooms);
        } catch (error) {
          console.error("Erro ao recarregar lista de salas:", error);
          // Mesmo com erro, a sala foi criada, então vamos tentar novamente em breve
          setTimeout(async () => {
            try {
              const rooms = await getRoomsByOwnerId(userData.userId);
              setUserRooms(rooms);
            } catch (retryError) {
              console.error(
                "Erro na segunda tentativa de recarregar salas:",
                retryError
              );
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      alert(
        `Erro ao criar sala: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    }
  }

  function handleWasRemovedAction() {
    clearRemovedState();
    window.location.href = "/";
  }

  function handleWasDeletedAction() {
    clearDeletedState();
    window.location.href = "/";
  }

  function handleUpdateRoom(updatedRoom: Room) {
    // Atualizar configurações através do hook useRoom
    if (updatedRoom.settings !== selectedRoom?.settings) {
      updateSettings(updatedRoom.settings);
    }

    // Atualizar nome da sala se mudou
    if (updatedRoom.name !== selectedRoom?.name) {
      updateRoomName(selectedRoom!.id, updatedRoom.name).catch((error) => {
        console.error("Erro ao atualizar nome da sala:", error);
      });
    }
  }

  function handleCloseJoinDialog() {
    setShowJoinDialog(false);
    setPendingRoomId(null);
    setPendingRoomName("");
  }

  function handleRoomSelect(roomId: string) {
    // Encontrar a sala e conectar a ela
    const room =
      userRooms.find((r) => r.id === roomId) ||
      participatedRooms.find((r) => r.id === roomId);
    if (room) {
      joinExistingRoom(roomId, userData.userId, userData.name);
    }
  }

  async function handleJoinRoom(name: string) {
    if (!pendingRoomId) return;

    const success = await joinExistingRoom(
      pendingRoomId,
      userData.userId,
      name
    );
    if (success) {
      setUserData((prev) => ({ ...prev, name }));
      // Persistir histórico de salas participadas
      setParticipatedRoomIds((prev) => {
        const next = new Set([...(prev ?? []), pendingRoomId]);
        return Array.from(next);
      });
      setShowJoinDialog(false);
      setPendingRoomId(null);
    }
  }

  const handleJoinRoomByCode = useCallback(
    async (roomId: string) => {
      // Navegar para a URL da sala, que irá acionar o fluxo de ingresso
      window.history.pushState({}, "", `/${roomId}`);

      // Definir o roomId pendente e mostrar o diálogo
      setPendingRoomId(roomId);

      // Buscar o nome real da sala
      const unsubscribe = listenToRoom(roomId, (roomData) => {
        if (roomData) {
          setPendingRoomName(roomData.name);
        } else {
          setPendingRoomName(`Sala ${roomId.slice(0, 6)}`);
        }
        unsubscribe();
      });
      console.log("handleJoinRoomByCode", userData);
      if (!userData.name) {
        setShowJoinDialog(true);
      } else {
        await joinExistingRoom(roomId, userData.userId, userData.name);
      }
    },
    [userData.name, userData.userId]
  );

  async function handleRemoveParticipant(userId: string) {
    if (!selectedRoom) return;

    try {
      await removeParticipant(selectedRoom.id, userId);
    } catch (error) {
      console.error("Erro ao remover participante:", error);
    }
  }

  async function handleVote(value: number) {
    await vote(value);
  }

  async function handleStartNewRound() {
    await startRound();
  }

  async function handleRevealVotes() {
    await reveal();
  }

  async function handleLeaveRoom() {
    if (!selectedRoom) return;

    try {
      await leaveCurrentRoom();

      // Remover a sala da lista de salas do usuário apenas localmente
      setUserRooms((prev) =>
        prev.filter((room) => room.id !== selectedRoom.id)
      );

      // Remover a sala da lista de salas participadas
      setParticipatedRoomIds((prev) =>
        prev.filter((id) => id !== selectedRoom.id)
      );
    } catch (error) {
      console.error("Erro ao sair da sala:", error);
    }
  }

  async function handleDeleteRoom() {
    if (!selectedRoom) return;

    try {
      await deleteCurrentRoom();

      // Recarregar a lista de salas do usuário após exclusão
      try {
        const rooms = await getRoomsByOwnerId(userData.userId);
        setUserRooms(rooms);

        // A remoção da lista de salas participadas será feita automaticamente
        // pelo listener de notificações de remoção
      } catch (error) {
        console.error("Erro ao recarregar lista após exclusão:", error);
      }
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
    }
  }

  return {
    // Estados
    selectedRoom,
    currentUser,
    userData,
    userRooms,
    participatedRooms,
    showJoinDialog,
    pendingRoomId,
    pendingRoomName,
    wasRemoved,
    wasDeleted,
    loading,
    error,

    // Setters
    setUserData,

    // Handlers
    handleCreateRoom,
    handleJoinRoom,
    handleJoinRoomByCode,
    handleRemoveParticipant,
    handleVote,
    handleStartNewRound,
    handleRevealVotes,
    handleLeaveRoom,
    handleDeleteRoom,
    handleWasRemovedAction,
    handleWasDeletedAction,
    handleUpdateRoom,
    handleCloseJoinDialog,
    handleRoomSelect,
    updateUserName,
  };
}
