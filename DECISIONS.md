# DECISIONS.md

Documento de decisões técnicas, trade-offs e histórico de desenvolvimento do projeto.

## Contexto do desafio

- Construir um mini e-commerce funcional com foco em organização de código, componentização, lógica e comunicação técnica.
- Prazo curto (5 dias corridos), priorizando entrega estável e com boa experiência.
- Objetivo de entrega pessoal: finalizar com antecedência de 1 dia para reduzir risco de última hora.

## Resumo da solução entregue

- Front-end em **Next.js (App Router)** com **TypeScript**, **Tailwind CSS** e **shadcn/ui**.
- API interna via **Next.js API Routes**, lendo dados locais de `products.json`.
- Fluxos principais implementados:
  - Listagem de produtos;
  - Página de produto;
  - Carrinho em drawer com quantidade, remoção e total em tempo real;
  - Favoritos;
  - Busca, filtro por categoria e ordenação.
- Diferenciais aplicados:
  - Testes E2E com Cypress;
  - SEO técnico (metadata, sitemap e robots);
  - Melhorias de acessibilidade (labels, `aria-*`, navegação semântica);
  - Skeleton loading;
  - Chatbot com script externo (Chatbase).

## Registro de decisões técnicas (ADR simplificado)

| ID | Decisão | Motivo | Impacto |
| --- | --- | --- | --- |
| D-01 | Usar Next.js (App Router) | Unificar front-end + API no mesmo projeto e acelerar entrega | Menos overhead de infraestrutura e deploy simples na Vercel |
| D-02 | Servir dados com API Routes | Evitar overengineering com NestJS/Express para escopo do teste | Endpoints simples, manutenção rápida |
| D-03 | Estado com Context API + `localStorage` | Carrinho/favoritos precisam persistir sem backend real | Persistência por navegador; não sincroniza entre dispositivos |
| D-04 | Separar regras em `features/*/utils` | Isolar lógica de negócio de componentes visuais | Código mais testável e reutilizável |
| D-05 | UI com Tailwind + shadcn/ui + Radix | Ganhar velocidade com base sólida de componentes acessíveis | Padronização visual e menor retrabalho |
| D-06 | Priorizar Cypress em vez de ampliar TestSprite | Garantir validação ponta a ponta dos fluxos críticos | Cobertura E2E prática para os requisitos principais |
| D-07 | Implementar SEO e a11y já no escopo inicial | Melhorar qualidade geral além do mínimo obrigatório | Metadata dinâmica, sitemap, robots e melhor usabilidade |
| D-08 | Adicionar chatbot externo | Diferencial de integração com IA no projeto | Dependência de script third-party |
| D-09 | Uso assistido de IA (ChatGPT 5.2 e Codex) | Acelerar decisões e refinamentos em prazo curto | Transparência no processo, mantendo revisão crítica humana |

## Dúvidas e suposições

- **Dúvida principal:** após iniciar a implementação, surgiu incerteza sobre o uso de bibliotecas de componentes prontas.
- **Suposição adotada:** uso de shadcn/ui foi considerado válido para o desafio, pois:
  - não altera os requisitos funcionais;
  - melhora produtividade e consistência visual;
  - representa prática comum em projetos reais com prazo limitado.

## Riscos e limitações conhecidas

- Persistência local depende de `localStorage` (sem autenticação e sem sync entre sessões/dispositivos).
- API baseada em arquivo estático (`products.json`) sem camada de banco.
- Cobertura focada em E2E; não há suíte robusta de testes unitários.

## Diário do desenvolvedor (ordem cronológica)

### 2026-01-31 (Sábado)

- (11:30) Pré-análise do escopo requisitado.
- Conversa/análise com IA (ChatGPT 5.2) para validar caminhos de implementação.
- Decisão de stack:
  - descarte de NestJS/Express/GraphQL para evitar overengineering;
  - Next.js + shadcn/ui no front-end;
  - API Routes para servir `products.json`;
  - Cypress como diferencial de qualidade.
- (12:00) Setup inicial do projeto (dependências e configuração).
- Estruturação de pastas e arquivos-base.
- (13:20) Correções de configuração (PostCSS, shadcn, etc.).
- (14:15) Desenvolvimento das rotas de produto (`/products` e `/products/[id]`).
- (17:40) Base de UI (Header, Footer e componentes principais).

### 2026-02-01 (Domingo)

- (13:50) Desenvolvimento de componentes centrais (`ProductCard`, `CartItem`).
- (15:30) Melhorias visuais para interface mais clean e moderna.
- (16:30) Página de detalhes do produto por URL.
- (18:20) Drawer do carrinho (`CartDrawer` + `CartItem`).
- (21:30) Lógicas de carrinho, compra e favoritos.
- (22:40) Integração de `CartProvider` e `FavoritesProvider` no `layout.tsx`.
- (23:00) Uso de context nas páginas e componentes.
- (23:30) Teste de deploy em produção.

### 2026-02-02 (Segunda-feira)

- (10:30) Melhorias no breadcrumb da página de produto.
- (11:20) Refatoração geral com suporte do Codex (sem alterar comportamento principal).

### 2026-02-03 (Terça-feira)

- (14:00) Refinamentos finais de busca/filtro.
- (16:30) Página de favoritos.
- (17:40) SEO e acessibilidade (a11y).
- (19:50) Acabamentos finais (remoção de filtro, remoção de item do carrinho, responsividade).
- (20:25) Execução da bateria E2E com Cypress.
- (22:00) Integração do chatbot com JavaScript externo (Chatbase).
- (22:40) Finalização e revisão da documentação.
