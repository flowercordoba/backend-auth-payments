import { Router } from 'express';
import { getUserTransactions } from '../controllers/transaction.controller';

const router = Router();

router.get('/:userId', getUserTransactions);

export default router;
