import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// Middleware genérico para validar el body con Joi
export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.reduce((acc: Record<string, string[]>, curr) => {
        const key = curr.path.join('.');
        if (!acc[key]) acc[key] = [];
        acc[key].push(curr.message);
        return acc;
      }, {});

      res.status(400).json({
        message: 'Datos inválidos',
        errors
      });
      return;
    }

    req.body = value;
    next();
  };
};
