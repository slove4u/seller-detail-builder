import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { useAppStore } from './store/useAppStore';

import { Step0LinkAnalysis } from './components/steps/Step0LinkAnalysis';
import { Step1Category } from './components/steps/Step1Category';
import { Step2Upload } from './components/steps/Step2Upload';
import { Step3Style } from './components/steps/Step3Style';
import { Step4SectionInput } from './components/steps/Step4SectionInput';
import { Step5ImageAssign } from './components/steps/Step5ImageAssign';
import { Step6Making } from './components/steps/Step6Making';
import { Step7Result } from './components/steps/Step7Result';
import { Step8Next } from './components/steps/Step8Next';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step0LinkAnalysis />;
      case 1: return <Step1Category />;
      case 2: return <Step2Upload />;
      case 3: return <Step3Style />;
      case 4: return <Step4SectionInput />;
      case 5: return <Step5ImageAssign />;
      case 6: return <Step6Making />;
      case 7: return <Step7Result />;
      case 8: return <Step8Next />;
      default: return <Step1Category />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-text1">
      <Sidebar />
      <main className="flex-1 min-h-screen relative overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-10 pb-24">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}

export default App;
