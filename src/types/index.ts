export type StepLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type StyleTheme = 'dark' | 'light' | 'modern';

export type SectionType = 'hero' | 'shipping' | 'review' | 'story' | 'feature' | 'cert' | 'product' | 'caution';

// Input interfaces for components
export interface ShippingInput {
  cutoffTime: string;
  dispatchTime: string;
  deliveryTime: string;
  note: string;
}

export interface FeatureInput {
  title: string;
  desc: string;
  icon: string;
}

export interface CertInput {
  org: string;
  name: string;
  year: string;
  number?: string;
}

export interface SectionData {
  hero?: { name: string; tags: string[]; hook: string; sub: string; price: string };
  shipping?: ShippingInput;
  feature?: { textInput?: FeatureInput[]; tableInput?: any };
  cert?: { textInput?: CertInput[]; extracted?: any };
  product?: { items: any[]; optionInfo: string };
  story?: { headline: string; body: string };
  caution?: { items: any[] };
}

export interface AppState {
  currentStep: StepLevel;
  category: string;
  styleTone: StyleTheme;
  stylePalette: string[];

  // Link Analysis Results
  analyzedPalette?: string[];
  analyzedTone?: string;
  analyzedSections?: any;

  productImages: string[]; // Base64 or Object URLs
  sourceDocs: {
    feature: string[];
    cert: string[];
    composition: string[];
    story: string[];
  };

  aiGeneratedImages: Record<string, string>; // section -> base64
  sectionInputs: SectionData;

  layoutSlots: Record<SectionType, string | null>;

  setCurrentStep: (step: StepLevel) => void;
  setCategory: (cat: string) => void;
  setStyle: (tone: StyleTheme) => void;
  setSourceDocs: (type: keyof AppState['sourceDocs'], files: string[]) => void;
  setProductImages: (files: string[]) => void;
  setSectionInput: (section: keyof SectionData, data: any) => void;
  setGeneratedImage: (section: string, base64: string) => void;
  setLayoutSlot: (slot: SectionType, url: string | null) => void;
  
  generatedCopy: any;
  setGeneratedCopy: (data: any) => void;
  setAnalysisResults: (data: { palette?: string[], tone?: string, sections?: any }) => void;
}
