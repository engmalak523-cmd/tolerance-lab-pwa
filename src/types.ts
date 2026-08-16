export type LabTag = 'SCIENCE' | 'TECH' | 'ENGINEERING';

export interface VocabularyItem {
  term: string;
  definition: string;
}

export interface ProtocolStep {
  title: string;
  body: string;
}

export interface Lab {
  id: string;
  number: string;
  title: string;
  tag: LabTag;
  subtitle: string;
  videoUrl: string;
  materials: string[];
  tools: string[];
  protocol: ProtocolStep[];
  vocabulary: VocabularyItem[];
}

export interface Lesson {
  id: string;
  number: string;
  category: string;
  title: string;
  link: string;
  vocabulary?: string[];
}

export interface PearsonUnit {
  id: string;
  number: string;
  title: string;
  concept: string;
  subtitle: string;
  lessons: Lesson[];
}

export interface LabTracker {
  [labId: string]: {
    done: boolean;
    photo: string | null;
    notes: string;
    checkedMaterials: boolean[];
  };
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  introName: string;
  introRole: string;
  unitsTitle: string;
  unitsSubtitle: string;
  archiveTitle: string;
  archiveSubtitle: string;
  trackerTitle: string;
  trackerSubtitle: string;
  footerText: string;
  units: PearsonUnit[];
  labs: Lab[];
}
