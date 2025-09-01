import { ArrowLeft, Target, Users, Clock, TrendingUp, Brain, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BenefitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Benefícios do Planning Poker
          </h1>

          <div className="mb-12">
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              O Planning Poker é uma das técnicas de estimativa mais eficazes em metodologias ágeis, 
              oferecendo benefícios comprovados para equipes de desenvolvimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Estimativas Mais Precisas
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                A combinação de diferentes perspectivas da equipe resulta em estimativas 
                mais precisas e realistas do que estimativas individuais.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Reduz viés individual
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Considera múltiplas perspectivas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Melhora com a experiência da equipe
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Engajamento da Equipe
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Todos os membros da equipe participam ativamente do processo de estimativa, 
                aumentando o comprometimento e a responsabilidade compartilhada.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Participação ativa de todos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Maior comprometimento
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Responsabilidade compartilhada
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Economia de Tempo
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sessões estruturadas e focadas evitam discussões intermináveis, 
                chegando a consensos de forma mais rápida e eficiente.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  Discussões focadas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  Consenso mais rápido
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  Reuniões mais produtivas
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Compartilhamento de Conhecimento
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                As discussões durante o processo revelam diferentes aspectos das tarefas, 
                promovendo o aprendizado e alinhamento da equipe.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Troca de experiências
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Alinhamento técnico
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Identificação de riscos
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Vantagens Comprovadas
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Melhoria Contínua</h3>
                  <p className="text-sm text-gray-600">
                    A precisão das estimativas melhora ao longo do tempo conforme a equipe 
                    ganha experiência com a técnica.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Consenso Natural</h3>
                  <p className="text-sm text-gray-600">
                    O processo naturalmente leva a equipe ao consenso, evitando 
                    imposições e conflitos.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Transparência</h3>
                  <p className="text-sm text-gray-600">
                    Todos os aspectos das tarefas são discutidos abertamente, 
                    aumentando a transparência do projeto.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Impacto nos Projetos Ágeis
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Planejamento de Sprint</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        Estimativas mais confiáveis para velocity
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        Melhor previsibilidade de entregas
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        Identificação precoce de riscos
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Qualidade do Produto</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        Melhor compreensão dos requisitos
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        Redução de retrabalho
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        Alinhamento de expectativas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Estudos e Resultados
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Pesquisas mostram que equipes que utilizam Planning Poker apresentam:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        40%
                      </div>
                      <span className="text-gray-700">Melhoria na precisão das estimativas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        25%
                      </div>
                      <span className="text-gray-700">Redução no tempo de planejamento</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        60%
                      </div>
                      <span className="text-gray-700">Aumento no engajamento da equipe</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        30%
                      </div>
                      <span className="text-gray-700">Redução de retrabalho</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Por que Escolher o minPoker?
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  O minPoker foi desenvolvido para maximizar todos esses benefícios do Planning Poker, 
                  oferecendo uma experiência otimizada e sem fricções:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Interface intuitiva e rápida
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Sem necessidade de cadastro
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Funciona em qualquer dispositivo
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Votação anônima garantida
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      Sincronização em tempo real
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
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