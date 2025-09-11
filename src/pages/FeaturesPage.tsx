import {
  ArrowLeft,
  Users,
  Eye,
  RotateCcw,
  Smartphone,
  Zap,
  Shield
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function FeaturesPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-800'
          >
            <ArrowLeft className='h-4 w-4' />
            Voltar ao início
          </Link>
        </div>

        <div className='rounded-lg bg-white p-8 shadow-lg'>
          <h1 className='mb-8 text-center text-4xl font-bold text-gray-900'>
            Recursos do minPoker
          </h1>

          <div className='mb-12 grid gap-8 md:grid-cols-2'>
            <div className='rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Users className='h-8 w-8 text-blue-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Gerenciamento de Participantes
                </h2>
              </div>
              <p className='leading-relaxed text-gray-600'>
                Crie salas e convide quantos participantes precisar. Cada
                participante pode escolher seu próprio nome e participar
                ativamente das votações.
              </p>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                  Salas ilimitadas
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                  Participantes ilimitados
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                  Nomes personalizáveis
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Eye className='h-8 w-8 text-green-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Votação Anônima
                </h2>
              </div>
              <p className='leading-relaxed text-gray-600'>
                As votações permanecem ocultas até que todos os participantes
                tenham votado, evitando influência e garantindo estimativas mais
                precisas.
              </p>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  Cartas ocultas durante votação
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  Revelação simultânea
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  Evita viés de ancoragem
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <RotateCcw className='h-8 w-8 text-purple-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Reset de Votações
                </h2>
              </div>
              <p className='leading-relaxed text-gray-600'>
                O moderador pode facilmente resetar as votações para iniciar uma
                nova rodada de estimativas ou re-votar uma tarefa após
                discussões.
              </p>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-purple-500'></div>
                  Reset com um clique
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-purple-500'></div>
                  Múltiplas rodadas
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-purple-500'></div>
                  Controle do moderador
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Smartphone className='h-8 w-8 text-orange-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Design Responsivo
                </h2>
              </div>
              <p className='leading-relaxed text-gray-600'>
                Interface otimizada para todos os dispositivos - desktop, tablet
                e smartphone. Participe de qualquer lugar com a mesma
                experiência.
              </p>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                  Mobile-first design
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                  Touch-friendly interface
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                  Adaptável a qualquer tela
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-8'>
            <section>
              <h2 className='mb-6 text-center text-2xl font-semibold text-gray-800'>
                Recursos Técnicos
              </h2>
              <div className='grid gap-6 md:grid-cols-3'>
                <div className='p-4 text-center'>
                  <Zap className='mx-auto mb-3 h-12 w-12 text-yellow-500' />
                  <h3 className='mb-2 font-semibold text-gray-800'>
                    Performance
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Aplicação otimizada com carregamento rápido e interface
                    fluida
                  </p>
                </div>
                <div className='p-4 text-center'>
                  <Shield className='mx-auto mb-3 h-12 w-12 text-blue-500' />
                  <h3 className='mb-2 font-semibold text-gray-800'>
                    Privacidade
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Dados armazenados localmente, sem necessidade de cadastro
                  </p>
                </div>
                <div className='p-4 text-center'>
                  <Users className='mx-auto mb-3 h-12 w-12 text-green-500' />
                  <h3 className='mb-2 font-semibold text-gray-800'>
                    Colaboração
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Sincronização em tempo real entre todos os participantes
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
                Sequência de Fibonacci Personalizada
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                O minPoker utiliza a sequência clássica de Fibonacci para
                Planning Poker, otimizada para estimativas ágeis:
              </p>
              <div className='rounded-lg bg-gray-50 p-6'>
                <div className='flex flex-wrap justify-center gap-3'>
                  {[1, 2, 3, 5, 8, 13, 21, 34, 55, 89].map(value => (
                    <div
                      key={value}
                      className='min-w-[60px] rounded-lg border-2 border-blue-200 bg-white p-3 text-center font-semibold text-blue-800'
                    >
                      {value}
                    </div>
                  ))}
                </div>
                <p className='mt-4 text-center text-sm text-gray-600'>
                  Valores otimizados para refletir a incerteza crescente em
                  tarefas mais complexas
                </p>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
                Persistência Local
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Suas salas e configurações são salvas automaticamente no seu
                navegador, permitindo retomar sessões mesmo após fechar a
                aplicação.
              </p>
              <div className='rounded-lg bg-blue-50 p-4'>
                <h4 className='mb-2 font-semibold text-blue-800'>
                  Dados salvos automaticamente:
                </h4>
                <ul className='space-y-1 text-sm text-blue-700'>
                  <li>• Salas criadas e participadas</li>
                  <li>• Histórico de votações</li>
                  <li>• Preferências de usuário</li>
                  <li>• Estado da sessão atual</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
                Integração Opcional com Firebase
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Para equipes que precisam de sincronização avançada, o minPoker
                oferece integração opcional com Firebase para persistência em
                nuvem.
              </p>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg bg-green-50 p-4'>
                  <h4 className='mb-2 font-semibold text-green-800'>
                    Modo Local (Padrão)
                  </h4>
                  <ul className='space-y-1 text-sm text-green-700'>
                    <li>• Sem necessidade de configuração</li>
                    <li>• Dados no navegador</li>
                    <li>• Privacidade total</li>
                    <li>• Funciona offline</li>
                  </ul>
                </div>
                <div className='rounded-lg bg-blue-50 p-4'>
                  <h4 className='mb-2 font-semibold text-blue-800'>
                    Modo Firebase (Opcional)
                  </h4>
                  <ul className='space-y-1 text-sm text-blue-700'>
                    <li>• Sincronização em nuvem</li>
                    <li>• Acesso de múltiplos dispositivos</li>
                    <li>• Backup automático</li>
                    <li>• Colaboração avançada</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
