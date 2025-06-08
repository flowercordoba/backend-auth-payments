
// transaction.routes.ts
import { Router } from 'express';
import { getUserTransactions } from '../controllers/transaction.controller';
import { authenticateFirebase } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:userId', authenticateFirebase, getUserTransactions);


export default router;
