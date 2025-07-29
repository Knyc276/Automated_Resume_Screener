import React, { useState } from 'react';
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Resume } from '../types';

interface ResumeUploadProps {
  resumes: Resume[];
  onUpload: (resumes: Resume[]) => void;
  onRemove: (id: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ resumes, onUpload, onRemove }) => {
  const [dragOver, setDragOver] = useState(false);
  const [resumeText, setResumeText] = useState('');

  const handleFileUpload = (files: FileList) => {
    const newResumes: Resume[] = [];
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const resume: Resume = {
          id: Math.random().toString(36).substr(2, 9),
          filename: file.name,
          content: content,
          uploadedAt: new Date()
        };
        newResumes.push(resume);
        
        if (newResumes.length === files.length) {
          onUpload(newResumes);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleTextSubmit = () => {
    if (!resumeText.trim()) return;
    
    const resume: Resume = {
      id: Math.random().toString(36).substr(2, 9),
      filename: `Manual Entry ${resumes.length + 1}`,
      content: resumeText,
      uploadedAt: new Date()
    };
    
    onUpload([resume]);
    setResumeText('');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Resumes</h2>
        
        {/* File Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop resume files here
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse (TXT files supported)
          </p>
          <input
            type="file"
            multiple
            accept=".txt"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            Browse Files
          </label>
        </div>

        {/* Text Input Alternative */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Or paste resume text</h3>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste the complete resume text here, including name, contact info, experience, skills, education, etc."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleTextSubmit}
              disabled={!resumeText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Resume
            </button>
          </div>
        </div>
      </div>

      {/* Sample Resume Helper */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-amber-800">Sample Resume Format</h4>
            <p className="text-sm text-amber-700 mt-1">
              For best results, include sections like: Name, Email, Phone, Skills (e.g., "JavaScript, React, Python"), 
              Experience, Education, and Certifications. Our system will automatically extract and analyze these sections.
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Resumes List */}
      {resumes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded Resumes ({resumes.length})
          </h3>
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{resume.filename}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded {resume.uploadedAt.toLocaleDateString()} at {resume.uploadedAt.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <button
                    onClick={() => onRemove(resume.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;