import { Sidebar } from '@/components/Sidebar'
import { RoomHeader } from '@/components/RoomHeader'
import { VotingArea } from '@/components/VotingArea'
import { JoinRoomDialog } from '@/components/JoinRoomDialog'
import { useHome } from '@/hooks/useHome'
import { Button } from '@/components/ui/button'
import { InfoIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { detectInputType } from '@/lib/utils'
import { Alert, AlertTitle } from '@/components/ui/alert'

export function HomePage({ start }: { start?: boolean }) {
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
    countdown,
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
    updateUserName,
    handleCloseJoinDialog,
    toggleViewMode,
    setRoom,
    onEnterOrCreateRoom,
    inputValue,
    setInputValue,
    ownedRoomsCount
  } = useHome({ start })

  return (
    <div className='flex h-screen bg-[#fcfcff]'>
      <Sidebar
        ownedRooms={userRooms}
        participatedRooms={participatedRooms}
        selectedRoomId={selectedRoom?.id || null}
        onRoomSelect={handleRoomSelect}
        onCreateRoom={handleCreateRoom}
        onJoinRoomByCode={handleJoinRoomByCode}
        userData={userData}
        onUpdateUserData={setUserData}
        setRoom={setRoom}
        onUpdateUserName={
          selectedRoom && currentUser ? updateUserName : undefined
        }
      />

      <div className='flex flex-1 flex-col'>
        {loading && (
          <div className='flex flex-1 items-center justify-center'>
            <div className='text-center text-gray-500'>
              <div className='mb-2 text-2xl'>Carregando...</div>
            </div>
          </div>
        )}

        {wasDeleted && (
          <div className='flex flex-1 items-center justify-center'>
            <div className='rounded-lg bg-[#FEECDC] p-8 text-center'>
              <div className='mb-4 text-6xl'>⚠️</div>
              <h2 className='mb-2 text-2xl font-semibold'>Sala excluída</h2>
              <p className='mb-4'>A sala foi excluída pelo administrador.</p>
              <Button onClick={handleWasRemovedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {wasRemoved && (
          <div className='flex flex-1 items-center justify-center'>
            <div className='rounded-lg bg-[#FEECDC] p-8 text-center'>
              <div className='mb-4 text-6xl'>⚠️</div>
              <h2 className='mb-2 text-2xl font-semibold'>Removido da Sala</h2>
              <p className='mb-4'>
                Você foi removido da sala pelo administrador.
              </p>
              <Button onClick={handleWasRemovedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {error && (
          <div className='flex flex-1 items-center justify-center'>
            <div className='text-center text-red-500'>
              <div className='mb-2 text-2xl'>Erro: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
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
              countdown={countdown}
              onUpdateRoom={handleUpdateRoom}
              onRemoveParticipant={handleRemoveParticipant}
              onLeaveRoom={handleLeaveRoom}
              onDeleteRoom={handleDeleteRoom}
              onToggleViewMode={toggleViewMode}
            />
            <VotingArea
              room={selectedRoom}
              currentUser={currentUser.name}
              countdown={countdown}
              onVote={handleVote}
              onStartNewRound={handleStartNewRound}
              onRevealVotes={handleRevealVotes}
            />
          </>
        ) : (
          !loading &&
          !error &&
          !wasRemoved && (
            <div className='flex-1 overflow-y-auto'>
              <div className='mx-auto flex h-full max-w-xl flex-col items-center justify-center space-y-10'>
                {/* Hero Section */}
                <section className='w-full text-center'>
                  <img
                    src='/logo.png'
                    alt='Logo do minPoker - Ferramenta de Planning Poker online gratuita para equipes ágeis realizarem estimativas colaborativas'
                    className='mx-auto mb-6 h-24 w-24'
                    loading='lazy'
                    width='96'
                    height='96'
                  />

                  <h1 className='mb-6 text-2xl font-bold'>
                    Crie ou entre em uma sala
                  </h1>

                  <div className='relative mb-6'>
                    <Input
                      placeholder='Digite um nome ou cole o link de uma sala'
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      className='w-full'
                      autoFocus
                      disabled={loading || ownedRoomsCount === 3}
                    />
                  </div>

                  <Button
                    className='w-full'
                    onClick={onEnterOrCreateRoom}
                    disabled={
                      loading || !inputValue.trim() || ownedRoomsCount === 3
                    }
                  >
                    {inputValue.trim() ? (
                      (() => {
                        const { type } = detectInputType(inputValue)

                        if (type === 'existing_room') {
                          return <span>Entrar nesta sala</span>
                        } else {
                          return <span>Criar nova sala</span>
                        }
                      })()
                    ) : (
                      <span>Continuar</span>
                    )}
                  </Button>

                  {ownedRoomsCount === 3 && (
                    <Alert className='mt-6 place-items-start border border-[#efcaa9] bg-[#FEECDC]'>
                      <InfoIcon className='h-4 w-4' />
                      <AlertTitle className='text-xs font-medium'>
                        Ops! Você atingiu o limite de 3 salas criadas.
                      </AlertTitle>
                    </Alert>
                  )}
                </section>

                {/* Navigation Links Section */}
                <section className=''>
                  <div className='flex flex-wrap justify-start gap-4'>
                    <a
                      href='/how-it-works'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-2 transition-colors hover:border-primary/10 hover:bg-primary/10'
                    >
                      <h3 className='text-xs font-normal'>
                        Como Funciona o minPoker
                      </h3>
                    </a>

                    <a
                      href='/features'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-2 transition-colors hover:border-primary/10 hover:bg-primary/10'
                    >
                      <h3 className='text-xs font-normal'>
                        Recursos do minPoker
                      </h3>
                    </a>

                    <a
                      href='/benefits'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-2 transition-colors hover:border-primary/10 hover:bg-primary/10'
                    >
                      <h3 className='text-xs font-normal'>
                        Benefícios do Planning Poker
                      </h3>
                    </a>

                    <a
                      href='/faq'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-2 transition-colors hover:border-primary/10 hover:bg-primary/10'
                    >
                      <h3 className='text-xs font-normal'>
                        Perguntas Frequentes
                      </h3>
                    </a>
                  </div>
                </section>
              </div>
            </div>
          )
        )}
      </div>

      <JoinRoomDialog
        isOpen={showJoinDialog}
        onClose={handleCloseJoinDialog}
        onJoin={handleJoinRoom}
        roomName={pendingRoomName || `Sala ${pendingRoomId?.slice(0, 6) || ''}`}
      />
    </div>
  )
}
