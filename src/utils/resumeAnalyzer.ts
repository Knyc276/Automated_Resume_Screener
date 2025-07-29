import { ResumeAnalysis } from '../types';

export const analyzeResume = (content: string, jobKeywords: string[] = []): ResumeAnalysis => {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const contentLower = content.toLowerCase();

  // Extract name (usually first non-empty line or line with "name")
  const name = extractName(lines, content);

  // Extract contact information
  const contact = extractContact(content);

  // Extract skills
  const skills = extractSkills(content);

  // Extract experience
  const experience = extractExperience(content);

  // Extract education
  const education = extractEducation(content);

  // Extract certifications
  const certifications = extractCertifications(content);

  // Extract languages
  const languages = extractLanguages(content);

  // Check sections
  const sections = {
    hasContactInfo: !!(contact.email || contact.phone),
    hasSkills: skills.length > 0,
    hasExperience: experience.length > 0,
    hasEducation: education.length > 0
  };

  // Check ATS formatting
  const formatting = checkATSFormatting(content);

  // Generate detailed analysis
  const detailedAnalysis = generateDetailedAnalysis(content, skills, experience, jobKeywords);

  // Generate strengths and weaknesses
  const { strengths, weaknesses } = analyzeStrengthsWeaknesses(
    { name, contact, skills, experience, education, certifications, sections, formatting, detailedAnalysis },
    jobKeywords
  );

  // Generate recommendations
  const recommendations = generateRecommendations(
    { name, contact, skills, experience, education, certifications, sections, formatting, detailedAnalysis },
    jobKeywords,
    strengths,
    weaknesses
  );
  return {
    name,
    contact,
    skills,
    experience,
    education,
    certifications,
    languages,
    sections,
    formatting,
    strengths,
    weaknesses,
    recommendations,
    detailedAnalysis
  };
};

const extractName = (lines: string[], content: string): string => {
  // Look for explicit name patterns
  const namePatterns = [
    /name[:\s]+([a-zA-Z\s]+)/i,
    /^([A-Z][a-z]+ [A-Z][a-z]+)/,
    /^([A-Z][a-z]+ [A-Z]\. [A-Z][a-z]+)/
  ];

  for (const pattern of namePatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // If no pattern found, use first line that looks like a name
  for (const line of lines) {
    if (line.match(/^[A-Z][a-z]+ [A-Z][a-z]+/) && line.length < 50) {
      return line;
    }
  }

  return '';
};

const extractContact = (content: string) => {
  const emailMatch = content.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const phoneMatch = content.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/);

  return {
    email: emailMatch ? emailMatch[1] : '',
    phone: phoneMatch ? phoneMatch[1] : ''
  };
};

const extractSkills = (content: string): string[] => {
  const skills: string[] = [];
  const contentLower = content.toLowerCase();

  // Common skill keywords
  const skillKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'nodejs',
    'typescript', 'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql',
    'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'linux', 'windows',
    'photoshop', 'illustrator', 'figma', 'sketch', 'adobe', 'wordpress',
    'bootstrap', 'tailwind', 'sass', 'less', 'webpack', 'vite', 'gulp',
    'redux', 'graphql', 'rest', 'api', 'microservices', 'agile', 'scrum',
    'machine learning', 'ai', 'data science', 'tensorflow', 'pytorch',
    'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'flutter',
    'express', 'django', 'flask', 'spring', 'laravel', 'rails'
  ];

  // Look for skills section
  const skillsSection = extractSection(content, ['skills', 'technical skills', 'technologies']);
  if (skillsSection) {
    const sectionSkills = extractSkillsFromText(skillsSection);
    skills.push(...sectionSkills);
  }

  // Look for skills mentioned throughout the resume
  for (const keyword of skillKeywords) {
    if (contentLower.includes(keyword)) {
      const properCase = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      if (!skills.some(s => s.toLowerCase() === keyword)) {
        skills.push(properCase);
      }
    }
  }

  return [...new Set(skills)]; // Remove duplicates
};

