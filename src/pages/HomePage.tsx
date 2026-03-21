import { Sidebar } from '@/components/Sidebar'
import { RoomHeader } from '@/components/RoomHeader'
import { VotingArea } from '@/components/VotingArea'
import { JoinRoomDialog } from '@/components/JoinRoomDialog'
import { useHome } from '@/hooks/useHome'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { InfoIcon, Menu, User, HomeIcon, Shuffle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { detectInputType, generateFunnyName } from '@/lib/utils'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { RoomListItem } from '@/components/RoomListItem'
import { Footer } from '@/components/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'

export function HomePage({ start }: { start?: boolean }) {
  const isMobile = useIsMobile()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [userName, setUserName] = useState('')

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

  // Initialize userName with userData.name
  React.useEffect(() => {
    setUserName(userData.name)
  }, [userData.name])

  function handleSubmit() {
    if (userName.trim() && userName !== userData.name) {
      // Atualizar dados locais
      setUserData({
        ...userData,
        name: userName.trim()
      })

      // Atualizar nome na sala se estiver conectado
      if (updateUserName) {
        updateUserName(userName.trim()).catch(error => {
          console.error('Erro ao atualizar nome na sala:', error)
        })
      }

      setIsSettingsDialogOpen(false)
    }
  }

  function handleGenerateRandomName() {
    setUserName(generateFunnyName())
  }

  const ownedIds = new Set(userRooms.map(r => r.id))
  const filteredParticipated = participatedRooms.filter(
    r => !ownedIds.has(r.id) && r.ownerId !== userData.userId
  )

  // Mobile Sheet Content (replicates Sidebar functionality)
  const MobileSheetContent = () => (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between pb-6'>
        <Link to='/' className='flex items-center space-x-2'>
          <img
            src='/logo.png'
            alt='Logo minPoker - Planning Poker para equipes ágeis'
            className='h-8 w-8'
            loading='lazy'
            width='32'
            height='32'
          />
          <h1 className='text-xl font-bold text-primary'>minPoker</h1>
        </Link>
        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              setRoom(null)
              setIsSheetOpen(false)
            }}
            className='h-12 w-12' // Minimum 48x48px touch area
          >
            <HomeIcon className='h-5 w-5' />
          </Button>

          <Dialog
            open={isSettingsDialogOpen}
            onOpenChange={setIsSettingsDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                title='Configurações'
                className='h-12 w-12 hover:bg-gray-100' // Minimum 48x48px touch area
              >
                <User className='h-5 w-5' />
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby='configurações do usuário'>
              <DialogHeader>
                <DialogTitle>Você</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium'>Seu nome</label>
                  <div className='flex space-x-2'>
                    <Input
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      onBlur={handleSubmit}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      placeholder='Digite seu nome'
                      className='min-h-[48px]' // Minimum touch area height
                    />
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={handleGenerateRandomName}
                      title='Gerar nome aleatório'
                      className='h-12 w-12' // Minimum 48x48px touch area
                    >
                      <Shuffle className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className='min-h-[48px] w-full' // Minimum touch area height
                  disabled={!userName.trim() || userName === userData.name}
                >
                  Salvar Nome
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Rooms List */}
      <div className='flex-1 space-y-4 overflow-y-auto'>
        {!userRooms.length && !filteredParticipated.length ? (
          <div className='p-4 text-center font-light text-gray-500'>
            <p>As salas aparecerão aqui</p>
          </div>
        ) : (
          <>
            {userRooms.map(room => (
              <div key={room.id} onClick={() => setIsSheetOpen(false)}>
                <RoomListItem
                  room={room}
                  selectedRoomId={selectedRoom?.id || null}
                  userData={userData}
                  onRoomSelect={handleRoomSelect}
                />
              </div>
            ))}
            {filteredParticipated.map(room => (
              <div key={room.id} onClick={() => setIsSheetOpen(false)}>
                <RoomListItem
                  room={room}
                  selectedRoomId={selectedRoom?.id || null}
                  userData={userData}
                  onRoomSelect={handleRoomSelect}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <Footer />
    </div>
  )

  return (
    <div className='flex h-screen bg-[#fcfcff]'>
      {/* Desktop Sidebar */}
      {!isMobile && (
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
      )}

      {/* Mobile Sheet */}
      {isMobile && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='fixed left-4 top-4 z-40 h-12 w-12 bg-white shadow-md hover:bg-gray-50 sm:hidden' // Minimum 48x48px touch area
            >
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] p-6'>
            <MobileSheetContent />
          </SheetContent>
        </Sheet>
      )}

      <div className='flex flex-1 flex-col'>
        {loading && (
          <div className='flex flex-1 items-center justify-center px-4'>
            <div className='text-center text-gray-500'>
              <div className='mb-2 text-xl sm:text-2xl'>Carregando...</div>
            </div>
          </div>
        )}

        {wasDeleted && (
          <div className='flex flex-1 items-center justify-center px-4'>
            <div className='rounded-lg bg-[#FEECDC] p-6 text-center sm:p-8'>
              <div className='mb-4 text-4xl sm:text-6xl'>⚠️</div>
              <h2 className='mb-2 text-xl font-semibold sm:text-2xl'>
                Sala excluída
              </h2>
              <p className='mb-4 text-sm sm:text-base'>
                A sala foi excluída pelo administrador.
              </p>
              <Button
                onClick={handleWasRemovedAction}
                className='min-h-[48px] w-full sm:w-auto' // Minimum touch area
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        )}

        {wasRemoved && (
          <div className='flex flex-1 items-center justify-center px-4'>
            <div className='rounded-lg bg-[#FEECDC] p-6 text-center sm:p-8'>
              <div className='mb-4 text-4xl sm:text-6xl'>⚠️</div>
              <h2 className='mb-2 text-xl font-semibold sm:text-2xl'>
                Removido da Sala
              </h2>
              <p className='mb-4 text-sm sm:text-base'>
                Você foi removido da sala pelo administrador.
              </p>
              <Button
                onClick={handleWasRemovedAction}
                className='min-h-[48px] w-full sm:w-auto' // Minimum touch area
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className='flex flex-1 items-center justify-center px-4'>
            <div className='text-center text-red-500'>
              <div className='mb-2 text-xl sm:text-2xl'>Erro: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className='min-h-[48px] rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
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
              <div
                className={`mx-auto flex h-full max-w-xl flex-col items-center justify-center space-y-6 px-4 sm:space-y-10 ${isMobile ? 'pt-16' : ''}`}
              >
                {/* Hero Section */}
                <section className='w-full text-center'>
                  <img
                    src='/logo.png'
                    alt='Logo do minPoker - Ferramenta de Planning Poker online gratuita para equipes ágeis realizarem estimativas colaborativas'
                    className='mx-auto mb-4 h-16 w-16 sm:mb-6 sm:h-24 sm:w-24'
                    loading='lazy'
                    width='96'
                    height='96'
                  />

                  <h1 className='mb-4 text-xl font-bold sm:mb-6 sm:text-2xl'>
                    Crie ou entre em uma sala
                  </h1>

                  <div className='relative mb-4 sm:mb-6'>
                    <Input
                      placeholder='Digite um nome ou cole o link de uma sala'
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      className='min-h-[48px] w-full text-base' // Minimum touch area and readable text
                      autoFocus={!isMobile} // Avoid auto-focus on mobile to prevent keyboard popup
                      disabled={loading || ownedRoomsCount === 3}
                    />
                  </div>

                  <Button
                    className='min-h-[48px] w-full text-base' // Minimum touch area and readable text
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
                    <Alert className='mt-4 place-items-start border border-[#efcaa9] bg-[#FEECDC] sm:mt-6'>
                      <InfoIcon className='h-4 w-4' />
                      <AlertTitle className='text-xs font-medium'>
                        Ops! Você atingiu o limite de 3 salas criadas.
                      </AlertTitle>
                    </Alert>
                  )}
                </section>

                {/* Navigation Links Section */}
                <section className='w-full'>
                  <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
                    <a
                      href='/how-it-works'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-3 transition-colors hover:border-primary/10 hover:bg-primary/10 sm:p-2'
                      style={{ minHeight: '48px' }} // Minimum touch area
                    >
                      <h3 className='text-sm font-normal sm:text-xs'>
                        Como Funciona o minPoker
                      </h3>
                    </a>

                    <a
                      href='/features'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-3 transition-colors hover:border-primary/10 hover:bg-primary/10 sm:p-2'
                      style={{ minHeight: '48px' }} // Minimum touch area
                    >
                      <h3 className='text-sm font-normal sm:text-xs'>
                        Recursos do minPoker
                      </h3>
                    </a>

                    <a
                      href='/benefits'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-3 transition-colors hover:border-primary/10 hover:bg-primary/10 sm:p-2'
                      style={{ minHeight: '48px' }} // Minimum touch area
                    >
                      <h3 className='text-sm font-normal sm:text-xs'>
                        Benefícios do Planning Poker
                      </h3>
                    </a>

                    <a
                      href='/faq'
                      className='group block space-y-1 rounded-lg border border-gray-100 bg-gray-100 p-3 transition-colors hover:border-primary/10 hover:bg-primary/10 sm:p-2'
                      style={{ minHeight: '48px' }} // Minimum touch area
                    >
                      <h3 className='text-sm font-normal sm:text-xs'>
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
