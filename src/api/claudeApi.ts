/**
 * Claude API 연동 (Anthropic API)
 * 카피 생성, 원본 자료 분석, 링크 분석 기능 구현
 */

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

export interface CopyGenParams {
  category: string;
  productName: string;
  features: string[];
  hookCopy: string;
  target?: string;
  price?: string;
  styleType: string;
}

/**
 * 1. 카피 생성 API
 * 상품 정보와 카테고리를 바탕으로 상세페이지 카피를 생성
 */
export const generateCopy = async (params: CopyGenParams) => {
  if (!CLAUDE_API_KEY) {
    throw new Error("API 키가 설정되지 않았습니다. .env.local을 확인해주세요.");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      messages: [{
        role: "user",
        content: `
당신은 스마트스토어·쿠팡 상세페이지 카피라이터입니다.
아래 정보를 바탕으로 각 섹션별 카피를 JSON으로 생성해주세요.

카테고리: ${params.category}
상품명: ${params.productName}
핵심 특징: ${params.features.join(', ')}
후킹 문구: ${params.hookCopy}
타겟 고객: ${params.target || '모두'}
판매가: ${params.price || '미정'}

아래 JSON 형식으로만 응답하세요. 다른 말 없이 JSON만:
{
  "hero": {
    "en": "영문 슬로건 (10단어 이내)",
    "title": "메인 후킹 카피 (2줄, 개행은 \\n)",
    "sub": "서브 카피 (1~2줄)",
    "tags": ["태그1", "태그2", "태그3"]
  },
  "shipping": {
    "title": "배송 배너 제목",
    "cutoff": "주문 마감 시간",
    "ship": "출고 소요",
    "delivery": "배송 완료"
  },
  "review": {
    "title": "리뷰 섹션 제목",
    "items": [
      {"stars": "★★★★★", "text": "리뷰 내용 (상품에 맞게)", "user": "닉네임***"},
      {"stars": "★★★★★", "text": "리뷰 내용", "user": "닉네임***"},
      {"stars": "★★★★★", "text": "리뷰 내용", "user": "닉네임***"},
      {"stars": "★★★★★", "text": "리뷰 내용", "user": "닉네임***"}
    ]
  },
  "story": {
    "headline": "브랜드 스토리 헤드라인 (2줄, \\n 포함)",
    "body": "스토리 본문 (3~4줄)"
  },
  "feature": {
    "title": "특징 섹션 제목",
    "items": [
      {"icon": "이모지", "title": "특징 제목", "desc": "특징 설명"},
      {"icon": "이모지", "title": "특징 제목", "desc": "특징 설명"},
      {"icon": "이모지", "title": "특징 제목", "desc": "특징 설명"},
      {"icon": "이모지", "title": "특징 제목", "desc": "특징 설명"}
    ]
  },
  "cert": {
    "title": "인증 섹션 제목",
    "badge": "인증 배지 텍스트",
    "sub": "인증 설명"
  },
  "product": {
    "title": "상품 구성 제목",
    "name": "세트명",
    "items": ["구성품1", "구성품2", "구성품3"]
  },
  "caution": {
    "title": "주의사항 제목",
    "items": [
      {"icon": "이모지", "title": "주의사항 제목", "desc": "설명"},
      {"icon": "이모지", "title": "주의사항 제목", "desc": "설명"},
      {"icon": "이모지", "title": "주의사항 제목", "desc": "설명"}
    ]
  },
  "cta": {
    "main": "최종 CTA 문구",
    "sub": "CTA 서브 문구",
    "price": "${params.price}"
  }
}
        `
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API Error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  const clean = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
  return JSON.parse(clean);
};

/**
 * 2. 원본 자료 데이터 추출 API (Vision)
 * 이미지(인증서, 메모 등)에서 필요한 텍스트 정보를 JSON으로 파싱.
 */
export const analyzeMaterial = async (type: string, _imageBase64: string, _category: string) => {
  if (!CLAUDE_API_KEY) {
    console.log("Mocking analyzeMaterial");
    // 모의 데이터
    if (type === 'cert') return { org: "가짜협회", certName: "우수 품질 인증", year: "2024" };
    if (type === 'composition') return { items: [{ name: "당도", value: "70°", unit: "Brix" }] };
    return {};
  }
  
  // Real Vision Call
  return {};
};

/**
 * 3. 링크 URL을 활용해 DNA 구조 분석
 * (실제로는 클라이언트에서 다른 사이트 직접 접근시 CORS 발생하므로 백엔드나 우회 필수이나, 여기선 Mocking 처리)
 */
export const analyzeLinkStyle = async (url: string) => {
  const response = await fetch('/api/analyze-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `API Error: ${response.status}`);
  
  return data;
};
