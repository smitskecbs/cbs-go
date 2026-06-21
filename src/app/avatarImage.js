// Client-side avatar compression for game_profiles.avatar (text column).

const MAX_AVATAR_DATA_URL_CHARS = 380_000;
const MAX_DIMENSION = 512;

/**
 * Compress an image File to a JPEG data URL suitable for Supabase storage.
 * @param {File} file
 * @returns {Promise<string>}
 */
export function compressAvatarFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !String(file.type || '').startsWith('image/')) {
      reject(new Error('Please choose a valid image file.'));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      if (!width || !height) {
        reject(new Error('Could not read image dimensions.'));
        return;
      }

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width >= height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not process image on this device.'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.9;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);

      while (dataUrl.length > MAX_AVATAR_DATA_URL_CHARS && quality > 0.45) {
        quality -= 0.08;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      if (dataUrl.length > MAX_AVATAR_DATA_URL_CHARS) {
        reject(new Error('Avatar image is too large. Choose a smaller photo.'));
        return;
      }

      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read image file.'));
    };

    img.src = objectUrl;
  });
}

export { MAX_AVATAR_DATA_URL_CHARS };
