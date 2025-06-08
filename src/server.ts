// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import authRoutes from './routes/auth.routes';
import stripeRoutes from './routes/stripe.routes';
import transactionRoutes from './routes/transaction.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.use('/api/payments', stripeRoutes);

app.get('/', (_req, res) => {
  res.send('🔥 Backend funcionando Devsaga');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
