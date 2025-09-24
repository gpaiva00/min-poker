import { Eye, Check } from 'lucide-react'

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
  const displayName = isCurrentUser ? `${name} (você)` : name

  if (mode === 'results' && voteValue !== null && voteValue !== undefined) {
    return (
      <div
        className={cn(
          'rounded-lg border p-4 text-center shadow-sm',
          isCurrentUser ? 'border-primary/20 bg-primary/10' : 'bg-white'
        )}
      >
        <div className='mb-2 text-3xl font-bold text-primary'>{voteValue}</div>
        <div
          className={cn(
            'text-sm',
            isCurrentUser ? 'font-medium text-primary' : 'text-gray-600'
          )}
        >
          {displayName}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg border p-4 text-center',
        isCurrentUser && 'border-primary/20 bg-primary/10',
        isViewMode && 'border-blue-200 bg-blue-50'
      )}
    >
      <div
        className={cn(
          'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
          isViewMode ? 'bg-blue-100' : 'bg-primary/20'
        )}
      >
        {isViewMode ? (
          <Eye className='h-5 w-5 text-blue-600' />
        ) : hasVoted ? (
          <Check className='h-5 w-5 text-primary' />
        ) : (
          <div className='text-lg text-primary'>?</div>
        )}
      </div>
      <div
        className={cn(
          'text-sm font-medium',
          isCurrentUser && 'text-primary',
          isViewMode && 'text-blue-700',
          !isCurrentUser && !isViewMode && 'text-gray-900'
        )}
      >
        {displayName}
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
