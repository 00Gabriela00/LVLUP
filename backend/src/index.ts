import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { reservationsRouter } from './modules/reservations/router';

import { menuRouter } from './modules/menu/router';
import { authRouter } from './modules/auth/router';
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reservations', reservationsRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);

app.listen(env.PORT, () => {
  console.log(` Server running on port ${env.PORT}`);
});
