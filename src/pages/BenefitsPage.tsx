import {
  ArrowLeft,
  Target,
  Users,
  Clock,
  TrendingUp,
  Brain,
  CheckCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function BenefitsPage() {
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
            Benefícios do Planning Poker
          </h1>

          <div className='mb-12'>
            <p className='text-center text-lg leading-relaxed text-gray-600'>
              O Planning Poker é uma das técnicas de estimativa mais eficazes em
              metodologias ágeis, oferecendo benefícios comprovados para equipes
              de desenvolvimento.
            </p>
          </div>

          <div className='mb-12 grid gap-8 md:grid-cols-2'>
            <div className='rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Target className='h-8 w-8 text-green-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Estimativas Mais Precisas
                </h2>
              </div>
              <p className='mb-4 leading-relaxed text-gray-600'>
                A combinação de diferentes perspectivas da equipe resulta em
                estimativas mais precisas e realistas do que estimativas
                individuais.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  Reduz viés individual
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  Considera múltiplas perspectivas
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  Melhora com a experiência da equipe
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Users className='h-8 w-8 text-blue-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Engajamento da Equipe
                </h2>
              </div>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Todos os membros da equipe participam ativamente do processo de
                estimativa, aumentando o comprometimento e a responsabilidade
                compartilhada.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-blue-500' />
                  Participação ativa de todos
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-blue-500' />
                  Maior comprometimento
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-blue-500' />
                  Responsabilidade compartilhada
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Clock className='h-8 w-8 text-purple-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Economia de Tempo
                </h2>
              </div>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Sessões estruturadas e focadas evitam discussões intermináveis,
                chegando a consensos de forma mais rápida e eficiente.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-purple-500' />
                  Discussões focadas
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-purple-500' />
                  Consenso mais rápido
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-purple-500' />
                  Reuniões mais produtivas
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6'>
              <div className='mb-4 flex items-center gap-3'>
                <Brain className='h-8 w-8 text-orange-600' />
                <h2 className='text-xl font-semibold text-gray-800'>
                  Compartilhamento de Conhecimento
                </h2>
              </div>
              <p className='mb-4 leading-relaxed text-gray-600'>
                As discussões durante o processo revelam diferentes aspectos das
                tarefas, promovendo o aprendizado e alinhamento da equipe.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-orange-500' />
                  Troca de experiências
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-orange-500' />
                  Alinhamento técnico
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <CheckCircle className='h-4 w-4 text-orange-500' />
                  Identificação de riscos
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-8'>
            <section>
              <h2 className='mb-6 text-2xl font-semibold text-gray-800'>
                Vantagens Comprovadas
              </h2>
              <div className='grid gap-6 md:grid-cols-3'>
                <div className='p-4 text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                    <TrendingUp className='h-8 w-8 text-green-600' />
                  </div>
                  <h3 className='mb-2 font-semibold text-gray-800'>
                    Melhoria Contínua
                  </h3>
                  <p className='text-sm text-gray-600'>
                    A precisão das estimativas melhora ao longo do tempo
                    conforme a equipe ganha experiência com a técnica.
                  </p>
                </div>
                <div className='p-4 text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
                    <Users className='h-8 w-8 text-blue-600' />
                  </div>
                  <h3 className='mb-2 font-semibold text-gray-800'>
                    Consenso Natural
                  </h3>
                  <p className='text-sm text-gray-600'>
                    O processo naturalmente leva a equipe ao consenso, evitando
                    imposições e conflitos.
                  </p>
                </div>
                <div className='p-4 text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
                    <Brain className='h-8 w-8 text-purple-600' />
                  </div>
                  <h3 className='mb-2 font-semibold text-gray-800'>
                    Transparência
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Todos os aspectos das tarefas são discutidos abertamente,
                    aumentando a transparência do projeto.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
                Impacto nos Projetos Ágeis
              </h2>
              <div className='rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
                <div className='grid gap-8 md:grid-cols-2'>
                  <div>
                    <h3 className='mb-3 font-semibold text-gray-800'>
                      Planejamento de Sprint
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500'></div>
                        Estimativas mais confiáveis para velocity
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500'></div>
                        Melhor previsibilidade de entregas
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500'></div>
                        Identificação precoce de riscos
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='mb-3 font-semibold text-gray-800'>
                      Qualidade do Produto
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500'></div>
                        Melhor compreensão dos requisitos
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500'></div>
                        Redução de retrabalho
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500'></div>
                        Alinhamento de expectativas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
                Estudos e Resultados
              </h2>
              <div className='rounded-lg bg-gray-50 p-6'>
                <p className='mb-4 leading-relaxed text-gray-600'>
                  Pesquisas mostram que equipes que utilizam Planning Poker
                  apresentam:
                </p>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white'>
                        40%
                      </div>
                      <span className='text-gray-700'>
                        Melhoria na precisão das estimativas
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white'>
                        25%
                      </div>
                      <span className='text-gray-700'>
                        Redução no tempo de planejamento
                      </span>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white'>
                        60%
                      </div>
                      <span className='text-gray-700'>
                        Aumento no engajamento da equipe
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white'>
                        30%
                      </div>
                      <span className='text-gray-700'>
                        Redução de retrabalho
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
                Por que Escolher o minPoker?
              </h2>
              <div className='rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6'>
                <p className='mb-4 leading-relaxed text-gray-600'>
                  O minPoker foi desenvolvido para maximizar todos esses
                  benefícios do Planning Poker, oferecendo uma experiência
                  otimizada e sem fricções:
                </p>
                <div className='grid gap-4 md:grid-cols-2'>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2 text-gray-700'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      Interface intuitiva e rápida
                    </li>
                    <li className='flex items-center gap-2 text-gray-700'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      Sem necessidade de cadastro
                    </li>
                    <li className='flex items-center gap-2 text-gray-700'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      Funciona em qualquer dispositivo
                    </li>
                  </ul>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2 text-gray-700'>
                      <CheckCircle className='h-4 w-4 text-blue-500' />
                      Votação anônima garantida
                    </li>
                    <li className='flex items-center gap-2 text-gray-700'>
                      <CheckCircle className='h-4 w-4 text-blue-500' />
                      Sincronização em tempo real
                    </li>
                    <li className='flex items-center gap-2 text-gray-700'>
                      <CheckCircle className='h-4 w-4 text-blue-500' />
                      Gratuito e open source
                    </li>
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
