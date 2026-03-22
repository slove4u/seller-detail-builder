import React from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  Link,
  LayoutGrid,
  Upload,
  Palette,
  FileText,
  Image as ImageIcon,
  Wand2,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import type { StepLevel } from '../types';

const steps = [
  { level: 0 as StepLevel, label: '링크 분석', icon: Link, color: 'text-gold' },
  { level: 1 as StepLevel, label: '카테고리', icon: LayoutGrid },
  { level: 2 as StepLevel, label: '이미지 업로드', icon: Upload },
  { level: 3 as StepLevel, label: '스타일 선택', icon: Palette },
  { level: 4 as StepLevel, label: '정보 입력', icon: FileText },
  { level: 5 as StepLevel, label: '이미지 배치', icon: ImageIcon },
  { level: 6 as StepLevel, label: 'AI 제작', icon: Wand2 },
  { level: 7 as StepLevel, label: '완성', icon: CheckCircle },
  { level: 8 as StepLevel, label: '다음 작업', icon: ArrowRight },
];

export const Sidebar: React.FC = () => {
  const currentStep = useAppStore((state) => state.currentStep);
  const setCurrentStep = useAppStore((state) => state.setCurrentStep);

  return (
    <aside className="w-[230px] bg-surface h-screen sticky top-0 border-r border-border hidden md:flex flex-col py-6">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-serif font-black tracking-tight text-white mb-1">
          셀러 상세 AI
        </h1>
        <p className="text-xs text-text2">간편하게 만드는 나만의 상세페이지</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.level;
          const isCompleted = currentStep > step.level;

          return (
            <button
              key={step.level}
              onClick={() => setCurrentStep(step.level)}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-text2 hover:text-text1 hover:bg-surfaceHover'
              }`}
            >
              {isCompleted ? (
                <CheckCircle size={18} className="text-green mr-3" />
              ) : (
                <Icon
                  size={18}
                  className={`mr-3 ${isActive ? 'text-accent' : step.color || ''}`}
                />
              )}
              {step.level === 0 ? (
                <span className={isActive ? '' : 'text-gold'}>{step.label}</span>
              ) : (
                step.label
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
