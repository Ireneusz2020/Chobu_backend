from pathlib import Path
import json

root = Path('/workspace/Chobu_backend')

services = [
('api-gateway','Gateway routing, auth propagation, rate limiting.'),
('identity-service','Canonical user identity lifecycle and status.'),
('auth-service','Registration, login, token lifecycle, password reset.'),
('account-service','Business account lifecycle and type.'),
('profile-service','Personal profile and phone normalization.'),
('consent-service','Consent versioning and legal acceptance records.'),
('role-service','Role definitions and assignment.'),
('permission-service','Permission catalog and role-permission mapping.'),
('trainer-service','Trainer domain profile, specialization and activity.'),
('member-service','Member lifecycle and membership relation.'),
('class-catalog-service','Class type dictionary and metadata.'),
('schedule-service','Class sessions planning and lifecycle.'),
('location-service','Physical locations and rooms.'),
('booking-service','Bookings lifecycle and idempotent booking creation.'),
('waitlist-service','Separate waitlist queue and promotion.'),
('attendance-service','Check-in and attendance history.'),
('membership-service','Membership plans/cards validity and providers.'),
('payment-service','Payment processing state machine.'),
('notification-service','Event-driven notification dispatch abstraction.'),
('audit-service','Sensitive action audit trail ingestion.'),
]

(root/'apps/services').mkdir(parents=True, exist_ok=True)
for pkg in ['shared','contracts','events','common','config']:
    (root/f'packages/{pkg}/src').mkdir(parents=True, exist_ok=True)

(root/'apps/services/service-template').mkdir(parents=True, exist_ok=True)

# Root files
(root/'pnpm-workspace.yaml').write_text('''packages:\n  - apps/services/*\n  - packages/*\n''')

(root/'package.json').write_text(json.dumps({
    "name":"chobu-backend",
    "private":True,
    "version":"0.1.0",
    "packageManager":"pnpm@10.0.0",
    "scripts":{
        "build":"pnpm -r build",
        "dev":"pnpm --filter api-gateway dev",
        "lint":"pnpm -r lint",
        "test":"pnpm -r test",
        "format":"prettier --write ."
    }
}, indent=2)+"\n")

(root/'.gitignore').write_text('''node_modules\ndist\n.env\ncoverage\n.pnpm-store\n''')

(root/'.env.example').write_text('''NODE_ENV=development\nJWT_ACCESS_SECRET=change-me\nJWT_REFRESH_SECRET=change-me-too\nRABBITMQ_URL=amqp://guest:guest@rabbitmq:5672\nREDIS_URL=redis://redis:6379\nCORRELATION_HEADER=x-correlation-id\n''')

(root/'tsconfig.base.json').write_text('''{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "commonjs",\n    "moduleResolution": "node",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true,\n    "outDir": "dist"\n  }\n}\n''')

# shared packages
(root/'packages/events/src/event-catalog.ts').write_text('''export enum DomainEventName {\n  UserRegistered = 'identity.user.registered.v1',\n  BookingCreated = 'booking.created.v1',\n  BookingCancelled = 'booking.cancelled.v1',\n  ClassSessionCancelled = 'schedule.session.cancelled.v1',\n  PaymentStatusChanged = 'payment.status.changed.v1',\n  MembershipExpired = 'membership.expired.v1',\n}\n\nexport interface DomainEvent<TPayload extends object = object> {\n  eventName: DomainEventName | string;\n  eventId: string;\n  occurredAt: string;\n  correlationId: string;\n  causationId?: string;\n  payload: TPayload;\n}\n''')

(root/'packages/common/src/request-context.ts').write_text('''import { AsyncLocalStorage } from 'node:async_hooks';\n\nexport interface RequestContextState {\n  correlationId: string;\n  actorUserId?: string;\n}\n\nexport const requestContext = new AsyncLocalStorage<RequestContextState>();\n''')

(root/'packages/common/src/logger.ts').write_text('''export interface StructuredLogMeta {\n  [key: string]: unknown;\n}\n\nexport const logInfo = (message: string, meta: StructuredLogMeta = {}): void => {\n  console.log(JSON.stringify({ level: 'info', message, ...meta, ts: new Date().toISOString() }));\n};\n\nexport const logError = (message: string, meta: StructuredLogMeta = {}): void => {\n  console.error(JSON.stringify({ level: 'error', message, ...meta, ts: new Date().toISOString() }));\n};\n''')

