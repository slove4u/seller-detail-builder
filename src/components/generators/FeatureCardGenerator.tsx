import React from 'react';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  features: { icon: string; title: string; desc: string }[];
  brandName?: string;
  theme?: 'dark' | 'light' | 'modern';
}

export const FeatureCardGenerator: React.FC<Props> = ({ 
  features = [
    { icon: "🦷", title: "무방부제", desc: "화학첨가물 없이 국내산만" },
    { icon: "🥩", title: "100% 휴먼그레이드", desc: "사람이 먹을 수 있는 원육만 사용" },
    { icon: "⏱️", title: "12시간 저온건조", desc: "영양소 파괴를 최소화하는 공법" },
    { icon: "🦴", title: "치석 제거 도움", desc: "기능성 치석제거 디자인 특허" }
  ], 
  brandName = "브랜드명",
  theme = "dark"
}) => {
  const { stylePalette } = useAppStore();
  const bg = theme === 'dark' ? stylePalette[0] : '#ffffff';
  const text = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const cardBg = theme === 'dark' ? stylePalette[1] : '#f5f5f5';

  return (
    <div id="feature-card-generator" className="w-[800px] h-[800px] flex flex-col items-center justify-center p-12 relative" style={{ backgroundColor: bg, color: text }}>
      <h2 className="text-4xl font-bold font-serif mb-12 text-center" style={{ color: theme === 'dark' ? stylePalette[3] : stylePalette[0] }}>
        왜 이 제품을 선택해야 할까요?
      </h2>
      
      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center p-10 rounded-3xl shadow-lg border border-opacity-20" style={{ backgroundColor: cardBg, borderColor: theme === 'dark' ? stylePalette[3] : '#e5e5e5' }}>
            <div className="text-6xl mb-6 bg-black/10 w-24 h-24 rounded-full flex items-center justify-center shadow-inner">
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
            <p className="text-lg opacity-80 leading-relaxed break-keep">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 right-12 text-sm opacity-50 font-medium tracking-widest">
        {brandName.toUpperCase()}
      </div>
    </div>
  );
};
