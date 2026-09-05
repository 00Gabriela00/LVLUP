import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { requireAuth } from '../../core/authMiddleware';

export const uploadRouter = Router();

// Asegurar que exista el directorio de uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || '.webp';
    cb(null, `lvlup-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/avif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (JPEG, PNG, WebP, AVIF).'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // Máximo 15MB antes de compresión
  },
});

/**
 * POST /api/upload
 * Sube una imagen optimizada y devuelve la URL accesible
 */
uploadRouter.post('/', requireAuth, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No se ha proporcionado ningún archivo de imagen.' });
    return;
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({
    message: 'Imagen subida exitosamente',
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});
