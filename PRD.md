# Documento de Requisitos de Produto (PRD)

## Min Poker - Planning Poker Online

### 1. Visão Geral do Produto

**Min Poker** é uma aplicação web de Planning Poker que permite equipes realizarem estimativas ágeis de forma colaborativa e em tempo real. A ferramenta facilita sessões de estimativa distribuídas, onde participantes podem votar em histórias usando cartas de Planning Poker.

### 2. Objetivos do Produto

- **Facilitar estimativas ágeis**: Proporcionar uma plataforma intuitiva para Planning Poker
- **Colaboração em tempo real**: Permitir que equipes distribuídas participem simultaneamente
- **Simplicidade de uso**: Interface limpa e processo de entrada simplificado
- **Flexibilidade**: Suporte a diferentes escalas de estimativa e configurações de sala

### 3. Público-Alvo

- **Primário**: Equipes de desenvolvimento ágil (Scrum Masters, Product Owners, Desenvolvedores)
- **Secundário**: Consultores ágeis, coaches e facilitadores de workshops
- **Terciário**: Estudantes e profissionais aprendendo metodologias ágeis

### 4. Funcionalidades Principais

#### 4.1 Gerenciamento de Salas

- **Criação de salas**: Usuários podem criar salas de Planning Poker com nomes personalizados
- **Entrada por código**: Participantes podem entrar em salas usando códigos únicos
- **Listagem de salas**: Visualização de salas criadas e salas onde o usuário participa
- **Exclusão de salas**: Proprietários podem excluir suas salas

#### 4.2 Gerenciamento de Usuários

- **Identificação automática**: Geração automática de nomes divertidos para novos usuários
- **Persistência local**: Dados do usuário salvos no localStorage
- **Roles diferenciados**: Distinção entre proprietário da sala e participantes

#### 4.3 Sistema de Votação

- **Cartas de Planning Poker**: Interface com cartas padrão (0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕)
- **Votação secreta**: Votos ocultos até revelação
- **Revelação simultânea**: Todos os votos são revelados ao mesmo tempo
- **Múltiplas rodadas**: Suporte a várias rodadas de votação

#### 4.4 Configurações de Sala

- **Escalas personalizáveis**: Diferentes conjuntos de cartas (Fibonacci, T-shirt sizes, etc.)
- **Configurações de votação**: Opções para personalizar o comportamento da votação
- **Renomeação de salas**: Proprietários podem alterar nomes das salas

#### 4.5 Gerenciamento de Participantes

- **Lista de participantes**: Visualização de todos os membros da sala
- **Remoção de participantes**: Proprietários podem remover participantes
- **Status de votação**: Indicação visual de quem já votou

### 5. Funcionalidades Técnicas

#### 5.1 Arquitetura

- **Frontend**: React com TypeScript
- **Estado global**: Context API e hooks personalizados
- **Roteamento**: React Router para navegação
- **Estilização**: Tailwind CSS para UI responsiva

#### 5.2 Persistência de Dados

- **Firebase Realtime Database**: Sincronização em tempo real
- **LocalStorage**: Dados do usuário local
- **Estrutura de dados otimizada**: Para performance e escalabilidade

#### 5.3 Padrões de Arquitetura

- **MVP (Model-View-Presenter)**: Separação clara de responsabilidades
- **Hooks personalizados**: Lógica reutilizável e testável
- **Componentes funcionais**: Abordagem moderna do React

### 6. Fluxos de Usuário

#### 6.1 Fluxo de Criação de Sala

1. Usuário acessa a aplicação
2. Clica em "Criar Nova Sala"
3. Insere nome da sala
4. Sala é criada e usuário se torna proprietário
5. Código da sala é gerado para compartilhamento

#### 6.2 Fluxo de Entrada em Sala

1. Usuário recebe código/link da sala
2. Acessa a aplicação via link ou insere código
3. Confirma entrada na sala
4. É adicionado como participante

#### 6.3 Fluxo de Votação

1. Proprietário inicia nova rodada
2. Participantes selecionam suas cartas
3. Todos confirmam seus votos
4. Proprietário revela os votos
5. Resultados são exibidos para todos
6. Nova rodada pode ser iniciada

