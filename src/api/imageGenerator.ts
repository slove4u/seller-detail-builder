import html2canvas from 'html2canvas';

/**
 * 특정 DOM 요소를 캡처하여 Base64 이미지로 반환합니다.
 * @param elementId 렌더링할 DOM 요소의 ID
 * @param scale 해상도 (기본 2배)
 * @returns Promise<string> Base64 데이터 URL
 */
export const generateImageFromDOM = async (elementId: string, scale: number = 2): Promise<string> => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element with id ${elementId} not found`);

  try {
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: null, // 투명 배경 허용
      logging: false,
    });
    
    return canvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
};
