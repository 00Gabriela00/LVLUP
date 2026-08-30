import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const isDev = process.env.NODE_ENV !== 'production';

  // Sanitizar logs para no filtrar secretos
  const safeMessage = err.message ? err.message.replace(/(key|token|password|secret)=[^&]+/gi, '$1=***') : 'Error interno del servidor';

  if (isDev) {
    console.error(`[Error ${req.method} ${req.url}]:`, err);
  } else {
    console.error(`[Error ${req.method} ${req.url}]:`, safeMessage);
  }

  res.status(err.status || 500).json({
    error: isDev ? safeMessage : 'Ha ocurrido un error en el servidor. Intenta más tarde.',
    ...(isDev && err.stack ? { debugStack: err.stack } : {}),
  });
};
