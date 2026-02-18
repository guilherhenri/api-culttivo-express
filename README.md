<div align="center">

# Express Culttivo

Fast web application built with Express, PostgreSQL, and Redis for high-performance API development with clean architecture patterns.

</div>

<p align="center">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- **pnpm** (recommended) or npm/yarn
- **Docker** and **Docker Compose** for running dependencies
- **Node.js 22+**

### Installation & Running

All commands should be executed from the **root directory** of the project.

**1. Clone the Repository**

```bash
git clone <repository-url>
cd express-culttivo
```

**2. Set Up Environment Variables**

Create a `.env` file in the root directory:

```env
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=culttivo
DATABASE_PORT=5432
REDIS_PORT=6379
```

**3. Start Dependencies (PostgreSQL + Redis)**

```bash
docker compose up -d
```

**4. Install Dependencies & Run Migrations**

```bash
pnpm install
pnpm db:migrate
```

**5. Start the Application**

```bash
pnpm dev
```

🎉 **All done!** The application is now running on http://localhost:3333.

---

## Docker Deployment

**Build the image:**

```bash
docker build -t express-culttivo:latest .
```

**Run the container:**

```bash
docker run -d \
  -e DATABASE_HOST=your-db-host \
  -e DATABASE_USER=postgres \
  -e DATABASE_PASSWORD=your-password \
  -e DATABASE_NAME=culttivo \
  -e DATABASE_PORT=5432 \
  -e REDIS_PORT=6379 \
  -p 3333:3333 \
  express-culttivo:latest
```

---

## API Endpoints

The service provides the following HTTP endpoints:

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `GET` | `/health` | Health check endpoint |
| `POST` | `/api/credit-requests` | Create credit request |
| `GET` | `/api/credit-requests/:id` | Get credit request by ID |
| `GET` | `/api/credit-requests` | List all credit requests |

---

## Tests

There are two types of tests:

- **Unit tests** → Domain logic and use cases
- **Integration tests** → HTTP endpoints with real database

### Available test scripts

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:cov
```

---

## Technical Decisions

### Architecture

**Clean Architecture + DDD**  
The project follows Clean Architecture principles with Domain-Driven Design patterns:

- **Domain Layer**: Entities (business logic)
- **Application Layer**: Use cases and repository interfaces
- **Infrastructure Layer**: Framework-specific implementations (Express, Drizzle ORM, BullMQ)

This separation ensures:

- Business logic is framework-agnostic
- Easy testing with in-memory repositories
- Flexibility to swap implementations

**Queue System with BullMQ**  
Chose BullMQ for background job processing:

- Reliable job processing with Redis
- Job priorities and delays
- Retry mechanisms and error handling
- Dashboard for monitoring

### Database

**Drizzle ORM + PostgreSQL**  
Drizzle ORM provides:

- Type-safe database operations
- SQL-like query builder
- Automatic migrations
- Excellent TypeScript support

**Migration Strategy**  
All schema changes are versioned and tracked via Drizzle migrations, ensuring consistent deployments across environments.

### Caching & Queues

**Redis**  
Redis is used for:

- BullMQ job queue storage
- Application caching layer
- Session storage
- Real-time data synchronization

### Why Express?

Express provides:

- Mature and stable framework
- Extensive middleware ecosystem
- Flexible routing system
- Excellent community support
- Simple and intuitive API

---

## Project Structure

```
src/
├── domain/                    # Business logic
│   ├── application/          # Use cases and interfaces
│   └── enterprise/           # Domain entities
└── infra/                    # Infrastructure implementations
    ├── database/             # Drizzle schema and migrations
    ├── http/                 # HTTP routes and controllers
    ├── services/             # External service integrations
    └── workers/              # Background job processors
```

---

## Available Scripts

### Development

```json
{
  "dev": "Start development server with hot-reload",
  "db:generate": "Generate migration from schema changes",
  "db:migrate": "Apply pending migrations",
  "db:studio": "Open Drizzle Studio for database management"
}
```

### Testing & Quality

```json
{
  "test": "Run unit tests",
  "test:watch": "Run tests in watch mode",
  "test:cov": "Generate test coverage report",
  "check": "Type-check without emitting files",
  "lint": "Fix linting issues automatically",
  "format": "Format code with Prettier"
}
```

### Usage Examples

```bash
# Development workflow
pnpm dev
pnpm db:generate
pnpm db:migrate

# Database management
pnpm db:studio

# Testing
pnpm test:cov
```

---

## Environment Variables

| Variable | Required | Default | Description |
| -------- | -------- | ------- | ----------- |
| `DATABASE_HOST` | Yes | - | PostgreSQL host |
| `DATABASE_USER` | Yes | - | Database user |
| `DATABASE_PASSWORD` | Yes | - | Database password |
| `DATABASE_NAME` | Yes | - | Database name |
| `DATABASE_PORT` | Yes | - | Database port |
| `REDIS_PORT` | No | 6379 | Redis port |

---

## Docker Image

**Multi-stage build** for optimized size and security:

- Base: Node.js 22 Alpine
- Production dependencies only
- Built-in health checks

---

## License

This project is licensed under the ISC License - see the `LICENSE` file for details.
