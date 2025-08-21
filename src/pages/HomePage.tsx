import { Sidebar } from "@/components/Sidebar";
import { RoomHeader } from "@/components/RoomHeader";
import { VotingArea } from "@/components/VotingArea";
import { JoinRoomDialog } from "@/components/JoinRoomDialog";
import { useHome } from "@/hooks/useHome";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const {
    selectedRoom,
    currentUser,
    loading,
    error,
    wasRemoved,
    wasDeleted,
    showJoinDialog,
    pendingRoomName,
    pendingRoomId,
    userRooms,
    participatedRooms,
    userData,
    setUserData,
    handleCreateRoom,
    handleJoinRoom,
    handleJoinRoomByCode,
    handleRemoveParticipant,
    handleVote,
    handleStartNewRound,
    handleRevealVotes,
    handleLeaveRoom,
    handleDeleteRoom,
    handleRoomSelect,
    handleUpdateRoom,
    handleWasRemovedAction,
    handleWasDeletedAction,
    updateUserName,
    handleCloseJoinDialog,
  } = useHome();

  return (
    <div className="flex h-screen bg-[#fcfcff]">
      <Sidebar
        ownedRooms={userRooms}
        participatedRooms={participatedRooms}
        selectedRoomId={selectedRoom?.id || null}
        onRoomSelect={handleRoomSelect}
        onCreateRoom={handleCreateRoom}
        onJoinRoomByCode={handleJoinRoomByCode}
        userData={userData}
        onUpdateUserData={setUserData}
        onUpdateUserName={
          selectedRoom && currentUser ? updateUserName : undefined
        }
      />

      <div className="flex-1 flex flex-col">
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">Carregando...</div>
            </div>
          </div>
        )}

        {wasDeleted && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-[#FEECDC] p-8 rounded-lg ">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-semibold mb-2">Sala excluída</h2>
              <p className="mb-4">A sala foi excluída pelo administrador.</p>
              <Button onClick={handleWasRemovedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {wasRemoved && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-[#FEECDC] p-8 rounded-lg ">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-semibold mb-2">Removido da Sala</h2>
              <p className="mb-4">
                Você foi removido da sala pelo administrador.
              </p>
              <Button onClick={handleWasRemovedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {wasDeleted && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-[#FFE4E1] p-8 rounded-lg ">
              <div className="text-6xl mb-4">🗑️</div>
              <h2 className="text-2xl font-semibold mb-2">Sala Excluída</h2>
              <p className="mb-4">A sala foi excluída pelo administrador.</p>
              <Button onClick={handleWasDeletedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-red-500">
              <div className="text-2xl mb-2">Erro: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Recarregar
              </button>
            </div>
          </div>
        )}

        {!loading && !error && !wasRemoved && selectedRoom && currentUser ? (
          <>
            <RoomHeader
              room={selectedRoom}
              currentUser={userData.name}
              onUpdateRoom={handleUpdateRoom}
              onRemoveParticipant={handleRemoveParticipant}
              onLeaveRoom={handleLeaveRoom}
              onDeleteRoom={handleDeleteRoom}
            />
            <VotingArea
              room={selectedRoom}
              currentUser={currentUser.name}
              onVote={handleVote}
              onStartNewRound={handleStartNewRound}
              onRevealVotes={handleRevealVotes}
            />
          </>
        ) : (
          !loading &&
          !error &&
          !wasRemoved && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="src/assets/img/logo.png"
                  alt="logo"
                  className="h-24 w-24 mx-auto"
                />
                <h2 className="text-2xl font-semibold mb-2 text-primary">
                  Bem-vindo ao minPoker
                </h2>
                <p className="text-gray-500 font-light">
                  Crie uma nova sala ou entre em uma existente para começar
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <JoinRoomDialog
        isOpen={showJoinDialog}
        onClose={handleCloseJoinDialog}
        onJoin={handleJoinRoom}
        roomName={pendingRoomName || `Sala ${pendingRoomId?.slice(0, 6) || ""}`}
      />
    </div>
  );
}
