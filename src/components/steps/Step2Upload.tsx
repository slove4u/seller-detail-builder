import React, { useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, UploadCloud, Image as ImageIcon, FileText, Trash2 } from 'lucide-react';

export const Step2Upload: React.FC = () => {
  const { setCurrentStep, productImages, setProductImages } = useAppStore();
  const [activeTab, setActiveTab] = useState<'product' | 'source'>('product');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    setCurrentStep(3);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesUrl = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
      if (activeTab === 'product') {
        setProductImages([...productImages, ...filesUrl]);
      } else {
        // Source files implementation
        alert('원본 자료가 임시 저장되었습니다.');
      }
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const newImgs = [...productImages];
    newImgs.splice(index, 1);
    setProductImages(newImgs);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold font-serif mb-2">이미지와 자료를 올려주세요</h2>
        <p className="text-text2">상품 사진과 갖고 계신 원본 자료(인증서, 성분표 등)를 올려주시면 AI가 예쁘게 디자인해 드립니다.</p>
      </div>

      <div className="flex space-x-2 border-b border-border mb-6">
        <button
          onClick={() => setActiveTab('product')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'product' ? 'border-accent text-accent' : 'border-transparent text-text2 hover:text-text1'
          }`}
        >
          <div className="flex items-center"><ImageIcon size={18} className="mr-2" /> 상품 일반 사진 ({productImages.length}/12)</div>
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'source' ? 'border-gold text-gold' : 'border-transparent text-text2 hover:text-text1'
          }`}
        >
          <div className="flex items-center"><FileText size={18} className="mr-2" /> AI 변환용 원본 자료</div>
        </button>
      </div>

      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />

      {activeTab === 'product' ? (
        <div className="space-y-6">
          <div 
            onClick={triggerUpload}
            className="border-2 border-dashed border-border2 hover:border-accent/50 rounded-2xl bg-surface/50 p-12 text-center transition-colors cursor-pointer group"
          >
            <div className="mx-auto w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="text-text2 group-hover:text-accent" size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2">클릭하거나 파일 선택</h3>
            <p className="text-text3 text-sm">JPG, PNG, WEBP 지원 / 장당 최대 20MB</p>
          </div>
          
          {productImages.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {productImages.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-surface">
                  <img src={img} alt={`상품 ${i+1}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 rounded flex items-center justify-center text-white text-xs px-2 py-1 shadow">
                    {i + 1}
                  </div>
                  <button 
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['특징·성분표 (엑셀/메모)', '인증서·수상 내역 (사진)', '상품 구성 (수기/사진)', '브랜드·스토리 (배경사진)'].map((label, i) => (
            <div key={i} className="bg-surface rounded-2xl p-6 border border-border">
              <h4 className="font-bold mb-2">{label}</h4>
              <p className="text-sm text-text3 mb-4">여기에 올린 자료는 AI가 자동으로 예쁜 상세페이지 이미지로 재탄생시킵니다.</p>
              <button onClick={triggerUpload} className="w-full py-3 bg-background border border-border2 rounded-xl text-text2 hover:text-white hover:border-text3 transition-colors flex items-center justify-center text-sm">
                <UploadCloud size={16} className="mr-2" />
                자료 업로드
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
        <button onClick={() => setCurrentStep(1)} className="text-text3 hover:text-text1 transition-colors">이전으로</button>
        <button onClick={handleNext} className="flex items-center px-8 py-4 rounded-xl font-bold transition-all bg-white text-background hover:bg-gray-200 shadow-xl">
          다음 단계로
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};