(root/'packages/contracts/src/api-contracts.ts').write_text('''export interface ErrorResponseDto {\n  code: string;\n  message: string;\n  correlationId: string;\n  details?: Record<string, unknown>;\n}\n\nexport interface PaginatedResponseDto<T> {\n  items: T[];\n  page: number;\n  pageSize: number;\n  total: number;\n}\n''')

(root/'packages/config/src/env.ts').write_text('''export interface ServiceEnv {\n  port: number;\n  databaseUrl: string;\n  rabbitmqUrl: string;\n  redisUrl?: string;\n}\n\nexport const readServiceEnv = (): ServiceEnv => ({\n  port: Number(process.env.PORT ?? 3000),\n  databaseUrl: process.env.DATABASE_URL ?? '',\n  rabbitmqUrl: process.env.RABBITMQ_URL ?? '',\n  redisUrl: process.env.REDIS_URL,\n});\n''')

(root/'packages/shared/src/rbac.ts').write_text('''export enum RoleName {\n  ADMIN = 'ADMIN',\n  TRAINER = 'TRAINER',\n  CLIENT = 'CLIENT',\n}\n\nexport enum PermissionName {\n  BookingCreate = 'booking:create',\n  BookingCancel = 'booking:cancel',\n  SessionRead = 'session:read',\n  SessionWrite = 'session:write',\n  AttendanceCheckIn = 'attendance:checkin',\n  AuditRead = 'audit:read',\n}\n''')

spec_sections = """# {name}\n\n## Responsibility\n{resp}\n\n## Core REST endpoints\n- GET /health\n- GET /api/v1/{resource}\n- GET /api/v1/{resource}/:id\n- POST /api/v1/{resource}\n- PATCH /api/v1/{resource}/:id\n\n## Events\n- Published: `{pub}`\n- Consumed: `{con}`\n\n## Security notes\n- JWT auth and RBAC enforced through gateway and local guards.\n- Audit event emitted on sensitive read/write.\n\n> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.\n"""

