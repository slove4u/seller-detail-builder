import React from 'react';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  items: { icon: string; title: string; desc: string }[];
  theme?: 'dark' | 'light' | 'modern';
}

export const CautionCardGenerator: React.FC<Props> = ({ 
  items = [
    { icon: "🌡️", title: "실온 보관", desc: "직사광선을 피해 서늘한 곳에 보관해주세요." },
    { icon: "🚫", title: "알러지 주의", desc: "특정 성분에 알러지가 있는 경우 급여 전 확인해주세요." },
    { icon: "⚠️", title: "급여량 조절", desc: "반려견의 체중과 활동량에 맞춰 급여량을 조절해주세요." }
  ],
  theme = "dark"
}) => {
  const { stylePalette } = useAppStore();
  const bg = theme === 'dark' ? stylePalette[0] : '#ffffff';
  const text = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const cardBg = theme === 'dark' ? stylePalette[1] : '#f5f5f5';
  const highlight = theme === 'dark' ? stylePalette[2] : '#E8593C';

  return (
    <div id="caution-card-generator" className="w-[800px] h-[500px] flex flex-col p-12 relative" style={{ backgroundColor: bg, color: text }}>
      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
        <span className="text-4xl mr-3" style={{ color: highlight }}>!</span>
        보관 및 주의사항
      </h2>
      
      <div className="flex flex-col space-y-4 w-full max-w-2xl mx-auto bg-opacity-50 p-8 rounded-3xl shadow-inner border" style={{ backgroundColor: cardBg, borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-row items-center border-b last:border-0 pb-4 last:pb-0" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 mr-6 shadow-sm" style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.3)' : '#ffffff' }}>
              {item.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-1" style={{ color: highlight }}>{item.title}</h3>
              <p className="text-base opacity-80 break-keep leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
