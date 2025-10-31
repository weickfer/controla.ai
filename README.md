# Controla.ai

Um assistente financeiro inteligente integrado ao WhatsApp.
O Controla.ai substitui planilhas e aplicativos de finanças pessoais, permitindo registrar gastos por texto ou voz, definir limites e acompanhar tudo em um painel web simples e automatizado.

## Aprendizados

Durante o desenvolvimento do Controla.ai, aprendi a **integrar agentes de IA com o WhatsApp** de forma estável usando a **EvolutionAPI**, além de aplicar **Row Level Security (RLS)** no Supabase para garantir segurança em acesso direto ao banco.
Também enfrentei desafios na **autenticação por link dinâmico** (via WhatsApp), e aprimorei o fluxo usando tokens temporários.
Outro aprendizado importante foi a **orquestração de automações com o n8n**, conectando IA, banco de dados e mensageria de forma desacoplada.

## Stack utilizada

**Front-end:** Vite, React, TailwindCSS
**Back-end:** Node.js, n8n, Supabase (PostgreSQL + RLS)
**IA e Mensageria:** OpenAI GPT-4o-mini, EvolutionAPI (WhatsApp)


## Funcionalidades

* 💬 Registro de transações por texto ou voz
* 💰 Controle de despesas e categorias automáticas
* 🔁 Despesas recorrentes
* 📊 Dashboard web com autenticação via WhatsApp
* 🔔 Alertas e relatórios semanais/mensais
* 🤖 Consultas em linguagem natural
* 🧾 Relatório da Vergonha (resumo divertido dos gastos)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