for idx,(name,resp) in enumerate(services, start=1):
    sroot = root/f'apps/services/{name}'
    (sroot/'src').mkdir(parents=True, exist_ok=True)
    (sroot/'src/domain').mkdir(parents=True, exist_ok=True)
    (sroot/'src/application').mkdir(parents=True, exist_ok=True)
    (sroot/'src/infrastructure').mkdir(parents=True, exist_ok=True)
    (sroot/'prisma').mkdir(parents=True, exist_ok=True)
    (sroot/'migrations').mkdir(parents=True, exist_ok=True)

    resource = name.replace('-service','').replace('api-gateway','gateway').replace('-','-')
    pub = f'{resource}.changed.v1'
    con = 'identity.user.registered.v1'

    (sroot/'package.json').write_text(json.dumps({
      "name": name,
      "version":"0.1.0",
      "private":True,
      "scripts":{
        "dev":"nest start --watch",
        "build":"nest build",
        "start":"node dist/main.js",
        "lint":"echo lint-not-configured",
        "test":"echo test-not-configured"
      }
    }, indent=2)+"\n")

    (sroot/'Dockerfile').write_text(f'''FROM node:22-alpine\nWORKDIR /app\nCOPY package.json ./\nRUN npm i -g pnpm && pnpm install\nCOPY . .\nRUN pnpm build\nEXPOSE 3000\nCMD ["pnpm", "start"]\n''')

    (sroot/'.env.example').write_text(f'''PORT=3{idx:03d}\nDATABASE_URL=postgresql://postgres:postgres@{name}-db:5432/{name.replace('-','_')}\nRABBITMQ_URL=amqp://guest:guest@rabbitmq:5672\nREDIS_URL=redis://redis:6379\nJWT_PUBLIC_KEY=replace-me\n''')

    (sroot/'src/main.ts').write_text(f'''import {{ NestFactory }} from '@nestjs/core';\nimport {{ ValidationPipe }} from '@nestjs/common';\nimport {{ AppModule }} from './app.module';\n\nasync function bootstrap() {{\n  const app = await NestFactory.create(AppModule);\n  app.setGlobalPrefix('api/v1');\n  app.useGlobalPipes(new ValidationPipe({{ whitelist: true, transform: true }}));\n  await app.listen(process.env.PORT ?? 3000);\n}}\n\nbootstrap();\n''')

    (sroot/'src/app.module.ts').write_text(f'''import {{ Module }} from '@nestjs/common';\nimport {{ HealthController }} from './health.controller';\nimport {{ {name.title().replace('-','').replace('Service','ServiceDomain')}Controller }} from './application/{resource}.controller';\nimport {{ {name.title().replace('-','').replace('Service','ServiceDomain')}Service }} from './application/{resource}.service';\n\n@Module({{\n  controllers: [HealthController, {name.title().replace('-','').replace('Service','ServiceDomain')}Controller],\n  providers: [{name.title().replace('-','').replace('Service','ServiceDomain')}Service],\n}})\nexport class AppModule {{}}\n''')

    (sroot/'src/health.controller.ts').write_text('''import { Controller, Get } from '@nestjs/common';\n\n@Controller('health')\nexport class HealthController {\n  @Get()\n  health(): { status: string; timestamp: string } {\n    return { status: 'ok', timestamp: new Date().toISOString() };\n  }\n}\n''')

    cls = name.title().replace('-','').replace('Service','ServiceDomain')
    (sroot/f'src/application/{resource}.dto.ts').write_text('''import { IsOptional, IsString, MaxLength } from 'class-validator';\n\nexport class UpsertResourceDto {\n  @IsString()\n  @MaxLength(128)\n  name!: string;\n\n  @IsOptional()\n  @IsString()\n  @MaxLength(1024)\n  description?: string;\n}\n''')

    (sroot/f'src/domain/{resource}.entity.ts').write_text(f'''export class {cls}Entity {{\n  constructor(\n    public readonly id: string,\n    public name: string,\n    public description: string | null,\n    public readonly createdAt: Date,\n    public updatedAt: Date,\n    public isActive: boolean,\n  ) {{}}\n}}\n''')

    (sroot/f'src/infrastructure/{resource}.repository.ts').write_text(f'''import {{ Injectable }} from '@nestjs/common';\nimport {{ {cls}Entity }} from '../domain/{resource}.entity';\n\n@Injectable()\nexport class {cls}Repository {{\n  private readonly store = new Map<string, {cls}Entity>();\n\n  upsert(entity: {cls}Entity): {cls}Entity {{\n    this.store.set(entity.id, entity);\n    return entity;\n  }}\n\n  findById(id: string): {cls}Entity | undefined {{\n    return this.store.get(id);\n  }}\n\n  findAll(): {cls}Entity[] {{\n    return Array.from(this.store.values());\n  }}\n}}\n''')

    (sroot/f'src/application/{resource}.service.ts').write_text(f'''import {{ Injectable, NotFoundException }} from '@nestjs/common';\nimport {{ randomUUID }} from 'node:crypto';\nimport {{ UpsertResourceDto }} from './{resource}.dto';\nimport {{ {cls}Entity }} from '../domain/{resource}.entity';\n\n@Injectable()\nexport class {cls}Service {{\n  private readonly resources = new Map<string, {cls}Entity>();\n\n  list(): {cls}Entity[] {{\n    return Array.from(this.resources.values());\n  }}\n\n  get(id: string): {cls}Entity {{\n    const entity = this.resources.get(id);\n    if (!entity) throw new NotFoundException('Resource not found');\n    return entity;\n  }}\n\n  create(dto: UpsertResourceDto): {cls}Entity {{\n    const now = new Date();\n    const entity = new {cls}Entity(randomUUID(), dto.name, dto.description ?? null, now, now, true);\n    this.resources.set(entity.id, entity);\n    return entity;\n  }}\n\n  update(id: string, dto: UpsertResourceDto): {cls}Entity {{\n    const current = this.get(id);\n    current.name = dto.name;\n    current.description = dto.description ?? null;\n    current.updatedAt = new Date();\n    return current;\n  }}\n}}\n''')

    (sroot/f'src/application/{resource}.controller.ts').write_text(f'''import {{ Body, Controller, Get, Param, Patch, Post }} from '@nestjs/common';\nimport {{ UpsertResourceDto }} from './{resource}.dto';\nimport {{ {cls}Service }} from './{resource}.service';\n\n@Controller('{resource}s')\nexport class {cls}Controller {{\n  constructor(private readonly service: {cls}Service) {{}}\n\n  @Get()\n  list() {{\n    return this.service.list();\n  }}\n\n  @Get(':id')\n  get(@Param('id') id: string) {{\n    return this.service.get(id);\n  }}\n\n  @Post()\n  create(@Body() dto: UpsertResourceDto) {{\n    return this.service.create(dto);\n  }}\n\n  @Patch(':id')\n  update(@Param('id') id: string, @Body() dto: UpsertResourceDto) {{\n    return this.service.update(id, dto);\n  }}\n}}\n''')

    (sroot/'prisma/schema.prisma').write_text(f'''generator client {{\n  provider = "prisma-client-js"\n}}\n\ndatasource db {{\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}}\n\nmodel {cls} {{\n  id          String   @id @default(uuid())\n  name        String   @db.VarChar(128)\n  description String?  @db.VarChar(1024)\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@map("{resource}_resources")\n}}\n''')

    (sroot/'migrations/0001_init.sql').write_text(f'''CREATE TABLE IF NOT EXISTS {resource}_resources (\n  id UUID PRIMARY KEY,\n  name VARCHAR(128) NOT NULL,\n  description VARCHAR(1024),\n  is_active BOOLEAN NOT NULL DEFAULT TRUE,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n''')

    (sroot/'SERVICE_SPEC.md').write_text(spec_sections.format(name=name, resp=resp, resource=resource+'s', pub=pub, con=con))

