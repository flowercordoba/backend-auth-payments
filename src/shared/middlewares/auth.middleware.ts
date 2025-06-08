
// Auth middleware 
import { Request, Response, NextFunction } from 'express';

import { FirebaseDecodedToken } from '../types/types';
import admin from '../firebase/admin';

export interface AuthenticatedRequest extends Request {
  firebaseUser?: FirebaseDecodedToken;
}

export const authenticateFirebase = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return; // Salir sin devolver valor para Promise<void>
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = decoded as FirebaseDecodedToken;
    next(); // Continuar cadena middleware
  } catch (error) {
    console.error('Token inválido:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};
