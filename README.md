# Uncode Commerce

Mini e-commerce funcional desenvolvido para teste técnico de Frontend, com foco em componentização, organização de código, qualidade de interface e clareza de documentação.

## Link Deploy

- Produção (Vercel): [https://entrevista-dev-2026.vercel.app/](https://entrevista-dev-2026.vercel.app/)

## Frameworks e Tecnologias Utilizadas

### Base do projeto

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**

### UI e experiência

- **Tailwind CSS 4**
- **shadcn/ui** + **Radix UI**
- **Lucide React** (ícones)
- **Poppins** (`next/font/google`)

### Estado e dados

- **Context API** para carrinho e favoritos
- **`localStorage`** para persistência local
- **Next.js API Routes** para servir `products.json`

### Qualidade

- **Cypress** para testes E2E
- **ESLint** para linting
- **SEO técnico** com metadata, `sitemap.xml` e `robots.txt`

## Como Rodar Localmente

### Pré-requisitos

- Node.js 20+ (recomendado para Next.js 16)
- Yarn (ou npm/pnpm)

### Passo a passo

```bash
git clone <url-do-repositorio>
cd entrevista-dev-2026
yarn
yarn dev
```

A aplicação ficará disponível em `http://localhost:3000`.

### Testes e validação

```bash
# Executa os testes E2E no terminal
yarn test:e2e

# Abre o runner interativo do Cypress
yarn cypress:open

# Lint
yarn lint
```

> Observação: os testes E2E usam `baseUrl: http://localhost:3000`.

## Estrutura do Projeto

```text
cypress/                      # Testes E2E e comandos customizados
public/                       # Assets estáticos e script externo do chatbot
src/
  app/
    (shop)/                   # Rotas da loja (home, produto, favoritos)
    api/                      # API Routes (/api/products, /api/products/[id], /api/categories)
    layout.tsx                # Layout raiz + providers + metadata
    robots.ts                 # Regras de indexação
    sitemap.ts                # Mapa de URLs indexáveis
  components/
    cart/                     # Drawer e item do carrinho
    category/                 # Filtro por categoria
    favorites/                # Breadcrumb e componentes auxiliares de favoritos
    pages/                    # Containers de páginas client-side
    product/                  # Card/listagem/filtros de produtos
    shared/                   # Header e Footer
    skeletons/                # Skeleton loading
    ui/                       # Componentes base do shadcn/ui
  context/                    # CartContext e FavoritesContext
  data/                       # products.json (10 produtos)
  features/                   # Regras de negócio isoladas (cart, favorites, products)
  hooks/                      # Hooks de dados e localStorage
  lib/                        # API helpers, SEO, utilitários, storage
  types/                      # Tipos globais da aplicação
DECISIONS.md                  # Registro técnico detalhado de decisões
README.md                     # Visão geral e guia de execução
```

## Decisões Relevantes

- **Next.js full-stack** para concentrar front-end e API no mesmo projeto e simplificar deploy.
- **API Routes** em vez de NestJS/Express para evitar overengineering no escopo do teste.
- **Context API + localStorage** para persistência de carrinho/favoritos sem backend dedicado.
- **Lógica de negócio isolada** em `src/features/*/utils` para reduzir acoplamento com UI.
- **Foco em qualidade de UX** com filtros, busca, ordenação, skeleton loading e responsividade.
- **Transparência no uso de IA**: ChatGPT 5.2 e Codex foram usados como apoio de decisão e refatoração.
- **Cypress como suíte principal** de validação E2E; TestSprite foi usado de forma exploratória.

Para o histórico completo de decisões e trade-offs, consulte: [`DECISIONS.md`](DECISIONS.md).

## Dúvidas e Suposições

- Após o início do projeto, surgiu dúvida sobre o uso de bibliotecas de componentes prontas.
- A suposição adotada foi que **shadcn/ui** seria aceitável no contexto do teste técnico, mantendo:
  - aderência aos requisitos funcionais;
  - consistência visual;
  - produtividade dentro do prazo.

## Funcionalidades Implementadas

- Listagem de produtos com imagem, nome e preço.
- Página de detalhes com estoque, favoritos e ações de compra.
- Carrinho em drawer com incremento/decremento, remoção e total em tempo real.
- Página de favoritos com integração ao carrinho.
- Busca textual, filtro por categoria e ordenação por nome/preço.
- SEO básico e boas práticas de acessibilidade (a11y).
- Integração de chatbot via script externo.
