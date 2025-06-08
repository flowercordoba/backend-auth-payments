// stripe.controller.ts
import { Request, Response } from 'express';
import stripe from '../services/stripe.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCheckout = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount * 100, // en centavos
          product_data: {
            name: 'Depósito a LatinCoins',
          },
        },
        quantity: 1,
      },
    ],
    metadata: { userId },
    success_url: 'https://tusitio.com/success',
    cancel_url: 'https://tusitio.com/cancel',
  });

  res.json({ url: session.url });
};
export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature']!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook error', err);
    return res.status(400).send(`Webhook Error`) as any;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const userId = session.metadata.userId;

    await prisma.transaction.create({
      data: {
        userId,
        amount: session.amount_total / 100,
        type: 'deposit',
      },
    });
  }

  res.status(200).send('Webhook received');
};
