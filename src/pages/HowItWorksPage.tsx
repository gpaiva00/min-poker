import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HowItWorksPage() {
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
            Como Funciona o minPoker
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                O que é Planning Poker?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Planning Poker é uma técnica de estimativa ágil baseada em consenso, 
                amplamente utilizada para estimar o esforço ou tamanho relativo de 
                tarefas de desenvolvimento em metodologias ágeis como Scrum.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A técnica utiliza cartas com valores da sequência de Fibonacci 
                (1, 2, 3, 5, 8, 13, 21, 34, 55, 89) para representar a complexidade 
                ou esforço necessário para completar uma tarefa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Como usar o minPoker
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Crie uma sala
                    </h3>
                    <p className="text-gray-600">
                      Clique em "Criar Sala" e defina um nome para sua sessão de Planning Poker. 
                      Você será automaticamente designado como moderador da sala.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Convide participantes
                    </h3>
                    <p className="text-gray-600">
                      Compartilhe o código da sala com sua equipe. Os participantes podem 
                      entrar usando o código e escolhendo um nome de usuário.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Apresente a tarefa
                    </h3>
                    <p className="text-gray-600">
                      Como moderador, apresente a user story ou tarefa que precisa ser estimada. 
                      Explique os requisitos e tire dúvidas da equipe.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Vote simultaneamente
                    </h3>
                    <p className="text-gray-600">
                      Todos os participantes escolhem uma carta (valor) que representa 
                      sua estimativa para a tarefa. As votações são mantidas em segredo 
                      até que todos tenham votado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Revele e discuta
                    </h3>
                    <p className="text-gray-600">
                      Quando todos votarem, as cartas são reveladas simultaneamente. 
                      Se houver consenso, a estimativa está pronta. Se houver divergências, 
                      discuta as diferenças e vote novamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Repita o processo
                    </h3>
                    <p className="text-gray-600">
                      Continue o processo para todas as tarefas que precisam ser estimadas. 
                      O moderador pode resetar as votações para iniciar uma nova rodada.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sequência de Fibonacci
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                O minPoker utiliza a sequência de Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55, 89) 
                porque ela reflete a incerteza inerente na estimativa de tarefas complexas.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Interpretação dos valores:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li><strong>1-2:</strong> Tarefa muito simples, bem conhecida</li>
                  <li><strong>3-5:</strong> Tarefa simples com alguma complexidade</li>
                  <li><strong>8-13:</strong> Tarefa moderadamente complexa</li>
                  <li><strong>21-34:</strong> Tarefa complexa, pode precisar ser dividida</li>
                  <li><strong>55-89:</strong> Tarefa muito complexa, deve ser dividida</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Dicas para uma sessão eficaz
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Faça</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Mantenha as discussões focadas</li>
                    <li>• Encoraje todos a participar</li>
                    <li>• Use exemplos concretos</li>
                    <li>• Documente as decisões</li>
                    <li>• Seja consistente com critérios</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Evite</h4>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Influenciar outros participantes</li>
                    <li>• Discussões muito longas</li>
                    <li>• Estimativas em horas</li>
                    <li>• Pressão por consenso rápido</li>
                    <li>• Ignorar divergências grandes</li>
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