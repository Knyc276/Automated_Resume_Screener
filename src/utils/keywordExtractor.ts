export const extractKeywords = (jobDescription: string): string[] => {
  const keywords: string[] = [];
  const text = jobDescription.toLowerCase();

  // Common technical keywords
  const technicalSkills = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'nodejs',
    'typescript', 'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql',
    'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'linux', 'windows',
    'photoshop', 'illustrator', 'figma', 'sketch', 'adobe', 'wordpress',
    'bootstrap', 'tailwind', 'sass', 'less', 'webpack', 'vite', 'gulp',
    'redux', 'graphql', 'rest', 'api', 'microservices', 'agile', 'scrum',
    'machine learning', 'ai', 'data science', 'tensorflow', 'pytorch',
    'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'flutter',
    'express', 'django', 'flask', 'spring', 'laravel', 'rails', 'nest.js',
    'elasticsearch', 'redis', 'rabbitmq', 'jenkins', 'circleci', 'github actions'
  ];

  // Soft skills and job-related terms
  const softSkills = [
    'leadership', 'communication', 'teamwork', 'problem solving', 'analytical',
    'project management', 'collaboration', 'mentoring', 'training', 'coaching',
    'strategic planning', 'process improvement', 'quality assurance', 'testing',
    'debugging', 'troubleshooting', 'optimization', 'performance', 'scalability',
    'security', 'compliance', 'documentation', 'presentation', 'research'
  ];

  // Education and certifications
  const educationTerms = [
    'bachelor', 'master', 'phd', 'degree', 'computer science', 'engineering',
    'certification', 'certified', 'aws certified', 'microsoft certified',
    'google certified', 'cisco', 'oracle', 'salesforce', 'pmp', 'itil'
  ];

  // Combine all skill categories
  const allSkills = [...technicalSkills, ...softSkills, ...educationTerms];

  // Extract mentioned skills
  for (const skill of allSkills) {
    if (text.includes(skill)) {
      const properCase = skill.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      keywords.push(properCase);
    }
  }

  // Extract years of experience patterns
  const experienceMatches = text.match(/(\d+)\+?\s*years?\s*(?:of\s*)?(?:experience|exp)/g);
  if (experienceMatches) {
    experienceMatches.forEach(match => {
      const years = match.match(/\d+/);
      if (years) {
        keywords.push(`${years[0]}+ years experience`);
      }
    });
  }

  // Extract degree requirements
  const degreeMatches = text.match(/(?:bachelor|master|phd|degree)\s*(?:in|of)?\s*([a-zA-Z\s]+)/gi);
  if (degreeMatches) {
    degreeMatches.forEach(match => {
      keywords.push(match.trim());
    });
  }

  // Extract specific tools/technologies mentioned in context
  const toolPatterns = [
    /(?:experience with|knowledge of|proficient in|skilled in|using)\s+([a-zA-Z0-9\s\.,]+)/gi,
    /(?:tools?|technologies|frameworks?|libraries|platforms?)[:\s]+([a-zA-Z0-9\s\.,\-]+)/gi
  ];

  for (const pattern of toolPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const tools = match.split(/[,\n]/).map(tool => tool.trim());
        tools.forEach(tool => {
          if (tool.length > 2 && tool.length < 30) {
            const cleanTool = tool.replace(/[^\w\s\.\+#-]/g, '').trim();
            if (cleanTool && !keywords.some(k => k.toLowerCase() === cleanTool.toLowerCase())) {
              keywords.push(cleanTool);
            }
          }
        });
      });
    }
  }

  // Remove duplicates and return
  return [...new Set(keywords)].filter(keyword => 
    keyword.length > 1 && keyword.length < 50
  );
};