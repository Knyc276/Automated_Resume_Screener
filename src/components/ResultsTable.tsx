import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Mail, Phone, Award, BookOpen, CheckCircle, XCircle, Eye, BarChart3, AlertTriangle, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { ScoredResume } from '../types';

interface ResultsTableProps {
  scoredResumes: ScoredResume[];
  threshold: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ scoredResumes, threshold }) => {
  const [sortField, setSortField] = useState<'score' | 'filename'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedResume, setSelectedResume] = useState<ScoredResume | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'qualified' | 'rejected'>('all');

  const handleSort = (field: 'score' | 'filename') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredResumes = scoredResumes
    .filter(resume => {
      if (filterStatus === 'all') return true;
      return resume.status === filterStatus;
    })
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'score') {
        return (a.score - b.score) * multiplier;
      } else {
        return a.filename.localeCompare(b.filename) * multiplier;
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    return status === 'qualified' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <div className="flex space-x-2">
              {(['all', 'qualified', 'rejected'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-1">
                      ({scoredResumes.filter(r => r.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredResumes.length} of {scoredResumes.length} resumes
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('filename')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Candidate</span>
                    {sortField === 'filename' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('score')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Match Score</span>
                    {sortField === 'score' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResumes.map((resume) => (
                <tr key={resume.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {resume.analysis.name || resume.filename}
                      </div>
                      <div className="text-sm text-gray-500">
                        {resume.analysis.contact.email && (
                          <div className="flex items-center mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {resume.analysis.contact.email}
                          </div>
                        )}
                        {resume.analysis.contact.phone && (
                          <div className="flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {resume.analysis.contact.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(resume.score)}`}>
                      {resume.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(resume.status)}`}>
                      {resume.status === 'qualified' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {resume.matchedKeywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                      {resume.matchedKeywords.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{resume.matchedKeywords.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedResume(resume)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResumes.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes found</h3>
            <p className="text-gray-500">
              {filterStatus === 'all' 
                ? 'No resumes have been processed yet.'
                : `No ${filterStatus} candidates found with the current threshold.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Resume Detail Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <>
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedResume.analysis.name || selectedResume.filename}
                </h3>
                <button
                  onClick={() => setSelectedResume(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                {/* Score and Status */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Overall Assessment
                    </h4>
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getScoreColor(selectedResume.score)}`}>
                        Match Score: {selectedResume.score}%
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedResume.status)}`}>
                        {selectedResume.status.charAt(0).toUpperCase() + selectedResume.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Skills Match:</span>
                        <span className="ml-2 font-medium">{selectedResume.analysis.detailedAnalysis.skillsAnalysis.matchedSkills}/{selectedResume.analysis.detailedAnalysis.skillsAnalysis.totalSkills}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">ATS Score:</span>
                        <span className="ml-2 font-medium">{selectedResume.analysis.detailedAnalysis.atsCompatibility.score}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Word Count:</span>
                        <span className="ml-2 font-medium">{selectedResume.analysis.detailedAnalysis.contentQuality.wordCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Achievements:</span>
                        <span className="ml-2 font-medium">{selectedResume.analysis.detailedAnalysis.contentQuality.achievementCount}</span>
                      </div>
                    </div>
                  </div>

                {/* Contact Information */}
                {(selectedResume.analysis.contact.email || selectedResume.analysis.contact.phone) && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    {selectedResume.analysis.contact.email && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {selectedResume.analysis.contact.email}
                      </p>
                    )}
                    {selectedResume.analysis.contact.phone && (
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2" />
                        {selectedResume.analysis.contact.phone}
                      </p>
                    )}
                    </div>
                )}

                {/* Matched Keywords */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Matched Skills ({selectedResume.matchedKeywords.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.matchedKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  </div>

                {/* Skills */}
                {selectedResume.analysis.skills.length > 0 && (
                    <div>
                    <h4 className="font-medium text-gray-900 mb-2">All Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.analysis.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    </div>
                )}

                {/* Education */}
                {selectedResume.analysis.education.length > 0 && (
                    <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Education
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedResume.analysis.education.map((edu, idx) => (
                        <li key={idx}>• {edu}</li>
                      ))}
                    </ul>
                    </div>
                )}

                {/* Certifications */}
                {selectedResume.analysis.certifications.length > 0 && (
                    <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Certifications
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedResume.analysis.certifications.map((cert, idx) => (
                        <li key={idx}>• {cert}</li>
                      ))}
                    </ul>
                    </div>
                )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Strengths */}
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Strengths ({selectedResume.analysis.strengths.length})
                    </h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      {selectedResume.analysis.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Areas for Improvement ({selectedResume.analysis.weaknesses.length})
                    </h4>
                    <ul className="text-sm text-red-700 space-y-2">
                      {selectedResume.analysis.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-start">
                          <XCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Critical Skills */}
                  {selectedResume.analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <h4 className="font-medium text-amber-800 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Missing Critical Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedResume.analysis.detailedAnalysis.skillsAnalysis.missingCriticalSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded border border-amber-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ATS Compatibility */}
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-3">ATS Compatibility Analysis</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-blue-700 font-medium">Passed Checks:</span>
                        <ul className="text-sm text-blue-600 mt-1 space-y-1">
                          {selectedResume.analysis.detailedAnalysis.atsCompatibility.passedChecks.map((check, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {check}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {selectedResume.analysis.detailedAnalysis.atsCompatibility.failedChecks.length > 0 && (
                        <div>
                          <span className="text-sm text-blue-700 font-medium">Failed Checks:</span>
                          <ul className="text-sm text-blue-600 mt-1 space-y-1">
                            {selectedResume.analysis.detailedAnalysis.atsCompatibility.failedChecks.map((check, idx) => (
                              <li key={idx} className="flex items-center">
                                <XCircle className="h-3 w-3 mr-2 text-red-500" />
                                {check}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Section */}
              {selectedResume.analysis.recommendations.length > 0 && (
                <div className="mt-8 border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                    Improvement Recommendations
                  </h4>
                  <div className="space-y-4">
                    {selectedResume.analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                        rec.priority === 'high' ? 'bg-red-50 border-red-400' :
                        rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                        'bg-blue-50 border-blue-400'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{rec.title}</h5>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rec.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <p className="text-sm font-medium text-green-600 mb-3">💡 {rec.impact}</p>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Action Items:</span>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            {rec.actionItems.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start">
                                <span className="mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;