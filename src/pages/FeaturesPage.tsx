import { ArrowLeft, Users, Eye, RotateCcw, Smartphone, Zap, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export function FeaturesPage() {
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
            Recursos do minPoker
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Gerenciamento de Participantes
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Crie salas e convide quantos participantes precisar. Cada participante 
                pode escolher seu próprio nome e participar ativamente das votações.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Salas ilimitadas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Participantes ilimitados
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Nomes personalizáveis
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Votação Anônima
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                As votações permanecem ocultas até que todos os participantes tenham 
                votado, evitando influência e garantindo estimativas mais precisas.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Cartas ocultas durante votação
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Revelação simultânea
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Evita viés de ancoragem
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <RotateCcw className="w-8 h-8 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Reset de Votações
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                O moderador pode facilmente resetar as votações para iniciar uma nova 
                rodada de estimativas ou re-votar uma tarefa após discussões.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Reset com um clique
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Múltiplas rodadas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Controle do moderador
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-8 h-8 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Design Responsivo
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Interface otimizada para todos os dispositivos - desktop, tablet e 
                smartphone. Participe de qualquer lugar com a mesma experiência.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Mobile-first design
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Touch-friendly interface
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Adaptável a qualquer tela
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Recursos Técnicos
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Performance</h3>
                  <p className="text-sm text-gray-600">
                    Aplicação otimizada com carregamento rápido e interface fluida
                  </p>
                </div>
                <div className="text-center p-4">
                  <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Privacidade</h3>
                  <p className="text-sm text-gray-600">
                    Dados armazenados localmente, sem necessidade de cadastro
                  </p>
                </div>
                <div className="text-center p-4">
                  <Users className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Colaboração</h3>
                  <p className="text-sm text-gray-600">
                    Sincronização em tempo real entre todos os participantes
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sequência de Fibonacci Personalizada
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                O minPoker utiliza a sequência clássica de Fibonacci para Planning Poker, 
                otimizada para estimativas ágeis:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-wrap gap-3 justify-center">
                  {[1, 2, 3, 5, 8, 13, 21, 34, 55, 89].map((value) => (
                    <div
                      key={value}
                      className="bg-white border-2 border-blue-200 rounded-lg p-3 min-w-[60px] text-center font-semibold text-blue-800"
                    >
                      {value}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Valores otimizados para refletir a incerteza crescente em tarefas mais complexas
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Persistência Local
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Suas salas e configurações são salvas automaticamente no seu navegador, 
                permitindo retomar sessões mesmo após fechar a aplicação.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Dados salvos automaticamente:</h4>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Salas criadas e participadas</li>
                  <li>• Histórico de votações</li>
                  <li>• Preferências de usuário</li>
                  <li>• Estado da sessão atual</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Integração Opcional com Firebase
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Para equipes que precisam de sincronização avançada, o minPoker oferece 
                integração opcional com Firebase para persistência em nuvem.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Modo Local (Padrão)</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Sem necessidade de configuração</li>
                    <li>• Dados no navegador</li>
                    <li>• Privacidade total</li>
                    <li>• Funciona offline</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Modo Firebase (Opcional)</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
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