/**
 * Remove.bg API 연동
 * 이미지의 배경을 자동으로 제거합니다.
 */

const REMOVE_BG_API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY;
const API_URL = 'https://api.remove.bg/v1.0/removebg';

export const removeBackground = async (imageFile: File | string): Promise<string> => {
  if (!REMOVE_BG_API_KEY) {
    console.warn("Remove.bg API Key is missing. Returning original image.");
    // 임시로 원본 파일의 object URL을 반환 (API 키 없을 때 테스트용)
    if (typeof imageFile === 'string') return imageFile;
    return URL.createObjectURL(imageFile);
  }

  const formData = new FormData();
  formData.append('size', 'auto');
  
  if (typeof imageFile === 'string') {
    // Base64 또는 URL 일 경우
    formData.append('image_url', imageFile);
  } else {
    // File 객체일 경우
    formData.append('image_file', imageFile);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Remove.bg Error: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to remove background:", error);
    throw error;
  }
};
