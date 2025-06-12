
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Headphones, BookOpen, PenTool, Mic } from 'lucide-react';

interface ProgressOverviewProps {
  userData: {
    currentBand: number;
    moduleAverages: {
      listening: number;
      reading: number;
      writing: number;
      speaking: number;
    };
  };
}

const ProgressOverview = ({ userData }: ProgressOverviewProps) => {
  const modules = [
    { name: 'Listening', score: userData.moduleAverages.listening, icon: Headphones, color: 'bg-blue-500' },
    { name: 'Reading', score: userData.moduleAverages.reading, icon: BookOpen, color: 'bg-green-500' },
    { name: 'Writing', score: userData.moduleAverages.writing, icon: PenTool, color: 'bg-orange-500' },
    { name: 'Speaking', score: userData.moduleAverages.speaking, icon: Mic, color: 'bg-purple-500' }
  ];

  const getBandDescription = (score: number) => {
    if (score >= 8.0) return 'Very Good User';
    if (score >= 7.0) return 'Good User';
    if (score >= 6.0) return 'Competent User';
    if (score >= 5.0) return 'Modest User';
    return 'Limited User';
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.0) return 'text-green-600';
    if (score >= 6.0) return 'text-blue-600';
    if (score >= 5.0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          Overall Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Overall Score */}
          <div className="lg:col-span-1 text-center">
            <div className="mb-4">
              <div className={`text-4xl font-bold ${getScoreColor(userData.currentBand)}`}>
                {userData.currentBand}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {getBandDescription(userData.currentBand)}
              </div>
            </div>
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(userData.currentBand / 9) * 100}, 100`}
                  className={getScoreColor(userData.currentBand)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">Band</span>
              </div>
            </div>
          </div>
          
          {/* Module Scores */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module) => (
              <div key={module.name} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className={`p-3 rounded-full ${module.color.replace('bg-', 'bg-')} bg-opacity-10`}>
                    <module.icon className={`w-6 h-6 ${module.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{module.name}</h3>
                <div className={`text-2xl font-bold ${getScoreColor(module.score)} mb-2`}>
                  {module.score}
                </div>
                <Progress 
                  value={(module.score / 9) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {module.score}/9.0
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
