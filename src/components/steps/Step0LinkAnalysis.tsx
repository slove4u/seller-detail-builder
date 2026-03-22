import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Link as LinkIcon, Search, Loader2, Check } from 'lucide-react';
import { analyzeLinkStyle } from '../../api/claudeApi';

export const Step0LinkAnalysis: React.FC = () => {
  const { setCurrentStep, setStyle, setAnalysisResults } = useAppStore();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleAnalyze = async () => {
    if (!url) return showToast('참고할 벤치마킹 링크를 입력해주세요.');
    setLoading(true);
    try {
      const data = await analyzeLinkStyle(url);
      setResult(data);
      if (data && data.tone) {
        const normalizedTone = data.tone.toLowerCase() as any;
        if (['dark', 'light', 'modern'].includes(normalizedTone)) {
          setStyle(normalizedTone);
        }
      }
      // 분석 결과 저장 (수정 3 반영)
      setAnalysisResults({
        palette: data.palette,
        tone: data.tone,
        sections: data.sections
      });
    } catch (e: any) {
      console.error(e);
      showToast(`분석 중 에러가 발생했습니다: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-text1 relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-xl z-50 animate-fade-in flex items-center">
          <span className="font-medium">{toastMsg}</span>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-bold font-serif mb-2 text-gold">1등 셀러들의 상세페이지 분석</h2>
        <p className="text-text2">참고하고 싶은 스토어의 링크를 입력하면 DNA(구성, 색상, 폰트)를 분석하여 내 상세페이지에 적용합니다.</p>
      </div>

      <div className="bg-surface p-8 rounded-2xl border border-border mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <label className="block text-sm font-medium mb-2">참고할 스토어 상품 링크 URL</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text3" size={20} />
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://smartstore.naver.com/..." 
                className="w-full bg-background border border-border2 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-accent/20"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Search className="mr-2" size={20} />}
              {loading ? '분석중...' : '분석 시작'}
            </button>
          </div>
          <p className="text-sm text-text3 mt-3 ml-2">* 선택사항입니다. 바로 내 상품을 등록하려면 다음을 눌러주세요.</p>
        </div>
      </div>

      {result && (
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gold mt-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <Check className="text-gold mr-2" size={24} />
            <h3 className="text-xl font-bold text-gold">분석이 완료되었습니다!</h3>
          </div>
          <p className="text-text2 mb-4">입력하신 스토어의 시각적 특징을 성공적으로 추출했습니다. 이제 이 DNA를 고객님의 상세페이지에 최적화하여 적용합니다.</p>
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(result.palette) ? result.palette.map((color: string, i: number) => (
              <div key={i} className="w-8 h-8 rounded-full border border-border2" style={{ backgroundColor: color }}></div>
            )) : <span className="text-text3 text-sm">색상 정보 없음</span>}
            <span className="ml-4 text-sm text-text3 flex items-center">추출된 색상 팔레트</span>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-12">
        <button 
          onClick={() => setCurrentStep(1)}
          className={`flex items-center text-text1 hover:text-white transition-colors py-3 px-6 rounded-xl font-bold ${result ? 'bg-white text-black' : ''}`}
        >
          {result ? '이 스타일로 시작하기' : '건너뛰고 바로 만들기'}
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};
