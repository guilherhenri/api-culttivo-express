## 📋 TESTE TÉCNICO - Sistema de Análise de Crédito para Produtores

### Contexto do Negócio

A Culttivo precisa de um sistema que receba solicitações de crédito de produtores de café e faça uma análise preliminar baseada em alguns critérios simples. O sistema deve ser assíncrono e permitir consulta do status da análise.

---

## 🎯 O que você vai construir

Uma API REST que gerencia **solicitações de crédito** com processamento assíncrono.

### Funcionalidades Principais

1. **Criar solicitação de crédito** (POST)
   - Recebe dados do produtor e valor solicitado
   - Retorna ID da solicitação e status "PENDING"
   - Envia para processamento assíncrono

2. **Consultar status da solicitação** (GET)
   - Retorna dados da solicitação e resultado da análise

3. **Processamento assíncrono** (Worker/Background)
   - Simula análise de crédito com regras simples
   - Atualiza status para "APPROVED" ou "REJECTED"

---

## 📐 Requisitos Técnicos

### Obrigatórios (o que será avaliado):

✅ **Clean Architecture**

- Separação clara de camadas (domain, application, infrastructure)
- Inversão de dependências

✅ **SOLID**

- Principalmente: SRP, DIP, ISP

✅ **TypeScript**

- Tipagem forte, interfaces bem definidas

✅ **Testes Unitários**

- Pelo menos para camada de domínio/use cases
- Coverage mínimo: 70%

✅ **Mensageria/Fila**

- Pode ser in-memory (Bull, BullMQ) ou Redis
- Processamento assíncrono da análise

✅ **Banco de Dados Relacional**

- PostgreSQL ou SQLite (in-memory para simplicidade)
- Migrations básicas

### Diferenciais (se der tempo):

⭐ Pipeline CI/CD (GitHub Actions)
⭐ Docker/Docker Compose
⭐ Documentação OpenAPI/Swagger
⭐ Logs estruturados

---

## 🗂️ Estrutura de Dados

### Solicitação de Crédito (Credit Request)

```typescript
{
  id: string (UUID)
  producerName: string
  producerDocument: string (CPF/CNPJ)
  farmArea: number (hectares)
  annualRevenue: number (R$)
  requestedAmount: number (R$)
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  rejectionReason?: string
  createdAt: Date
  updatedAt: Date
}
```

---

## 📊 Regras de Negócio (Análise Simples)

A análise deve **REJEITAR** se:

- `requestedAmount > annualRevenue * 0.3` (solicita mais de 30% da receita anual)
- `farmArea < 10` (área muito pequena)
- `requestedAmount < 5000` (valor mínimo)

Caso contrário: **APROVAR**

---

## 🔄 Fluxo Esperado

```
1. POST /credit-requests
   └─> Salva no DB com status PENDING
   └─> Envia mensagem para fila
   └─> Retorna 201 com ID

2. Worker consome fila
   └─> Aplica regras de negócio
   └─> Atualiza status no DB

3. GET /credit-requests/:id
   └─> Retorna status atualizado
```

---

## 🏗️ Sugestão de Arquitetura

```
src/
├── domain/
│   ├── entities/
│   │   └── CreditRequest.ts
│   ├── repositories/
│   │   └── ICreditRequestRepository.ts
│   └── services/
│       └── CreditAnalysisService.ts
├── application/
│   └── usecases/
│       ├── CreateCreditRequest.ts
│       ├── GetCreditRequest.ts
│       └── ProcessCreditAnalysis.ts
├── infrastructure/
│   ├── database/
│   │   ├── migrations/
│   │   └── repositories/
│   │       └── CreditRequestRepository.ts
│   ├── queue/
│   │   ├── QueueAdapter.ts
│   │   └── CreditAnalysisWorker.ts
│   └── http/
│       ├── routes/
│       └── controllers/
└── main.ts
```

---

## 🧪 Exemplos de Testes Esperados

```typescript
// CreditAnalysisService.test.ts
describe("CreditAnalysisService", () => {
  it("should reject when requested amount exceeds 30% of annual revenue", () => {
    // arrange
    const request = {
      requestedAmount: 100000,
      annualRevenue: 200000, // 50%
      farmArea: 50,
    };

    // act
    const result = service.analyze(request);

    // assert
    expect(result.approved).toBe(false);
    expect(result.reason).toContain("receita anual");
  });
});
```

---

## ⏱️ Gestão de Tempo Sugerida (45min)

- **0-5min**: Setup do projeto (Express/Fastify + TypeScript + Jest)
- **5-20min**: Implementar camadas core (domain + use cases)
- **20-30min**: Infrastructure (DB + Queue in-memory)
- **30-40min**: Rotas HTTP + integração
- **40-45min**: Testes básicos + revisão

Se tiver **1h30**:

- Adicionar mais testes
- Docker Compose
- Swagger/documentação
- Melhorias na mensageria

---

## 🎯 O que os Avaliadores Vão Observar

1. ✅ **Separação de responsabilidades** (Clean Arch)
2. ✅ **Inversão de dependências** (interfaces/contratos)
3. ✅ **Qualidade dos testes** (cobertura e clareza)
4. ✅ **Funcionamento da fila** (assincronicidade real)
5. ✅ **Modelagem do domínio** (entidades coesas)
6. ✅ **Código limpo e legível**

---

## 📦 Stack Recomendada

```json
{
  "framework": "Express ou Fastify",
  "orm": "TypeORM, Prisma ou Knex",
  "queue": "Bull ou BullMQ",
  "tests": "Jest",
  "validation": "Zod ou class-validator",
  "database": "PostgreSQL (Docker) ou SQLite"
}
```

---

## 🚀 Como Treinar

### Dia 1-2: Setup + Domain Layer

- Monte a estrutura de pastas
- Implemente entidades e interfaces
- Escreva testes de domínio

### Dia 3-4: Use Cases + Infrastructure

- Implemente os casos de uso
- Configure banco e migrations
- Configure fila in-memory

### Dia 5: HTTP + Integração

- Rotas e controllers
- Integração completa
- Testes end-to-end

### Dia 6-7: Refatoração + Extras

- Melhore testes
- Adicione Docker
- Documente APIs

---

## 💡 Dicas para o Live Coding

- ✅ **Fale enquanto codifica** (explique seu raciocínio)
- ✅ **Comece pelo domínio** (mostre design primeiro)
- ✅ **Use interfaces** (mostre inversão de dependências)
- ✅ **Teste uma camada rapidamente** (prove que funciona)
- ✅ **Mantenha simples** (não complique demais)
- ❌ Não perca tempo com configs complexas
- ❌ Não implemente tudo perfeitamente (priorize)

---

Quer que eu crie um **template inicial do projeto** ou um **guia passo-a-passo detalhado** para você começar a treinar agora?
