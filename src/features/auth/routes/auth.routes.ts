import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../validators/auth.validators';
import { validateBody } from '../../../shared/middlewares/joi.middleware';

const router = Router();
const controller = new AuthController();

router.post('/login', validateBody(loginSchema), controller.login.bind(controller));
router.post('/register', validateBody(registerSchema), controller.register.bind(controller));
router.post('/logout', controller.logout.bind(controller));
router.get('/profile/:id', controller.getUserProfile.bind(controller));

export const authRoutes = router;
