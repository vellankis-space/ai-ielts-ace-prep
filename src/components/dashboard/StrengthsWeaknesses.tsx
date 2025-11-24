
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-medium text-emerald-400">Strongest Skill</h3>
              <p className="text-emerald-500/80 text-sm">
                {capitalize(strongest[0])} ({strongest[1]} average)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 bg-orange-500/10 rounded-full">
              <TrendingDown className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium text-orange-400">Improvement Area</h3>
              <p className="text-orange-500/80 text-sm">
                {capitalize(weakest[0])} ({weakest[1]} average)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Strengths */}
      <Card className="glass-card border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center text-emerald-400">
            <CheckCircle className="w-5 h-5 mr-2" />
            Your Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card className="glass-card border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center text-orange-400">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{weakness}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsWeaknesses;
