import { Request, Response, NextFunction } from 'express';

/**
 * Función recursiva para sanitizar cualquier string:
 * - Elimina etiquetas HTML potencialmente maliciosas (<script>, <iframe>, etc.)
 * - Neutraliza inyecciones XSS
 * - Hace trim() a los espacios en blanco innecesarios
 */
export function sanitizeString(value: string): string {
  if (typeof value !== 'string') return value;

  return value
    // Eliminar etiquetas <script> y su contenido
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Eliminar etiquetas <iframe>, <object>, <embed>, <applet>, <link>, <meta>
    .replace(/<(iframe|object|embed|applet|link|meta|style)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '')
    // Eliminar atributos de eventos javascript (ej: onload=, onclick=, onerror=)
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Eliminar protocolos javascript: o vbscript: o data: maliciosos en href/src
    .replace(/(javascript|vbscript):/gi, '')
    // Eliminar cualquier etiqueta HTML genérica si es un campo de texto plano
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

/**
 * Recorre recursivamente un objeto o array y limpia todos sus valores de tipo string
 */
export function sanitizeDeep(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return sanitizeString(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeDeep(item));
  }

  if (typeof data === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, val] of Object.entries(data)) {
      cleaned[key] = sanitizeDeep(val);
    }
    return cleaned;
  }

  return data;
}

/**
 * Middleware de Express para sanitizar body, query y params de manera automática
 */
export function sanitizeInputs(req: Request, _res: Response, next: NextFunction) {
  try {
    if (req.body && typeof req.body === 'object') {
      for (const key of Object.keys(req.body)) {
        req.body[key] = sanitizeDeep(req.body[key]);
      }
    }

    if (req.query && typeof req.query === 'object') {
      for (const key of Object.keys(req.query)) {
        try {
          (req.query as any)[key] = sanitizeDeep((req.query as any)[key]);
        } catch {
          // Si una propiedad de query es inmutable, continuar
        }
      }
    }

    if (req.params && typeof req.params === 'object') {
      for (const key of Object.keys(req.params)) {
        try {
          (req.params as any)[key] = sanitizeDeep((req.params as any)[key]);
        } catch {
          // Si una propiedad de params es inmutable, continuar
        }
      }
    }
  } catch {
    // Protección silenciosa
  }

  next();
}
