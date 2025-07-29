# 👥 User Guide

## Getting Started

### Overview

The Automated Resume Screener is a comprehensive ATS (Applicant Tracking System) that helps HR professionals and recruiters efficiently screen and evaluate candidates. This guide will walk you through every feature and help you get the most out of the system.

### Navigation

The application has three main sections accessible via the top navigation tabs:

1. **📤 Upload Resumes** - Add candidate resumes to the system
2. **📋 Job Description** - Define job requirements and criteria
3. **📊 Results** - View, analyze, and export candidate evaluations

## 📤 Upload Resumes

### File Upload Method

The easiest way to add resumes is through file upload:

1. **Drag & Drop**: Simply drag TXT files into the upload zone
2. **Browse Files**: Click "Browse Files" to select multiple files
3. **Supported Formats**: Currently supports plain text (.txt) files

**💡 Tip**: Convert PDF/DOCX resumes to TXT format using online converters or copy-paste the text content.

### Manual Entry Method

For quick testing or when you have resume content as text:

1. Click on the text area under "Or paste resume text"
2. Paste the complete resume content
3. Click "Add Resume" to process

### Resume Format Guidelines

For best results, ensure resumes include these sections:

```
CANDIDATE NAME
Email: candidate@email.com
Phone: (555) 123-4567

SKILLS
JavaScript, React, Python, SQL, Git, AWS

EXPERIENCE
Job Title at Company Name (2020-2023)
• Developed web applications using React and Node.js
• Improved system performance by 40%
• Led team of 5 developers

EDUCATION
Bachelor of Computer Science
University Name (2018)

CERTIFICATIONS
AWS Certified Developer
Google Cloud Professional
```

### Managing Uploaded Resumes

Once uploaded, you can:
- **View Details**: See filename and upload timestamp
- **Remove Resumes**: Click the X button to delete
- **Track Status**: Green checkmark indicates successful processing

## 📋 Job Description

### Creating Job Requirements

1. **Job Title**: Enter the position title (e.g., "Senior Frontend Developer")
2. **Company**: Add company name (optional)
3. **Description**: Paste the complete job description including:
   - Job responsibilities
   - Required qualifications
   - Preferred skills
   - Experience requirements

### Adding Specific Requirements

Use the "Key Skills & Requirements" section to add specific keywords:

1. Type a skill or requirement in the input field
2. Press Enter or click the + button to add
3. Remove items by clicking the X on each tag

**Examples of good requirements:**
- Technical skills: "JavaScript", "React", "Python"
- Experience: "5+ years", "Team leadership"
- Education: "Bachelor's degree", "Computer Science"
- Tools: "Git", "Docker", "AWS"

### Sample Job Description

Click "Load Sample Job" to see a complete example with:
- Detailed job description
- Comprehensive requirements list
- Proper formatting and structure

### Keyword Extraction

The system automatically extracts keywords from your job description:

- **Technical Skills**: Programming languages, frameworks, tools
- **Soft Skills**: Leadership, communication, problem-solving
- **Experience Patterns**: Years of experience, specific roles
- **Education Requirements**: Degrees, certifications
- **Industry Terms**: Domain-specific terminology

## 📊 Results & Analysis

### Dashboard Overview

The dashboard provides key metrics:

- **Total Resumes**: Number of candidates processed
- **Qualified**: Candidates meeting the threshold
- **Qualification Rate**: Percentage of qualified candidates
- **Average Score**: Mean match score across all candidates

### Score Interpretation

Scores are color-coded for quick assessment:

- **🟢 80-100%**: Excellent match - Strong candidate
- **🟡 60-79%**: Good match - Consider for interview
- **🔴 Below 60%**: Poor match - May not meet requirements

### Adjusting Thresholds

Use the score threshold slider to set qualification criteria:

1. Move the slider to adjust the minimum score (0-100%)
2. Results update automatically
3. Dashboard metrics reflect the new threshold

### Filtering Results

Filter candidates by status:
- **All**: Show all processed resumes
- **Qualified**: Only candidates above threshold
- **Rejected**: Only candidates below threshold

### Sorting Options

Click column headers to sort by:
- **Candidate Name**: Alphabetical order
- **Match Score**: Highest to lowest scores

## 🔍 Detailed Candidate Analysis

### Viewing Candidate Details

Click "View Details" on any candidate to see comprehensive analysis:

### Overall Assessment

- **Match Score**: Overall percentage with color coding
- **Status**: Qualified or Rejected based on threshold
- **Skills Ratio**: Matched skills vs. total skills found
- **ATS Score**: Formatting compatibility rating
- **Content Metrics**: Word count and achievement count

### Contact Information

When available, displays:
- Email address with mail icon
- Phone number with phone icon

### Skills Analysis

**Matched Skills**: Skills that align with job requirements (green tags)
**All Skills**: Complete list of identified skills (blue tags)
**Missing Critical Skills**: Required skills not found in resume (amber tags)

