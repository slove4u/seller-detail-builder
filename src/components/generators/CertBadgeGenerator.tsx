import React from 'react';

interface Props {
  org: string;
  certName: string;
  year: string;
  originalImage?: string; // base64
}

export const CertBadgeGenerator: React.FC<Props> = ({ 
  org = "한국양봉협회",
  certName = "최상급 품질 인증",
  year = "2023",
  originalImage
}) => {
  return (
    <div id="cert-badge-generator" className="w-[800px] h-[600px] flex items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-[#1a1100] to-[#3d2700]">
      {/* 백그라운드 효과 */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017] rounded-full blur-[150px] opacity-20"></div>

      <div className="relative z-10 flex w-full max-w-3xl items-center">
        {/* 왼쪽 배지 디자인 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
            {/* 육각형 금색 테두리 (단순화된 원형으로 대체) */}
            <div className="absolute inset-0 rounded-full border-[6px] border-[#D4A017] shadow-[0_0_30px_rgba(212,160,23,0.5)]"></div>
            <div className="absolute inset-2 rounded-full border-[1px] border-[#F5C842]/50"></div>
            
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-[#F5C842] font-bold text-lg mb-2 tracking-widest">{org}</span>
              <span className="text-white font-serif font-black text-3xl mb-3 leading-tight break-keep">{certName}</span>
              <span className="bg-[#D4A017] text-[#1a1100] font-bold px-4 py-1 rounded-full text-sm">{year} 공식 인증</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#F5C842] tracking-wide">믿을 수 있는 품질의 증명</h2>
        </div>

        {/* 오른쪽 원본 누끼 이미지 영역 */}
        {originalImage && (
          <div className="flex-1 flex items-center justify-center h-full pl-8 border-l border-[#D4A017]/30">
            <div className="w-full h-80 relative overflow-hidden rounded-xl shadow-2xl bg-white/5 backdrop-blur-sm p-4 border border-white/10 flex items-center justify-center">
              <img src={originalImage} alt="인증서 원본" className="max-w-full max-h-full object-contain filter drop-shadow-xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
