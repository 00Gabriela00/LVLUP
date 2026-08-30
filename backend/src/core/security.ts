import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// 1. Rate Limiting estricto para rutas de autenticación (Login)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo 10 intentos por IP
  message: {
    error: 'Demasiados intentos de acceso. Por seguridad, tu IP ha sido pausada temporalmente por 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Rate Limiting general para la API
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 120, // 120 peticiones por minuto por IP
  message: { error: 'Límite de peticiones excedido. Intenta nuevamente en unos segundos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 3. CORS seguro y restringido
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Permitir llamadas sin origen (apps móviles/Postman en dev) o dominios autorizados
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

// 4. Helmet con Content Security Policy (CSP) robusto y protección de cabeceras HTTP
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
    maxAge: 31536000, // 1 año de HSTS estricto
    includeSubDomains: true,
    preload: true,
  },
  hidePoweredBy: true, // Oculta 'X-Powered-By: Express'
  noSniff: true,
  xssFilter: true,
});
