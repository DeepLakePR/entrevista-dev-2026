# Desafio Tecnico - Desenvolvedor Frontend Junior

**Uncode** - Agencia especializada em e-commerce (Nuvemshop / VNDA)

---

## Sobre o desafio

Construa um **mini e-commerce funcional**. O objetivo e avaliar sua organizacao de codigo, componentizacao, logica de programacao e comunicacao tecnica.

**Prazo:** 5 dias corridos a partir do recebimento.

---

## Requisitos obrigatorios

### Framework (escolha 1)

- Next.js
- Vite + React
- Vite + Vue
- Astro

### Servidor / API

Escolha uma das opcoes abaixo para servir os dados dos produtos:

- Next.js API Routes
- Express
- NestJS
- Fastify
- JSON Server

A API deve ler os dados do arquivo `products.json` fornecido neste repositorio e expor **no minimo** 2 endpoints:

| Endpoint | Descricao |
|----------|-----------|
| `GET /products` | Lista todos os produtos |
| `GET /products/:id` | Retorna um produto pelo ID |

### Paginas e componentes

- **Home** - Listagem de produtos com imagem, nome e preco
- **Pagina de Produto** - Detalhes completos do produto + botao "Adicionar ao carrinho"
- **Header** - Logo da loja + icone do carrinho com quantidade de itens
- **Footer** - Simples, com informacoes basicas

### Minicarrinho (drawer / sidebar)

- Abre ao clicar no icone do carrinho no header
- Lista os produtos adicionados
- Permite alterar quantidade (+/-)
- Permite remover item
- Exibe total atualizado em tempo real

### Responsividade

- **Mobile-first**
- Deve funcionar bem em **375px** (mobile) e **1440px** (desktop)

### Documentacao

Inclua no seu README (ou em um arquivo `DECISIONS.md`) as seguintes secoes:

- Por que escolheu o framework
- Estrutura de pastas do projeto
- Como rodar o projeto localmente
- Decisoes tecnicas relevantes

---

## Diferenciais (nao obrigatorios, somam pontos)

- Integracao com IA (ex: chatbot de recomendacao, busca semantica, descricao gerada por IA)
- Testes (unitarios ou E2E)
- TypeScript
- Gerenciamento de estado (Context API, Zustand, Pinia, etc.)
- Animacoes e transicoes no carrinho
- Filtro ou busca de produtos
- Deploy funcional (Vercel, Netlify, etc.)
- Boas praticas de acessibilidade (a11y)
- SEO basico

---

## Criterios de avaliacao

| Criterio | Peso | O que avaliamos |
|----------|------|-----------------|
| Organizacao e componentizacao | 25% | Estrutura de pastas, separacao de responsabilidades, reuso de componentes |
| CSS e responsividade | 20% | Abordagem mobile-first, consistencia visual, nao exigimos framework CSS especifico |
| Logica do carrinho | 20% | Adicao, remocao, quantidade, total correto, persistencia do estado |
| Servidor / API | 15% | Endpoints funcionais, separacao clara entre client e server |
| Comunicacao tecnica | 10% | README claro, decisoes bem explicadas |
| Diferenciais | 10% | IA, testes, TypeScript, deploy, etc. |

---

## Dados dos produtos

O arquivo `products.json` na raiz deste repositorio contem **10 produtos** prontos para uso. Utilize esses dados na sua API.

Cada produto possui os campos: `id`, `name`, `price`, `description`, `image`, `category` e `stock`.

---

## Entrega

1. Faca um **fork** deste repositorio ou crie um repositorio proprio
2. Desenvolva o projeto
3. Envie o **link do repositorio** por e-mail ou no formulario indicado
4. **Prazo:** 5 dias corridos

---

## Dicas

- Nao se preocupe com perfeicao - queremos ver seu raciocinio e como voce resolve problemas
- **Commits frequentes e descritivos** sao valorizados
- Prefira simplicidade funcional a complexidade quebrada
- Se usar IA como ferramenta de desenvolvimento, mencione no README - transparencia e valorizada
- Em caso de duvidas, documente suas suposicoes no README

---

Boa sorte!
