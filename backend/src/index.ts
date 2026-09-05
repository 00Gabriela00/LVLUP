import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { configureSecurityHeaders, corsOptions, apiRateLimiter } from './core/security';
import { errorHandler } from './core/middlewares';
import { authRouter } from './modules/auth/router';
import { menuRouter } from './modules/menu/router';
import { promosRouter } from './modules/promos/router';
import { gamingRouter } from './modules/gaming/router';
import { businessRouter } from './modules/business/router';
import { uploadRouter } from './modules/upload/uploadRouter';
import path from 'path';

const app = express();

// 1. Servir archivos estáticos subidos (imágenes optimizadas)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  maxAge: '30d', // Cache estático para carga instantánea
  immutable: true,
}));

// 2. Seguridad HTTP estricta (Helmet, CSP, HSTS, XSS, NoSniff)
app.use(configureSecurityHeaders);

// 3. CORS restringido
app.use(cors(corsOptions));

// 4. Rate Limiter general de la API
app.use(apiRateLimiter);

import { sanitizeInputs } from './core/sanitizer';

// 5. Parser JSON con límite de tamaño para prevenir ataques DoS y sanitización profunda
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(sanitizeInputs);

// 6. Verificación de Salud del Servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LVLUP Game Bar API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// 7. Rutas de la Aplicación
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/promos', promosRouter);
app.use('/api/gaming', gamingRouter);
app.use('/api/business', businessRouter);
app.use('/api/upload', uploadRouter);

// 7. Middleware de Manejo Seguro de Errores (sin filtrar stack traces en prod)
app.use(errorHandler);

// Iniciar Servidor
app.listen(env.PORT, () => {
  console.log(`🚀 Servidor LVLUP seguro ejecutándose en el puerto ${env.PORT}`);
});
