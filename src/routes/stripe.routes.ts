import { Router } from 'express';
import { createCheckout, stripeWebhook } from '../controllers/stripe.controller';
import bodyParser from 'body-parser';

const router = Router();

router.post('/checkout', createCheckout);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

export default router;
