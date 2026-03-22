import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Download, Copy, CheckCircle, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

export const Step7Result: React.FC = () => {
  const { setCurrentStep, styleTone, sectionInputs, layoutSlots, generatedCopy, category } = useAppStore();
  const [saveLoading, setSaveLoading] = useState(false);

  // 테마 색상 정의
  const themeData = {
    light: {
      pageBg: 'bg-[#fdfaf5]',
      heroBg: 'bg-gradient-to-b from-[#f5f0e8] to-[#fff8f0]',
      heroText: 'text-[#3d2000]',
      heroSubText: 'text-[#8B6510]',
      tagBg: 'bg-[#8B6510]/10',
      tagText: 'text-[#8B6510]',
      tagBorder: 'border-[#8B6510]/20',
      shipBg: 'bg-[#f0e8d0]',
      shipText: 'text-[#3d2000]',
      shipBorder: 'border-[#3d2000]/10',
      reviewBg: 'bg-[#faf7f0]',
      reviewCard: 'bg-white border-[#ede5d0]',
      reviewText: 'text-[#3d2000]',
      featureBg: 'bg-[#fdfaf5]',
      featureCard: 'bg-white border-[#ede5d0]',
      featureIcon: 'bg-[#f0e8d0]',
      certBg: 'bg-[#f0e8d0]',
      certBadge: 'bg-white border-[#ede5d0]',
      certText: 'text-[#3d2000]',
      productBg: 'bg-white',
      productText: 'text-[#3d2000]',
      cautionBg: 'bg-[#faf7f0]',
      ctaBg: 'bg-[#3d2000]',
      ctaButton: 'bg-[#D4A017]',
      ctaButtonText: 'text-[#1a0800]'
    },
    dark: {
      pageBg: 'bg-[#0a0a0a]',
      heroBg: 'bg-[#1a1a1a]',
      heroText: 'text-white',
      heroSubText: 'text-white/80',
      tagBg: 'bg-accent/20',
      tagText: 'text-white',
      tagBorder: 'border-accent/30',
      shipBg: 'bg-[#111]',
      shipText: 'text-white',
      shipBorder: 'border-white/10',
      reviewBg: 'bg-zinc-900',
      reviewCard: 'bg-zinc-800 border-white/5',
      reviewText: 'text-white/80',
      featureBg: 'bg-black',
      featureCard: 'bg-zinc-900 border-white/5',
      featureIcon: 'bg-zinc-800',
      certBg: 'bg-zinc-900',
      certBadge: 'bg-black border-zinc-700',
      certText: 'text-gold2',
      productBg: 'bg-white',
      productText: 'text-gray-900',
      cautionBg: 'bg-zinc-50',
      ctaBg: 'bg-[#1a1a1a]',
      ctaButton: 'bg-accent',
      ctaButtonText: 'text-white'
    }
  };

  const theme = themeData[styleTone === 'light' ? 'light' : 'dark'];

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
  const aiHeroUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(generateImagePrompt(category, pName, styleTone))}?width=1024&height=1024&nologo=true`;
  const storyImageUrl = layoutSlots.story || `https://image.pollinations.ai/prompt/${encodeURIComponent(`${category} ${pName} lifestyle background, natural outdoor setting, warm tones, professional photography, no text, no watermark, cinematic, soft bokeh`)}?width=1200&height=600&nologo=true`;

  // HTML 복사 로직
  const handleCopyHTML = async () => {
    const element = document.getElementById('result-page');
    if (!element) return;
    
    const html = element.outerHTML;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(html);
        alert('HTML이 클립보드에 복사되었습니다!\n스마트스토어 에디터에 붙여넣기 하세요.');
      } else {
        throw new Error('Clipboard API unavailable');
      }
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
    if (!element) {
      alert('저장할 페이지를 찾을 수 없습니다.');
      return;
    }

    try {
      setSaveLoading(true);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: styleTone === 'light' ? '#fdfaf5' : '#0a0a0a',
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        logging: false,
        imageTimeout: 20000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('result-page');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.maxHeight = 'none';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.borderRadius = '0';
            clonedElement.style.border = 'none';
          }
        }
      });

      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0,10);
      link.download = `상세페이지_${timestamp}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
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
            선택된 스타일: <b className="ml-1 text-text1">{styleTone === 'light' ? '내추럴 화이트' : '다크 럭셔리'}</b>
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleCopyHTML}
            className="flex items-center px-5 py-3 bg-surface hover:bg-surfaceHover border border-border text-text1 rounded-xl transition-all font-bold"
          >
            <Copy size={18} className="mr-2" /> HTML 복사
          </button>
          <button 
            onClick={handleSaveImage}
            disabled={saveLoading}
            className={`flex items-center px-8 py-3 rounded-xl transition-all font-black shadow-xl ${
              saveLoading ? 'bg-zinc-700 cursor-wait' : 'bg-text1 text-background hover:bg-white'
            }`}
          >
            {saveLoading ? (
              <><Loader2 size={20} className="mr-2 animate-spin" /> 저장 중...</>
            ) : (
              <><Download size={20} className="mr-2" /> 전체 이미지 저장</>
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-center px-4">
        {/* 모바일 캔버스 */}
        <div id="result-page" className={`w-full max-w-[440px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative group overflow-hidden rounded-[40px] border-4 border-[#333]`}>
          
          {/* 히어로 섹션 프리뷰 */}
          <div className={`relative min-h-[560px] flex flex-col items-center justify-center p-10 group/section overflow-hidden ${theme.heroBg}`}>
            <img 
              src={layoutSlots.hero || aiHeroUrl} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" 
              alt="Hero" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            
            <div className="relative z-10 flex flex-col items-center w-full mt-10">
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
                {generatedCopy?.hero?.tags?.map((tag: string, i: number) => (
                  <span key={i} className={`px-4 py-1.5 ${theme.tagBg} ${theme.tagText} border ${theme.tagBorder} text-[11px] font-black rounded-full uppercase tracking-widest shadow-sm`}>{tag}</span>
                ))}
              </div>
              <h1 
                contentEditable 
                suppressContentEditableWarning 
                className={`text-[42px] font-black tracking-tighter text-center mb-6 outline-none focus:bg-white/10 p-2 rounded leading-[1.1] drop-shadow-md ${theme.heroText}`}
              >
                {generatedCopy?.hero?.title?.split('\\n').map((line: string, i: number) => (
                  <React.Fragment key={i}>{line}<br/></React.Fragment>
                )) || (styleTone === 'light' ? '자연스러운\n일상의 완성' : '압도적인\n품격의 시작')}
              </h1>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                className={`text-lg text-center mb-12 outline-none focus:bg-white/10 p-2 rounded font-bold opacity-90 ${theme.heroSubText}`}
              >
                {generatedCopy?.hero?.sub || pName}
              </p>
              
              <div className={`${styleTone === 'light' ? 'bg-[#3d2000] text-white' : 'bg-accent text-white'} px-10 py-5 rounded-2xl font-black text-2xl shadow-2xl animate-bounce tracking-tight`}>
                {sectionInputs.hero?.price || generatedCopy?.cta?.price || '가격 안내'}
              </div>
            </div>
          </div>

          {/* 배송 배너 */}
          <div className={`py-10 px-6 border-y flex justify-between items-center group/section relative ${theme.shipBg} ${theme.shipBorder}`}>
             {[
               { label: 'ORDER INFO', value: generatedCopy?.shipping?.cutoff || sectionInputs.shipping?.cutoffTime || '14시 마감' },
               { label: 'DISPATCH', value: generatedCopy?.shipping?.ship || sectionInputs.shipping?.dispatchTime || '당일 발송' },
               { label: 'DELIVERY', value: generatedCopy?.shipping?.delivery || sectionInputs.shipping?.deliveryTime || '내일 도착' }
             ].map((item, i) => (
               <div key={i} className={`text-center flex-1 ${i < 2 ? `border-r ${theme.shipBorder}` : ''} px-2`}>
                 <div className={`text-[10px] font-black mb-2 uppercase tracking-widest opacity-60 ${theme.shipText}`}>{item.label}</div>
                 <div contentEditable suppressContentEditableWarning className={`text-sm font-black outline-none ${theme.shipText}`}>
                   {item.value}
                 </div>
               </div>
             ))}
          </div>

          {/* 리뷰 섹션 */}
          <div className={`p-10 ${theme.reviewBg} border-b ${theme.shipBorder}`}>
            <h3 className={`text-center font-black text-2xl mb-10 tracking-tight ${theme.heroText}`}>{generatedCopy?.review?.title || 'REAL REVIEWS'}</h3>
            <div className="grid grid-cols-2 gap-5">
              {(generatedCopy?.review?.items || [1,2,3,4]).map((item: any, i: number) => (
                <div key={i} className={`p-5 rounded-[24px] border shadow-sm space-y-3 transition-transform hover:scale-105 ${theme.reviewCard}`}>
                  <div className={`${styleTone === 'light' ? 'text-[#D4A017]' : 'text-gold2'} text-xs font-black tracking-widest`}>{item?.stars || '★★★★★'}</div>
                  <p className={`text-[12px] leading-relaxed line-clamp-4 font-medium ${theme.reviewText}`}>{item?.text || '실제 고객님의 생생한 후기가 여기에 표시됩니다.'}</p>
                  <div className="text-[10px] opacity-40 font-bold uppercase">{item?.user || 'USER_ID'}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 스토리 섹션 */}
          <div className="relative group/section overflow-hidden min-h-[400px] flex items-end">
            <img 
              src={storyImageUrl} 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Story" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className={`absolute inset-0 ${styleTone === 'light' ? 'bg-gradient-to-t from-white via-white/80 to-transparent' : 'bg-gradient-to-t from-black via-black/80 to-transparent'}`}></div>
            <div className="relative z-10 p-12 text-center w-full">
              <h3 contentEditable suppressContentEditableWarning className={`font-black text-3xl mb-8 outline-none leading-tight tracking-tighter ${theme.heroText}`}>
                {generatedCopy?.story?.headline || '우리가 만드는\n진심의 가치'}
              </h3>
              <p contentEditable suppressContentEditableWarning className={`text-sm leading-relaxed outline-none font-medium opacity-80 ${theme.heroText}`}>
                {generatedCopy?.story?.body || category + '의 새로운 기준을 제시합니다.'}
              </p>
            </div>
          </div>

          {/* 특징 카드 */}
          <div className={`p-12 ${theme.featureBg}`}>
            <h3 className={`text-center font-black text-[22px] mb-12 tracking-tight ${theme.heroText}`}>{generatedCopy?.feature?.title || 'THE HIGHLIGHTS'}</h3>
            <div className="grid grid-cols-2 gap-10">
              {generatedCopy?.feature?.items?.map((item: any, i: number) => (
                <div key={i} className="text-center space-y-4 group/item">
                  <div className={`text-4xl ${theme.featureIcon} w-20 h-20 flex items-center justify-center rounded-[32px] mx-auto shadow-sm border border-black/5 transition-transform group-hover/item:rotate-12`}>{item.icon}</div>
                  <h4 className={`font-black text-sm tracking-tight ${styleTone === 'light' ? 'text-[#8B6510]' : 'text-gold2'}`}>{item.title}</h4>
                  <p className={`text-[11px] leading-relaxed font-medium opacity-60 ${theme.heroText}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 인증 배지 */}
          <div className={`${theme.certBg} p-12 text-center border-y ${theme.shipBorder}`}>
            <h3 className={`text-[11px] font-black mb-8 uppercase tracking-[0.3em] opacity-50 ${theme.shipText}`}>{generatedCopy?.cert?.title || 'SAFETY CERTIFIED'}</h3>
            <div className={`inline-flex items-center space-x-5 ${theme.certBadge} border p-8 rounded-[32px] shadow-sm`}>
              <div className={`${styleTone === 'light' ? 'bg-[#f0e8d0] text-[#3d2000]' : 'bg-gold/20 text-gold'} w-14 h-14 rounded-full flex items-center justify-center`}>
                <CheckCircle size={32} />
              </div>
              <div className="text-left">
                <div className={`font-black text-xl tracking-tight ${theme.certText}`}>{generatedCopy?.cert?.badge || '공정거래 인증'}</div>
                <div className={`text-[12px] font-bold opacity-60 ${theme.certText}`}>{generatedCopy?.cert?.sub || '엄격한 기준을 통과한 제품'}</div>
              </div>
            </div>
          </div>

          {/* 상품 구성 */}
          <div className={`${theme.productBg} p-12 ${theme.productText}`}>
            <h3 className={`text-3xl font-black mb-10 tracking-tighter flex items-center`}>
              <span className={`w-2 h-10 ${styleTone === 'light' ? 'bg-[#3d2000]' : 'bg-accent'} mr-4 rounded-full`}></span>
              {generatedCopy?.product?.title || 'PACKAGE'}
            </h3>
            <div className="rounded-[32px] overflow-hidden mb-8 shadow-2xl border border-black/5">
              <img src={layoutSlots.product || aiHeroUrl} className="w-full h-64 object-cover" />
            </div>
            <div className="space-y-4">
              <div className={`font-black text-2xl tracking-tight ${styleTone === 'light' ? 'text-[#3d2000]' : 'text-accent'}`}>{generatedCopy?.product?.name || '기본 세트 구성'}</div>
              <div className="grid grid-cols-1 gap-3">
                {generatedCopy?.product?.items?.map((item: string, i: number) => (
                  <div key={i} className={`text-sm font-bold flex items-center p-3 rounded-xl ${styleTone === 'light' ? 'bg-[#fdfaf5]' : 'bg-zinc-100'}`}>
                    <CheckCircle size={16} className={`mr-3 ${styleTone === 'light' ? 'text-[#8B6510]' : 'text-accent'}`} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className={`${theme.cautionBg} p-10`}>
             <h4 className={`font-black text-sm mb-8 flex items-center opacity-80 ${theme.heroText}`}>
               <span className={`w-1 h-5 ${styleTone === 'light' ? 'bg-[#3d2000]' : 'bg-zinc-400'} mr-3 rounded-full`}></span>
               CAUTION & CARE
             </h4>
             <div className="space-y-6">
               {generatedCopy?.caution?.items?.map((item: any, i: number) => (
                 <div key={i} className="flex space-x-4 items-start group/caution">
                   <span className="text-2xl mt-1">{item.icon}</span>
                   <div className="flex-1">
                     <div className={`text-sm font-black mb-1 ${theme.heroText}`}>{item.title}</div>
                     <p className={`text-[11px] leading-relaxed font-medium opacity-60 ${theme.heroText}`}>{item.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* 최종 CTA */}
          <div className={`${theme.ctaBg} p-16 text-center space-y-10`}>
             <div className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">{generatedCopy?.cta?.sub || 'LIMITED EDITION'}</div>
             <h3 className="text-white font-black text-3xl leading-[1.2] tracking-tighter">
               {generatedCopy?.cta?.main?.split('\\n').map((l:string, i:number)=><React.Fragment key={i}>{l}<br/></React.Fragment>) || '지금 가장 합리적인\n선택을 만나보세요'}
             </h3>
             <button className={`${theme.ctaButton} ${theme.ctaButtonText} w-full py-6 rounded-[24px] font-black text-2xl shadow-[0_20px_50px_-10px_rgba(212,160,23,0.5)] transform transition-all active:scale-95`}>
                {sectionInputs.hero?.price || generatedCopy?.cta?.price || '가격 확인'} SHOP NOW
             </button>
             <div className="text-white/20 text-[10px] font-medium">© 2026 PREMIUM DETAIL PAGE BUILDER</div>
          </div>

        </div>
      </div>

      {/* 액션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-2xl border-t border-white/5 p-6 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center pl-[100px]">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-text3 uppercase mb-1">Status</span>
              <div className="text-green font-bold flex items-center text-sm">
                <div className="w-2 h-2 bg-green rounded-full mr-2 animate-pulse"></div>
                Cloud Sync Ready
              </div>
            </div>
            <div className="h-10 w-[1px] bg-border"></div>
            <div className="flex flex-col text-text2 text-sm">
               브라우저 폭에 맞춰 모바일 뷰로 고정된 화면입니다.
            </div>
          </div>
          <button 
            onClick={() => setCurrentStep(8)}
            className="group flex items-center px-12 py-4 bg-white text-background rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
          >
            대시보드로 돌아가기
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
