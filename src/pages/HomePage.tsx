import { Sidebar } from '@/components/Sidebar'
import { RoomHeader } from '@/components/RoomHeader'
import { VotingArea } from '@/components/VotingArea'
import { JoinRoomDialog } from '@/components/JoinRoomDialog'
import { useHome } from '@/hooks/useHome'
import { Button } from '@/components/ui/button'
import {
  BlocksIcon,
  HeartIcon,
  InfoIcon,
  MessageCircleQuestionIcon
} from 'lucide-react'

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
    toggleViewMode
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
              <div className='mx-auto max-w-4xl px-6 py-8'>
                {/* Hero Section */}
                <div className='mb-12 text-center'>
                  <img
                    src='/logo.png'
                    alt='Logo do minPoker - Ferramenta de Planning Poker online gratuita para equipes ágeis realizarem estimativas colaborativas'
                    className='mx-auto h-24 w-24'
                    loading='lazy'
                    width='96'
                    height='96'
                  />
                  <h1 className='mb-4 text-4xl font-bold text-primary'>
                    minPoker | Planning Poker Online
                  </h1>
                  <h2 className='mx-auto max-w-2xl text-lg font-light text-gray-500'>
                    Crie uma nova sala ou entre em uma existente para começar
                    suas sessões de Planning Poker com sua equipe.
                  </h2>
                </div>

                {/* What is Planning Poker Section */}
                {/* <section className='mb-12'>
                  <h2 className='text-2xl font-semibold mb-6 text-center '>
                    O que é Planning Poker?
                  </h2>
                  <div className='bg-white rounded-lg shadow-sm p-6 border'>
                    <p className='text-gray-700 mb-4 leading-relaxed'>
                      O <strong>Planning Poker</strong> é uma técnica de
                      estimativa ágil baseada em consenso, amplamente utilizada
                      em metodologias como Scrum e outras frameworks ágeis. Esta
                      ferramenta gamificada permite que equipes de
                      desenvolvimento estimem o esforço necessário para
                      completar user stories, tarefas ou funcionalidades de
                      forma colaborativa e precisa.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Utilizando cartas numeradas (geralmente seguindo a
                      sequência de Fibonacci: 1, 2, 3, 5, 8, 13, 21), cada
                      membro da equipe vota simultaneamente, evitando
                      influências e garantindo estimativas mais objetivas e
                      democráticas.
                    </p>
                  </div>
                </section> */}

                {/* Benefits Section */}
                {/* <section className='mb-12'>
                  <h2 className='text-2xl font-semibold mb-6 text-center '>
                    Benefícios do Planning Poker
                  </h2>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
                      <h3 className='text-lg font-semibold mb-3 text-blue-800'>
                        🎯 Estimativas Mais Precisas
                      </h3>
                      <p className='text-gray-700'>
                        A combinação de diferentes perspectivas da equipe
                        resulta em estimativas mais realistas e confiáveis para
                        o planejamento de sprints.
                      </p>
                    </div>
                    <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
                      <h3 className='text-lg font-semibold mb-3 text-green-800'>
                        🤝 Colaboração da Equipe
                      </h3>
                      <p className='text-gray-700'>
                        Promove discussões saudáveis e alinhamento entre
                        desenvolvedores, testadores, analistas e outros membros
                        da equipe ágil.
                      </p>
                    </div>
                    <div className='bg-purple-50 rounded-lg p-6 border border-purple-100'>
                      <h3 className='text-lg font-semibold mb-3 text-purple-800'>
                        ⚡ Processo Eficiente
                      </h3>
                      <p className='text-gray-700'>
                        Reduz o tempo gasto em reuniões de estimativa, tornando
                        o processo mais dinâmico e focado nos resultados.
                      </p>
                    </div>
                    <div className='bg-orange-50 rounded-lg p-6 border border-orange-100'>
                      <h3 className='text-lg font-semibold mb-3 text-orange-800'>
                        📊 Transparência Total
                      </h3>
                      <p className='text-gray-700'>
                        Todos os votos são revelados simultaneamente, eliminando
                        vieses e influências externas nas estimativas.
                      </p>
                    </div>
                  </div>
                </section> */}

                {/* Navigation Links Section */}
                <section className='mb-12'>
                  <div className='mx-auto grid max-w-3xl gap-6 md:grid-cols-2'>
                    <a
                      href='/how-it-works'
                      className='group block rounded-lg border border-gray-100 bg-gray-100 p-6 transition-colors hover:bg-primary/10'
                    >
                      <div className='mb-3 flex items-center'>
                        <div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white transition-transform'>
                          <InfoIcon />
                        </div>
                        <h3 className='text-lg font-semibold'>
                          Como Funciona o minPoker
                        </h3>
                      </div>
                      <p className='text-sm text-gray-500'>
                        Descubra o passo a passo para usar nossa ferramenta de
                        Planning Poker e como ela pode melhorar suas estimativas
                        ágeis.
                      </p>
                    </a>

                    <a
                      href='/features'
                      className='group block rounded-lg border border-gray-100 bg-gray-100 p-6 transition-colors hover:bg-primary/10'
                    >
                      <div className='mb-3 flex items-center'>
                        <div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white transition-transform'>
                          <BlocksIcon />
                        </div>
                        <h3 className='text-lg font-semibold'>
                          Recursos do minPoker
                        </h3>
                      </div>
                      <p className='text-sm text-gray-600'>
                        Explore todas as funcionalidades disponíveis: votação
                        anônima, salas privadas, sincronização em tempo real e
                        muito mais.
                      </p>
                    </a>

                    <a
                      href='/benefits'
                      className='group block rounded-lg border border-gray-100 bg-gray-100 p-6 transition-colors hover:bg-primary/10'
                    >
                      <div className='mb-3 flex items-center'>
                        <div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white transition-transform'>
                          <HeartIcon />
                        </div>
                        <h3 className='text-lg font-semibold'>
                          Benefícios do Planning Poker
                        </h3>
                      </div>
                      <p className='text-sm text-gray-600'>
                        Entenda como o Planning Poker melhora a precisão das
                        estimativas, promove colaboração e otimiza o processo
                        ágil.
                      </p>
                    </a>

                    <a
                      href='/faq'
                      className='group block rounded-lg border border-gray-100 bg-gray-100 p-6 transition-colors hover:bg-primary/10'
                    >
                      <div className='mb-3 flex items-center'>
                        <div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white transition-transform'>
                          <MessageCircleQuestionIcon />
                        </div>
                        <h3 className='text-lg font-semibold'>
                          Perguntas Frequentes
                        </h3>
                      </div>
                      <p className='text-sm text-gray-600'>
                        Encontre respostas para as dúvidas mais comuns sobre o
                        uso do minPoker e suas funcionalidades.
                      </p>
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