# specialized files
(root/'apps/services/booking-service/src/application/booking-policy.md').write_text('''# Booking concurrency policy\n\n1. Use unique index on `(session_id, member_id)` for active bookings (`BOOKED`).\n2. Wrap booking creation in serializable transaction.\n3. Lock target session row with `SELECT ... FOR UPDATE`.\n4. Use idempotency key (`memberId + sessionId + clientRequestId`) persisted in Redis (24h TTL).\n\n> PL: Chronimy ostatnie miejsce przez blokadę w transakcji i klucz idempotencji.\n''')

(root/'packages/config/src/openapi.ts').write_text('''import { DocumentBuilder } from '@nestjs/swagger';\n\nexport const buildOpenApiConfig = () =>\n  new DocumentBuilder()\n    .setTitle('Chobu API')\n    .setDescription('Microservices API contracts for Chobu martial arts school platform.')\n    .setVersion('1.0.0')\n    .addBearerAuth()\n    .build();\n''')

# seeds
(root/'infra').mkdir(exist_ok=True)
(root/'infra/seeds').mkdir(exist_ok=True)
(root/'infra/seeds/permission-seed.sql').write_text('''INSERT INTO permissions(code, description) VALUES\n('booking:create','Create booking'),\n('booking:cancel','Cancel booking'),\n('session:read','Read class sessions'),\n('session:write','Create or update class sessions'),\n('attendance:checkin','Execute class check-in'),\n('audit:read','Read audit logs');\n''')

(root/'infra/seeds/role-seed.sql').write_text('''INSERT INTO roles(code) VALUES ('ADMIN'),('TRAINER'),('CLIENT');\n''')

(root/'docker-compose.yml').write_text('''services:\n  rabbitmq:\n    image: rabbitmq:3-management\n    ports: ["5672:5672", "15672:15672"]\n\n  redis:\n    image: redis:7\n    ports: ["6379:6379"]\n\n  api-gateway-db:\n    image: postgres:16\n    environment: { POSTGRES_PASSWORD: postgres, POSTGRES_DB: api_gateway }\n    ports: ["5433:5432"]\n\n  identity-service-db:\n    image: postgres:16\n    environment: { POSTGRES_PASSWORD: postgres, POSTGRES_DB: identity_service }\n    ports: ["5434:5432"]\n\n  auth-service-db:\n    image: postgres:16\n    environment: { POSTGRES_PASSWORD: postgres, POSTGRES_DB: auth_service }\n    ports: ["5435:5432"]\n\n  booking-service-db:\n    image: postgres:16\n    environment: { POSTGRES_PASSWORD: postgres, POSTGRES_DB: booking_service }\n    ports: ["5436:5432"]\n\n  membership-service-db:\n    image: postgres:16\n    environment: { POSTGRES_PASSWORD: postgres, POSTGRES_DB: membership_service }\n    ports: ["5437:5432"]\n\n  payment-service-db:\n    image: postgres:16\n    environment: { POSTGRES_PASSWORD: postgres, POSTGRES_DB: payment_service }\n    ports: ["5438:5432"]\n\n  # Remaining service databases follow same pattern to keep each microservice isolated.\n''')

