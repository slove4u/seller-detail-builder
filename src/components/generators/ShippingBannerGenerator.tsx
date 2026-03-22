import React from 'react';

interface Props {
  cutoffTime: string;
  dispatchTime: string;
  deliveryTime: string;
}

export const ShippingBannerGenerator: React.FC<Props> = ({ 
  cutoffTime = "오후 1시",
  dispatchTime = "당일 출고",
  deliveryTime = "1~2일 내 도착"
}) => {
  return (
    <div id="shipping-banner-generator" className="w-[800px] h-[300px] flex items-center justify-between p-12 bg-gradient-to-r from-[#2d1500] to-[#1a0c00] text-white">
      {/* 장식용 아이콘 */}
      <div className="absolute top-0 right-10 text-[10rem] opacity-5">🚚</div>

      {/* 왼쪽 헤드라인 */}
      <div className="flex flex-col flex-1 mr-8 relative z-10 border-r border-[#F5C842]/20">
        <h2 className="text-3xl font-bold font-serif leading-tight">빠르고 안전한 배송<br/><span className="text-[#F5C842]">약속드립니다</span></h2>
        <p className="mt-4 text-[#F5C842]/70 text-sm">* 제주/도서산간 지역은 1~2일 추가 소요</p>
      </div>

      {/* 오른쪽 정보 */}
      <div className="flex-2 flex w-full max-w-lg justify-around relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#F5C842]/10 rounded-full flex items-center justify-center mb-4 text-[#F5C842] text-2xl">⏰</div>
          <span className="text-gray-400 text-sm mb-1 font-medium">주문 마감</span>
          <span className="text-2xl font-bold text-white tracking-widest">{cutoffTime}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#F5C842]/10 rounded-full flex items-center justify-center mb-4 text-[#F5C842] text-2xl">📦</div>
          <span className="text-gray-400 text-sm mb-1 font-medium">상품 출고</span>
          <span className="text-2xl font-bold text-white tracking-widest">{dispatchTime}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#F5C842]/10 rounded-full flex items-center justify-center mb-4 text-[#F5C842] text-2xl">🚚</div>
          <span className="text-gray-400 text-sm mb-1 font-medium">배송 완료</span>
          <span className="text-2xl font-bold text-white tracking-widest">{deliveryTime}</span>
        </div>
      </div>
    </div>
  );
};