const extractSkillsFromText = (text: string): string[] => {
  const skills: string[] = [];
  
  // Split by common delimiters
  const parts = text.split(/[,•\n\|\-]/);
  
  for (const part of parts) {
    const skill = part.trim().replace(/[^\w\s\.\+#]/g, '');
    if (skill.length > 1 && skill.length < 30) {
      skills.push(skill);
    }
  }
  
  return skills.filter(s => s.length > 0);
};

const extractExperience = (content: string): string[] => {
  const experience: string[] = [];
  const experienceSection = extractSection(content, [
    'experience', 'work experience', 'professional experience', 'employment', 'career'
  ]);

  if (experienceSection) {
    const jobs = experienceSection.split(/\n\s*\n/).filter(job => job.trim().length > 0);
    experience.push(...jobs.map(job => job.trim()));
  }

  return experience;
};

const extractEducation = (content: string): string[] => {
  const education: string[] = [];
  const educationSection = extractSection(content, ['education', 'academic', 'qualifications']);

  if (educationSection) {
    const degrees = educationSection.split(/\n/).filter(line => line.trim().length > 0);
    education.push(...degrees.map(degree => degree.trim()));
  }

  return education;
};

const extractCertifications = (content: string): string[] => {
  const certifications: string[] = [];
  const certSection = extractSection(content, [
    'certifications', 'certificates', 'professional certifications', 'licenses'
  ]);

  if (certSection) {
    const certs = certSection.split(/\n/).filter(line => line.trim().length > 0);
    certifications.push(...certs.map(cert => cert.trim()));
  }

  return certifications;
};

const extractLanguages = (content: string): string[] => {
  const languages: string[] = [];
  const langSection = extractSection(content, ['languages', 'language skills']);

  if (langSection) {
    const langs = langSection.split(/[,\n]/).filter(lang => lang.trim().length > 0);
    languages.push(...langs.map(lang => lang.trim()));
  }

  return languages;
};

const extractSection = (content: string, sectionNames: string[]): string | null => {
  const contentLower = content.toLowerCase();
  
  for (const sectionName of sectionNames) {
    const regex = new RegExp(`\\b${sectionName}\\b[:\n]([\\s\\S]*?)(?=\\n\\s*\\b(?:experience|education|skills|certifications|projects|contact|summary|objective)\\b|$)`, 'i');
    const match = contentLower.match(regex);
    
    if (match) {
      // Find the original case version
      const startIndex = contentLower.indexOf(match[0]);
      const endIndex = startIndex + match[0].length;
      return content.substring(startIndex, endIndex).replace(new RegExp(`\\b${sectionName}\\b[:\n]`, 'i'), '').trim();
    }
  }
  
  return null;
};

const checkATSFormatting = (content: string) => {
  const issues: string[] = [];
  let isATSFriendly = true;

  // Check for problematic characters
  if (content.includes('\t')) {
    issues.push('Contains tab characters - use spaces instead');
    isATSFriendly = false;
  }

  // Check for very long lines (might indicate tables)
  const lines = content.split('\n');
  const longLines = lines.filter(line => line.length > 120);
  if (longLines.length > lines.length * 0.1) {
    issues.push('Contains very long lines - may indicate table formatting');
    isATSFriendly = false;
  }

  // Check for missing contact info
  const hasEmail = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (!hasEmail) {
    issues.push('Missing email address');
    isATSFriendly = false;
  }

  // Check for special characters that might cause issues
  const problematicChars = content.match(/[""''–—]/g);
  if (problematicChars && problematicChars.length > 5) {
    issues.push('Contains special characters that may not parse correctly');
    isATSFriendly = false;
  }

  return {
    isATSFriendly,
    issues
  };
};

const generateDetailedAnalysis = (content: string, skills: string[], experience: string[], jobKeywords: string[]) => {
  const contentLower = content.toLowerCase();
  const wordCount = content.split(/\s+/).length;
  
  // Skills analysis
  const matchedSkills = skills.filter(skill => 
    jobKeywords.some(keyword => 
      skill.toLowerCase().includes(keyword.toLowerCase()) || 
      keyword.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  const missingCriticalSkills = jobKeywords.filter(keyword => 
    !skills.some(skill => 
      skill.toLowerCase().includes(keyword.toLowerCase()) || 
      keyword.toLowerCase().includes(skill.toLowerCase())
    )
  );

  // Experience analysis
  const experienceText = experience.join(' ').toLowerCase();
  const yearMatches = content.match(/(\d+)\+?\s*years?/gi) || [];
  const totalYears = yearMatches.length > 0 ? 
    Math.max(...yearMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0'))) : 0;

  // Content quality analysis
  const achievementPatterns = [
    /increased?.*?(\d+%|\d+x)/gi,
    /reduced?.*?(\d+%|\d+ hours?)/gi,
    /improved?.*?(\d+%)/gi,
    /managed?.*?(\d+)/gi,
    /led.*?(\d+)/gi,
    /achieved?.*?(\d+)/gi
  ];
  
  let achievementCount = 0;
  achievementPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) achievementCount += matches.length;
  });

  // ATS compatibility score
  const atsChecks = [
    { check: 'Has contact information', passed: !!(extractContact(content).email || extractContact(content).phone) },
    { check: 'Uses standard section headers', passed: /\b(experience|education|skills)\b/i.test(content) },
    { check: 'No special characters', passed: !/[""''–—]/g.test(content) },
    { check: 'Reasonable length', passed: wordCount >= 200 && wordCount <= 800 },
    { check: 'Has quantifiable achievements', passed: achievementCount > 0 }
  ];

  const passedChecks = atsChecks.filter(check => check.passed).map(check => check.check);
  const failedChecks = atsChecks.filter(check => !check.passed).map(check => check.check);
  const atsScore = Math.round((passedChecks.length / atsChecks.length) * 100);

  return {
    skillsAnalysis: {
      totalSkills: skills.length,
      matchedSkills: matchedSkills.length,
      missingCriticalSkills: missingCriticalSkills.slice(0, 10),
      relevantSkills: matchedSkills,
      irrelevantSkills: skills.filter(skill => !matchedSkills.includes(skill)).slice(0, 5)
    },
    experienceAnalysis: {
      totalYears,
      relevantExperience: experience.filter(exp => 
        jobKeywords.some(keyword => exp.toLowerCase().includes(keyword.toLowerCase()))
      ),
      experienceGaps: jobKeywords.filter(keyword => 
        !experienceText.includes(keyword.toLowerCase())
      ).slice(0, 5),
      industryMatch: jobKeywords.some(keyword => experienceText.includes(keyword.toLowerCase()))
    },
    contentQuality: {
      wordCount,
      readabilityScore: Math.min(100, Math.max(0, 100 - (wordCount / 10))), // Simple readability metric
      hasQuantifiableAchievements: achievementCount > 0,
      achievementCount
    },
    atsCompatibility: {
      score: atsScore,
      passedChecks,
      failedChecks
    }
  };
};

const analyzeStrengthsWeaknesses = (analysis: any, jobKeywords: string[]) => {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Analyze strengths
  if (analysis.detailedAnalysis.skillsAnalysis.matchedSkills > 0) {
    strengths.push(`Strong skill match with ${analysis.detailedAnalysis.skillsAnalysis.matchedSkills} relevant skills identified`);
  }
  
  if (analysis.detailedAnalysis.contentQuality.hasQuantifiableAchievements) {
    strengths.push(`Includes ${analysis.detailedAnalysis.contentQuality.achievementCount} quantifiable achievements`);
  }
  
  if (analysis.detailedAnalysis.atsCompatibility.score >= 80) {
    strengths.push('Excellent ATS compatibility with proper formatting');
  }
  
  if (analysis.sections.hasContactInfo && analysis.sections.hasSkills && analysis.sections.hasExperience) {
    strengths.push('Complete resume with all essential sections');
  }
  
  if (analysis.detailedAnalysis.experienceAnalysis.totalYears >= 3) {
    strengths.push(`Substantial experience with ${analysis.detailedAnalysis.experienceAnalysis.totalYears}+ years`);
  }

  // Analyze weaknesses
  if (analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.length > 0) {
    weaknesses.push(`Missing ${analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.length} critical job-required skills`);
  }
  
  if (!analysis.detailedAnalysis.contentQuality.hasQuantifiableAchievements) {
    weaknesses.push('Lacks quantifiable achievements and measurable results');
  }
  
  if (analysis.detailedAnalysis.atsCompatibility.score < 60) {
    weaknesses.push('Poor ATS compatibility may prevent proper parsing');
  }
  
  if (analysis.detailedAnalysis.contentQuality.wordCount < 200) {
    weaknesses.push('Resume too brief - lacks sufficient detail');
  }
  
  if (analysis.detailedAnalysis.experienceAnalysis.experienceGaps.length > 3) {
    weaknesses.push('Limited experience in key job requirement areas');
  }

  return { strengths, weaknesses };
};

const generateRecommendations = (analysis: any, jobKeywords: string[], strengths: string[], weaknesses: string[]) => {
  const recommendations: any[] = [];

  // Skills recommendations
  if (analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.length > 0) {
    recommendations.push({
      category: 'skills',
      priority: 'high',
      title: 'Add Missing Critical Skills',
      description: 'Your resume is missing several skills that are essential for this position.',
      impact: `Could increase your match score by up to ${Math.min(30, analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.length * 3)}%`,
      actionItems: [
        `Add these critical skills to your skills section: ${analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.slice(0, 5).join(', ')}`,
        'Include examples of how you\'ve used these skills in your experience section',
        'Consider taking courses or certifications in missing areas'
      ]
    });
  }

  // Experience recommendations
  if (analysis.detailedAnalysis.experienceAnalysis.experienceGaps.length > 0) {
    recommendations.push({
      category: 'experience',
      priority: 'high',
      title: 'Highlight Relevant Experience',
      description: 'Your experience section could better emphasize job-relevant accomplishments.',
      impact: 'Could increase experience match score by 15-25%',
      actionItems: [
        'Rewrite job descriptions to emphasize relevant technologies and methodologies',
        'Add specific projects that demonstrate required skills',
        'Include metrics and quantifiable results where possible'
      ]
    });
  }

  // Content quality recommendations
  if (!analysis.detailedAnalysis.contentQuality.hasQuantifiableAchievements) {
    recommendations.push({
      category: 'content',
      priority: 'high',
      title: 'Add Quantifiable Achievements',
      description: 'Your resume lacks specific, measurable accomplishments that demonstrate impact.',
      impact: 'Could significantly improve recruiter interest and ATS ranking',
      actionItems: [
        'Add specific numbers, percentages, and metrics to your accomplishments',
        'Use action verbs like "increased," "reduced," "improved," "managed"',
        'Include before/after comparisons where possible',
        'Quantify team sizes, budgets, timelines, and results'
      ]
    });
  }

  // ATS formatting recommendations
  if (analysis.detailedAnalysis.atsCompatibility.score < 70) {
    recommendations.push({
      category: 'formatting',
      priority: 'medium',
      title: 'Improve ATS Compatibility',
      description: 'Your resume formatting may prevent proper parsing by ATS systems.',
      impact: 'Essential for ensuring your resume is properly read by applicant tracking systems',
      actionItems: [
        'Use standard section headers (Experience, Education, Skills)',
        'Avoid tables, text boxes, and complex formatting',
        'Use standard fonts and simple bullet points',
        'Ensure contact information is clearly visible at the top'
      ]
    });
  }

  // Keyword optimization
  if (analysis.detailedAnalysis.skillsAnalysis.matchedSkills < jobKeywords.length * 0.6) {
    recommendations.push({
      category: 'keywords',
      priority: 'medium',
      title: 'Optimize Keyword Usage',
      description: 'Your resume could better incorporate job-specific keywords and terminology.',
      impact: 'Could improve keyword matching score by 10-20%',
      actionItems: [
        'Naturally incorporate job posting keywords throughout your resume',
        'Use industry-standard terminology and acronyms',
        'Mirror the language used in the job description',
        'Include both spelled-out terms and abbreviations (e.g., "Search Engine Optimization (SEO)")'
      ]
    });
  }

  // Content length recommendations
  if (analysis.detailedAnalysis.contentQuality.wordCount < 300) {
    recommendations.push({
      category: 'content',
      priority: 'medium',
      title: 'Expand Resume Content',
      description: 'Your resume is too brief and may not provide enough information for proper evaluation.',
      impact: 'More detailed content improves ATS parsing and recruiter assessment',
      actionItems: [
        'Add more detail to your work experience descriptions',
        'Include a professional summary or objective',
        'Expand on your key accomplishments and responsibilities',
        'Add relevant projects, certifications, or volunteer work'
      ]
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const scoreResume = (analysis: ResumeAnalysis, jobKeywords: string[]) => {
  let totalScore = 0;
  let maxScore = 0;
  const matchedKeywords: string[] = [];

  // Skills matching (40% weight)
  const skillsWeight = 40;
  let skillsScore = 0;
  const skillsLower = analysis.skills.map(s => s.toLowerCase());
  
  for (const keyword of jobKeywords) {
    const keywordLower = keyword.toLowerCase();
    if (skillsLower.some(skill => skill.includes(keywordLower) || keywordLower.includes(skill))) {
      skillsScore += 1;
      matchedKeywords.push(keyword);
    }
  }
  
  const skillsPercentage = jobKeywords.length > 0 ? (skillsScore / jobKeywords.length) * skillsWeight : 0;
  totalScore += skillsPercentage;
  maxScore += skillsWeight;

  // Experience matching (30% weight)
  const expWeight = 30;
  let expScore = 0;
  const experienceText = analysis.experience.join(' ').toLowerCase();
  
  for (const keyword of jobKeywords) {
    if (experienceText.includes(keyword.toLowerCase())) {
      expScore += 1;
      if (!matchedKeywords.includes(keyword)) {
        matchedKeywords.push(keyword);
      }
    }
  }
  
  const expPercentage = jobKeywords.length > 0 ? (expScore / jobKeywords.length) * expWeight : 0;
  totalScore += expPercentage;
  maxScore += expWeight;

  // Section completeness (20% weight)
  const sectionWeight = 20;
  let sectionScore = 0;
  const requiredSections = ['hasContactInfo', 'hasSkills', 'hasExperience', 'hasEducation'];
  
  for (const section of requiredSections) {
    if (analysis.sections[section as keyof typeof analysis.sections]) {
      sectionScore += 1;
    }
  }
  
  const sectionPercentage = (sectionScore / requiredSections.length) * sectionWeight;
  totalScore += sectionPercentage;
  maxScore += sectionWeight;

  // ATS formatting (10% weight)
  const formatWeight = 10;
  const formatPercentage = analysis.formatting.isATSFriendly ? formatWeight : 0;
  totalScore += formatPercentage;
  maxScore += formatWeight;

  return {
    percentage: Math.round(totalScore),
    matchedKeywords: [...new Set(matchedKeywords)],
    details: {
      skillsMatch: Math.round(skillsPercentage),
      experienceMatch: Math.round(expPercentage),
      educationMatch: Math.round(sectionPercentage),
      totalPossible: maxScore
    }
  };
};