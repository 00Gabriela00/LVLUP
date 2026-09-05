import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const isDev = process.env.NODE_ENV !== 'production';

  // Determinar código HTTP y mensaje amigable
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Ha ocurrido un error en el servidor.';

  // 1. Errores de Carga de Archivos (Multer)
  if (err.name === 'MulterError') {
    status = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      status = 413;
      message = 'El archivo supera el tamaño máximo permitido (15MB).';
    } else {
      message = `Error al procesar el archivo: ${err.message}`;
    }
  }

  // 2. Errores de JWT (Autenticación)
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Token de sesión inválido o manipulado.';
  } else if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.';
  }

  // 3. Errores de Prisma ORM (Prevención de fuga de esquema SQL)
  if (err.code === 'P2002') {
    status = 409;
    const target = (err.meta?.target as string[])?.join(', ') || 'campo único';
    message = `Ya existe un registro con el mismo valor para: ${target}.`;
  } else if (err.code === 'P2025') {
    status = 404;
    message = 'El recurso solicitado no fue encontrado en la base de datos.';
  } else if (err.code?.startsWith('P')) {
    // Otros errores de base de datos Prisma: no filtrar SQL al cliente
    status = 400;
    message = 'Error en la operación de base de datos.';
  }

  // 4. Payload Too Large (Express body-parser DoS guard)
  if (err.type === 'entity.too.large') {
    status = 413;
    message = 'El tamaño de la petición excede el límite permitido (5MB).';
  }

  // Sanitizar logs para no exponer contraseñas ni tokens en los registros
  const sanitizedMsg = typeof err.message === 'string'
    ? err.message.replace(/(key|token|password|secret|authorization)=[^&]+/gi, '$1=***')
    : 'Error interno';

  if (isDev) {
    console.error(`[Error ${req.method} ${req.url}] (${status}):`, err);
  } else {
    console.error(`[Error ${req.method} ${req.url}] (${status}):`, sanitizedMsg);
  }

  res.status(status).json({
    error: message,
    status,
    ...(isDev && err.stack ? { debugStack: err.stack } : {}),
  });
};

