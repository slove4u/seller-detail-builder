import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Wand2 } from 'lucide-react';

export const Step5ImageAssign: React.FC = () => {
  const { setCurrentStep, productImages, layoutSlots, setLayoutSlot } = useAppStore();

  const handleAssign = (slot: any, url: string) => {
    setLayoutSlot(slot, url);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in pb-20">
      <div>
        <h2 className="text-3xl font-bold font-serif mb-2 text-white">이미지 배치 및 미리보기</h2>
        <p className="text-text2">업로드한 사진을 클릭하여 원하는 섹션에 배치하세요. AI가 배경을 제거하고 최적의 구도로 배치합니다.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
        {/* 왼쪽: 에셋 패널 */}
        <div className="bg-surface rounded-2xl border border-border flex flex-col overflow-hidden">
          <div className="flex border-b border-border bg-bg2">
            <button className="flex-1 py-4 font-bold text-accent border-b-2 border-accent">내 업로드 사진 ({productImages.length})</button>
            <button className="flex-1 py-4 text-text3 hover:text-text1 font-medium bg-bg3/30">AI 생성 라이브러리</button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto grid grid-cols-2 gap-4">
            {productImages.length > 0 ? (
              productImages.map((url, i) => (
                <div 
                  key={i} 
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-accent cursor-pointer group shadow-lg"
                  onClick={() => {
                    // 순차적으로 빈 슬롯에 자동배치 시뮬레이션 또는 직접 선택 유도
                    if (!layoutSlots.hero) handleAssign('hero', url);
                    else if (!layoutSlots.story) handleAssign('story', url);
                    else if (!layoutSlots.product) handleAssign('product', url);
                  }}
                >
                  <img src={url} alt={`product-${i}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-accent px-2 py-1 rounded">클릭하여 배치</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 text-text3">업로드된 이미지가 없습니다.</div>
            )}
          </div>
        </div>

        {/* 오른쪽: 상세페이지 구조 슬롯 */}
        <div className="bg-background rounded-2xl border border-border p-6 overflow-y-auto space-y-4">
          <div className="text-sm font-bold text-text2 mb-4">페이지 구성 확인 및 이미지 지정</div>
          
          {/* Hero Slot */}
          <div className={`relative p-5 border-2 rounded-2xl transition-all ${layoutSlots.hero ? 'border-accent bg-accent/5' : 'border-dashed border-border2 hover:border-text3 bg-surface'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-white">1. 히어로 커버 이미지</span>
              {layoutSlots.hero && <button onClick={() => setLayoutSlot('hero', null)} className="text-xs text-accent underline">제거</button>}
            </div>
            {layoutSlots.hero ? (
              <img src={layoutSlots.hero} className="w-full h-32 object-cover rounded-lg shadow-inner" />
            ) : (
              <div className="h-32 flex flex-col items-center justify-center text-text3">
                <p className="text-xs">왼쪽에서 사진을 선택하세요</p>
              </div>
            )}
          </div>

          {/* Story Slot */}
          <div className={`relative p-5 border-2 rounded-2xl transition-all ${layoutSlots.story ? 'border-gold bg-gold/5' : 'border-dashed border-border2 bg-surface'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-white">2. 포인트/스토리 배경</span>
              {layoutSlots.story && <button onClick={() => setLayoutSlot('story', null)} className="text-xs text-gold underline">제거</button>}
            </div>
            {layoutSlots.story ? (
              <img src={layoutSlots.story} className="w-full h-24 object-cover rounded-lg" />
            ) : (
              <div className="h-24 flex items-center justify-center text-text3 text-xs">선택된 이미지 없음</div>
            )}
          </div>

          <div className="p-5 border border-border bg-surfaceHover/50 rounded-2xl opacity-60">
            <span className="text-sm font-medium text-text2 italic">특징/인증/구성은 AI가 자동 레이아웃합니다.</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
        <button onClick={() => setCurrentStep(4)} className="text-text3 hover:text-text1 transition-colors">이전으로</button>
        <button onClick={() => setCurrentStep(6)} className="flex items-center px-10 py-5 rounded-xl font-bold transition-all bg-accent text-white hover:bg-accent/90 shadow-xl shadow-accent/20">
          <Wand2 className="mr-2" size={20} />
          AI 상세페이지 제작 시작 (10초 소요)
        </button>
      </div>
    </div>
  );
};
