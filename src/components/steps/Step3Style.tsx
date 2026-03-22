import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Check } from 'lucide-react';
import type { StyleTheme } from '../../types';

const styles = [
  { id: 'dark' as StyleTheme, name: '프리미엄 다크', desc: '고급스럽고 신뢰감을 주는 무게감 있는 톤' },
  { id: 'light' as StyleTheme, name: '내추럴 화이트', desc: '깨끗하고 자연스러운 밝은 톤' },
  { id: 'modern' as StyleTheme, name: '모던 미니멀', desc: '군더더기 없이 트렌디하고 세련된 톤' },
];

export const Step3Style: React.FC = () => {
  const { styleTone, setStyle, setCurrentStep } = useAppStore();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold font-serif mb-2">원하는 스타일을 선택하세요</h2>
        <p className="text-text2">선택하신 스타일에 따라 글꼴, 색상, 디자인 템플릿이 자동으로 적용됩니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {styles.map((s) => {
          const isSelected = styleTone === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`text-left rounded-2xl border transition-all duration-300 overflow-hidden relative ${
                isSelected ? 'border-accent shadow-xl shadow-accent/20 scale-[1.02]' : 'border-border hover:border-text3 hover:scale-[1.01]'
              }`}
            >
              <div className="aspect-[9/16] bg-surface p-4 flex flex-col relative">
                {/* 썸네일 미리보기 */}
                {s.id === 'dark' && (
                  <div className="w-full flex-1 rounded-lg mb-4 bg-gradient-to-br from-[#1a0800] to-[#3d1500] p-3 flex flex-col justify-end border border-[#D4A017]/20 relative overflow-hidden">
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#D4A017]/20 text-[#D4A017] text-[8px] rounded">프리미엄</div>
                    <div className="w-16 h-2 bg-[#D4A017] rounded-full mb-1"></div>
                    <div className="w-24 h-1.5 bg-white/60 rounded-full mb-1"></div>
                    <div className="w-10 h-1.5 bg-white/30 rounded-full"></div>
                  </div>
                )}
                {s.id === 'light' && (
                  <div className="w-full flex-1 rounded-lg mb-4 bg-white p-3 flex flex-col justify-end border border-gray-200 relative overflow-hidden shadow-inner">
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#4caf7d]/10 text-[#4caf7d] border border-[#4caf7d]/20 text-[8px] rounded">유기농</div>
                    <div className="w-16 h-2 bg-[#4caf7d] rounded-full mb-1"></div>
                    <div className="w-24 h-1.5 bg-gray-600 rounded-full mb-1"></div>
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                  </div>
                )}
                {s.id === 'modern' && (
                  <div className="w-full flex-1 rounded-lg mb-4 bg-[#f8f9fa] p-3 flex flex-col justify-end border border-gray-200 relative overflow-hidden">
                    <div className="absolute -left-4 top-4 w-12 h-12 bg-gray-200 rounded-full opacity-50"></div>
                    <div className="w-16 h-2 bg-gray-900 rounded-full mb-1 z-10"></div>
                    <div className="w-24 h-1.5 bg-gray-500 rounded-full mb-1 z-10"></div>
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full z-10"></div>
                  </div>
                )}
                
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    <Check size={16} />
                  </div>
                )}
              </div>
              <div className="p-5 bg-background border-t border-border">
                <h3 className={`text-xl font-bold mb-1 ${isSelected ? 'text-accent' : 'text-text1'}`}>{s.name}</h3>
                <p className="text-sm text-text3">{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
        <button onClick={() => setCurrentStep(2)} className="text-text3 hover:text-text1 transition-colors">이전으로</button>
        <button onClick={() => setCurrentStep(4)} className="flex items-center px-8 py-4 rounded-xl font-bold transition-all bg-white text-background hover:bg-gray-200 shadow-xl">
          다음 단계로
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};
