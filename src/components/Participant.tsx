import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ParticipantProps {
  id: string
  name: string
  isCurrentUser: boolean
  isViewMode?: boolean
  mode: 'voting' | 'results'
  hasVoted?: boolean
  voteValue?: number | null
}

export function Participant({
  name,
  isCurrentUser,
  isViewMode = false,
  mode,
  hasVoted = false,
  voteValue
}: ParticipantProps) {
  if (mode === 'results' && voteValue !== null && voteValue !== undefined) {
    return (
      <div
        className={cn(
          'rounded-lg border p-4 text-center shadow-sm',
          isCurrentUser ? 'border-primary/20 bg-primary/10' : 'bg-white'
        )}
      >
        <div className='mb-2 text-3xl font-bold text-primary'>{voteValue}</div>
        <div className='flex items-center justify-center gap-1'>
          <div
            className={cn(
              'text-sm',
              isCurrentUser ? 'font-medium text-primary' : 'text-gray-600'
            )}
          >
            {name}
          </div>
          {isCurrentUser && (
            <div className='rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-medium text-blue-700'>
              Você
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg p-4 text-center',
        isViewMode && 'border-blue-200 bg-blue-50',
        !isViewMode &&
          (hasVoted
            ? 'border-2 border-primary/40 bg-primary/5'
            : 'border-2 border-dashed border-gray-300 bg-gray-50'),
        isCurrentUser && !isViewMode && 'ring-2 ring-blue-200'
      )}
    >
      <div
        className={cn(
          'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
          isViewMode
            ? 'bg-blue-100'
            : hasVoted
              ? 'bg-primary/20'
              : 'bg-gray-200'
        )}
      >
        {isViewMode ? (
          <Eye className='h-5 w-5 text-blue-600' />
        ) : hasVoted ? (
          <EyeOff className='h-5 w-5 text-primary' />
        ) : (
          <div className='text-lg text-gray-400'>?</div>
        )}
      </div>
      <div className='flex items-center justify-center gap-1'>
        <div
          className={cn(
            'text-sm font-medium',
            isCurrentUser && 'text-primary',
            isViewMode && 'text-blue-700',
            !isCurrentUser && !isViewMode && 'text-gray-900'
          )}
        >
          {name}
        </div>
        {isCurrentUser && (
          <div className='rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-medium text-blue-700'>
            Você
          </div>
        )}
      </div>
      <div
        className={cn(
          'text-xs font-light',
          isViewMode
            ? 'text-blue-600'
            : hasVoted
              ? 'text-primary'
              : 'text-gray-500'
        )}
      >
        {isViewMode ? 'Observando' : hasVoted ? 'Votou' : 'Aguardando'}
      </div>
    </div>
  )
}
