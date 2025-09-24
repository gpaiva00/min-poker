import { useState } from 'react'
import { Shuffle, User, HomeIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Room, LocalUserData } from '@/types'
import { generateFunnyName } from '@/lib/utils'
import { RoomListItem } from '@/components/RoomListItem'
import { Footer } from './Footer'
import { Link } from 'react-router-dom'

interface SidebarProps {
  ownedRooms: Room[]
  participatedRooms: Room[]
  selectedRoomId: string | null
  onRoomSelect: (roomId: string) => void
  onCreateRoom: (roomName: string) => void
  onJoinRoomByCode: (roomCode: string) => void
  userData: LocalUserData
  onUpdateUserData: (data: LocalUserData) => void
  onUpdateUserName?: (newName: string) => Promise<void>
  setRoom: (room: Room | null) => void
}

export function Sidebar({
  ownedRooms,
  participatedRooms,
  selectedRoomId,
  onRoomSelect,
  userData,
  onUpdateUserData,
  onUpdateUserName,
  setRoom
}: SidebarProps) {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [userName, setUserName] = useState(userData.name)

  function handleSubmit() {
    if (userName.trim() && userName !== userData.name) {
      // Atualizar dados locais
      onUpdateUserData({
        ...userData,
        name: userName.trim()
      })

      // Atualizar nome na sala se estiver conectado
      if (onUpdateUserName) {
        onUpdateUserName(userName.trim()).catch(error => {
          console.error('Erro ao atualizar nome na sala:', error)
        })
      }

      setIsSettingsDialogOpen(false)
    }
  }

  function handleGenerateRandomName() {
    setUserName(generateFunnyName())
  }

  const ownedIds = new Set(ownedRooms.map(r => r.id))
  const filteredParticipated = participatedRooms.filter(
    r => !ownedIds.has(r.id) && r.ownerId !== userData.userId
  )

  return (
    <div className='flex h-full w-16 flex-col border-r border-gray-100 bg-white sm:w-72'>
      {/* Header */}
      <div className='flex items-center justify-center pt-6 sm:inline-block sm:px-4 sm:py-6'>
        <div className='mb-4 flex items-center justify-between'>
          <Link to='/' className='flex items-center sm:-space-x-1'>
            <img
              src='/logo.png'
              alt='Logo minPoker - Planning Poker para equipes ágeis'
              className='h-auto w-10 sm:h-8 sm:w-8'
              loading='lazy'
              width='32'
              height='32'
            />
            <h1 className='hidden text-xl font-bold text-primary sm:flex'>
              minPoker
            </h1>
          </Link>
          <div className='hidden items-center space-x-2 sm:flex'>
            <Button variant='ghost' size='icon' onClick={() => setRoom(null)}>
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
                  className='hover:bg-gray-100'
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
                      />
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={handleGenerateRandomName}
                        title='Gerar nome aleatório'
                      >
                        <Shuffle className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className='w-full'
                    disabled={!userName.trim() || userName === userData.name}
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
      <div className='flex-1 space-y-4 overflow-y-auto px-4'>
        {/* Todas as salas */}
        {!ownedRooms.length && !filteredParticipated.length ? (
          <div className='p-4 text-center font-light text-gray-500'>
            <p>As salas aparecerão aqui</p>
          </div>
        ) : (
          <>
            {ownedRooms.map(room => (
              <RoomListItem
                key={room.id}
                room={room}
                selectedRoomId={selectedRoomId}
                userData={userData}
                onRoomSelect={onRoomSelect}
              />
            ))}
            {filteredParticipated.map(room => (
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
  )
}
