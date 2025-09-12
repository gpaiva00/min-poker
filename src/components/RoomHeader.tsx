import { useState } from 'react'
import {
  Edit2,
  Settings,
  Copy,
  Check,
  Trash2,
  LogOut,
  X,
  MoreVertical,
  Eye
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Room } from '@/types'
import { Toggle } from './ui/toggle'

interface RoomHeaderProps {
  room: Room
  currentUser: string
  countdown: number | null
  onUpdateRoom: (room: Room) => void
  onRemoveParticipant: (userId: string) => void
  onDeleteRoom?: () => void
  onLeaveRoom?: () => void
  onToggleViewMode?: (enabled: boolean) => Promise<void>
}

export function RoomHeader({
  room,
  currentUser,
  countdown,
  onUpdateRoom,
  onRemoveParticipant,
  onDeleteRoom,
  onLeaveRoom,
  onToggleViewMode
}: RoomHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(room.name)
  const [copied, setCopied] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const isOwner =
    room.participants.find(p => p.name === currentUser)?.isOwner || false
  const roomUrl = `${window.location.origin}/room/${room.id}`
  const currentRound = room?.currentRound

  function handleSaveName() {
    if (newName.trim() && newName !== room.name) {
      onUpdateRoom({
        ...room,
        name: newName.trim()
      })
    }
    setIsEditingName(false)
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(roomUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleSettingsChange(settings: Partial<Room['settings']>) {
    onUpdateRoom({
      ...room,
      settings: { ...room.settings, ...settings }
    })
  }

  function handleDeleteRoom() {
    if (onDeleteRoom) {
      onDeleteRoom()
      setShowDeleteConfirm(false)
    }
  }

  function handleLeaveRoom() {
    if (onLeaveRoom) {
      onLeaveRoom()
      setShowLeaveConfirm(false)
    }
  }

  return (
    <div className='border-b border-gray-100 bg-white p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          {isEditingName && isOwner ? (
            <div className='flex items-center space-x-2'>
              <Input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSaveName()
                  if (e.key === 'Escape') {
                    setNewName(room.name)
                    setIsEditingName(false)
                  }
                }}
                onBlur={handleSaveName}
                className='text-xl font-semibold'
                autoFocus
              />
            </div>
          ) : (
            <div className='flex items-center space-x-2'>
              <h2 className='text-xl font-semibold text-gray-900'>
                {room.name}
              </h2>
              {isOwner && (
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsEditingName(true)}
                  className='hidden h-6 w-6 hover:bg-gray-100 sm:inline-flex'
                >
                  <Edit2 className='h-4 w-4' />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className='flex items-center space-x-2'>
          {/* Desktop buttons */}
          <div className='hidden items-center space-x-2 sm:flex'>
            <Button
              variant='outline'
              onClick={handleCopyLink}
              className='flex items-center space-x-2'
            >
              {copied ? (
                <Check className='h-4 w-4' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
              <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
            </Button>
            {/* Modo Visualização */}
            <Toggle
              variant='outline'
              disabled={currentRound?.isRevealed || countdown !== null}
              pressed={
                room.participants.find(p => p.name === currentUser)?.viewMode ||
                false
              }
              onPressedChange={async checked => {
                if (onToggleViewMode) {
                  await onToggleViewMode(checked)
                }
              }}
            >
              <Eye className='h-4 w-4' />
              <span className='text-sm font-medium'>Modo Visualização</span>
            </Toggle>
          </div>

          {/* Mobile menu */}
          <div className='sm:hidden'>
            <Dialog open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <DialogTrigger asChild>
                <Button variant='outline' size='icon'>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby='ações da sala'>
                <DialogHeader>
                  <DialogTitle>Ações da Sala</DialogTitle>
                </DialogHeader>
                <div className='space-y-2'>
                  <Button
                    variant='outline'
                    onClick={() => {
                      handleCopyLink()
                      setShowMobileMenu(false)
                    }}
                    className='flex w-full items-center space-x-2'
                  >
                    {copied ? (
                      <Check className='h-4 w-4' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                    <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
                  </Button>
                  {isOwner && (
                    <>
                      <Button
                        variant='outline'
                        onClick={() => {
                          setIsSettingsOpen(true)
                          setShowMobileMenu(false)
                        }}
                        className='flex w-full items-center space-x-2'
                      >
                        <Settings className='h-4 w-4' />
                        <span>Configurações</span>
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => {
                          setShowDeleteConfirm(true)
                          setShowMobileMenu(false)
                        }}
                        className='flex w-full items-center space-x-2 text-red-600 hover:text-red-700'
                      >
                        <Trash2 className='h-4 w-4' />
                        <span>Deletar Sala</span>
                      </Button>
                    </>
                  )}
                  {!isOwner && onLeaveRoom && (
                    <Button
                      variant='outline'
                      onClick={() => {
                        setShowLeaveConfirm(true)
                        setShowMobileMenu(false)
                      }}
                      className='flex w-full items-center space-x-2 text-red-600 hover:text-red-700'
                    >
                      <LogOut className='h-4 w-4' />
                      <span>Sair da Sala</span>
                    </Button>
                  )}

                  {/* Modo Visualização
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Eye className='h-4 w-4 text-gray-500' />
                      <div>
                        <label className='text-sm font-medium'>
                          Modo Visualização
                        </label>
                        <p className='text-xs text-gray-500'>
                          Você não precisa votar
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={
                        room.participants.find(p => p.name === currentUser)
                          ?.viewMode || false
                      }
                      onCheckedChange={checked => {
                        if (onToggleViewMode) {
                          onToggleViewMode(checked)
                        }
                      }}
                    />
                  </div> */}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {!isOwner && onLeaveRoom && (
            <div className='hidden sm:block'>
              <Dialog
                open={showLeaveConfirm}
                onOpenChange={setShowLeaveConfirm}
              >
                <DialogTrigger asChild>
                  <Button variant='ghost' size='icon' className=''>
                    <LogOut className='h-5 w-5' />
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby='sair da sala'>
                  <DialogHeader>
                    <DialogTitle>Sair da Sala</DialogTitle>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <p className='text-sm text-gray-600'>
                      Tem certeza que deseja sair desta sala? Você não receberá
                      mais notificações ou atualizações dela.
                    </p>
                    <div className='flex justify-end space-x-2'>
                      <Button
                        variant='outline'
                        onClick={() => setShowLeaveConfirm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button variant='destructive' onClick={handleLeaveRoom}>
                        Sair da Sala
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {isOwner && (
            <>
              <div className='hidden sm:block'>
                <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <DialogTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Settings className='h-5 w-5' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby='configurações da sala'>
                    <DialogHeader>
                      <DialogTitle>Configurações da Sala</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <label className='text-sm font-medium'>
                          Revelação automática
                        </label>
                        <Switch
                          checked={room.settings.autoReveal}
                          onCheckedChange={checked =>
                            handleSettingsChange({
                              autoReveal: checked
                            })
                          }
                        />
                      </div>
                      {room.settings.autoReveal && (
                        <div>
                          <label className='text-sm font-medium'>
                            Delay para revelação (segundos)
                          </label>
                          <Input
                            type='number'
                            min='1'
                            max='10'
                            value={room.settings.revealDelay / 1000}
                            onChange={e =>
                              handleSettingsChange({
                                revealDelay: parseInt(e.target.value) * 1000
                              })
                            }
                          />
                        </div>
                      )}

                      {/* <Switch
                          checked={
                            room.participants.find(p => p.name === currentUser)
                              ?.viewMode || false
                          }
                          onCheckedChange={checked => {
                            if (onToggleViewMode) {
                              onToggleViewMode(checked)
                            }
                          }}
                        /> */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className='hidden sm:block'>
                <Dialog
                  open={showDeleteConfirm}
                  onOpenChange={setShowDeleteConfirm}
                >
                  <DialogTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Trash2 className='h-5 w-5' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby='excluir sala'>
                    <DialogHeader>
                      <DialogTitle>Excluir Sala</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <p className='text-sm text-gray-600'>
                        Tem certeza que deseja excluir esta sala? Esta ação não
                        pode ser desfeita.
                      </p>
                      {room.participants.length > 1 && (
                        <p className='rounded bg-[#FEECDC] p-3 text-sm'>
                          Existe{room.participants.length > 2 && 'm'}{' '}
                          {room.participants.length - 1} participante
                          {room.participants.length > 2 && 's'} na sala. Ele
                          {room.participants.length > 2 && 's'}{' '}
                          {room.participants.length > 2 ? 'serão' : 'será'}{' '}
                          notificado{room.participants.length > 2 && 's'} sobre
                          a exclusão.
                        </p>
                      )}
                      <div className='flex justify-end space-x-2'>
                        <Button
                          variant='outline'
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant='destructive'
                          onClick={handleDeleteRoom}
                        >
                          Excluir Sala
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Participants */}
      <div className='flex flex-wrap gap-2'>
        {room.participants.map(participant => {
          const isParticipantInViewMode = participant.viewMode || false
          return (
            <div
              key={participant.id}
              className={`flex items-center space-x-2 rounded-full px-3 py-1 ${
                isParticipantInViewMode
                  ? 'border border-blue-200 bg-blue-50'
                  : 'bg-gray-100'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  isParticipantInViewMode ? 'bg-blue-500' : 'bg-primary'
                }`}
              ></div>
              <span
                className={`text-sm font-medium ${
                  isParticipantInViewMode ? 'text-blue-700' : ''
                }`}
              >
                {participant.name}
              </span>
              {participant.isOwner && (
                <div
                  className={`ml-2 rounded px-[3px] py-[2px] text-[10px] font-medium ${
                    isParticipantInViewMode
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  {isParticipantInViewMode ? (
                    <div className='flex items-center gap-1'>
                      <Eye className='h-2 w-2' />
                      <span>Observando</span>
                    </div>
                  ) : (
                    'Dono'
                  )}
                </div>
              )}
              {isParticipantInViewMode && !participant.isOwner && (
                <div className='ml-2 rounded bg-blue-100 px-[3px] py-[2px] text-[10px] font-medium text-blue-700'>
                  <div className='flex items-center gap-1'>
                    <Eye className='h-2 w-2' />
                    <span>Observando</span>
                  </div>
                </div>
              )}
              {isOwner && !participant.isOwner && (
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => onRemoveParticipant(participant.id)}
                  className='ml-1 h-4 w-4'
                >
                  <X className='h-3 w-3 hover:text-primary' strokeWidth={3} />
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