### Strengths & Weaknesses

**Strengths Section** (Green):
- Positive aspects with checkmark icons
- Areas where candidate excels
- Competitive advantages

**Areas for Improvement** (Red):
- Weaknesses with X icons
- Specific improvement opportunities
- Gaps to address

### ATS Compatibility Analysis

**Passed Checks** (Green checkmarks):
- Formatting elements that work well
- ATS-friendly features

**Failed Checks** (Red X marks):
- Formatting issues that may cause problems
- Areas needing improvement

### Education & Certifications

When found in the resume:
- **Education**: Degrees, institutions, graduation years
- **Certifications**: Professional certifications and licenses

## 💡 Improvement Recommendations

### Recommendation Categories

The system provides actionable advice in these areas:

1. **Skills**: Adding missing technical competencies
2. **Experience**: Highlighting relevant background
3. **Content**: Improving achievement descriptions
4. **Formatting**: Enhancing ATS compatibility
5. **Keywords**: Optimizing for job requirements

### Priority Levels

**🔴 High Priority**: Critical improvements with significant impact
**🟡 Medium Priority**: Important enhancements for better results
**🔵 Low Priority**: Nice-to-have optimizations

### Recommendation Structure

Each recommendation includes:
- **Title**: Clear description of the improvement
- **Description**: Detailed explanation of the issue
- **Impact**: Expected score improvement
- **Action Items**: Specific steps to implement

### Example Recommendations

**High Priority - Add Missing Critical Skills**
- Impact: "Could increase match score by up to 25%"
- Actions: Add specific technologies to skills section
- Include usage examples in experience descriptions

**Medium Priority - Improve ATS Compatibility**
- Impact: "Essential for proper ATS parsing"
- Actions: Use standard section headers
- Avoid complex formatting and tables

## 📤 Exporting Results

### CSV Export Features

Click "Export Results" to download a comprehensive report including:

**Candidate Information**:
- Name and contact details
- Match score and status
- Matched keywords

**Analysis Data**:
- Skills breakdown
- Education and certifications
- ATS compatibility status
- Processing timestamps

**Metadata**:
- Job title and company
- Export date and time
- Summary statistics

### Using Exported Data

The CSV file can be used for:
- **Further Analysis**: Import into Excel or Google Sheets
- **Reporting**: Share results with hiring managers
- **Record Keeping**: Maintain candidate evaluation history
- **Integration**: Import into other HR systems

## 🎯 Best Practices

### Writing Effective Job Descriptions

1. **Be Specific**: Include exact technologies and tools
2. **Use Keywords**: Include terms candidates would use
3. **Quantify Requirements**: "5+ years experience" vs. "experienced"
4. **Include Variations**: "JavaScript" and "JS", "React.js" and "ReactJS"

### Optimizing Resume Analysis

1. **Clean Text**: Ensure resumes are in readable text format
2. **Complete Sections**: Include all standard resume sections
3. **Consistent Formatting**: Use standard section headers
4. **Multiple Formats**: Test with various resume styles

### Setting Appropriate Thresholds

- **High-Volume Roles**: Use higher thresholds (70-80%)
- **Specialized Positions**: May require lower thresholds (50-60%)
- **Entry-Level**: Consider skills potential over exact matches
- **Senior Roles**: Focus on experience and leadership indicators

### Interpreting Results

1. **Context Matters**: Consider role requirements and market conditions
2. **Human Review**: Use scores as guidance, not absolute decisions
3. **Bias Awareness**: Supplement with diverse evaluation methods
4. **Continuous Improvement**: Refine job descriptions based on results

## 🔧 Troubleshooting

### Common Issues

**Q: Resume not parsing correctly?**
- Ensure text is clean and readable
- Check for proper section headers
- Verify contact information format

**Q: Low scores for qualified candidates?**
- Review job description keywords
- Check for skill variations and synonyms
- Consider adjusting threshold

**Q: Missing candidate information?**
- Verify resume includes contact details
- Check text formatting and structure
- Ensure all sections are clearly labeled

**Q: Export not working?**
- Confirm resumes have been processed
- Check browser download permissions
- Ensure results are available

### Performance Tips

1. **Batch Processing**: Upload multiple resumes at once
2. **Clear Cache**: Refresh when switching job descriptions
3. **Optimize Content**: Use concise, well-formatted job descriptions
4. **Browser Compatibility**: Use modern browsers for best performance

## 📞 Getting Help

### Support Resources

1. **Documentation**: Comprehensive guides and API reference
2. **Sample Data**: Use provided examples for testing
3. **Best Practices**: Follow recommended workflows
4. **Community**: Share experiences and solutions

### Feedback and Improvements

We welcome feedback on:
- Feature requests
- Usability improvements
- Bug reports
- Integration suggestions

---

This user guide covers all major features and workflows. For technical details, see the API Reference documentation.