import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TermsOfServicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfcff] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Termos de Uso
          </h1>
          <p className="text-gray-600">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Aceitação dos Termos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Ao acessar e usar o minPoker, você concorda em cumprir estes
                Termos de Uso. Se você não concordar com qualquer parte destes
                termos, não deve usar nosso serviço.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Descrição do Serviço
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O minPoker é uma ferramenta gratuita de Planning Poker online que
                permite equipes realizarem estimativas colaborativas em tempo real
                para metodologias ágeis de desenvolvimento.
              </p>
              <p>Nossos serviços incluem:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Criação de salas de Planning Poker</li>
                <li>Sistema de votação com sequência de Fibonacci</li>
                <li>Colaboração em tempo real</li>
                <li>Gerenciamento de participantes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Uso Aceitável
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Você concorda em usar o minPoker apenas para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Atividades legais e legítimas de Planning Poker</li>
                <li>Estimativas de projetos e metodologias ágeis</li>
                <li>Colaboração profissional em equipe</li>
              </ul>
              <p className="mt-4">É proibido usar o serviço para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Atividades ilegais ou não autorizadas</li>
                <li>Assédio, spam ou comportamento abusivo</li>
                <li>Violação de direitos de propriedade intelectual</li>
                <li>Distribuição de malware ou conteúdo malicioso</li>
                <li>Tentativas de comprometer a segurança do sistema</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Contas de Usuário
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O minPoker não requer criação de conta. Os usuários podem
                participar das sessões fornecendo apenas um nome de identificação.
              </p>
              <p>
                Você é responsável por manter a confidencialidade dos códigos de
                sala que criar e por todas as atividades que ocorrem em suas salas.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Propriedade Intelectual
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O minPoker e todo seu conteúdo, recursos e funcionalidades são de
                propriedade exclusiva da equipe de desenvolvimento e são protegidos
                por leis de direitos autorais e outras leis de propriedade
                intelectual.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Publicidade
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Para manter o serviço gratuito, exibimos anúncios através do
                Google AdSense. Estes anúncios podem ser baseados no conteúdo da
                página ou em seus interesses.
              </p>
              <p>
                Não somos responsáveis pelo conteúdo dos anúncios de terceiros
                exibidos em nosso site.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Limitação de Responsabilidade
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O minPoker é fornecido "como está" sem garantias de qualquer tipo.
                Não garantimos que o serviço será ininterrupto, livre de erros ou
                completamente seguro.
              </p>
              <p>
                Em nenhuma circunstância seremos responsáveis por danos diretos,
                indiretos, incidentais ou consequenciais resultantes do uso ou
                incapacidade de usar nosso serviço.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Modificações do Serviço
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Reservamos o direito de modificar, suspender ou descontinuar
                qualquer parte do serviço a qualquer momento, com ou sem aviso
                prévio.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Rescisão
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos encerrar ou suspender seu acesso ao serviço imediatamente,
                sem aviso prévio, por qualquer motivo, incluindo violação destes
                Termos de Uso.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Lei Aplicável
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer
                disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Contato
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato
                conosco através do email:{" "}
                <a
                  href="mailto:gabrielalvesdepaiva@icloud.com"
                  className="text-primary hover:underline"
                >
                  gabrielalvesdepaiva@icloud.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Alterações nos Termos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar estes Termos de Uso periodicamente. As alterações
                entrarão em vigor imediatamente após a publicação no site.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}