
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
  moduleAverages: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
}

const StrengthsWeaknesses = ({ strengths, weaknesses, moduleAverages }: StrengthsWeaknessesProps) => {
  // Find strongest and weakest modules
  const moduleEntries = Object.entries(moduleAverages);
  const strongest = moduleEntries.reduce((max, current) => current[1] > max[1] ? current : max);
  const weakest = moduleEntries.reduce((min, current) => current[1] < min[1] ? current : min);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Strongest Skill</h3>
                <p className="text-green-700">
                  {capitalize(strongest[0])} ({strongest[1]} average)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <TrendingDown className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-orange-900">Improvement Area</h3>
                <p className="text-orange-700">
                  {capitalize(weakest[0])} ({weakest[1]} average)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            Your Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center text-orange-700">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700">{weakness}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsWeaknesses;
