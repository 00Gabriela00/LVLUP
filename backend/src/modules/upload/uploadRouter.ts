import { Router, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { requireAuth } from '../../core/authMiddleware';

export const uploadRouter = Router();

// Asegurar que exista el directorio de uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer en memoria temporal para procesar con Sharp antes de guardar
const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/avif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato no válido. Solo se permiten imágenes (JPEG, PNG, WebP, AVIF, HEIC).'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // Acepta hasta 15MB antes de compresión
  },
});

/**
 * POST /api/upload
 * Procesa la imagen con Sharp: la reescala a max 1000px y la convierte a WebP ultra ligero
 */
uploadRouter.post('/', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No se ha proporcionado ningún archivo de imagen.' });
    return;
  }

  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    const filename = `lvlup-${uniqueSuffix}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Optimización automática con Sharp: redimensionar a max 1000px y compresión WebP 82%
    await sharp(req.file.buffer)
      .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const fileUrl = `/uploads/${filename}`;

    res.status(201).json({
      message: 'Imagen optimizada y guardada exitosamente en formato WebP',
      url: fileUrl,
      filename,
      size: stats.size,
      mimetype: 'image/webp',
    });
  } catch (error: any) {
    console.error('Error al procesar imagen con Sharp:', error);
    res.status(500).json({ error: 'Error al optimizar y guardar la imagen.' });
  }
});
