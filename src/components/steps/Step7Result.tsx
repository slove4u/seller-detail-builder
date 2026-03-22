import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Download, Copy, CheckCircle, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

export const Step7Result: React.FC = () => {
  const { setCurrentStep, styleTone, sectionInputs, layoutSlots, generatedCopy, category, analyzedPalette } = useAppStore();
  const [saveLoading, setSaveLoading] = useState(false);

  // 4단계 입력 가격 (수정 2 반영)
  const userPrice = sectionInputs.hero?.price;
  const displayPrice = generatedCopy?.cta?.price || userPrice || '가격 문의';

  // 벤치마킹 팔레트 적용 (수정 3 반영)
  const benchmarkingHeroBg = analyzedPalette?.[0];
  const benchmarkingAccent = analyzedPalette?.[2];

  // 테마 색상 정의
  const themeData = {
    light: {
      pageBg: 'bg-[#fdfaf5]',
      heroBg: benchmarkingHeroBg ? '' : 'bg-gradient-to-b from-[#f5f0e8] to-[#fff8f0]',
      heroText: 'text-white', // 오버레이 때문에 화이트 고정
      heroSubText: 'text-white/90',
      tagBg: 'bg-accent/20',
      tagText: 'text-white',
      tagBorder: 'border-accent/30',
      shipBg: benchmarkingAccent ? '' : 'bg-[#f0e8d0]',
      shipText: 'text-[#3d2000]',
      shipBorder: 'border-[#3d2000]/10',
      reviewBg: 'bg-[#faf7f0]',
      reviewCard: 'bg-white border-[#ede5d0]',
      reviewText: 'text-[#3d2000]',
      featureBg: 'bg-[#fdfaf5]',
      featureCard: 'bg-white border-[#ede5d0]',
      featureIcon: benchmarkingAccent ? '' : 'bg-[#f0e8d0]',
      certBg: benchmarkingAccent ? '' : 'bg-[#f0e8d0]',
      certBadge: 'bg-white border-[#ede5d0]',
      certText: 'text-[#3d2000]',
      productBg: 'bg-white',
      productText: 'text-[#3d2000]',
      cautionBg: 'bg-[#faf7f0]',
      ctaBg: benchmarkingHeroBg ? '' : 'bg-[#3d2000]',
      ctaButton: benchmarkingAccent ? '' : 'bg-[#D4A017]',
      ctaButtonText: 'text-[#1a0800]'
    },
    dark: {
      pageBg: 'bg-[#0a0a0a]',
      heroBg: benchmarkingHeroBg ? '' : 'bg-[#1a1a1a]',
      heroText: 'text-white',
      heroSubText: 'text-white/80',
      tagBg: 'bg-accent/20',
      tagText: 'text-white',
      tagBorder: 'border-accent/30',
      shipBg: benchmarkingAccent ? '' : 'bg-[#111]',
      shipText: 'text-white',
      shipBorder: 'border-white/10',
      reviewBg: 'bg-zinc-900',
      reviewCard: 'bg-zinc-800 border-white/5',
      reviewText: 'text-white/80',
      featureBg: 'bg-black',
      featureCard: 'bg-zinc-900 border-white/5',
      featureIcon: benchmarkingAccent ? '' : 'bg-zinc-800',
      certBg: benchmarkingAccent ? '' : 'bg-zinc-900',
      certBadge: 'bg-black border-zinc-700',
      certText: 'text-gold2',
      productBg: 'bg-white',
      productText: 'text-gray-900',
      cautionBg: 'bg-zinc-50',
      ctaBg: benchmarkingHeroBg ? '' : 'bg-[#1a1a1a]',
      ctaButton: benchmarkingAccent ? '' : 'bg-accent',
      ctaButtonText: 'text-white'
    }
  };

  const theme = themeData[styleTone === 'light' ? 'light' : 'dark'];

  // 카테고리별 이모지 맵
  const getCategoryEmoji = (cat: string) => {
    const map: Record<string, string> = {
      '반려동물': '🐾',
      '식품·건강식품': '🍯',
      '뷰티·화장품': '💄',
      '패션·의류': '👗',
      '생활·주방': '🏠',
      '스포츠·아웃도어': '⛺',
      '디지털·가전': '📱',
      '유아·육아': '👶',
    };
    return map[cat] || '📦';
  };

  // AI 이미지 생성 프롬프트
  const generateImagePrompt = (cat: string, name: string, style: string) => {
    const styleGuide = style === 'light'
      ? 'bright natural lighting, cream white background, warm tones'
      : 'dark moody lighting, deep brown gold tones, luxury aesthetic';

    const prompts: Record<string, string> = {
      '반려동물': `cute happy dog with ${name}, professional product photography, ${styleGuide}, no text`,
      '식물·원예': `lush green indoor plants, ${name}, clean Minimalist aesthetic, ${styleGuide}, no text`,
      '뷰티·화장품': `luxury organic skincare ${name}, soft shadows, ${styleGuide}, no text`,
      '식품·건강식품': `fresh natural ingredients, healthy ${name}, food styling, ${styleGuide}, no text`,
      '패션·의류': `stylish modern apparel ${name}, high fashion, ${styleGuide}, no text`,
      '생활·주방': `premium home interior ${name}, organized aesthetic, ${styleGuide}, no text`,
    };

    return prompts[cat] || `high quality professional product shot of ${name}, ${styleGuide}, no text`;
  };

  const pName = sectionInputs.hero?.name || '추천 상품';
  const aiHeroUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(generateImagePrompt(category, pName, styleTone))}?width=1024&height=1024&nologo=true&seed=${Math.random()}`;

  // HTML 복사 로직
  const handleCopyHTML = async () => {
    const element = document.getElementById('result-page');
    if (!element) return;
    const html = element.outerHTML;
    try {
      await navigator.clipboard.writeText(html);
      alert('HTML이 클립보드에 복사되었습니다!');
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('HTML이 복사되었습니다!');
    }
  };

  // 이미지 저장 로직
  const handleSaveImage = async () => {
    const element = document.getElementById('result-page');
    if (!element) return;
    try {
      setSaveLoading(true);
      const images = element.querySelectorAll('img');
      for (const img of Array.from(images)) {
        if (img.src.startsWith('http') && !img.src.startsWith(window.location.origin)) {
          try {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(img.src)}`;
            const response = await fetch(proxyUrl);
            const blob = await response.blob();
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            img.src = base64;
          } catch (e) {}
        }
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: styleTone === 'light' ? '#fdfaf5' : '#0a0a0a',
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('result-page');
          if (el) {
            el.style.transform = 'none';
            el.style.maxHeight = 'none';
            el.style.overflow = 'visible';
          }
        }
      });
      const link = document.createElement('a');
      link.download = `상세페이지_${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      alert('저장 중 오류 발생');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className={`space-y-0 animate-fade-in relative pb-32 min-h-screen ${theme.pageBg}`}>
      <div className="flex justify-between items-end mb-8 sticky top-0 z-30 bg-background/90 backdrop-blur-xl px-10 py-6 border-b border-border shadow-sm">
        <div>
          <h2 className="text-3xl font-black font-serif mb-1 text-white flex items-center">
            <CheckCircle className="text-green mr-3" size={32} />
            상세페이지가 완성되었습니다
          </h2>
          <p className="text-text2 flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${styleTone === 'light' ? 'bg-[#D4A017]' : 'bg-accent'}`}></span>
            스타일: <b>{styleTone === 'light' ? '내추럴 화이트' : '다크 럭셔리'}</b>
          </p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleCopyHTML} className="flex items-center px-5 py-3 bg-surface hover:bg-surfaceHover border border-border text-text1 rounded-xl transition-all font-bold">
            <Copy size={18} className="mr-2" /> HTML 복사
          </button>
          <button onClick={handleSaveImage} disabled={saveLoading} className={`flex items-center px-8 py-3 rounded-xl transition-all font-black shadow-xl ${saveLoading ? 'bg-zinc-700 cursor-wait' : 'bg-text1 text-background hover:bg-white'}`}>
            {saveLoading ? <><Loader2 size={20} className="mr-2 animate-spin" /> 저장 중...</> : <><Download size={20} className="mr-2" /> 전체 이미지 저장</>}
          </button>
        </div>
      </div>

      <div className="flex justify-center px-4">
        <div id="result-page" className="w-full max-w-[440px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative group overflow-hidden rounded-[40px] border-4 border-[#333]">
          
          {/* 히어로 섹션 */}
          <div className={`relative min-h-[560px] flex flex-col items-center justify-center p-10 overflow-hidden ${theme.heroBg}`}
               style={benchmarkingHeroBg ? { backgroundColor: benchmarkingHeroBg } : {}}>
            <img src={layoutSlots.hero || aiHeroUrl} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)' }}></div>
            
            <div className="relative z-10 flex flex-col items-center w-full mt-10">
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
                {generatedCopy?.hero?.tags?.map((tag: string, i: number) => (
                  <span key={i} className={`px-4 py-1.5 ${theme.tagBg} ${theme.tagText} border ${theme.tagBorder} text-[11px] font-black rounded-full uppercase tracking-widest shadow-sm`}>{tag}</span>
                ))}
              </div>
              <h1 contentEditable suppressContentEditableWarning 
                className={`text-[42px] font-black tracking-tighter text-center mb-6 outline-none focus:bg-white/10 p-2 rounded leading-[1.1] ${theme.heroText}`}
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {generatedCopy?.hero?.title?.split('\\n').map((line: string, i: number) => (
                  <React.Fragment key={i}>{line}<br/></React.Fragment>
                )) || '최고의 선택'}
              </h1>
              <p contentEditable suppressContentEditableWarning 
                className={`text-lg text-center mb-12 outline-none focus:bg-white/10 p-2 rounded font-bold opacity-90 ${theme.heroSubText}`}
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {generatedCopy?.hero?.sub || pName}
              </p>
              <div className={`text-white px-10 py-5 rounded-2xl font-black text-2xl shadow-2xl animate-bounce tracking-tight ${theme.ctaButton}`}
                   style={benchmarkingAccent ? { backgroundColor: benchmarkingAccent } : {}}>
                {displayPrice}
              </div>
            </div>
          </div>

          {/* 배송 배너 */}
          <div className={`py-10 px-6 border-y flex justify-between items-center relative ${theme.shipBg} ${theme.shipBorder}`}
               style={benchmarkingAccent ? { backgroundColor: benchmarkingAccent + '22', borderColor: benchmarkingAccent + '44' } : {}}>
             {[
               { label: '마감', sub: '오후 2시 이전 주문', value: generatedCopy?.shipping?.cutoff || sectionInputs.shipping?.cutoffTime || '14:00' },
               { label: '출고', sub: '당일 출고', value: generatedCopy?.shipping?.ship || sectionInputs.shipping?.dispatchTime || '당일 발송' },
               { label: '배송', sub: '1~2일 내 도착', value: generatedCopy?.shipping?.delivery || sectionInputs.shipping?.deliveryTime || '빠른 배송' }
             ].map((item, i) => (
               <div key={i} className={`text-center flex-1 ${i < 2 ? `border-r ${theme.shipBorder}` : ''} px-1`}
                    style={i < 2 ? { borderRightColor: benchmarkingAccent ? benchmarkingAccent + '33' : undefined } : {}}>
                 <div className={`text-[11px] font-black mb-1 ${theme.shipText}`} style={benchmarkingAccent ? { color: benchmarkingAccent } : {}}>{item.label}</div>
                 <div className={`text-[9px] opacity-60 mb-1 scale-90 ${theme.shipText}`}>{item.sub}</div>
                 <div contentEditable suppressContentEditableWarning className={`text-[13px] font-black outline-none ${theme.shipText}`}>
                   {item.value}
                 </div>
               </div>
             ))}
          </div>

          {/* 리뷰 섹션 */}
          <div className={`p-10 ${theme.reviewBg} border-b ${theme.shipBorder}`}>
            <h3 className={`text-center font-black text-2xl mb-10 tracking-tight ${styleTone === 'light' ? 'text-[#3d2000]' : 'text-white'}`}>{generatedCopy?.review?.title || '생생한 실구매자 후기'}</h3>
            <div className="grid grid-cols-2 gap-5">
              {(generatedCopy?.review?.items || [1,2,3,4]).map((item: any, i: number) => (
                <div key={i} className={`p-5 rounded-[24px] border shadow-sm space-y-3 ${theme.reviewCard}`}>
                  <div className={`text-[10px] font-black tracking-widest ${styleTone === 'light' ? 'text-accent' : 'text-gold2'}`}
                       style={benchmarkingAccent ? { color: benchmarkingAccent } : {}}>{item?.stars || '★★★★★'}</div>
                  <p className={`text-[11px] leading-relaxed font-medium ${theme.reviewText}`}>{item?.text || '최고의 제품이에요!'}</p>
                  <div className="text-[9px] opacity-40 font-bold uppercase">{item?.user || '구매자'}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 스토리 섹션 */}
          <div className="relative overflow-hidden min-h-[400px] flex items-end"
               style={!layoutSlots.story ? { background: benchmarkingHeroBg || 'linear-gradient(135deg, #1a0d00, #3d2010)' } : {}}>
            {layoutSlots.story && (
              <img src={layoutSlots.story} className="absolute inset-0 w-full h-full object-cover" alt="Story" />
            )}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 p-12 text-center w-full">
              <h3 contentEditable suppressContentEditableWarning className="font-black text-3xl mb-8 outline-none leading-tight tracking-tighter text-white">
                {generatedCopy?.story?.headline || '우리의 진심'}
              </h3>
              <p contentEditable suppressContentEditableWarning className="text-sm leading-relaxed outline-none font-medium text-white/80">
                {generatedCopy?.story?.body || category + '의 새로운 기준.'}
              </p>
            </div>
          </div>

          {/* 특징 카드 */}
          <div className={`p-12 ${theme.featureBg}`}>
            <h3 className={`text-center font-black text-[22px] mb-12 tracking-tight ${styleTone === 'light' ? 'text-[#3d2000]' : 'text-white'}`}>{generatedCopy?.feature?.title || '특별한 이유'}</h3>
            <div className="grid grid-cols-2 gap-10">
              {generatedCopy?.feature?.items?.map((item: any, i: number) => (
                <div key={i} className="text-center space-y-4">
                  <div className={`text-4xl ${theme.featureIcon} w-20 h-20 flex items-center justify-center rounded-[32px] mx-auto shadow-sm`}
                       style={benchmarkingAccent ? { backgroundColor: benchmarkingAccent + '11', color: benchmarkingAccent } : {}}>{item.icon}</div>
                  <h4 className={`font-black text-sm tracking-tight`}
                      style={{ color: benchmarkingAccent || (styleTone === 'light' ? '#8B6510' : '#D4A017') }}>{item.title}</h4>
                  <p className={`text-[11px] leading-relaxed font-medium opacity-60 ${styleTone === 'light' ? 'text-[#3d2000]' : 'text-white'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 인증 배지 */}
          <div className={`${theme.certBg} p-12 text-center border-y ${theme.shipBorder}`}
               style={benchmarkingAccent ? { backgroundColor: benchmarkingAccent + '08' } : {}}>
            <h1 className="text-[14px] font-black mb-6 opacity-60">인증 내역</h1>
            <div className={`inline-flex items-center space-x-5 ${theme.certBadge} border p-8 rounded-[32px] shadow-sm`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center`}
                   style={{ backgroundColor: (benchmarkingAccent || '#D4A017') + '22', color: benchmarkingAccent || '#D4A017' }}>
                <CheckCircle size={32} />
              </div>
              <div className="text-left">
                <div className={`font-black text-xl tracking-tight ${theme.certText}`}
                     style={benchmarkingAccent ? { color: benchmarkingAccent } : {}}>{generatedCopy?.cert?.badge || '정식 인증'}</div>
                <div className={`text-[12px] font-bold opacity-60 ${theme.certText}`}>{generatedCopy?.cert?.sub || '검증된 제품'}</div>
              </div>
            </div>
          </div>

          {/* 상품 구성 */}
          <div className={`${theme.productBg} p-12 ${theme.productText}`}>
            <h3 className="text-2xl font-black mb-8 tracking-tighter">상품 구성 안내</h3>
            <div className="rounded-[32px] overflow-hidden mb-8 shadow-xl border border-black/5">
              {layoutSlots.product ? (
                <img src={layoutSlots.product} className="w-full h-64 object-cover" />
              ) : (
                <div style={{ background: benchmarkingHeroBg || 'linear-gradient(135deg, #f5e8c0, #e8d090)', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', borderRadius: '24px' }}>
                  {getCategoryEmoji(category)}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="font-black text-xl" style={{ color: benchmarkingAccent || '#D4A017' }}>{generatedCopy?.product?.name || '기본 구성'}</div>
              <div className="grid grid-cols-1 gap-2">
                {generatedCopy?.product?.items?.map((item: string, i: number) => (
                  <div key={i} className={`text-sm font-bold flex items-center p-3 rounded-xl ${styleTone === 'light' ? 'bg-[#fdfaf5]' : 'bg-zinc-100'}`}>
                    <CheckCircle size={14} className="mr-3" style={{ color: benchmarkingAccent || '#D4A017' }} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className={`${theme.cautionBg} p-10`}>
             <h4 className="font-black text-sm mb-8 opacity-80 uppercase tracking-widest">보관 및 주의사항</h4>
             <div className="space-y-6">
               {generatedCopy?.caution?.items?.map((item: any, i: number) => (
                 <div key={i} style={{display:'flex',gap:'10px',marginBottom:'12px',alignItems:'flex-start'}}>
                   <span style={{fontSize:'20px',flexShrink:0}}>{item.icon}</span>
                   <div>
                     <div style={{fontWeight:700,fontSize:'13px',color: styleTone === 'light' ? '#1a0800' : '#fff',marginBottom:'2px'}}>{item.title}</div>
                     <div style={{fontSize:'11px',color:'#888',lineHeight:1.5}}>{item.desc}</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* 최종 CTA */}
          <div className={`${theme.ctaBg} p-16 text-center space-y-10`}
               style={benchmarkingHeroBg ? { backgroundColor: benchmarkingHeroBg } : {}}>
             <h3 className="text-white font-black text-3xl leading-[1.2] tracking-tighter">
               {generatedCopy?.cta?.main || '지금 시작하세요'}
             </h3>
             <button className={`${theme.ctaButton} ${theme.ctaButtonText} w-full py-6 rounded-[24px] font-black shadow-xl active:scale-95 transition-transform`}
                     style={{ fontSize: 'clamp(14px, 4vw, 22px)', whiteSpace: 'nowrap', backgroundColor: benchmarkingAccent || undefined }}>
                {displayPrice} 구매하기
             </button>
          </div>

        </div>
      </div>

      {/* 액션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-2xl border-t border-white/5 p-6 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center pl-[100px]">
          <button onClick={() => setCurrentStep(8)} className="group flex items-center px-12 py-4 bg-white text-background rounded-2xl font-black hover:scale-105 transition-all outline-none">
            완성된 상세페이지 확인 완료
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