### 7. Requisitos Não-Funcionais

#### 7.1 Performance

- **Tempo de resposta**: < 2 segundos para ações principais
- **Sincronização**: Atualizações em tempo real < 500ms
- **Carregamento inicial**: < 3 segundos

#### 7.2 Usabilidade

- **Interface intuitiva**: Aprendizado em < 5 minutos
- **Responsividade**: Funcional em desktop, tablet e mobile
- **Acessibilidade**: Conformidade com WCAG 2.1 AA

#### 7.3 Confiabilidade

- **Disponibilidade**: 99.5% uptime
- **Recuperação de falhas**: Reconexão automática
- **Persistência de dados**: Backup automático no Firebase

#### 7.4 Segurança

- **Validação de entrada**: Sanitização de dados do usuário
- **Controle de acesso**: Verificação de permissões por sala
- **Proteção contra spam**: Rate limiting básico

### 8. Tecnologias Utilizadas

#### 8.1 Frontend

- **React 18**: Framework principal
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de estilização
- **Lucide React**: Biblioteca de ícones

#### 8.2 Backend/Infraestrutura

- **Firebase Realtime Database**: Banco de dados em tempo real
- **Firebase Hosting**: Hospedagem da aplicação
- **Bun**: Runtime e package manager

#### 8.3 Desenvolvimento

- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Git**: Controle de versão
- **Conventional Commits**: Padrão de commits

### 9. Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── Sidebar.tsx     # Navegação lateral
│   ├── RoomHeader.tsx  # Cabeçalho da sala
│   ├── VotingArea.tsx  # Área de votação
│   └── JoinRoomDialog.tsx # Modal de entrada
├── hooks/              # Hooks personalizados
│   ├── useHome.ts      # Lógica da página principal
│   ├── useRoom.ts      # Lógica de sala
│   └── useLocalStorage.ts # Persistência local
├── lib/                # Utilitários e configurações
│   ├── firebase.ts     # Configuração Firebase
│   └── utils.ts        # Funções utilitárias
├── pages/              # Páginas da aplicação
│   └── HomePage.tsx    # Página principal
├── types/              # Definições de tipos
│   └── index.ts        # Tipos TypeScript
└── App.tsx             # Componente raiz
```

### 10. Roadmap de Desenvolvimento

#### 10.1 Fase 1 - MVP (Concluída)

- ✅ Criação e entrada em salas
- ✅ Sistema básico de votação
- ✅ Interface responsiva
- ✅ Sincronização em tempo real

#### 10.2 Fase 2 - Melhorias

- 🔄 Refatoração para padrão MVP
- 📝 Documentação completa
- 🧪 Testes unitários
- 🎨 Melhorias de UI/UX

#### 10.3 Fase 3 - Funcionalidades Avançadas

- 📊 Histórico de votações
- 📈 Analytics básicos
- 🔗 Integração com ferramentas (Jira, Trello)
- 👥 Sistema de usuários persistente

### 11. Métricas de Sucesso

#### 11.1 Métricas de Produto

- **Adoção**: Número de salas criadas por semana
- **Engajamento**: Tempo médio de sessão
- **Retenção**: Usuários que retornam em 7 dias

#### 11.2 Métricas Técnicas

- **Performance**: Tempo de carregamento < 3s
- **Confiabilidade**: Uptime > 99.5%
- **Qualidade**: Cobertura de testes > 80%

### 12. Considerações de Manutenção

#### 12.1 Monitoramento

- **Logs de aplicação**: Rastreamento de erros
- **Métricas de performance**: Tempo de resposta
- **Uso de recursos**: Consumo Firebase

#### 12.2 Atualizações

- **Versionamento semântico**: Releases organizados
- **Deploy contínuo**: Atualizações automáticas
- **Rollback**: Capacidade de reverter mudanças

---

**Versão**: 1.0  
**Data**: Dezembro 2024  
**Autor**: Equipe de Desenvolvimento Min Poker  
**Status**: Ativo
