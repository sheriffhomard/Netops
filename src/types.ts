export type ViewMode =
  | 'tableau-de-bord'
  | 'flashcards'
  | 'glossaire-cloud'
  | 'ateliers-et-labs'
  | 'parcours-certifications'
  | 'simulateur-d-examen'
  | 'terminal-lab-virtuel'
  | 'banque-de-questions'
  | 'analytiques-de-reussite';

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  streakDays: number;
  totalQuestions: number;
  readinessPercentage: number;
  nextMockExam: string;
  precisionGlobal: number;
  avgTimePerQuestion: number;
  labsCompleted: number;
  totalLabs: number;
  vlsmSpeedSeconds: number;
}

export interface CertDomain {
  name: string;
  percentage: number;
  color?: string;
}

export interface CertificationItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  vendor: 'cisco' | 'comptia' | 'juniper' | 'security' | 'cloud';
  level: 'support' | 'associate' | 'professional' | 'expert';
  description: string;
  questionsCount?: number;
  labsCount?: number;
  highlight?: boolean;
  scoreMin?: string;
  durationMin: number;
  thresholdScore: string;
  itemsCount: string;
  blueprintVersion: string;
  readinessPct?: number;
  domains: CertDomain[];
  isEnrolled?: boolean;
  enrolledProgress?: number;
}

export interface ExamQuestion {
  id: number;
  number: number;
  domain: string;
  domainTitle: string;
  statement: string;
  cliSnippet?: {
    hostname: string;
    osVersion: string;
    command: string;
    output: string;
  };
  hasExhibit?: boolean;
  questionQuery: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  isFlagged?: boolean;
}

export interface LabTask {
  id: string;
  title: string;
  description: string;
  specLabel: string;
  specStatus: string;
  isValidated: boolean;
}

export interface LabScenario {
  id: string;
  track: string;
  status: string;
  uid: string;
  title: string;
  description: string;
  tasksCompleted: number;
  totalTasks: number;
  meshLatency: string;
  passScore: string;
  activeDevice: 'R1' | 'SW1' | 'PCA' | 'SVR1';
  tasks: LabTask[];
}

export interface SessionHistoryItem {
  id: string;
  date: string;
  simulation: string;
  score: number;
  status: 'PASS' | 'FAIL';
}

export interface WeaknessRadarItem {
  name: string;
  score: number;
  statusLabel: string;
  actionText?: string;
  actionLink?: string;
  statusType: 'critical' | 'medium' | 'mastered' | 'strong';
}

export interface DailyDrillItem {
  id: string;
  category: string;
  level: string;
  levelBadge: string;
  timeLimit?: string;
  questionsCount: number;
  title: string;
  description: string;
}

export type CloudCategory =
  | 'Réseau & Interconnexion'
  | 'Compute & Conteneurs'
  | 'Stockage & Données'
  | 'Sécurité, IAM & Conformité'
  | 'DevOps, CI/CD & IaC'
  | 'Architecture & FinOps'
  | 'Multi-Cloud & Hybride';

export interface CloudProviderMapping {
  provider: 'AWS' | 'Azure' | 'GCP' | 'CNCF' | 'Standard';
  serviceName: string;
  details?: string;
}

export interface CloudGlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: CloudCategory;
  shortDef: string;
  fullExplanation: string;
  rfcOrStandard?: string;
  providers: CloudProviderMapping[];
  cliExample?: {
    tool: 'aws' | 'az' | 'gcloud' | 'kubectl' | 'terraform';
    command: string;
    description?: string;
  };
  relatedFlashcardKeywords: string[];
  relatedArticleId?: string;
  tags: string[];
}

export interface CloudEncyclopediaArticle {
  id: string;
  title: string;
  subtitle: string;
  category: CloudCategory;
  badge: string;
  readTime: string;
  level: 'Fondamental' | 'Intermédiaire' | 'Avancé' | 'Expert';
  diagramAscii?: string;
  overview: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption?: string;
    };
    callout?: {
      type: 'warning' | 'tip' | 'exam' | 'security';
      text: string;
    };
  }[];
  multiCloudComparison?: {
    feature: string;
    aws: string;
    azure: string;
    gcp: string;
    cncfOrStandard?: string;
  }[];
  relatedGlossaryTermIds: string[];
  flashcardSearchQuery: string;
  flashcardCountHint?: number;
}

export interface UserProfileDoc {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: string;
  streakDays?: number;
  lastStudyDate?: string;
  precisionGlobal?: number;
  labsCompleted?: number;
  targetExam?: string;
  studyHoursTotal?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserFlashcardItem {
  id: string;
  userId: string;
  front: string;
  back: string;
  module: string;
  certTrack?: string;
  tags?: string[];
  difficulty?: 'Facile' | 'Moyen' | 'Difficile';
  state?: 'new' | 'learning' | 'mastered';
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExamResultItem {
  id: string;
  userId: string;
  examCode: string;
  score: number;
  maxScore?: number;
  passingScore?: number;
  passed: boolean;
  durationSeconds?: number;
  totalQuestions?: number;
  correctAnswers?: number;
  completedAt: string;
}

export interface UserStudyNoteItem {
  id: string;
  userId: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}
