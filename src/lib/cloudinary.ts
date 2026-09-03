/**
 * Cloudinary Image Upload Utility
 * Supports direct client-side upload via unsigned preset OR server-side API route fallback.
 */

export interface CloudinaryUploadResult {
  url: string;
  publicId?: string;
}

export function isCloudinaryConfigured(): boolean {
  const clientCloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const clientPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  return Boolean(clientCloud && clientPreset);
}

export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResult> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Selected file must be an image (PNG, JPG, WEBP, AVIF).');
  }

  // Validate size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Image size cannot exceed 10MB.');
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // 1. Direct client-to-Cloudinary upload if unsigned preset is provided
  if (cloudName && uploadPreset) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        });
      }

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && response.secure_url) {
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
            });
          } else {
            const errorMsg =
              response.error?.message ||
              `Cloudinary upload failed with status ${xhr.status}`;
            reject(new Error(errorMsg));
          }
        } catch {
          reject(new Error('Invalid response from Cloudinary API.'));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error occurred during Cloudinary upload.'));
      };

      xhr.open('POST', uploadUrl);
      xhr.send(formData);
    });
  }

  // 2. Fallback to local Next.js /api/upload endpoint (supports signed upload with API key & secret)
  onProgress?.(25);
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  onProgress?.(75);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.message || 'Image upload failed. Please verify your Cloudinary settings in .env.local'
    );
  }

  onProgress?.(100);
  return {
    url: data.url || data.secure_url,
    publicId: data.public_id,
  };
}
