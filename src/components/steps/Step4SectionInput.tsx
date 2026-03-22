import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Type, MapPin, Search, Star, Box, Link } from 'lucide-react';

export const Step4SectionInput: React.FC = () => {
  const { setCurrentStep, sectionInputs, setSectionInput } = useAppStore();

  const handleHeroChange = (field: string, value: string) => {
    const currentHero = sectionInputs.hero || { name: '', tags: [], hook: '', sub: '', price: '' };
    if (field === 'tags') {
      setSectionInput('hero', { ...currentHero, tags: value.split(',').map(s => s.trim()) });
    } else {
      setSectionInput('hero', { ...currentHero, [field]: value });
    }
  };

  const handleShippingChange = (field: string, value: string) => {
    const currentShipping = sectionInputs.shipping || { cutoffTime: '', dispatchTime: '', deliveryTime: '', note: '' };
    setSectionInput('shipping', { ...currentShipping, [field]: value });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div>
        <h2 className="text-3xl font-bold font-serif mb-2 text-white">상세페이지에 들어갈 내용을 알려주세요</h2>
        <p className="text-text2">비워두셔도 AI가 상품 카테고리에 맞춰 가장 매력적인 문구를 알아서 써드립니다.</p>
      </div>

      <div className="space-y-6">
        {/* 히어로 섹션 */}
        <div className="bg-surface rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center"><Type className="mr-2 text-gold" size={20} /> 대표 정보 (히어로)</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-text2">상품명</label>
              <input 
                type="text" 
                value={sectionInputs.hero?.name || ''}
                onChange={(e) => handleHeroChange('name', e.target.value)}
                placeholder="예: 국산 수제 개껌 500g 3종 세트" 
                className="w-full bg-background border border-border2 rounded-lg p-3 text-text1 focus:border-accent" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-text2">핵심 태그 (쉼표로 구분)</label>
                <input 
                  type="text" 
                  value={sectionInputs.hero?.tags?.join(', ') || ''}
                  onChange={(e) => handleHeroChange('tags', e.target.value)}
                  placeholder="예: 무방부제, 국내산, 수제" 
                  className="w-full bg-background border border-border2 rounded-lg p-3 text-text1 focus:border-accent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text2">판매가</label>
                <input 
                  type="text" 
                  value={sectionInputs.hero?.price || ''}
                  onChange={(e) => handleHeroChange('price', e.target.value)}
                  placeholder="예: 24,900원" 
                  className="w-full bg-background border border-border2 rounded-lg p-3 text-text1 focus:border-accent" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-text2">후킹 문구 (고객을 사로잡을 한 줄)</label>
              <input 
                type="text" 
                value={sectionInputs.hero?.hook || ''}
                onChange={(e) => handleHeroChange('hook', e.target.value)}
                placeholder="예: 우리 아이가 먼저 알아봅니다" 
                className="w-full bg-background border border-border2 rounded-lg p-3 text-text1 focus:border-accent" 
              />
            </div>
          </div>
        </div>

        {/* 배송 정보 */}
        <div className="bg-surface rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center"><Box className="mr-2 text-gold2" size={20} /> 배송 안내</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-text3">마감 시간</label>
              <input 
                type="text" 
                value={sectionInputs.shipping?.cutoffTime || ''}
                onChange={(e) => handleShippingChange('cutoffTime', e.target.value)}
                placeholder="오후 1시" 
                className="w-full bg-background border border-border2 rounded-lg p-3 text-text1" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-text3">출고 소요</label>
              <input 
                type="text" 
                value={sectionInputs.shipping?.dispatchTime || ''}
                onChange={(e) => handleShippingChange('dispatchTime', e.target.value)}
                placeholder="당일 출고" 
                className="w-full bg-background border border-border2 rounded-lg p-3 text-text1" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-text3">배송 완료</label>
              <input 
                type="text" 
                value={sectionInputs.shipping?.deliveryTime || ''}
                onChange={(e) => handleShippingChange('deliveryTime', e.target.value)}
                placeholder="1~2일" 
                className="w-full bg-background border border-border2 rounded-lg p-3 text-text1" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-text3">특이사항</label>
              <input 
                type="text" 
                value={sectionInputs.shipping?.note || ''}
                onChange={(e) => handleShippingChange('note', e.target.value)}
                placeholder="도서산간 제외" 
                className="w-full bg-background border border-border2 rounded-lg p-3 text-text1" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
        <button onClick={() => setCurrentStep(3)} className="text-text3 hover:text-text1 transition-colors">이전으로</button>
        <button onClick={() => setCurrentStep(5)} className="flex items-center px-8 py-4 rounded-xl font-bold transition-all bg-white text-background hover:bg-gray-200 shadow-xl">
          다음 단계로
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};
