# Link Deploy

## Frameworks e Tecnologias Utilizadas

## Estrutura do Projeto

## Como Rodar Localmente

## Decisões Relevantes

- Usei Chat GPT 5.2 para ter uma outra percepção acerca das decisões a serem tomadas para o desenvolvimento do projeto
- Uso de Next.JS API Routes para evitar overengineering com NestJS ou Express
- Estrutura de pastas e componentes criados para serem o mais amigáveis e reutilizáveis possível

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
