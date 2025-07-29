# 📚 API Reference

## Core Functions

### Resume Analysis

#### `analyzeResume(content: string, jobKeywords?: string[]): ResumeAnalysis`

Analyzes resume content and extracts structured information including contact details, skills, experience, and generates improvement recommendations.

**Parameters:**
- `content` (string): Raw resume text content
- `jobKeywords` (string[], optional): Array of job-related keywords for enhanced analysis

**Returns:** `ResumeAnalysis` object

**Example:**
```typescript
const resumeContent = `
John Doe
Email: john@example.com
Skills: JavaScript, React, Python
Experience: Senior Developer at TechCorp
`;

const jobKeywords = ['JavaScript', 'React', 'Node.js'];
const analysis = analyzeResume(resumeContent, jobKeywords);

console.log(analysis.name); // "John Doe"
console.log(analysis.skills); // ["JavaScript", "React", "Python"]
console.log(analysis.strengths); // Array of identified strengths
```

### Scoring System

#### `scoreResume(analysis: ResumeAnalysis, jobKeywords: string[]): ScoreResult`

Calculates a comprehensive match score based on resume analysis and job requirements using weighted scoring algorithm.

**Scoring Weights:**
- Skills Match: 40%
- Experience Match: 30%
- Section Completeness: 20%
- ATS Formatting: 10%

**Parameters:**
- `analysis` (ResumeAnalysis): Result from analyzeResume function
- `jobKeywords` (string[]): Array of job requirement keywords

**Returns:** `ScoreResult` object

**Example:**
```typescript
const score = scoreResume(analysis, jobKeywords);

console.log(score.percentage); // 75
console.log(score.matchedKeywords); // ["JavaScript", "React"]
console.log(score.details.skillsMatch); // 30 (out of 40 possible)
```

### Keyword Extraction

#### `extractKeywords(jobDescription: string): string[]`

Extracts relevant keywords from job description text using NLP techniques and predefined skill databases.

**Features:**
- Technical skill recognition (500+ skills)
- Soft skill identification
- Experience pattern matching
- Education requirement extraction
- Tool and technology detection

**Parameters:**
- `jobDescription` (string): Complete job description text

**Returns:** Array of extracted keywords

**Example:**
```typescript
const jobDesc = `
We need a Senior React Developer with 5+ years experience.
Must know JavaScript, TypeScript, and Node.js.
Bachelor's degree in Computer Science preferred.
`;

const keywords = extractKeywords(jobDesc);
// Returns: ["React", "JavaScript", "TypeScript", "Node.js", "5+ years experience", "Bachelor", "Computer Science"]
```

### Export Utilities

#### `exportToCSV(scoredResumes: ScoredResume[], jobDescription: JobDescriptionData | null): void`

Generates and downloads a CSV file containing detailed candidate analysis results.

**CSV Columns:**
- Candidate Name
- Filename
- Match Score (%)
- Status
- Email
- Phone
- Matched Keywords
- Total Skills
- Education
- Certifications
- ATS Friendly
- Issues
- Upload Date

**Parameters:**
- `scoredResumes` (ScoredResume[]): Array of analyzed and scored resumes
- `jobDescription` (JobDescriptionData | null): Job description metadata

**Example:**
```typescript
exportToCSV(scoredResumes, jobDescription);
// Downloads: resume_screening_results_2025-01-XX.csv
```

## Data Interfaces

### ResumeAnalysis

Complete analysis result for a single resume.

```typescript
interface ResumeAnalysis {
  name: string;                           // Extracted candidate name
  contact: {                              // Contact information
    email: string;
    phone: string;
  };
  skills: string[];                       // Identified technical skills
  experience: string[];                   // Work experience entries
  education: string[];                    // Education background
  certifications: string[];              // Professional certifications
  languages: string[];                   // Language skills
  sections: {                            // Section completeness check
    hasContactInfo: boolean;
    hasSkills: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
  };
  formatting: {                          // ATS compatibility
    isATSFriendly: boolean;
    issues: string[];
  };
  strengths: string[];                   // Identified strengths
  weaknesses: string[];                  // Areas for improvement
  recommendations: ResumeRecommendation[]; // Improvement suggestions
  detailedAnalysis: DetailedAnalysis;    // Comprehensive metrics
}
```

### ResumeRecommendation

Structured improvement recommendation for resume optimization.

```typescript
interface ResumeRecommendation {
  category: 'skills' | 'experience' | 'education' | 'formatting' | 'content' | 'keywords';
  priority: 'high' | 'medium' | 'low';
  title: string;                         // Recommendation title
  description: string;                   // Detailed explanation
  impact: string;                        // Expected improvement impact
  actionItems: string[];                 // Specific steps to take
}
```

### DetailedAnalysis

Comprehensive metrics and analysis breakdown.

