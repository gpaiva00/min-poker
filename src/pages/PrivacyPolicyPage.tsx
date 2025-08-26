import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PrivacyPolicyPage() {
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
            Política de Privacidade
          </h1>
          <p className="text-gray-600">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Informações que Coletamos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O minPoker coleta apenas as informações mínimas necessárias para
                fornecer nossos serviços:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Nome de usuário:</strong> Você pode escolher um nome para
                  identificação nas salas de Planning Poker
                </li>
                <li>
                  <strong>Dados de sessão:</strong> Informações temporárias sobre
                  suas votações e participação em salas
                </li>
                <li>
                  <strong>Dados técnicos:</strong> Informações básicas do navegador
                  para funcionamento da aplicação
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Como Usamos suas Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Facilitar sessões de Planning Poker em tempo real</li>
                <li>Identificar participantes dentro das salas</li>
                <li>Melhorar a experiência do usuário</li>
                <li>Garantir o funcionamento adequado da aplicação</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Compartilhamento de Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais
                com terceiros, exceto:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Quando exigido por lei</li>
                <li>Para proteger nossos direitos legais</li>
                <li>Com provedores de serviços que nos ajudam a operar a aplicação</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Cookies e Tecnologias Similares
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Utilizamos localStorage para armazenar suas preferências localmente
                em seu navegador. Também utilizamos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Google AdSense:</strong> Para exibir anúncios relevantes
                  que nos ajudam a manter o serviço gratuito
                </li>
                <li>
                  <strong>Cookies de funcionalidade:</strong> Para lembrar suas
                  preferências e melhorar sua experiência
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Publicidade
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Este site utiliza o Google AdSense para exibir anúncios. O Google
                pode usar cookies para servir anúncios baseados em suas visitas
                anteriores a este site ou outros sites.
              </p>
              <p>
                Você pode optar por não receber anúncios personalizados visitando
                as{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Configurações de Anúncios do Google
                </a>
                .
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Segurança dos Dados
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Implementamos medidas de segurança adequadas para proteger suas
                informações contra acesso não autorizado, alteração, divulgação ou
                destruição.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Seus Direitos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Você tem o direito de:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações incorretas</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Retirar seu consentimento a qualquer momento</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Contato
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em
                contato conosco através do email:{" "}
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
              9. Alterações nesta Política
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente.
                Notificaremos sobre mudanças significativas através do site.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}