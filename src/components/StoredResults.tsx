import React, { useState, useEffect } from 'react';
import { Archive, Calendar, Users, UserCheck, TrendingUp, Eye, Trash2, Download, Search, Filter, AlertCircle } from 'lucide-react';
import { StoredScreeningResult, ScoredResume } from '../types';
import { getStoredResults, deleteStoredResult, clearAllResults, getStorageUsage } from '../utils/storageUtils';
import { exportToCSV } from '../utils/exportUtils';

interface StoredResultsProps {
  onLoadResult: (result: StoredScreeningResult) => void;
}

const StoredResults: React.FC<StoredResultsProps> = ({ onLoadResult }) => {
  const [storedResults, setStoredResults] = useState<StoredScreeningResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'candidates'>('date');
  const [selectedResult, setSelectedResult] = useState<StoredScreeningResult | null>(null);
  const [storageUsage, setStorageUsage] = useState({ used: 0, percentage: 0 });

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const results = getStoredResults();
    setStoredResults(results);
    setStorageUsage(getStorageUsage());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this screening result?')) {
      deleteStoredResult(id);
      loadResults();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all stored results? This action cannot be undone.')) {
      clearAllResults();
      loadResults();
    }
  };

  const handleExport = (result: StoredScreeningResult) => {
    exportToCSV(result.scoredResumes, result.jobDescription);
  };

  const filteredResults = storedResults
    .filter(result => 
      result.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'score':
          return b.averageScore - a.averageScore;
        case 'candidates':
          return b.totalCandidates - a.totalCandidates;
        default:
          return 0;
      }
    });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Archive className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Stored Results</h2>
              <p className="text-sm text-gray-500">View and manage your screening history</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {storedResults.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Storage Usage */}
        {storageUsage.percentage > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Storage Usage</span>
              <span className="text-sm text-gray-500">
                {(storageUsage.used / 1024).toFixed(1)} KB used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  storageUsage.percentage > 80 ? 'bg-red-500' :
                  storageUsage.percentage > 60 ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
              ></div>
            </div>
            {storageUsage.percentage > 80 && (
              <p className="text-xs text-red-600 mt-1">
                Storage is getting full. Consider clearing old results.
              </p>
            )}
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'candidates')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Avg Score</option>
              <option value="candidates">Sort by Candidates</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {storedResults.length === 0 ? 'No Stored Results' : 'No Results Found'}
          </h3>
          <p className="text-gray-500">
            {storedResults.length === 0 
              ? 'Complete a screening process to see results stored here.'
              : 'Try adjusting your search terms or filters.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResults.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{result.jobTitle}</h3>
                  <p className="text-sm text-gray-500">{result.company}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(result.createdAt)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedResult(result)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleExport(result)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Export CSV"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(result.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-blue-600 mr-1" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{result.totalCandidates}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <UserCheck className="h-4 w-4 text-green-600 mr-1" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{result.qualifiedCandidates}</div>
                  <div className="text-xs text-gray-500">Qualified</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                  </div>
                  <div className={`text-lg font-semibold px-2 py-1 rounded-full text-xs ${getScoreColor(result.averageScore)}`}>
                    {result.averageScore}%
                  </div>
                  <div className="text-xs text-gray-500">Avg Score</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onLoadResult(result)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Load Result
                </button>
                <button
                  onClick={() => setSelectedResult(result)}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedResult.jobTitle}</h3>
                  <p className="text-gray-500">{selectedResult.company}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Screened on {formatDate(selectedResult.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <AlertCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{selectedResult.totalCandidates}</div>
                  <div className="text-sm text-blue-700">Total Candidates</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <UserCheck className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">{selectedResult.qualifiedCandidates}</div>
                  <div className="text-sm text-green-700">Qualified</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">{selectedResult.averageScore}%</div>
                  <div className="text-sm text-purple-700">Average Score</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <Filter className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-900">{selectedResult.threshold}%</div>
                  <div className="text-sm text-amber-700">Threshold Used</div>
                </div>
              </div>

              {/* Top Candidates */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Candidates</h4>
                <div className="space-y-3">
                  {selectedResult.scoredResumes
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map((resume, index) => (
                      <div key={resume.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {resume.analysis.name || resume.filename}
                            </div>
                            <div className="text-sm text-gray-500">
                              {resume.matchedKeywords.slice(0, 3).join(', ')}
                              {resume.matchedKeywords.length > 3 && ` +${resume.matchedKeywords.length - 3} more`}
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(resume.score)}`}>
                          {resume.score}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => handleExport(selectedResult)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => {
                    onLoadResult(selectedResult);
                    setSelectedResult(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load This Result
                </button>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoredResults;