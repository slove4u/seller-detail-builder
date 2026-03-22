import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PlusCircle, Search, Edit2, Link as LinkIcon } from 'lucide-react';

export const Step8Next: React.FC = () => {
  const { setCurrentStep } = useAppStore();

  const options = [
    { id: 1, title: '하단 추가 섹션 제작', desc: '현재 페이지에 이어 붙일 추가 이미지를 만듭니다.', icon: PlusCircle, action: () => setCurrentStep(4) },
    { id: 2, title: '새 상품 작업 시작', desc: '처음부터 새로운 상품의 상세페이지를 만듭니다.', icon: Edit2, action: () => { window.location.reload(); } },
    { id: 3, title: '다른 링크 참고 분석', desc: '새로운 경쟁사 링크의 스타일을 분석합니다.', icon: Search, action: () => setCurrentStep(0) },
    { id: 4, title: '완성 페이지 추가 편집', desc: '방금 만든 페이지의 텍스트나 순서를 다시 수정합니다.', icon: LinkIcon, action: () => setCurrentStep(7) },
  ];

  return (
    <div className="space-y-8 animate-fade-in flex flex-col items-center pt-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-serif mb-2 text-gold">수고하셨습니다 결제왕님!</h2>
        <p className="text-text2">다음으로 어떤 작업을 진행하시겠어요?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-3xl">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={opt.action}
              className="p-8 bg-surface border border-border rounded-2xl text-left hover:border-accent hover:bg-surfaceHover transition-all group hover:-translate-y-1 shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-4 inline-flex p-4 rounded-xl bg-background text-text2 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text1 group-hover:text-white transition-colors">{opt.title}</h3>
              <p className="text-sm text-text3">{opt.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
