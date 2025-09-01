import { Sidebar } from '@/components/Sidebar'
import { RoomHeader } from '@/components/RoomHeader'
import { VotingArea } from '@/components/VotingArea'
import { JoinRoomDialog } from '@/components/JoinRoomDialog'
import { useHome } from '@/hooks/useHome'
import { Button } from '@/components/ui/button'

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
    handleCloseJoinDialog
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

      <div className='flex-1 flex flex-col'>
        {loading && (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center text-gray-500'>
              <div className='text-2xl mb-2'>Carregando...</div>
            </div>
          </div>
        )}

        {wasDeleted && (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center bg-[#FEECDC] p-8 rounded-lg '>
              <div className='text-6xl mb-4'>⚠️</div>
              <h2 className='text-2xl font-semibold mb-2'>Sala excluída</h2>
              <p className='mb-4'>A sala foi excluída pelo administrador.</p>
              <Button onClick={handleWasRemovedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {wasRemoved && (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center bg-[#FEECDC] p-8 rounded-lg '>
              <div className='text-6xl mb-4'>⚠️</div>
              <h2 className='text-2xl font-semibold mb-2'>Removido da Sala</h2>
              <p className='mb-4'>
                Você foi removido da sala pelo administrador.
              </p>
              <Button onClick={handleWasRemovedAction}>Voltar ao início</Button>
            </div>
          </div>
        )}

        {error && (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center text-red-500'>
              <div className='text-2xl mb-2'>Erro: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
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
            <div className='flex-1 overflow-y-auto'>
              <div className='max-w-4xl mx-auto px-6 py-8'>
                {/* Hero Section */}
                <div className='text-center mb-12'>
                  <img
                    src='/logo.png'
                    alt='Logo do minPoker - Ferramenta de Planning Poker online gratuita para equipes ágeis realizarem estimativas colaborativas'
                    className='h-24 w-24 mx-auto mb-6'
                    loading='lazy'
                    width='96'
                    height='96'
                  />
                  <h1 className='text-4xl font-bold mb-4 text-primary'>
                    minPoker | Planning Poker Online
                  </h1>
                  <h2 className='text-gray-500 font-light max-w-2xl mx-auto text-lg'>
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

                {/* How it Works Section */}
                <section className='mb-12'>
                  <h2 className='text-2xl font-semibold mb-6 text-center '>
                    Como Funciona o minPoker
                  </h2>
                  <div className='bg-gradient-to-r from-primary/10 to-blue-50 rounded-lg p-6 border border-primary/10'>
                    <div className='grid md:grid-cols-3 gap-6'>
                      <div className='text-center'>
                        <div className='bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold'>
                          1
                        </div>
                        <h3 className='font-semibold mb-2 '>
                          Crie ou Entre em uma Sala
                        </h3>
                        <p className='text-gray-600 text-sm'>
                          O Scrum Master ou facilitador cria uma sala e
                          compartilha o código com a equipe
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold'>
                          2
                        </div>
                        <h3 className='font-semibold mb-2 '>
                          Vote nas Estimativas
                        </h3>
                        <p className='text-gray-600 text-sm'>
                          Cada membro seleciona uma carta representando sua
                          estimativa para a user story
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold'>
                          3
                        </div>
                        <h3 className='font-semibold mb-2 '>
                          Revele e Discuta
                        </h3>
                        <p className='text-gray-600 text-sm'>
                          Os votos são revelados simultaneamente e a equipe
                          discute as diferenças para chegar ao consenso
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Features Section */}
                <section className='mb-12'>
                  <h2 className='text-2xl font-semibold mb-6 text-center '>
                    Recursos do minPoker
                  </h2>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div className='bg-white rounded-lg p-4 border border-gray-100 shadow-sm'>
                      <div className='text-2xl mb-2'>🚀</div>
                      <h3 className='font-semibold mb-2'>Tempo Real</h3>
                      <p className='text-gray-500 text-sm'>
                        Sincronização instantânea entre todos os participantes.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-4 border border-gray-100 shadow-sm'>
                      <div className='text-2xl mb-2'>🔒</div>
                      <h3 className='font-semibold mb-2'>Salas Privadas</h3>
                      <p className='text-gray-500 text-sm'>
                        Controle total sobre quem participa das sessões.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-4 border border-gray-100 shadow-sm'>
                      <div className='text-2xl mb-2'>🔄</div>
                      <h3 className='font-semibold mb-2'>
                        Revelação Automática
                      </h3>
                      <p className='text-gray-500 text-sm'>
                        Revelação automática dos votos após a conclusão da
                        sessão.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-4 border border-gray-100 shadow-sm'>
                      <div className='text-2xl mb-2'>🎨</div>
                      <h3 className='font-semibold mb-2'>
                        Interface Intuitiva
                      </h3>
                      <p className='text-gray-500 text-sm'>
                        Design limpo e fácil de usar para todas as idades.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-4 border border-gray-100 shadow-sm'>
                      <div className='text-2xl mb-2'>⚡</div>
                      <h3 className='font-semibold mb-2'>Sem Instalação</h3>
                      <p className='text-gray-500 text-sm'>
                        Acesse diretamente pelo navegador, sem downloads.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-4 border border-gray-100 shadow-sm'>
                      <div className='text-2xl mb-2'>💰</div>
                      <h3 className='font-semibold mb-2'>
                        Totalmente Gratuito
                      </h3>
                      <p className='text-gray-500 text-sm'>
                        Sem limites de uso, participantes ou sessões.
                      </p>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section className='mb-8'>
                  <h2 className='text-2xl font-semibold mb-6 text-center '>
                    Perguntas Frequentes
                  </h2>
                  <div className='space-y-4'>
                    <div className='bg-white rounded-lg p-6 border border-gray-100 shadow-sm'>
                      <h3 className='font-semibold mb-2 '>
                        Quantas pessoas podem participar de uma sessão?
                      </h3>
                      <p className='text-gray-500'>
                        Não há limite de participantes. O minPoker suporta desde
                        equipes pequenas até grandes organizações com múltiplas
                        equipes.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-6 border border-gray-100 shadow-sm'>
                      <h3 className='font-semibold mb-2 '>
                        Preciso criar uma conta para usar?
                      </h3>
                      <p className='text-gray-500'>
                        Não! Você pode começar a usar imediatamente. Basta
                        inserir seu nome e criar ou entrar em uma sala.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-6 border border-gray-100 shadow-sm'>
                      <h3 className='font-semibold mb-2 '>
                        Os dados das sessões são salvos?
                      </h3>
                      <p className='text-gray-500'>
                        As sessões são temporárias e focadas na colaboração em
                        tempo real. Recomendamos documentar os resultados em
                        suas ferramentas de gestão de projeto.
                      </p>
                    </div>
                    <div className='bg-white rounded-lg p-6 border border-gray-100 shadow-sm'>
                      <h3 className='font-semibold mb-2 '>
                        Posso personalizar as cartas de votação?
                      </h3>
                      <p className='text-gray-500'>
                        Atualmente utilizamos a sequência de Fibonacci padrão
                        (1, 2, 3, 5, 8, 13, 21, 34, 55, 89), que é amplamente
                        aceita na comunidade ágil.
                      </p>
                    </div>
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
