import { create } from 'zustand';
import type { AppState } from '../types';

export const useAppStore = create<AppState>((set) => ({
  currentStep: 0,
  category: '',
  styleTone: 'dark',
  stylePalette: ['#1a0800','#3d1500','#D4A017','#F5C842','#4caf7d','#faf7f0'],
  
  // Images/Docs
  productImages: [],
  sourceDocs: {
    feature: [],
    cert: [],
    composition: [],
    story: []
  },
  
  // generated items
  aiGeneratedImages: {},
  
  // Form input data per section
  sectionInputs: {},

  // Final layout selection for Step 5
  layoutSlots: {
    hero: null,
    shipping: null,
    review: null,
    story: null,
    feature: null,
    cert: null,
    product: null,
    caution: null
  },

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  setCategory: (cat) => set({ category: cat }),
  setStyle: (tone) => set({ styleTone: tone }),
  setSourceDocs: (type, files) => set((state) => ({ 
    sourceDocs: { ...state.sourceDocs, [type]: files } 
  })),
  setProductImages: (files) => set({ productImages: files }),
  setSectionInput: (section, data) => set((state) => ({
    sectionInputs: { ...state.sectionInputs, [section]: data }
  })),
  setGeneratedImage: (section, base64) => set((state) => ({
    aiGeneratedImages: { ...state.aiGeneratedImages, [section]: base64 }
  })),
  setLayoutSlot: (slot, imgUrl) => set((state) => ({
    layoutSlots: { ...state.layoutSlots, [slot]: imgUrl }
  })),
  
  generatedCopy: null,
  setGeneratedCopy: (data) => set({ generatedCopy: data })
}));
