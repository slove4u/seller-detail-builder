import React from 'react';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  items: { name: string; amount: string; desc: string }[];
  originalImage?: string; // base64
  theme?: 'dark' | 'light' | 'modern';
  brandName?: string;
}

export const ProductCardGenerator: React.FC<Props> = ({ 
  items = [
    { name: "소형견 미니 껌", amount: "170g", desc: "5~10kg 소형견 전용" },
    { name: "관절 튼튼 껌", amount: "150g", desc: "노령견 및 슬개골 관리용" },
    { name: "저알러지 껌", amount: "150g", desc: "돼지고기 베이스 알러지 프리" }
  ],
  originalImage,
  theme = "dark",
  brandName = "브랜드명"
}) => {
  const { stylePalette } = useAppStore();
  const bg = theme === 'dark' ? stylePalette[0] : '#ffffff';
  const text = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const highlight = theme === 'dark' ? stylePalette[2] : '#E8593C';

  return (
    <div id="product-card-generator" className="w-[800px] h-[700px] flex flex-col p-12 relative" style={{ backgroundColor: bg, color: text }}>
      <h2 className="text-4xl font-bold font-serif mb-10 text-center drop-shadow-sm border-b pb-6" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        상품 구성 안내
      </h2>
      
      <div className="flex-1 flex gap-8 items-center">
        {/* 구성 이미지 (가운데 큼직하게) */}
        <div className="flex-1 flex items-center justify-center p-4 bg-white/5 rounded-3xl shadow-lg border border-opacity-10" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          {originalImage ? (
             <img src={originalImage} alt="구성 이미지" className="max-w-full max-h-72 object-contain" />
          ) : (
            <div className="w-64 h-64 bg-black/10 rounded-2xl flex items-center justify-center text-4xl opacity-50">
              📦
            </div>
          )}
        </div>

        {/* 텍스트 리스트 */}
        <div className="flex-1 space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col bg-surface/50 p-6 rounded-2xl border" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xl font-bold flex items-center">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm mr-3 font-sans" style={{ backgroundColor: highlight }}>{i + 1}</span>
                  {item.name}
                </span>
                <span className="text-lg font-bold" style={{ color: highlight }}>{item.amount}</span>
              </div>
              <p className="text-base opacity-70 ml-11">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-12 text-sm opacity-50 font-medium tracking-widest">
        {brandName.toUpperCase()}
      </div>
    </div>
  );
};
