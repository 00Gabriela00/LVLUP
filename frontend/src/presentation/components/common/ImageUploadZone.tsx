import { useState, useRef } from 'react';
import { compressAndOptimizeImage } from '../../../infrastructure/utils/imageCompressor';
import { UploadCloud, Camera, Image as ImageIcon, Trash2, Check, Loader2 } from 'lucide-react';

interface ImageUploadZoneProps {
  currentImageUrl?: string;
  onImageSelected: (imageUrl: string) => void;
  label?: string;
}

export function ImageUploadZone({
  currentImageUrl,
  onImageSelected,
  label = 'Fotografía del Plato o Coctel',
}: ImageUploadZoneProps) {
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const preview = localPreview !== null ? localPreview : (currentImageUrl || null);
  const isReady = Boolean(preview);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Selecciona un formato de imagen válido (JPG, PNG, WebP).');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      // 1. Redimensionar en alta resolución (1600px, 90% calidad)
      const { dataUrl, blob } = await compressAndOptimizeImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.90,
        format: 'image/webp',
      });

      // 2. Subir al servidor backend
      try {
        const formData = new FormData();
        const optimizedFile = new File([blob], `dish-${Date.now()}.webp`, { type: 'image/webp' });
        formData.append('image', optimizedFile);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          const serverUrl = result.url;
          setLocalPreview(serverUrl);
          onImageSelected(serverUrl);
        } else {
          // Fallback a DataURL
          setLocalPreview(dataUrl);
          onImageSelected(dataUrl);
        }
      } catch {
        setLocalPreview(dataUrl);
        onImageSelected(dataUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No se pudo cargar la imagen.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = () => {
    setLocalPreview('');
    onImageSelected('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700">{label}</label>
        {isReady && preview && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Check size={12} />
            Fotografía lista
          </span>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Box / Preview */}
      {preview ? (
        <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 group">
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-48 sm:h-52 object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-4 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 shadow-md transition-all"
            >
              <ImageIcon size={14} />
              <span>Cambiar</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 flex items-center gap-1.5 shadow-md transition-all"
            >
              <Trash2 size={14} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
            isProcessing
              ? 'border-slate-400 bg-slate-50'
              : 'border-slate-300 hover:border-slate-900 bg-slate-50/50 hover:bg-white'
          }`}
        >
          {isProcessing ? (
            <div className="py-4 flex flex-col items-center justify-center gap-2 text-slate-600">
              <Loader2 size={24} className="animate-spin text-slate-900" />
              <div className="font-bold text-xs">Cargando fotografía...</div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600">
                <UploadCloud size={20} />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-xs">
                  Arrastra tu fotografía aquí o usa los botones
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Soporta cámara de teléfono, JPG, PNG y WebP en alta calidad
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-900 bg-white text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <ImageIcon size={14} />
                  <span>Elegir Foto</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Camera size={14} />
                  <span>Tomar Foto</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="text-[11px] text-red-600 font-semibold mt-1">
          ⚠️ {errorMessage}
        </div>
      )}
    </div>
  );
}
