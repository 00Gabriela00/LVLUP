/**
 * Utilidad de Compresión y Redimensión de Imágenes para Móviles y Web
 * - Procesa fotos de cámaras de celular manteniendo alta resolución (hasta 1600px, 90% calidad)
 * - Redimensiona proporcionalmente sin deformar la comida ni el coctel
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/webp' | 'image/jpeg';
}

export async function compressAndOptimizeImage(
  file: File,
  options: CompressionOptions = {}
): Promise<{ dataUrl: string; blob: Blob; originalSize: number; compressedSize: number }> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.90,
    format = 'image/webp',
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcular escala proporcional sin recortar
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el lienzo de procesamiento.'));
          return;
        }

        // Suavizado bicúbico de alta calidad
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        let outputFormat = format;
        let dataUrl = canvas.toDataURL(outputFormat, quality);

        if (!dataUrl.startsWith('data:image/webp') && outputFormat === 'image/webp') {
          outputFormat = 'image/jpeg';
          dataUrl = canvas.toDataURL(outputFormat, quality);
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al procesar la imagen.'));
              return;
            }
            resolve({
              dataUrl,
              blob,
              originalSize: file.size,
              compressedSize: blob.size,
            });
          },
          outputFormat,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('No se pudo abrir el archivo de imagen. Formato no compatible.'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo seleccionado.'));
    };

    reader.readAsDataURL(file);
  });
}
