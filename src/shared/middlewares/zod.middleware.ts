import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

// Middleware para validar el cuerpo (body)
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log('req:', req);

    const result = schema.safeParse(req.body);
// console.log('schema.safeParse(req.body):', schema.safeParse(req.body));
// console.log('Validating body with schema:', result);
    if (!result.success) {
      res.status(400).json({
        message: 'Datos inválidos',
        errors: result.error.flatten(),
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

// Middleware para validar parámetros (params)
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        message: 'Parámetros inválidos',
        errors: result.error.flatten(),
      });
      return;
    }

    req.params = result.data;
    next();
  };
};
