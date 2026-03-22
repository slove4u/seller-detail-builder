import React from 'react';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  rows: { item: string; mine: string; competitor: string; desc: string }[];
  brandName?: string;
  theme?: 'dark' | 'light' | 'modern';
}

export const CompositionTableGenerator: React.FC<Props> = ({ 
  rows = [
    { item: "수분함량", mine: "16.3%", competitor: "17.7%", desc: "완숙 기준 최고농도" },
    { item: "당도", mine: "72.5°", competitor: "65.0°", desc: "프리미엄 최상급 기준" },
    { item: "항생제", mine: "불검출", competitor: "허용기준치 내", desc: "100% 무항생제" }
  ],
  brandName = "브랜드명",
  theme = "dark"
}) => {
  const { stylePalette } = useAppStore();
  const bg = theme === 'dark' ? stylePalette[0] : '#ffffff';
  const text = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const highlight = stylePalette[2] || '#D4A017';

  return (
    <div id="composition-table-generator" className="w-[800px] h-[600px] flex flex-col items-center justify-center p-12 relative" style={{ backgroundColor: bg, color: text }}>
      <h2 className="text-4xl font-bold font-serif mb-10 text-center drop-shadow-sm">정직한 성분과 농도의 차이</h2>
      
      <div className="w-full max-w-2xl bg-white/5 rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <table className="w-full text-center border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <th className="py-5 px-4 font-bold text-lg opacity-80">비교 항목</th>
              <th className="py-5 px-4 font-bold text-xl" style={{ color: highlight, backgroundColor: 'rgba(255,255,255,0.05)' }}>자사 제품</th>
              <th className="py-5 px-4 font-bold text-lg opacity-50">타사 제품</th>
              <th className="py-5 px-4 font-bold text-lg opacity-80">의미</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="py-6 px-4 font-medium text-lg">{row.item}</td>
                <td className="py-6 px-4 font-bold text-2xl" style={{ color: highlight, backgroundColor: 'rgba(255,255,255,0.02)' }}>{row.mine}</td>
                <td className="py-6 px-4 font-medium text-lg opacity-50">{row.competitor}</td>
                <td className="py-6 px-4 text-base opacity-90 break-keep">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-8 text-sm opacity-50 tracking-widest mt-12">
        {brandName.toUpperCase()}
      </div>
    </div>
  );
};
