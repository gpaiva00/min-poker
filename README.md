# minPoker - Planning Poker App

Um aplicativo web de Planning Poker baseado na sequência de Fibonacci, com interface inspirada no WhatsApp Web.

## 🚀 Funcionalidades

- ✅ Sistema de votação com sequência de Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55, 89)
- ✅ Votação anônima até revelação dos resultados
- ✅ Revelação automática ou manual dos votos
- ✅ Contagem regressiva visual para criar expectativa
- ✅ Criação de até 3 salas simultâneas por usuário
- ✅ Links únicos de convite para cada sala
- ✅ Interface inspirada no WhatsApp Web
- ✅ Gerenciamento de participantes (apenas para donos)
- ✅ Persistência local com localStorage
- ✅ Design responsivo e moderno

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **React Router** - Roteamento
- **Firebase** - Configurado para persistência (opcional)

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- Yarn (recomendado) ou npm

### Passos para rodar localmente

1. **Clone o repositório** (se aplicável) ou navegue até o diretório do projeto:
   ```bash
   cd new-min-poker
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

4. **Acesse o aplicativo:**
   Abra seu navegador e vá para `http://localhost:5173`

### Scripts Disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn build` - Gera build de produção
- `yarn preview` - Visualiza o build de produção
- `yarn lint` - Executa o linter

## 🎮 Como Usar

### Criando uma Sala

1. Na barra lateral esquerda, clique em "Nova Sala"
2. Digite um nome para sua sala
3. Clique em "Criar Sala"
4. Você será automaticamente direcionado para a nova sala

### Convidando Participantes

1. Na sala criada, clique em "Copiar Link" no cabeçalho
2. Compartilhe o link com outros participantes
3. Quando acessarem o link, eles poderão inserir seus nomes e entrar

### Votando

1. O dono da sala deve clicar em "Iniciar Votação"
2. Todos os participantes verão os botões com valores da sequência de Fibonacci
3. Cada participante clica no valor desejado
4. Os votos ficam ocultos até que todos votem
5. Após todos votarem:
   - **Modo Automático**: Votos são revelados após 3 segundos (configurável)
   - **Modo Manual**: O dono decide quando revelar

### Configurações da Sala

O dono da sala pode:
- Renomear a sala (clique no ícone de edição ao lado do nome)
- Configurar revelação automática/manual
- Ajustar o tempo de delay para revelação
- Remover participantes
- Iniciar novas rodadas

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Button, Input, Dialog)
│   ├── Sidebar.tsx     # Barra lateral com lista de salas
│   ├── RoomHeader.tsx  # Cabeçalho da sala com participantes
│   ├── VotingArea.tsx  # Área principal de votação
│   └── JoinRoomDialog.tsx # Modal para entrar em sala
├── hooks/              # Hooks customizados
│   └── useLocalStorage.ts
├── lib/                # Utilitários e configurações
│   ├── utils.ts        # Funções auxiliares
│   └── firebase.ts     # Configuração Firebase (opcional)
├── pages/              # Páginas da aplicação
│   └── HomePage.tsx    # Página principal
├── types/              # Definições de tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente raiz
├── main.tsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🔧 Configuração do Firebase (Opcional)

Para habilitar sincronização em tempo real:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Configure o Firestore Database
3. Substitua as configurações em `src/lib/firebase.ts` pelas suas credenciais
4. Implemente os hooks de sincronização nos componentes

## 🎨 Personalização

### Cores e Tema

As cores podem ser personalizadas no arquivo `src/index.css` através das variáveis CSS:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... outras variáveis */
}
```

### Sequência de Fibonacci

Para alterar os valores disponíveis para votação, edite a constante em `src/lib/utils.ts`:

```typescript
export const FIBONACCI_SEQUENCE = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
```

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona bem em:
- Desktop (1200px+)
- Tablet (768px - 1199px)  
- Mobile (320px - 767px)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ usando React + TypeScript + TailwindCSS
