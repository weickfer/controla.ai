🧠 Controla.ai

Seu assistente financeiro inteligente no WhatsApp.
O Controla.ai substitui planilhas e aplicativos de finanças pessoais por uma conversa simples e intuitiva.
Registre transações, defina limites e receba análises automáticas direto no WhatsApp, com visualização completa em um painel web.

🚀 Visão Geral

O Controla.ai conecta um agente de IA ao WhatsApp para simplificar o controle financeiro pessoal.
O usuário conversa normalmente e a IA entende, classifica e registra os gastos, permitindo acompanhar tudo em um painel visual.

✨ Funcionalidades

💬 Registro de transações por texto ou voz

💰 Despesas recorrentes automáticas

📊 Dashboard web com gráficos e categorias

🔔 Alertas de limite de gasto e resumos semanais/mensais

🤖 Consultas em linguagem natural

🧾 Relatório da Vergonha (feedback divertido sobre gastos)

🧩 Integração com Supabase (PostgreSQL + RLS + pg_cron)

💬 Comunicação via WhatsApp (EvolutionAPI)

🧱 Arquitetura
WhatsApp (usuário)
   │
   ▼
Evolution API → n8n → Agente de IA (GPT-4o-mini)
   │
   ▼
Supabase (PostgreSQL + RLS + pgvector)
   │
   ▼
Painel Web (Vite + React + Tailwind)

🧩 Stack Técnica
| Camada       | Tecnologia                  | Função                               |
| :----------- | :-------------------------- | :----------------------------------- |
| Backend      | Node.js / Go (futuro)       | APIs e automações                    |
| Banco        | Supabase (PostgreSQL + RLS) | Persistência e segurança de dados    |
| Orquestração | n8n                         | Integração entre IA e serviços       |
| Mensageria   | EvolutionAPI                | Envio e recebimento via WhatsApp     |
| Frontend     | React + Tailwind (Vite)     | Interface do painel                  |
| IA           | OpenAI GPT-4o-mini          | Processamento e entendimento natural |


🔒 Segurança

RLS (Row Level Security): cada usuário acessa apenas seus próprios dados

Autenticação via WhatsApp: links dinâmicos com tokens temporários

Validação de Webhooks: assinatura por hash para EvolutionAPI e Mercado Pago

Auditoria: logs de ações e mensagens no Supabase

💬 Exemplo de interação
Usuário: Gastei 25 reais com lanche
IA: *Transação registrada:* R$ 25,00 em Lanches 🍔

Usuário: Quanto eu gastei este mês?
IA: *Resumo:* Você gastou R$ 820,00 este mês, sendo R$ 320,00 em alimentação.

📈 Roadmap

 Registro de transações por voz

 Dashboard com autenticação via WhatsApp

 Despesas recorrentes

 Relatórios automáticos

 Exportação de dados (CSV/PDF)

 Migração do n8n para backend em Node/Go

 Aplicativo PWA

📜 Licença

Distribuído sob a licença MIT.
Sinta-se à vontade para estudar, adaptar e contribuir.
