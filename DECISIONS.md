# Link Deploy

**Deploy Vercel** <https://entrevista-dev-2026.vercel.app/>

## Frameworks e Tecnologias Utilizadas

- Next.JS + Tailwind CSS + ShadCN
- Cypress
- Pequenos testes com TestSprite

## Como Rodar Localmente

1. Clone/Fork o repositório
2. Rode o comando `yarn` (ou gerenciador de pacote de sua preferência) na raiz do projeto
3. Em seguida, rode `yarn dev` para rodar localmente
4. Caso queira rodar a bateria de testes, rode `yarn test:e2e`

## Estrutura do Projeto

```md
 cypress/                         # Testes E2E 
 src/                             # Source 
    app/                          # Aplicação, API e demais rotas 
        (shop)/                   # Grupo de rotas focado para o e-Commerce do site 
        api/                      # Next.JS API Routes para servir o `products.json` 
    components/                   # Componentes reutilizáveis 
        cart/                     # CartDrawer (Container) e CartItem adicionado dentro do Drawer 
        category/                 # Container que lista as categorias e filtra ao selecionar 
        product/                  # Card mostrando informações do produto 
        shared/                   # Header & Footer 
        skeletons/                # Skeletons Loadings da Home & Product Page 
        ui/                       # ShadCn Components 
    context/                      # CartContext & FavoritesContext passados no `layout.tsx` do `srcapp/` 
    data/                         # `products.json` Listando os 10 produtos 
    hooks/                        # uso do localStorage pelos Contexts e chamadas Fetch da API através do `useProduct(s).ts` 
    lib/                          # Helper do ShadCn e Format Price convertendo para BRL (R$ 00,00) 
        api/                      # Chamadas Fetch para a API com opção de fetchProducts & fetchProductsById 
        server/                   # Lê `products.json` e retorna um Array de Produtos 
    types/                        # Demais types usados por toda a aplicação 
```

## Decisões Relevantes

- Usei Chat GPT 5.2 & Codex para ter uma outra percepção acerca das decisões a serem tomadas para o desenvolvimento do projeto
- Uso de Next.JS API Routes para evitar overengineering com NestJS ou Express
- Estrutura de pastas e componentes criados para serem o mais amigáveis e reutilizáveis possível
- Redesign do Header e Footer + Adição de Font Family Poppins para um design mais agradável
- Uso do Codex para implementar o Skeleton Loading na listagem de produtos e na página de detalhes do produto
- Refatoração e Revisão usando Codex para melhorar o que já foi feito
- Optei por desenvolver algumas das funcionalidades "finais/cereja do bolo" usando o Codex, com prompt bem descritivo e tendo a noção do que precisa ser feito. O meu objetivo é entregar o teste 1 dia antes do prazo final.
- Tentei rodar alguns testes com TestSprite MCP Server porém preferi dar mais ênfase ao Cypress

## Dúvidas e Suposições

- Depois de ter iniciado o projeto e construído a base dele, fiquei em dúvida se era permitido usar bibliotecas externas de componentes já prontos, eu usei o ShadCN para ajudar e como eu já tinha iniciado o projeto, eu não teria tempo para refazê-lo do 0, então prossegui com o desenvolvimento com a suposição de que seria permitido usar outras bibliotecas como ShadCN já que raramente componentes extensos e complexos são criados do início

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
- (23:30) Test Deploy para checar se está tudo ok em ambiente de produção

### Segunda-Feira 02/02

- (10:30) Melhorias visuais no breadcrumb da página de produto
- (11:20) Refatoração completa do projeto usando Codex para refinamentos (Sem alterar o comportamento/lógica principal)

### Terça-Feira 03/02

- (14:00) Refinamentos e melhorias finais (Busca/Filtro)
- (16:30) Página de favoritos/favoritados
- (17:40) SEO & Acessibilidade (a11y)
- (19:50) Melhorias e pequenos acabamentos (Remove Filter, Remove Cart Item, Responsive)
- (20:25) Bateria de Testes E2E com Cypress
- (22:00) ChatBot criado com ChatBase via Javascript externo
- (22:40) Finalização e refatoração do DECISIONS.md
