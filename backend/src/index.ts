import path from 'path';
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { configureSecurityHeaders, corsOptions, apiRateLimiter } from './core/security';
import { sanitizeInputs } from './core/sanitizer';
import { errorHandler } from './core/middlewares';
import { authRouter } from './modules/auth/router';
import { menuRouter } from './modules/menu/router';
import { promosRouter } from './modules/promos/router';
import { gamingRouter } from './modules/gaming/router';
import { businessRouter } from './modules/business/router';
import { uploadRouter } from './modules/upload/uploadRouter';

const app = express();

// archivos estaticos
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  maxAge: '30d',
  immutable: true,
}));

// cabeceras de seguridad
app.use(configureSecurityHeaders);

// configuracion cors
app.use(cors(corsOptions));

// limite de peticiones
app.use(apiRateLimiter);

// parseo de json y sanitizacion
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(sanitizeInputs);

// estado de la api
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LVLUP Game Bar API',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// rutas
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/promos', promosRouter);
app.use('/api/gaming', gamingRouter);
app.use('/api/business', businessRouter);
app.use('/api/upload', uploadRouter);

// ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    status: 404,
  });
});

// manejo de errores
app.use(errorHandler);

// inicio del servidor
app.listen(env.PORT, () => {
  console.log(`Servidor LVLUP ejecutándose en el puerto ${env.PORT}`);
});

