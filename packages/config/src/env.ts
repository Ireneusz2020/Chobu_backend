export interface ServiceEnv {
  port: number;
  databaseUrl: string;
  rabbitmqUrl: string;
  redisUrl?: string;
}

export const readServiceEnv = (): ServiceEnv => ({
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  rabbitmqUrl: process.env.RABBITMQ_URL ?? '',
  redisUrl: process.env.REDIS_URL,
});
