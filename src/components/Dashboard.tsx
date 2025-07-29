import React from 'react';
import { Users, UserCheck, TrendingUp, Award } from 'lucide-react';

interface DashboardProps {
  stats: {
    total: number;
    qualified: number;
    avgScore: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const qualificationRate = stats.total > 0 ? Math.round((stats.qualified / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Resumes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Qualified</p>
            <p className="text-2xl font-bold text-gray-900">{stats.qualified}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-amber-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-amber-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Qualification Rate</p>
            <p className="text-2xl font-bold text-gray-900">{qualificationRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Avg Score</p>
            <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;