import { useState, useEffect } from 'react'
import { RotateCcw, Eye, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Room } from '@/types'
import { cn, FIBONACCI_SEQUENCE } from '@/lib/utils'

interface VotingAreaProps {
  room: Room
  currentUser: string
  onVote: (value: number) => void
  onStartNewRound: () => void
  onRevealVotes: () => void
}

export function VotingArea({
  room,
  currentUser,
  onVote,
  onStartNewRound,
  onRevealVotes
}: VotingAreaProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  const currentUserData = room?.participants?.find(p => p.name === currentUser)
  const isOwner = currentUserData?.isOwner || false
  const currentRound = room?.currentRound
  const userVote = currentRound?.votes?.find(
    v => v.userId === currentUserData?.id
  )
  const isViewModeActive = currentUserData?.viewMode || false
  const shouldOwnerVote = !isViewModeActive || !isOwner

  const allVoted =
    currentRound && room?.participants && currentRound.votes
      ? (() => {
          const requiredVoters = room.participants.filter(
            p => p.id !== room.ownerId || shouldOwnerVote
          )
          const validVotes = currentRound.votes.filter(v => v.value !== null)
          return validVotes.length === requiredVoters.length
        })()
      : false

  const atLeastOneVoted =
    currentRound && room?.participants && currentRound.votes
      ? (() => {
          const validVotes = currentRound.votes.filter(v => v.value !== null)
          return validVotes.length > 0
        })()
      : false

  useEffect(() => {
    if (userVote) {
      setSelectedValue(userVote.value)
    } else {
      setSelectedValue(null)
    }
  }, [userVote])

  useEffect(() => {
    if (
      allVoted &&
      room?.settings?.autoReveal &&
      currentRound &&
      !currentRound.isRevealed
    ) {
      const timer = setTimeout(() => {
        onRevealVotes()
      }, room?.settings?.revealDelay || 3000)

      // Countdown visual
      let countdownValue = Math.ceil(
        (room?.settings?.revealDelay || 3000) / 1000
      )
      setCountdown(countdownValue)

      const countdownTimer = setInterval(() => {
        countdownValue -= 1
        setCountdown(countdownValue)
        if (countdownValue <= 0) {
          clearInterval(countdownTimer)
          setCountdown(null)
        }
      }, 1000)

      return () => {
        clearTimeout(timer)
        clearInterval(countdownTimer)
        setCountdown(null)
      }
    }
  }, [
    allVoted,
    room?.settings?.autoReveal,
    room?.settings?.revealDelay,
    currentRound,
    onRevealVotes
  ])

  function handleVote(value: number) {
    if (!currentRound || currentRound.isRevealed) return

    setSelectedValue(value)
    onVote(value)
  }

  function getVoteResults() {
    if (!currentRound || !currentRound.isRevealed || !currentRound.votes)
      return null

    const votes = currentRound.votes.filter(v => v.value !== null)
    const average =
      votes.reduce((sum, vote) => sum + vote.value!, 0) / votes.length
    const sortedVotes = [...votes].sort((a, b) => a.value! - b.value!)

    return {
      average: Math.round(average * 10) / 10,
      min: sortedVotes[0]?.value || 0,
      max: sortedVotes[sortedVotes.length - 1]?.value || 0,
      votes: votes
    }
  }

  const results = getVoteResults()

  if (!currentRound) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center p-8'>
        <div className='mb-8 text-center'>
          {isOwner ? (
            <>
              <h3 className='mb-2 text-2xl font-semibold'>
                Pronto para começar?
              </h3>
              <p className='text-gray-500'>Inicie uma nova rodada de votação</p>
            </>
          ) : (
            <>
              <h3 className='mb-2 text-2xl font-semibold'>
                Aguardando início da rodada
              </h3>
              <p className='text-gray-500'>
                O dono da sala iniciará a votação em breve
              </p>
            </>
          )}
        </div>
        {isOwner && (
          <Button onClick={onStartNewRound} size='lg'>
            Iniciar Votação
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col'>
      {/* Voting Status */}
      <div className='bg-[#FEECDC] px-6 py-4'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 className='font-medium'>
              {currentRound.isRevealed
                ? 'Resultados da Votação'
                : 'Votação em Andamento'}
            </h3>
            <p className='text-sm font-light'>
              {currentRound?.votes?.filter(v => v.value !== null).length || 0}{' '}
              de {room?.participants?.length || 0} votaram
            </p>
          </div>

          {countdown && (
            <div className='text-center'>
              <div className='text-2xl font-bold text-primary'>{countdown}</div>
              <div className='text-xs font-light'>Revelando...</div>
            </div>
          )}

          <div className='flex space-x-2'>
            {isOwner &&
              atLeastOneVoted &&
              !currentRound.isRevealed &&
              !room?.settings?.autoReveal && (
                <Button
                  onClick={onRevealVotes}
                  variant='default'
                  className='w-full sm:w-auto'
                >
                  <Eye className='mr-2 h-4 w-4' />
                  Revelar
                </Button>
              )}
            {isOwner && (
              <Button
                onClick={onStartNewRound}
                variant='outline'
                className='w-full sm:w-auto'
              >
                <RotateCcw className='mr-2 h-4 w-4' />
                Nova Rodada
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results or Voting Cards */}
      <div className='flex-1 p-6'>
        {currentRound.isRevealed && results ? (
          <div className='space-y-6'>
            {/* Statistics */}
            <div className='grid grid-cols-3 gap-4'>
              <div className='rounded-lg bg-gray-100 p-4 text-center'>
                <div className='text-2xl font-bold'>{results.min}</div>
                <div className='text-sm font-light text-gray-600'>Mínimo</div>
              </div>
              <div className='rounded-lg bg-gray-100 p-4 text-center'>
                <div className='text-2xl font-bold text-primary'>
                  {results.average}
                </div>
                <div className='text-sm font-light text-primary'>Média</div>
              </div>
              <div className='rounded-lg bg-gray-100 p-4 text-center'>
                <div className='text-2xl font-bold'>{results.max}</div>
                <div className='text-sm font-light text-gray-600'>Máximo</div>
              </div>
            </div>

            {/* Individual Votes */}
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {results.votes.map(vote => {
                const participant = room?.participants?.find(
                  p => p.id === vote.userId
                )
                const isCurrentUser = participant?.name === currentUser
                return (
                  <div
                    key={vote.userId}
                    className={`rounded-lg border p-4 text-center shadow-sm ${
                      isCurrentUser
                        ? 'border-primary/20 bg-primary/10'
                        : 'bg-white'
                    }`}
                  >
                    <div className='mb-2 text-3xl font-bold text-primary'>
                      {vote.value}
                    </div>
                    <div
                      className={`text-sm ${
                        isCurrentUser
                          ? 'font-medium text-primary'
                          : 'text-gray-600'
                      }`}
                    >
                      {isCurrentUser
                        ? `${participant?.name} (você)`
                        : participant?.name}
                    </div>
                  </div>
                )
              }) || []}
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            {/* Participant Status */}
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {room?.participants?.map(participant => {
                const hasVoted =
                  currentRound?.votes?.some(
                    v => v.userId === participant.id && v.value !== null
                  ) || false
                const isCurrentUser = participant.name === currentUser
                const isViewModeActive = participant.viewMode || false

                return (
                  <div
                    key={participant.id}
                    className={cn(
                      'rounded-lg border p-4 text-center',
                      isCurrentUser && 'border-primary/20 bg-primary/10',
                      isViewModeActive && 'border-blue-200 bg-blue-50'
                    )}
                  >
                    <div
                      className={cn(
                        'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
                        isViewModeActive ? 'bg-blue-100' : 'bg-primary/20'
                      )}
                    >
                      {isViewModeActive ? (
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
                        isViewModeActive && 'text-blue-700',
                        !isCurrentUser && !isViewModeActive && 'text-gray-900'
                      )}
                    >
                      {isCurrentUser
                        ? `${participant.name} (você)`
                        : participant.name}
                    </div>
                    <div
                      className={`text-xs font-light ${
                        isViewModeActive
                          ? 'text-blue-600'
                          : hasVoted
                            ? 'text-primary'
                            : 'text-gray-500'
                      }`}
                    >
                      {isViewModeActive
                        ? 'Observando'
                        : hasVoted
                          ? 'Votou'
                          : 'Aguardando'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Voting Buttons */}
      {!currentRound.isRevealed && shouldOwnerVote && !isViewModeActive && (
        <div className='border-t border-gray-100 bg-white p-4'>
          <div className='flex flex-wrap justify-center gap-2'>
            {FIBONACCI_SEQUENCE.map(value => (
              <Button
                key={value}
                variant={selectedValue === value ? 'default' : 'outline'}
                size='lg'
                onClick={() => handleVote(value)}
                className='h-16 min-w-[60px] border-gray-200 text-xl font-bold'
                disabled={!!userVote}
              >
                {value}
              </Button>
            ))}
          </div>
          {userVote && (
            <div className='mt-4 text-center text-sm font-light text-gray-600'>
              Você votou: <span className='font-bold'>{userVote.value}</span>
            </div>
          )}
        </div>
      )}

      {/* View Mode Indicator */}
      {!currentRound.isRevealed && isViewModeActive && (
        <div className='border-t border-blue-200 bg-blue-50 px-4 py-[38px]'>
          <div className='text-center text-sm text-blue-700'>
            <Eye className='mr-2 inline h-4 w-4' />
            Modo Visualização ativo - Você não precisa votar
          </div>
        </div>
      )}
    </div>
  )
}
