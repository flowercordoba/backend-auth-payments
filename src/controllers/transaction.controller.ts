import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware'; // ruta correcta
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserTransactions = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.firebaseUser) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    // Obtén userId desde el token Firebase
    const userId = req.firebaseUser.uid;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
