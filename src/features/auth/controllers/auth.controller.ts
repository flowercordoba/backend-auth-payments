import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      await authService.login(username, password);
      res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
      console.error('[AuthController] Login error:', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      await authService.register(username, password);
      res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
      console.error('[AuthController] Register error:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    try {
      await authService.logout();
      res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
      console.error('[AuthController] Logout error:', error);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    }
  }

  async getUserProfile(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      await authService.getUserProfile(userId);
      res.status(200).json({ message: `Perfil obtenido para ID: ${userId}` });
    } catch (error) {
      console.error('[AuthController] Perfil error:', error);
      res.status(500).json({ message: 'Error al obtener perfil del usuario' });
    }
  }
}
