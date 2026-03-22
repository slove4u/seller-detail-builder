import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Utensils, Dog, Sparkles, Shirt, Home, Tent, Laptop, Baby } from 'lucide-react';

const categories = [
  { id: '식품·건강식품', icon: Utensils, desc: '신선도와 성분을 강조하는 디자인' },
  { id: '반려동물', icon: Dog, desc: '친근하고 따뜻한 감성 톤앤매너' },
  { id: '뷰티·화장품', icon: Sparkles, desc: '고급스럽고 깨끗한 무드' },
  { id: '패션·의류', icon: Shirt, desc: '트렌디하고 감각적인 레이아웃' },
  { id: '생활·주방', icon: Home, desc: '실용성과 편안함을 강조' },
  { id: '스포츠·아웃도어', icon: Tent, desc: '활동적이고 다이나믹한 느낌' },
  { id: '디지털·가전', icon: Laptop, desc: '모던하고 신뢰감 있는 구조' },
  { id: '유아·육아', icon: Baby, desc: '부드럽고 안전한 분위기' },
];

export const Step1Category: React.FC = () => {
  const { category, setCategory, setCurrentStep } = useAppStore();
  const [selected, setSelected] = useState(category);

  const handleNext = () => {
    if (selected) {
      setCategory(selected);
      setCurrentStep(2);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold font-serif mb-2">어떤 상품을 판매하시나요?</h2>
        <p className="text-text2">선택하신 카테고리에 맞춰 AI가 최적의 카피 톤과 상세페이지 구조를 제안합니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {categories.map((c) => {
          const Icon = c.icon;
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`p-6 rounded-2xl border text-left transition-all duration-200 group relative overflow-hidden ${
                isSelected 
                  ? 'bg-accent/10 border-accent shadow-lg shadow-accent/10' 
                  : 'bg-surface border-border hover:border-text3 hover:bg-surfaceHover'
              }`}
            >
              <div className={`mb-4 inline-flex p-3 rounded-xl ${isSelected ? 'bg-accent text-white' : 'bg-background text-text2 group-hover:text-white transition-colors'}`}>
                <Icon size={24} />
              </div>
              <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-accent' : 'text-text1'}`}>{c.id}</h3>
              <p className="text-sm text-text3">{c.desc}</p>
              
              {isSelected && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
        <button 
          onClick={() => setCurrentStep(0)}
          className="text-text3 hover:text-text1 transition-colors"
        >
          이전으로
        </button>
        <button 
          onClick={handleNext}
          disabled={!selected}
          className={`flex items-center px-8 py-4 rounded-xl font-bold transition-all ${
            selected 
              ? 'bg-white text-background hover:bg-gray-200 shadow-xl' 
              : 'bg-surface text-text3 cursor-not-allowed'
          }`}
        >
          다음 단계로
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};
