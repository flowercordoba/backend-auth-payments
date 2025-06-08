import Joi from 'joi';

// Validador para login
export const loginSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': 'El nombre de usuario debe ser texto',
    'string.empty': 'El nombre de usuario es obligatorio',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
    'any.required': 'El nombre de usuario es obligatorio'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'La contraseña debe ser texto',
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
});

// Validador para registro (igual que login en este caso)
export const registerSchema = loginSchema;
