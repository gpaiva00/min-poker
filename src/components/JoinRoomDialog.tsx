import { useState } from 'react'
import { Users, Shuffle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { generateFunnyName } from '@/lib/utils'

interface JoinRoomDialogProps {
  isOpen: boolean
  onClose: () => void
  onJoin: (name: string) => void
  roomName: string
}

export function JoinRoomDialog({
  isOpen,
  onClose,
  onJoin,
  roomName
}: JoinRoomDialogProps) {
  const [name, setName] = useState('')

  function handleJoin() {
    if (name.trim()) {
      onJoin(name.trim())
      setName('')
    }
  }

  function handleGenerateRandomName() {
    setName(generateFunnyName())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md' aria-describedby='entrar na sala'>
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <Users className='h-5 w-5' />
            <span>Entrar na Sala</span>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='text-center'>
            <p className='text-lg font-semibold text-gray-900'>{roomName}</p>
            <p className='text-sm text-gray-600'>Digite seu nome para entrar</p>
          </div>

          <div className='flex space-x-2'>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Seu nome'
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              autoFocus
              className='flex-1'
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

          <Button
            onClick={handleJoin}
            className='w-full'
            disabled={!name.trim()}
          >
            Entrar na Sala
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
