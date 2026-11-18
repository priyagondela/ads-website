const CLOUD_NAME = import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME || 'bciomskp';
const UPLOAD_PRESET = import.meta.env?.VITE_CLOUDINARY_UPLOAD_PRESET || 'ads website';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Upload a single image file to Cloudinary.
 * @param {File} file
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadImage = async (file) => {
  // ── Validation ──────────────────────────────────────────
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Allowed types: ${ALLOWED_TYPES.join(', ')}`
    );
  }

  if (file.size > MAX_SIZE) {
    throw new Error(
      `File size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds the 10 MB limit.`
    );
  }

  // ── Upload ──────────────────────────────────────────────
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple image files to Cloudinary.
 * @param {File[]} files
 * @returns {Promise<Array<{ url: string, publicId: string }>>}
 */
export const uploadMultipleImages = async (files) => {
  const results = await Promise.all(files.map((file) => uploadImage(file)));
  return results;
};
