import { ScoredResume, JobDescriptionData } from '../types';

export const exportToCSV = (scoredResumes: ScoredResume[], jobDescription: JobDescriptionData | null) => {
  const headers = [
    'Candidate Name',
    'Filename',
    'Match Score (%)',
    'Status',
    'Email',
    'Phone',
    'Matched Keywords',
    'Total Skills',
    'Education',
    'Certifications',
    'ATS Friendly',
    'Issues',
    'Upload Date'
  ];

  const rows = scoredResumes.map(resume => [
    resume.analysis.name || 'N/A',
    resume.filename,
    resume.score.toString(),
    resume.status,
    resume.analysis.contact.email || 'N/A',
    resume.analysis.contact.phone || 'N/A',
    resume.matchedKeywords.join('; '),
    resume.analysis.skills.join('; '),
    resume.analysis.education.join('; '),
    resume.analysis.certifications.join('; '),
    resume.analysis.formatting.isATSFriendly ? 'Yes' : 'No',
    resume.analysis.formatting.issues.join('; '),
    resume.uploadedAt.toISOString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  // Add job information as metadata
  const metadata = [
    '# Resume Screening Results',
    `# Job Title: ${jobDescription?.title || 'N/A'}`,
    `# Company: ${jobDescription?.company || 'N/A'}`,
    `# Export Date: ${new Date().toISOString()}`,
    `# Total Candidates: ${scoredResumes.length}`,
    `# Qualified Candidates: ${scoredResumes.filter(r => r.status === 'qualified').length}`,
    '',
    csvContent
  ].join('\n');

  // Create and download the file
  const blob = new Blob([metadata], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `resume_screening_results_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};