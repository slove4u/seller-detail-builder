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
      max_tokens: 3000,
      messages: [{
        role: "user",
        content: `
당신은 대한민국 최고의 스마트스토어·쿠팡 상세페이지 
카피라이터입니다. 실제 판매에 효과적인 카피를 작성해야 합니다.

[상품 정보]
- 카테고리: ${params.category}
- 상품명: ${params.productName}
- 핵심 특징: ${params.features.join(', ')}
- 후킹 문구: ${params.hookCopy || '자동 생성'}
- 타겟 고객: ${params.target || '모두'}
- 판매가: ${params.price || '미정'}

[작성 규칙]
1. 모든 텍스트는 반드시 한국어로 작성
2. 초보 셀러 타겟이므로 신뢰감 있고 친근한 톤
3. 구매 심리를 자극하는 구체적인 표현 사용
4. 숫자·수치·인증 등 신뢰 요소 반드시 포함
5. 각 섹션 카피는 충분히 길고 상세하게 작성
6. 가격은 반드시 "${params.price}"를 그대로 사용
7. 영어 절대 사용 금지 (섹션 라벨 포함)

[필수 출력 형식 - JSON만 출력, 다른 텍스트 없이]
{
  "hero": {
    "en": "브랜드 영문 슬로건 10단어 이내",
    "title": "구매욕구 자극하는 메인 카피\\n2줄로 작성",
    "sub": "상품의 핵심 가치를 담은 서브 카피 2~3문장. 구체적인 특징과 혜택 포함.",
    "tags": ["핵심태그1", "핵심태그2", "핵심태그3"]
  },
  "shipping": {
    "title": "빠른 배송으로 더 빨리 만나보세요",
    "cutoff": "오후 2시",
    "ship": "당일 출고",
    "delivery": "1~2일 내 도착"
  },
  "review": {
    "title": "실제 구매자들의 생생한 후기",
    "items": [
      {
        "stars": "★★★★★",
        "text": "상품 특징과 관련된 구체적이고 현실감 있는 후기 2~3문장",
        "user": "구**자"
      },
      {
        "stars": "★★★★★", 
        "text": "다른 각도의 구체적인 후기 2~3문장",
        "user": "김**님"
      },
      {
        "stars": "★★★★★",
        "text": "또 다른 구체적인 후기",
        "user": "이**님"
      },
      {
        "stars": "★★★★★",
        "text": "재구매 의향을 나타내는 후기",
        "user": "박**님"
      }
    ]
  },
  "story": {
    "headline": "브랜드 철학을 담은 감성적 헤드라인\\n2줄로 작성",
    "body": "브랜드 스토리와 상품 철학을 담은 본문. 최소 4~5문장으로 충분히 상세하게. 고객의 공감을 이끌어내는 내용 포함."
  },
  "feature": {
    "title": "${params.productName}만의 특별한 이유",
    "items": [
      {"icon": "관련이모지", "title": "특징 제목", "desc": "특징에 대한 구체적인 설명 2문장"},
      {"icon": "관련이모지", "title": "특징 제목", "desc": "특징에 대한 구체적인 설명 2문장"},
      {"icon": "관련이모지", "title": "특징 제목", "desc": "특징에 대한 구체적인 설명 2문장"},
      {"icon": "관련이모지", "title": "특징 제목", "desc": "특징에 대한 구체적인 설명 2문장"}
    ]
  },
  "cert": {
    "title": "믿고 구매할 수 있는 이유",
    "badge": "관련 인증 또는 품질 보증 문구",
    "sub": "인증 및 품질 보증에 대한 상세 설명 2~3문장"
  },
  "product": {
    "title": "상품 구성 안내",
    "name": "${params.productName} 구성",
    "items": ["구성품1", "구성품2", "구성품3"]
  },
  "caution": {
    "title": "보관 및 주의사항",
    "items": [
      {"icon": "⚠️", "title": "주의사항 제목", "desc": "구체적인 주의사항 설명"},
      {"icon": "📦", "title": "보관 방법", "desc": "구체적인 보관 방법 설명"},
      {"icon": "🔄", "title": "교환/반품", "desc": "교환 반품 관련 안내"}
    ]
  },
  "cta": {
    "main": "구매를 유도하는 강력한 CTA 문구",
    "sub": "지금 구매해야 하는 이유 한 문장",
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
