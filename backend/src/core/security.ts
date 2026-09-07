import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// rate limit para autenticacion
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'Demasiados intentos de acceso. Por seguridad, tu IP ha sido pausada temporalmente por 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// rate limit general
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  message: { error: 'Límite de peticiones excedido. Intenta nuevamente en unos segundos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// opciones de cors
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // permitir origenes autorizados o llamadas locales
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL || '',
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por la política CORS del servidor.'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// cabeceras de seguridad con helmet
export const configureSecurityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'", 'http://localhost:*', 'https://api.cloudinary.com'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  hidePoweredBy: true,
  noSniff: true,
  xssFilter: true,
});
