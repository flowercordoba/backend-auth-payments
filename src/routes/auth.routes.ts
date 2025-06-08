import { Router } from 'express';
import { verifyFirebaseToken } from '../controllers/auth.controller';

const router = Router();

router.post('/auth/firebase', verifyFirebaseToken);

export default router;
