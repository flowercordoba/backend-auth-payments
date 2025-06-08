import { PrismaClient } from '@prisma/client';

// Evita múltiples instancias en desarrollo (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Intentar conexión a la base de datos
(async () => {
  try {
    await prisma.$connect();
    console.info('✅ Conectado a la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Detener ejecución si no hay conexión
  }
})();