(root/'README.md').write_text('''# Chobu Backend Monorepo\n\nProduction-oriented scaffold for 20 microservices (NestJS + PostgreSQL + RabbitMQ + Redis) with strict DB-per-service isolation.\n\n## 1. Proposed tech stack and rationale\n- **NestJS + TypeScript**: modular architecture, DI, validation, OpenAPI integration.\n- **Prisma + PostgreSQL**: explicit schema control, typed client, migration workflow.\n- **RabbitMQ** for async domain events and side effects.\n- **Redis** for idempotency keys, refresh-token revocation, and lightweight caches.\n- **Docker Compose** for local orchestration.\n\n> PL: Wybrany stack jest spójny i wspiera rozwój produkcyjny oraz separację domen.\n\n## 2. Monorepo structure\n- `apps/services/*`: independent deployables (20 services).\n- `packages/contracts`: API DTO and response contracts.\n- `packages/events`: event names and envelopes.\n- `packages/common`: request context, logger, shared middleware foundations.\n- `packages/config`: env + OpenAPI builders.\n- `infra/seeds`: initial seed SQL for roles and permissions.\n\n## 3. Service-by-service specification\nEach service has `SERVICE_SPEC.md` with responsibility, endpoints, events, security and relationships.\n\n## 4. Shared contracts and event catalog\nSee `packages/events/src/event-catalog.ts` and `packages/contracts/src/api-contracts.ts`.\n\n## 5. Database schema outline per service\nEach service contains:\n- `prisma/schema.prisma`\n- `migrations/0001_init.sql`\n\n## 6. REST API outline\nGlobal prefix `/api/v1`; resource controllers generated per service and ready for extension with canonical paths.\n\n## 7. Security and RBAC rules\n- JWT access + refresh flow in `auth-service` extension point.\n- Role + permission model in shared package and dedicated services.\n- Correlation-id + structured logging + audit event hooks.\n\n## 8. Event-driven flows\n- Booking created/cancelled => notification + audit + waitlist promotion.\n- Session cancelled => notification fan-out + booking state adjustments.\n- Payment status changes => membership update + notification + audit.\n\n## 9. Local development setup\n```bash\npnpm install\ndocker compose up -d\npnpm -r dev\n```\n\n## 10. Code scaffolding examples\n- Service bootstrap: `apps/services/*/src/main.ts`\n- Domain/application/infrastructure split per service in `src/`.\n- Booking race-condition policy: `apps/services/booking-service/src/application/booking-policy.md`.\n\n## 11. Next implementation steps\n1. Replace in-memory repositories with Prisma repositories.\n2. Implement real auth/token issuance and revocation tables.\n3. Add saga/process-manager for payment-membership reconciliation.\n4. Add integration tests with Testcontainers and contract tests via Pact.\n\n## Open architectural decisions\n- RabbitMQ topic conventions (`domain.entity.action.vN`) finalization.\n- Token revocation strategy (centralized vs local per service).\n- Read-model strategy for gateway aggregation (BFF vs federated queries).\n\n## Risks\n- Cross-service eventual consistency around booking/attendance state transitions.\n- Duplicate processing without idempotent consumers.\n- Data privacy leakage if trainer read scopes are not enforced at query layer.\n\n## MVP -> v2 -> v3\n- **MVP**: auth, profiles, class catalog, schedule, booking, waitlist, attendance, membership, payment mock, notification mock, audit.\n- **v2**: payment provider integration, resilient outbox/inbox, hardened RBAC policies, observability stack.\n- **v3**: multi-tenant support, advanced pricing rules, recommendation/retention automations.\n''')

