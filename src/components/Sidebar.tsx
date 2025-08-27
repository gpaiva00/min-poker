import { useState } from "react";
import { Plus, Shuffle, LogIn, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Room, LocalUserData } from "@/types";
import { generateFunnyName } from "@/lib/utils";
import { RoomListItem } from "@/components/RoomListItem";
import { Footer } from "./Footer";

interface SidebarProps {
  ownedRooms: Room[];
  participatedRooms: Room[];
  selectedRoomId: string | null;
  onRoomSelect: (roomId: string) => void;
  onCreateRoom: (roomName: string) => void;
  onJoinRoomByCode: (roomCode: string) => void;
  userData: LocalUserData;
  onUpdateUserData: (data: LocalUserData) => void;
  onUpdateUserName?: (newName: string) => Promise<void>;
}

export function Sidebar({
  ownedRooms,
  participatedRooms,
  selectedRoomId,
  onRoomSelect,
  onCreateRoom,
  onJoinRoomByCode,
  userData,
  onUpdateUserData,
  onUpdateUserName,
}: SidebarProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [userName, setUserName] = useState(userData.name);
  const [joinError, setJoinError] = useState("");

  // Contar salas criadas pelo usuário
  const ownedRoomsCount = ownedRooms.filter(
    (room) => room.ownerId === userData.userId
  ).length;

  function handleCreateRoom() {
    if (!newRoomName.trim()) return;

    if (ownedRoomsCount >= 3) {
      alert("Você pode criar no máximo 3 salas simultaneamente");
      return;
    }

    onCreateRoom(newRoomName.trim());
    setNewRoomName("");
    setIsCreateDialogOpen(false);
  }

  function handleJoinRoom() {
    if (!roomCode.trim()) {
      setJoinError("Por favor, insira um código ou link de sala");
      return;
    }

    setJoinError("");

    // Extrair o ID da sala do código ou link
    let roomId = roomCode.trim();

    // Se for um link completo, extrair apenas o ID da sala
    if (roomId.includes("/")) {
      const parts = roomId.split("/");
      roomId = parts[parts.length - 1];
    }

    // Validar se o ID tem um formato válido (pelo menos 6 caracteres)
    if (roomId.length < 6) {
      setJoinError("Código de sala inválido");
      return;
    }

    onJoinRoomByCode(roomId);
    setRoomCode("");
    setIsJoinDialogOpen(false);
  }

  function handleSubmit() {
    if (userName.trim() && userName !== userData.name) {
      // Atualizar dados locais
      onUpdateUserData({
        ...userData,
        name: userName.trim(),
      });

      // Atualizar nome na sala se estiver conectado
      if (onUpdateUserName) {
        onUpdateUserName(userName.trim()).catch((error) => {
          console.error("Erro ao atualizar nome na sala:", error);
        });
      }

      setIsSettingsDialogOpen(false);
    }
  }

  function handleGenerateRandomName() {
    setUserName(generateFunnyName());
  }

  const ownedIds = new Set(ownedRooms.map((r) => r.id));
  const filteredParticipated = participatedRooms.filter(
    (r) => !ownedIds.has(r.id) && r.ownerId !== userData.userId
  );

  return (
    <div className="w-16 sm:w-80 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-center sm:inline-block pt-6 sm:px-4 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center sm:-space-x-1">
            <img
              src="/logo.png"
              alt="Logo minPoker - Planning Poker para equipes ágeis"
              className="h-auto w-10 sm:h-8 sm:w-8"
              loading="lazy"
              width="32"
              height="32"
            />
            <h1 className="text-xl font-bold text-primary hidden sm:flex">
              minPoker
            </h1>
          </div>
          <div className="items-center space-x-2 hidden sm:flex">
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={ownedRoomsCount >= 3}
                  title={`Nova Sala (${ownedRoomsCount}/3)`}
                  className="hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Sala</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nome da sala</label>
                    <Input
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      placeholder="Digite o nome da sala"
                      onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                    />
                  </div>
                  <Button onClick={handleCreateRoom} className="w-full ">
                    Criar Sala
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Entrar em Sala"
                  className="hover:bg-gray-100"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Entrar em Sala</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Código ou Link da Sala
                    </label>
                    <Input
                      value={roomCode}
                      onChange={(e) => {
                        setRoomCode(e.target.value);
                        setJoinError("");
                      }}
                      placeholder="Cole o link ou digite o código da sala"
                      onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
                    />
                    {joinError && (
                      <p className="text-sm text-red-500 mt-1">{joinError}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>Você pode colar:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Link completo da sala</li>
                      <li>Apenas o código da sala</li>
                    </ul>
                  </div>
                  <Button
                    onClick={handleJoinRoom}
                    className="w-full"
                    disabled={!roomCode.trim()}
                  >
                    Entrar na Sala
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isSettingsDialogOpen}
              onOpenChange={setIsSettingsDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Configurações"
                  className="hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Você</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <label className="text-sm font-medium">Seu nome</label>
                  <div className="flex space-x-2">
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onBlur={handleSubmit}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      placeholder="Digite seu nome"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleGenerateRandomName}
                      title="Gerar nome aleatório"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={!userName.trim()}
                  >
                    Salvar Nome
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {/* Todas as salas */}
        {!ownedRooms.length && !filteredParticipated.length ? (
          <div className="p-4 text-center text-gray-500 font-light">
            <p>As salas aparecerão aqui</p>
          </div>
        ) : (
          <>
            {ownedRooms.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                selectedRoomId={selectedRoomId}
                userData={userData}
                onRoomSelect={onRoomSelect}
              />
            ))}
            {filteredParticipated.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                selectedRoomId={selectedRoomId}
                userData={userData}
                onRoomSelect={onRoomSelect}
              />
            ))}
          </>
        )}
      </div>

      <Footer />

    </div>
  );
}
