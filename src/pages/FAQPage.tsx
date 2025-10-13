import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'O que é o minPoker?',
    answer:
      'O minPoker é uma ferramenta web gratuita para Planning Poker, uma técnica de estimativa ágil. Permite que equipes estimem o esforço de tarefas de desenvolvimento de forma colaborativa e precisa, usando a sequência de Fibonacci.'
  },
  {
    question: 'Preciso criar uma conta para usar?',
    answer:
      'Não! O minPoker não requer cadastro ou login. Você pode criar salas e participar de sessões apenas escolhendo um nome de usuário. Todos os dados são armazenados localmente no seu navegador.'
  },
  {
    question: 'Como criar uma sala de Planning Poker?',
    answer:
      "É muito simples: clique em 'Criar Sala' na página inicial, escolha um nome para sua sala e você será automaticamente designado como moderador. Compartilhe o código da sala com sua equipe para que possam participar."
  },
  {
    question: 'Quantas pessoas podem participar de uma sala?',
    answer:
      'Não há limite técnico para o número de participantes. O minPoker foi projetado para funcionar bem com equipes de qualquer tamanho, desde pequenos grupos até grandes equipes distribuídas.'
  },
  {
    question: 'Como funciona a votação anônima?',
    answer:
      'Quando os participantes escolhem suas cartas, os valores ficam ocultos para todos até que todos tenham votado. Apenas quando a última pessoa vota, todas as cartas são reveladas simultaneamente, evitando influência entre os participantes.'
  },
  {
    question: 'O que são os números nas cartas?',
    answer:
      'Os números seguem a sequência de Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55, 89), que é ideal para Planning Poker porque reflete a incerteza crescente em tarefas mais complexas. Cada número representa o esforço relativo estimado para completar uma tarefa.'
  },
  {
    question: 'Posso usar o minPoker no celular?',
    answer:
      'Sim! O minPoker tem design responsivo e funciona perfeitamente em smartphones, tablets e desktops. A interface se adapta automaticamente ao tamanho da sua tela, mantendo a mesma funcionalidade em todos os dispositivos.'
  },
  {
    question: 'Os dados ficam salvos?',
    answer:
      'Sim, suas salas e configurações são automaticamente salvas no armazenamento local do seu navegador. Você pode fechar a aplicação e retomar suas sessões posteriormente. Os dados permanecem apenas no seu dispositivo.'
  },
  {
    question: 'Como resetar as votações?',
    answer:
      "Apenas o moderador da sala pode resetar as votações. Há um botão 'Reset' que limpa todas as votações atuais, permitindo iniciar uma nova rodada de estimativas para a mesma tarefa ou uma nova tarefa."
  },
  {
    question: 'O que acontece se alguém sair da sala?',
    answer:
      'Se um participante sair da sala (fechando o navegador ou perdendo conexão), ele pode retornar usando o mesmo código da sala e nome de usuário. O estado da votação atual é mantido para os demais participantes.'
  },
  {
    question: 'Posso personalizar a sequência de números?',
    answer:
      'Atualmente, o minPoker usa a sequência padrão de Fibonacci otimizada para Planning Poker. Esta sequência foi escolhida por ser a mais eficaz para estimativas ágeis, baseada em anos de experiência da comunidade.'
  },
  {
    question: 'O minPoker funciona offline?',
    answer:
      'O minPoker requer conexão com internet para sincronização entre participantes. No entanto, se você estiver sozinho revisando salas anteriores, algumas funcionalidades podem funcionar offline usando os dados salvos localmente.'
  },
  {
    question: 'Como garantir que todos votem?',
    answer:
      'O minPoker mostra claramente quais participantes já votaram (sem revelar os valores) e quais ainda não votaram. O moderador pode ver o status de todos e encorajar os que ainda não votaram a participar.'
  },
  {
    question: 'Posso usar para outros tipos de estimativa?',
    answer:
      'Embora seja otimizado para Planning Poker em desenvolvimento de software, você pode usar o minPoker para qualquer tipo de estimativa que se beneficie da técnica de votação anônima e discussão em grupo.'
  },
  {
    question: 'O que fazer quando há muita divergência nas estimativas?',
    answer:
      'Divergências são normais e valiosas! Quando há diferenças significativas (ex: alguns votam 3 e outros 21), é importante discutir os diferentes pontos de vista. Os que votaram nos extremos devem explicar seu raciocínio antes de votar novamente.'
  },
  {
    question: 'O minPoker é gratuito?',
    answer:
      'Sim, o minPoker é completamente gratuito e open source. Não há custos ocultos, limites de uso ou necessidade de assinatura. Você pode usar quantas vezes quiser, com quantas pessoas precisar.'
  },
  {
    question: 'Posso contribuir com o projeto?',
    answer:
      'Claro! O minPoker é open source e aceita contribuições da comunidade. Você pode reportar bugs, sugerir melhorias, ou contribuir com código através do repositório no GitHub.'
  },
  {
    question: 'Há integração com outras ferramentas?',
    answer:
      'Atualmente, o minPoker foca em ser uma ferramenta independente e simples. Para equipes que precisam de integração avançada, há opção de configurar Firebase para sincronização em nuvem.'
  },
  {
    question: 'Como funciona a moderação da sala?',
    answer:
      'O criador da sala é automaticamente o moderador e tem controles especiais: pode resetar votações, ver o status de todos os participantes, e gerenciar o fluxo da sessão. Apenas o moderador pode iniciar novas rodadas de votação.'
  },
  {
    question: 'O que fazer se a sala não carregar?',
    answer:
      'Primeiro, verifique sua conexão com internet. Se o problema persistir, tente limpar o cache do navegador ou usar uma aba anônima. Se ainda assim não funcionar, tente criar uma nova sala.'
  }
]

