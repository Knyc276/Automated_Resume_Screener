export interface Resume {
  id: string;
  filename: string;
  content: string;
  uploadedAt: Date;
}

export interface ResumeAnalysis {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  skills: string[];
  experience: string[];
  education: string[];
  certifications: string[];
  languages: string[];
  sections: {
    hasContactInfo: boolean;
    hasSkills: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
  };
  formatting: {
    isATSFriendly: boolean;
    issues: string[];
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: ResumeRecommendation[];
  detailedAnalysis: DetailedAnalysis;
}

export interface ResumeRecommendation {
  category: 'skills' | 'experience' | 'education' | 'formatting' | 'content' | 'keywords';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  actionItems: string[];
}

export interface DetailedAnalysis {
  skillsAnalysis: {
    totalSkills: number;
    matchedSkills: number;
    missingCriticalSkills: string[];
    relevantSkills: string[];
    irrelevantSkills: string[];
  };
  experienceAnalysis: {
    totalYears: number;
    relevantExperience: string[];
    experienceGaps: string[];
    industryMatch: boolean;
  };
  contentQuality: {
    wordCount: number;
    readabilityScore: number;
    hasQuantifiableAchievements: boolean;
    achievementCount: number;
  };
  atsCompatibility: {
    score: number;
    passedChecks: string[];
    failedChecks: string[];
  };
}
export interface JobDescriptionData {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  preferredSkills: string[];
  experienceLevel: string;
  industry: string;
}

export interface ScoredResume extends Resume {
  score: number;
  matchedKeywords: string[];
  analysis: ResumeAnalysis;
  status: 'qualified' | 'rejected';
}

export interface ScoreResult {
  percentage: number;
  matchedKeywords: string[];
  details: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    totalPossible: number;
  };
}