```typescript
interface DetailedAnalysis {
  skillsAnalysis: {
    totalSkills: number;                 // Total skills found
    matchedSkills: number;               // Skills matching job requirements
    missingCriticalSkills: string[];     // Required skills not found
    relevantSkills: string[];            // Job-relevant skills identified
    irrelevantSkills: string[];          // Skills not relevant to job
  };
  experienceAnalysis: {
    totalYears: number;                  // Estimated years of experience
    relevantExperience: string[];        // Job-relevant experience
    experienceGaps: string[];            // Missing experience areas
    industryMatch: boolean;              // Industry alignment
  };
  contentQuality: {
    wordCount: number;                   // Total word count
    readabilityScore: number;            // Content readability (0-100)
    hasQuantifiableAchievements: boolean; // Contains metrics/numbers
    achievementCount: number;            // Number of quantified achievements
  };
  atsCompatibility: {
    score: number;                       // ATS compatibility score (0-100)
    passedChecks: string[];              // Passed formatting checks
    failedChecks: string[];              // Failed formatting checks
  };
}
```

### ScoreResult

Detailed scoring breakdown for a resume.

```typescript
interface ScoreResult {
  percentage: number;                    // Overall match percentage (0-100)
  matchedKeywords: string[];             // Keywords found in resume
  details: {
    skillsMatch: number;                 // Skills component score
    experienceMatch: number;             // Experience component score
    educationMatch: number;              // Education/completeness score
    totalPossible: number;               // Maximum possible score
  };
}
```

### ScoredResume

Complete resume with analysis and scoring results.

```typescript
interface ScoredResume extends Resume {
  score: number;                         // Overall match score (0-100)
  matchedKeywords: string[];             // Matched job keywords
  analysis: ResumeAnalysis;              // Complete analysis results
  status: 'qualified' | 'rejected';     // Qualification status
}
```

## Analysis Algorithms

### Skill Extraction Algorithm

The system uses multiple techniques to identify skills:

1. **Dictionary Matching**: 500+ predefined technical skills
2. **Context Analysis**: Skills mentioned in context (e.g., "experience with React")
3. **Pattern Recognition**: Common skill formats and abbreviations
4. **Section-based Extraction**: Dedicated skills sections

### Experience Analysis

Experience evaluation considers:

1. **Years Calculation**: Pattern matching for "X years" expressions
2. **Relevance Scoring**: Job title and description matching
3. **Industry Alignment**: Domain-specific terminology
4. **Achievement Quantification**: Metrics and measurable results

### ATS Compatibility Checks

The system evaluates:

1. **Contact Information**: Presence and format
2. **Section Headers**: Standard naming conventions
3. **Special Characters**: Problematic formatting elements
4. **Content Length**: Appropriate resume length
5. **Achievement Quantification**: Measurable accomplishments

### Recommendation Engine

Generates suggestions based on:

1. **Gap Analysis**: Missing vs. required skills
2. **Content Quality**: Achievement quantification
3. **Formatting Issues**: ATS compatibility problems
4. **Keyword Optimization**: Job description alignment
5. **Section Completeness**: Missing resume sections

## Error Handling

### Common Error Scenarios

```typescript
// Empty or invalid content
try {
  const analysis = analyzeResume("");
} catch (error) {
  console.error("Invalid resume content");
}

// Missing job keywords
const score = scoreResume(analysis, []); // Returns 0% score

// Export with no data
exportToCSV([], null); // No-op, doesn't generate file
```

### Validation Rules

1. **Resume Content**: Must be non-empty string
2. **Job Keywords**: Array of strings (can be empty)
3. **File Uploads**: Text files only, size limits apply
4. **Score Thresholds**: Must be between 0-100

## Performance Considerations

### Optimization Tips

1. **Batch Processing**: Process multiple resumes efficiently
2. **Caching**: Results cached until job description changes
3. **Memory Management**: Large text content handling
4. **Real-time Updates**: Debounced threshold changes

### Scalability

- **Client-side Processing**: No server dependencies
- **Memory Efficient**: Streaming text analysis
- **Responsive UI**: Progressive loading for large datasets
- **Export Optimization**: Chunked CSV generation

## Integration Examples

### Basic Usage

```typescript
import { analyzeResume, scoreResume, extractKeywords } from './utils/resumeAnalyzer';

// 1. Extract job requirements
const jobDescription = "React developer with 3+ years experience...";
const jobKeywords = extractKeywords(jobDescription);

// 2. Analyze resume
const resumeText = "John Doe, React Developer...";
const analysis = analyzeResume(resumeText, jobKeywords);

// 3. Calculate score
const score = scoreResume(analysis, jobKeywords);

// 4. Make decision
const isQualified = score.percentage >= 60;
```

### Advanced Workflow

```typescript
// Process multiple resumes
const processResumes = async (resumes: Resume[], jobDesc: string) => {
  const keywords = extractKeywords(jobDesc);
  const results: ScoredResume[] = [];
  
  for (const resume of resumes) {
    const analysis = analyzeResume(resume.content, keywords);
    const score = scoreResume(analysis, keywords);
    
    results.push({
      ...resume,
      score: score.percentage,
      matchedKeywords: score.matchedKeywords,
      analysis,
      status: score.percentage >= 60 ? 'qualified' : 'rejected'
    });
  }
  
  // Sort by score
  return results.sort((a, b) => b.score - a.score);
};
```