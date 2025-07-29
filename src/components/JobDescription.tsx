import React, { useState } from 'react';
import { Briefcase, Building, FileText, Plus, X } from 'lucide-react';
import { JobDescriptionData } from '../types';

interface JobDescriptionProps {
  jobDescription: JobDescriptionData | null;
  onSubmit: (jobDesc: JobDescriptionData) => void;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ jobDescription, onSubmit }) => {
  const [formData, setFormData] = useState<JobDescriptionData>(
    jobDescription || {
      title: '',
      company: '',
      description: '',
      requirements: []
    }
  );
  const [newRequirement, setNewRequirement] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onSubmit(formData);
  };

  const addRequirement = () => {
    if (!newRequirement.trim()) return;
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, newRequirement.trim()]
    }));
    setNewRequirement('');
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const loadSampleJob = () => {
    setFormData({
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      description: `We are seeking a skilled Senior Frontend Developer to join our growing team. The ideal candidate will have extensive experience with modern JavaScript frameworks, particularly React, and a passion for creating exceptional user experiences.

Key Responsibilities:
- Develop and maintain responsive web applications using React, TypeScript, and modern CSS
- Collaborate with designers and backend developers to implement pixel-perfect UI/UX designs
- Optimize applications for maximum speed and scalability
- Write clean, maintainable, and well-documented code
- Participate in code reviews and mentoring junior developers
- Stay up-to-date with the latest frontend technologies and best practices

Requirements:
- 5+ years of experience in frontend development
- Expert knowledge of JavaScript, HTML5, and CSS3
- Strong experience with React and its ecosystem (Redux, React Router, etc.)
- Proficiency in TypeScript
- Experience with version control systems (Git)
- Knowledge of modern build tools (Webpack, Vite, etc.)
- Understanding of responsive design and cross-browser compatibility
- Experience with RESTful APIs and GraphQL
- Familiarity with testing frameworks (Jest, React Testing Library)
- Knowledge of CI/CD pipelines is a plus
- Bachelor's degree in Computer Science or equivalent experience`,
      requirements: [
        'JavaScript', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Redux', 
        'Git', 'Webpack', 'Vite', 'RESTful APIs', 'GraphQL', 'Jest', 
        'React Testing Library', 'Responsive Design', 'CI/CD'
      ],
      preferredSkills: ['Node.js', 'AWS', 'Docker', 'Agile', 'Scrum'],
      experienceLevel: '5+ years',
      industry: 'Technology'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
        <button
          onClick={loadSampleJob}
          className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Load Sample Job
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="h-4 w-4 inline mr-2" />
            Job Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Senior Frontend Developer"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="h-4 w-4 inline mr-2" />
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="e.g., TechCorp Inc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="h-4 w-4 inline mr-2" />
            Job Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Paste the complete job description including responsibilities, requirements, and qualifications..."
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Key Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Skills & Requirements
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="e.g., JavaScript, React, Python"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
            />
            <button
              type="button"
              onClick={addRequirement}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {formData.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Job Description
          </button>
        </div>
      </form>

      {jobDescription && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ Job description saved successfully. Switch to the Results tab to view candidate matches.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDescription;