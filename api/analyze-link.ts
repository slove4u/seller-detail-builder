export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST required' }), { status: 405 });
  }

  try {
    const { url } = await req.json();
    if (!url) return new Response(JSON.stringify({ error: 'URL required' }), { status: 400 });

    // 1. Fetch external HTML with Fallback
    let htmlText = '';
    let promptContent = '';
    
    try {
      const htmlRes = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!htmlRes.ok) throw new Error(`Status ${htmlRes.status}`);
      const text = await htmlRes.text();
      htmlText = text.substring(0, 8000);
      
      promptContent = `
다음은 쇼핑몰 상세페이지 HTML입니다.
아래 항목을 분석해서 JSON으로만 응답하세요:

HTML: ${htmlText}

{
  "siteName": "사이트/상품명",
  "sections": [{"order":1, "type":"hero", "detected":true, "isKey":true}],
  "palette": ["#색상1","#색상2","#색상3","#색상4","#색상5","#색상6"],
  "tone": "dark" | "light" | "modern",
  "layout": "풀블리드 세로" | "카드형" | "기타",
  "fonts": {"heading": "serif" | "sans", "body": "sans"}
}
`;
    } catch (scrapeErr: any) {
      console.error(`Scrape failed for URL: ${url}`, scrapeErr);
      
      promptContent = `
URL: ${url}
이 URL의 쇼핑몰 플랫폼을 파악하고 해당 플랫폼 상세페이지의
일반적인 구성과 스타일을 분석해서 JSON으로만 응답해줘:
{
  "siteName": "플랫폼명 또는 상품명",
  "sections": [
    {"order":1,"type":"hero","detected":true,"isKey":true},
    {"order":2,"type":"shipping","detected":true,"isKey":false},
    {"order":3,"type":"review","detected":true,"isKey":false},
    {"order":4,"type":"story","detected":true,"isKey":false},
    {"order":5,"type":"feature","detected":true,"isKey":false},
    {"order":6,"type":"cert","detected":false,"isKey":false},
    {"order":7,"type":"product","detected":true,"isKey":false},
    {"order":8,"type":"caution","detected":true,"isKey":false},
    {"order":9,"type":"cta","detected":true,"isKey":true}
  ],
  "palette": ["#1a0800","#3d1500","#D4A017","#F5C842","#4caf7d","#faf7f0"],
  "tone": "dark",
  "layout": "풀블리드 세로형",
  "fonts": {"heading":"serif","body":"sans"}
}
`;
    }

    // 2. Analyze with Claude API
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VITE_CLAUDE_API_KEY || process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: promptContent
        }]
      })
    });

    if (!claudeRes.ok) {
      throw new Error(`Claude error: ${claudeRes.status}`);
    }

    const data = await claudeRes.json();
    const text = data.content[0].text;
    const clean = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
    
    return new Response(clean, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
