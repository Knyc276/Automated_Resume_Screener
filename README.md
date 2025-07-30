# 🎯 Automated Resume Screener - ATS System

A comprehensive web-based Applicant Tracking System (ATS) that simulates modern recruitment screening processes. This tool helps HR professionals and recruiters efficiently analyze, score, and rank resumes against job requirements.

![ATS Dashboard](https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🌐 Live Preview

**Try the live application:** [https://thriving-meerkat-61b58a.netlify.app](https://thriving-meerkat-61b58a.netlify.app)

Experience the full functionality of the Automated Resume Screener directly in your browser:
- Upload sample resumes or paste resume text
- Create job descriptions with automatic keyword extraction
- View detailed candidate analysis with improvement recommendations
- Export comprehensive screening results to CSV
- Explore interactive documentation and examples

The live preview includes sample data and demonstrates all features of the ATS system, making it easy to understand the capabilities before implementation.

## 🚀 Features

### Core Functionality
- **Resume Parsing & Analysis**: Extract key information from resume text including contact details, skills, experience, education, and certifications
- **Job Description Processing**: Intelligent keyword extraction and requirement analysis
- **Smart Matching Algorithm**: Multi-weighted scoring system (Skills: 40%, Experience: 30%, Completeness: 20%, ATS Formatting: 10%)
- **Real-time Scoring**: Instant candidate evaluation with customizable thresholds
- **Export Capabilities**: Generate detailed CSV reports with candidate analytics

### Advanced Analysis
- **Strengths & Weaknesses**: Comprehensive resume evaluation with actionable insights
- **Improvement Recommendations**: Priority-based suggestions for resume optimization
- **ATS Compatibility Check**: Formatting analysis and compliance scoring
- **Skills Gap Analysis**: Identify missing critical skills and irrelevant competencies
- **Content Quality Assessment**: Evaluate achievements, metrics, and readability

### User Experience
- **Professional Dashboard**: Clean, modern interface designed for HR professionals
- **Interactive Results Table**: Sortable, filterable candidate management
- **Detailed Candidate Profiles**: In-depth analysis with visual indicators
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live scoring and filtering capabilities

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot reload with ESLint integration

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd automated-resume-screener

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📖 User Guide

### 1. Upload Resumes

**File Upload Method:**
- Drag and drop TXT files into the upload zone
- Click "Browse Files" to select multiple resume files
- Supported format: Plain text (.txt)

**Manual Entry Method:**
- Paste resume content directly into the text area
- Include all sections: name, contact, skills, experience, education
- Click "Add Resume" to process

**Sample Resume Format:**
```
John Doe
Email: john.doe@email.com
Phone: (555) 123-4567

SKILLS
JavaScript, React, Python, Node.js, SQL, Git, AWS

EXPERIENCE
Senior Developer at TechCorp (2020-2023)
- Developed web applications using React and Node.js
- Improved application performance by 40%
- Led team of 5 developers

EDUCATION
Bachelor of Computer Science, University of Technology (2018)

CERTIFICATIONS
AWS Certified Developer
```

### 2. Define Job Requirements

**Job Description Entry:**
- Enter job title and company name
- Paste complete job description including responsibilities and requirements
- Add specific skills and requirements as tags
- Use "Load Sample Job" for demonstration

**Keyword Extraction:**
The system automatically extracts:
- Technical skills (JavaScript, Python, React, etc.)
- Soft skills (leadership, communication, teamwork)
- Experience requirements (years, specific roles)
- Education requirements (degrees, certifications)
- Tools and technologies

### 3. Review Results

**Dashboard Metrics:**
- Total resumes processed
- Number of qualified candidates
- Qualification rate percentage
- Average match score

**Results Table Features:**
- Sort by score or candidate name
- Filter by qualification status (All, Qualified, Rejected)
- View detailed candidate profiles
- Export results to CSV

**Score Interpretation:**
- **80-100%**: Excellent match (Green)
- **60-79%**: Good match (Yellow)
- **Below 60%**: Poor match (Red)

### 4. Candidate Analysis

**Detailed Profile Includes:**
- Overall assessment with breakdown scores
- Contact information and basic details
- Matched skills and missing critical skills
- Strengths and areas for improvement
- ATS compatibility analysis
- Priority-based improvement recommendations

## 🔧 Configuration

### Scoring Weights

The default scoring algorithm uses these weights:

```typescript
const SCORING_WEIGHTS = {
  skills: 40,      // Skills matching
  experience: 30,  // Experience relevance
  sections: 20,    // Resume completeness
  formatting: 10   // ATS compatibility
};
```

### Threshold Settings

- **Default Qualification Threshold**: 60%
- **Adjustable Range**: 0-100%
- **Real-time Updates**: Changes apply immediately

## 📊 API Reference

### Core Functions

#### `analyzeResume(content: string, jobKeywords: string[]): ResumeAnalysis`

Analyzes resume content and extracts structured information.

**Parameters:**
- `content`: Raw resume text
- `jobKeywords`: Array of job-related keywords

**Returns:**
```typescript
interface ResumeAnalysis {
  name: string;
  contact: { email: string; phone: string };
  skills: string[];
  experience: string[];
  education: string[];
  certifications: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: ResumeRecommendation[];
  detailedAnalysis: DetailedAnalysis;
}
```

#### `scoreResume(analysis: ResumeAnalysis, jobKeywords: string[]): ScoreResult`

Calculates match score based on analysis and job requirements.

**Returns:**
```typescript
interface ScoreResult {
  percentage: number;
  matchedKeywords: string[];
  details: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    totalPossible: number;
  };
}
```

#### `extractKeywords(jobDescription: string): string[]`

Extracts relevant keywords from job description text.

**Features:**
- Technical skill recognition
- Soft skill identification
- Experience pattern matching
- Education requirement extraction

### Data Types

#### Resume Interface
```typescript
interface Resume {
  id: string;
  filename: string;
  content: string;
  uploadedAt: Date;
}
```

#### Job Description Interface
```typescript
interface JobDescriptionData {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  preferredSkills?: string[];
  experienceLevel?: string;
  industry?: string;
}
```

#### Scored Resume Interface
```typescript
interface ScoredResume extends Resume {
  score: number;
  matchedKeywords: string[];
  analysis: ResumeAnalysis;
  status: 'qualified' | 'rejected';
}
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS with a custom design system:

```css
/* Primary Colors */
--color-primary: #2563EB;
--color-success: #059669;
--color-warning: #D97706;
--color-error: #DC2626;

/* Typography */
--font-family: 'Inter', system-ui, sans-serif;
--font-size-base: 14px;
--line-height-base: 1.5;
```

### Adding New Analysis Features

1. **Extend ResumeAnalysis Interface:**
```typescript
interface ResumeAnalysis {
  // ... existing fields
  customField: CustomAnalysis;
}
```

2. **Update Analysis Function:**
```typescript
const analyzeResume = (content: string): ResumeAnalysis => {
  // ... existing analysis
  const customField = performCustomAnalysis(content);
  
  return {
    // ... existing fields
    customField
  };
};
```

3. **Update UI Components:**
Add new sections to `ResultsTable.tsx` to display custom analysis.

## 📈 Performance Optimization

### Best Practices

1. **Large Resume Sets**: Process resumes in batches for better performance
2. **Memory Management**: Clear processed data when switching job descriptions
3. **Caching**: Results are cached until job description changes
4. **Responsive Design**: Optimized for various screen sizes

### Monitoring

The application includes built-in performance monitoring:
- Processing time tracking
- Memory usage indicators
- Real-time status updates

## 🔒 Security Considerations

### Data Privacy
- All processing happens client-side
- No resume data is sent to external servers
- Local storage only for temporary caching

### Input Validation
- File type restrictions (TXT only)
- Content sanitization
- Size limits for uploaded files

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload single resume file
- [ ] Upload multiple resume files
- [ ] Manual resume entry
- [ ] Job description processing
- [ ] Score calculation accuracy
- [ ] Threshold adjustment
- [ ] Export functionality
- [ ] Responsive design
- [ ] Error handling

### Test Data

Use the provided sample job description and create test resumes with:
- Varying skill matches (high, medium, low)
- Different experience levels
- Various formatting styles
- Missing sections

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment Options

1. **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
2. **CDN**: Use with CloudFlare or AWS CloudFront
3. **Docker**: Containerize for consistent deployment

### Environment Variables

```env
# Optional: Analytics tracking
VITE_ANALYTICS_ID=your-analytics-id

# Optional: Error reporting
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Commit with descriptive messages
5. Push to branch: `git push origin feature/new-feature`
6. Create Pull Request

### Code Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write descriptive component names
- Add JSDoc comments for complex functions
- Maintain consistent formatting

### Adding New Features

1. **Analysis Features**: Extend the `analyzeResume` function
2. **UI Components**: Create reusable components in `/components`
3. **Utilities**: Add helper functions in `/utils`
4. **Types**: Update interfaces in `/types.ts`

## 📞 Support

### Common Issues

**Q: Resume not parsing correctly?**
A: Ensure resume is in plain text format with clear section headers (Skills, Experience, Education).

**Q: Low match scores for qualified candidates?**
A: Check if job description includes specific keywords that match resume content.

**Q: Export not working?**
A: Ensure you have processed resumes and results are available before exporting.

### Getting Help

- Check the documentation above
- Review sample data and formats
- Test with provided examples
- Verify browser compatibility

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- UI components inspired by modern ATS systems
- Icons provided by Lucide React
- Sample images from Pexels

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Compatibility**: Modern browsers, Node.js 16+