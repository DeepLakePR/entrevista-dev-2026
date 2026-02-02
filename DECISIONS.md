# Link Deploy

## Frameworks e Tecnologias Utilizadas

## Estrutura do Projeto

## Como Rodar Localmente

## Decisões Relevantes

- Usei Chat GPT 5.2 & Codex para ter uma outra percepção acerca das decisões a serem tomadas para o desenvolvimento do projeto
- Uso de Next.JS API Routes para evitar overengineering com NestJS ou Express
- Estrutura de pastas e componentes criados para serem o mais amigáveis e reutilizáveis possível
- Redesign do Header e Footer + Adição de Font Family Poppins para um design mais agradável
- Uso do Codex para implementar o Skeleton Loading na listagem de produtos e na página de detalhes do produto

## Diário do Desenvolvedor - Teste Técnico (Em Ordem Cronológica)

### Sábado 31/01

- (11:30) Pré-Análise do escopo requisitado
- Conversa/Análise com IA (Chat GPT 5.2) para ter um outro ponto de vista da IA e o que ela pensa a respeito dos pontos que eu trouxe a ela
- Decisão de quais frameworks e bibliotecas serão usados
  - Descarte do uso de NestJS OU Express e GraphQL para evitar overengineering
  - Next.JS + ShadCN para o Front-End
  - Next.JS API Routes para entregar o `products.json`
  - Cypress Testes E2E como diferencial
- (12:00) Setup inicial do projeto (instalação de dependências e etc)
- Criação e organização das pastas e demais arquivos de configuração
- (13:20) Correção de problemas de configuração como postcss, shadcn, etc
- (14:15) Desenvolvimento da entrega dos produtos através das rotas `Products/` & `/Products/[id]`
- (17:40) Desenvolvimento da base do Front-End (Header, Footer, Componentes)

### Domingo 01/02

- (13:50) Início do desenvolvimento dos principais componentes como ProductCard, CartItem
- (15:30) Melhorias no Design, deixando mais clean, minimalista e moderno
- (16:30) Página das informações do produto selecionado (Via URL)
- (18:20) Drawer do Carrinho de Compras (CartDrawer & CartItem)
- (21:30) Início do desenvolvimento das lógicas de adicionar ao carrinho, compra, favoritos, etc
- (22:40) Integração do CartProvider e FavoritesProvider no `layout.tsx`
- (23:00) Uso dos Providers/Context nas demais páginas e componentes
