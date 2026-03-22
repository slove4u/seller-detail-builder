import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Loader2, Wand2, CheckCircle, Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import { generateCopy } from '../../api/claudeApi';

const steps = [
  { id: 1, label: '이미지 분석 및 배치 확인', icon: ImageIcon },
  { id: 2, label: '카테고리 맞춤 카피 생성 (Claude AI)', icon: Wand2 },
  { id: 3, label: '섹션별 이미지 렌더링 및 합성', icon: LayoutTemplate },
  { id: 4, label: '최종 스타일 DNA 적용', icon: CheckCircle },
];

export const Step6Making: React.FC = () => {
  const { setCurrentStep } = useAppStore();
  const [activeStep, setActiveStep] = useState(1);

  // Real API calling sequence
  useEffect(() => {
    let isCancelled = false;

    const runAI = async () => {
      try {
        setActiveStep(1); // 이미지 분석
        await new Promise((r) => setTimeout(r, 1000));
        
        setActiveStep(2); // 카피 생성
        const store = useAppStore.getState();
        const copyParams = {
          category: store.category || '기본',
          productName: store.sectionInputs.hero?.name || '상품명',
          features: store.sectionInputs.hero?.tags || ['특징 없음'],
          hookCopy: store.sectionInputs.hero?.hook || '최고의 품질을 약속합니다',
          price: store.sectionInputs.hero?.price || '가격 문의',
          styleType: store.styleTone
        };
        
        const copyData = await generateCopy(copyParams);
        
        if (isCancelled) return;
        store.setGeneratedCopy(copyData);
        
        setActiveStep(3); // 렌더링 합성
        await new Promise((r) => setTimeout(r, 1500));
        
        setActiveStep(4); // 마무리
        await new Promise((r) => setTimeout(r, 1000));
        
        setCurrentStep(7);
      } catch (error: any) {
        console.error(error);
        alert(`API 오류 발생: ${error.message}\n설정이나 네트워크 연결을 확인하세요.`);
      }
    };

    runAI();

    return () => {
      isCancelled = true;
    };
  }, [setCurrentStep]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center animate-fade-in relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="relative z-10 text-center space-y-8">
        <div className="relative inline-flex">
          <Loader2 className="animate-spin text-accent" size={80} />
          <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold animate-bounce" size={32} />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold font-serif mb-4 flex items-center justify-center">
             AI가 상세페이지를 제작하고 있습니다... 
          </h2>
          <p className="text-text2">잠시만 기다려주세요, 판매에 최적화된 결과물을 만들고 있습니다.</p>
        </div>

        <div className="max-w-md mx-auto bg-surface p-6 rounded-2xl border border-border shadow-2xl text-left space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isDone = activeStep > step.id;
            return (
              <div key={step.id} className={`flex items-center transition-opacity duration-300 ${!isDone && !isActive ? 'opacity-30' : 'opacity-100'}`}>
                {isDone ? (
                  <CheckCircle className="text-green mr-4" size={24} />
                ) : isActive ? (
                  <Loader2 className="animate-spin text-accent mr-4" size={24} />
                ) : (
                  <Icon className="text-text3 mr-4" size={24} />
                )}
                <span className={`font-medium ${isActive ? 'text-accent' : isDone ? 'text-text1' : 'text-text3'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