function FAQItem({
  item,
  isOpen,
  onToggle
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className='overflow-hidden rounded-lg border border-gray-200'>
      <button
        className='flex w-full items-center justify-between bg-white px-6 py-4 text-left transition-colors hover:bg-gray-50'
        onClick={onToggle}
      >
        <span className='pr-4 font-medium text-gray-800'>{item.question}</span>
        {isOpen ? (
          <ChevronUp className='h-5 w-5 flex-shrink-0 text-gray-500' />
        ) : (
          <ChevronDown className='h-5 w-5 flex-shrink-0 text-gray-500' />
        )}
      </button>
      {isOpen && (
        <div className='border-t border-gray-200 bg-gray-50 px-6 py-4'>
          <p className='leading-relaxed text-gray-600'>{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export function FAQPage() {
  const navigate = useNavigate()
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  function toggleItem(index: number) {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className='min-h-screen bg-[#fcfcff] p-6'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-6'>
          <Button
            variant='ghost'
            onClick={() => navigate('/')}
            className='mb-4'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar
          </Button>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Perguntas Frequentes
          </h1>
        </div>

        <div className='space-y-8 rounded-lg bg-white p-8 shadow-sm'>
          <div className='mb-8'>
            <p className='text-center text-lg leading-relaxed text-gray-600'>
              Encontre respostas para as dúvidas mais comuns sobre o minPoker e
              Planning Poker.
            </p>
          </div>

          <div className='space-y-4'>
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>

          <div className='mt-12 rounded-lg bg-blue-50 p-6'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800'>
              Não encontrou sua resposta?
            </h2>
            <p className='mb-4 leading-relaxed text-gray-600'>
              Se você tem uma pergunta que não está listada aqui, ficaremos
              felizes em ajudar!
            </p>
            <div className='space-y-2'>
              <p className='text-gray-600'>
                <strong>Email:</strong> gabrielalvesdepaiva@icloud.com
              </p>
              {/* <p className='text-gray-600'>
                <strong>GitHub:</strong> Reporte issues ou contribua com o
                projeto
              </p> */}
            </div>
          </div>

          <div className='mt-8 rounded-lg bg-green-50 p-6'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800'>
              Dicas para uma sessão eficaz
            </h2>
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <h3 className='mb-2 font-medium text-gray-800'>
                  Antes da sessão:
                </h3>
                <ul className='space-y-1 text-sm text-gray-600'>
                  <li>• Prepare as user stories com antecedência</li>
                  <li>• Defina critérios de aceitação claros</li>
                  <li>• Compartilhe o contexto com a equipe</li>
                  <li>• Teste a ferramenta previamente</li>
                </ul>
              </div>
              <div>
                <h3 className='mb-2 font-medium text-gray-800'>
                  Durante a sessão:
                </h3>
                <ul className='space-y-1 text-sm text-gray-600'>
                  <li>• Mantenha discussões focadas</li>
                  <li>• Encoraje participação de todos</li>
                  <li>• Documente decisões importantes</li>
                  <li>• Faça pausas quando necessário</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
