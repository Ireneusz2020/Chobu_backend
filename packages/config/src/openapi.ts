import { DocumentBuilder } from '@nestjs/swagger';

export const buildOpenApiConfig = () =>
  new DocumentBuilder()
    .setTitle('Chobu API')
    .setDescription('Microservices API contracts for Chobu martial arts school platform.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
