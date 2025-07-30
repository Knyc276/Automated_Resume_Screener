import React, { useState } from 'react';
import { Upload, FileText, Search, Filter, Download, CheckCircle, AlertCircle, X, Archive } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ResumeUpload from './components/ResumeUpload';
import JobDescription from './components/JobDescription';
import ResultsTable from './components/ResultsTable';
import StoredResults from './components/StoredResults';
import { Resume, JobDescriptionData, ScoredResume, StoredScreeningResult } from './types';
import { analyzeResume, scoreResume } from './utils/resumeAnalyzer';
import { extractKeywords } from './utils/keywordExtractor';
import { exportToCSV } from './utils/exportUtils';
import { saveScreeningResult } from './utils/storageUtils';

function App() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescriptionData | null>(null);
  const [scoredResumes, setScoredResumes] = useState<ScoredResume[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'job' | 'results' | 'stored'>('upload');
  const [scoreThreshold, setScoreThreshold] = useState(60);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResumeUpload = (newResumes: Resume[]) => {
    setResumes(prev => [...prev, ...newResumes]);
  };

  const handleJobDescriptionSubmit = (jobDesc: JobDescriptionData) => {
    setJobDescription(jobDesc);
    setScoredResumes([]); // Clear previous results when job changes
    setActiveTab('results');
  };

  const processResumes = async () => {
    if (!jobDescription || resumes.length === 0) return;

    setIsProcessing(true);
    
    const jobKeywords = extractKeywords(jobDescription.description);
    const scored: ScoredResume[] = [];

    for (const resume of resumes) {
      const analysis = analyzeResume(resume.content);
      const score = scoreResume(analysis, jobKeywords);
      
      scored.push({
        ...resume,
        score: score.percentage,
        matchedKeywords: score.matchedKeywords,
        analysis,
        status: score.percentage >= scoreThreshold ? 'qualified' : 'rejected'
      });
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    setScoredResumes(scored);
    setIsProcessing(false);
  };

  const handleExport = () => {
    if (scoredResumes.length === 0) return;
    exportToCSV(scoredResumes, jobDescription);
  };

  const handleSaveResults = () => {
    if (!jobDescription || scoredResumes.length === 0) return;

    const result: StoredScreeningResult = {
      id: Math.random().toString(36).substr(2, 9),
      jobTitle: jobDescription.title,
      company: jobDescription.company || 'Unknown Company',
      createdAt: new Date(),
      totalCandidates: scoredResumes.length,
      qualifiedCandidates: scoredResumes.filter(r => r.status === 'qualified').length,
      averageScore: stats.avgScore,
      threshold: scoreThreshold,
      scoredResumes,
      jobDescription
    };

    saveScreeningResult(result);
  };

  const handleLoadStoredResult = (result: StoredScreeningResult) => {
    setJobDescription(result.jobDescription);
    setScoredResumes(result.scoredResumes);
    setScoreThreshold(result.threshold);
    setActiveTab('results');
  const removeResume = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    setScoredResumes(prev => prev.filter(r => r.id !== id));
  };

  // Auto-process when both resumes and job description are available
  React.useEffect(() => {
    if (resumes.length > 0 && jobDescription && (activeTab === 'results' || scoredResumes.length === 0)) {
      processResumes();
    }
  }, [resumes, jobDescription, scoreThreshold, activeTab]);

  const stats = {
    total: scoredResumes.length,
    qualified: scoredResumes.filter(r => r.status === 'qualified').length,
    avgScore: scoredResumes.length > 0 
      ? Math.round(scoredResumes.reduce((sum, r) => sum + r.score, 0) / scoredResumes.length)
      : 0
  };

  // Auto-save results when screening is complete
  React.useEffect(() => {
    if (scoredResumes.length > 0 && jobDescription) {
      handleSaveResults();
    }
  }, [scoredResumes, jobDescription, scoreThreshold]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ATS Resume Screener</h1>
                <p className="text-sm text-gray-500">Automated Talent Screening System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {scoredResumes.length > 0 && (
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Results</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Resumes</span>
            {resumes.length > 0 && (
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                {resumes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('job')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'job'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Job Description</span>
            {jobDescription && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'results'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Results</span>
            {scoredResumes.length > 0 && (
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                {stats.qualified}/{stats.total}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('stored')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'stored'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Archive className="h-4 w-4" />
            <span>Stored Results</span>
          </button>
        </div>

        {/* Stats Dashboard */}
        {scoredResumes.length > 0 && (
          <Dashboard stats={stats} />
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {activeTab === 'upload' && (
            <ResumeUpload 
              resumes={resumes}
              onUpload={handleResumeUpload}
              onRemove={removeResume}
            />
          )}

          {activeTab === 'job' && (
            <JobDescription 
              jobDescription={jobDescription}
              onSubmit={handleJobDescriptionSubmit}
            />
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* Threshold Control */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Score Threshold</h3>
                    <p className="text-sm text-gray-500">Minimum score required for qualification</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={scoreThreshold}
                      onChange={(e) => setScoreThreshold(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-lg font-semibold text-blue-600 min-w-[60px]">
                      {scoreThreshold}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Results */}
              {!jobDescription || resumes.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Screen Resumes
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Upload resumes and provide a job description to start the screening process.
                  </p>
                  <div className="flex justify-center space-x-4">
                    {resumes.length === 0 && (
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Upload Resumes
                      </button>
                    )}
                    {!jobDescription && (
                      <button
                        onClick={() => setActiveTab('job')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Add Job Description
                      </button>
                    )}
                  </div>
                </div>
              ) : isProcessing ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Processing Resumes
                  </h3>
                  <p className="text-gray-500">
                    Analyzing {resumes.length} resume(s) against job requirements...
                  </p>
                </div>
              ) : (
                <ResultsTable 
                  scoredResumes={scoredResumes}
                  threshold={scoreThreshold}
                />
              )}
            </div>
          )}

          {activeTab === 'stored' && (
            <StoredResults onLoadResult={handleLoadStoredResult} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;