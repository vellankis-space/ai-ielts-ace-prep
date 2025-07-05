
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target, Award } from 'lucide-react';

interface GoalSettingProps {
  currentBand: number;
  targetBand: number;
  setTargetBand: (band: number) => void;
}

const GoalSetting = ({ currentBand, targetBand, setTargetBand }: GoalSettingProps) => {
  const progressPercentage = (currentBand / targetBand) * 100;
  const remainingPoints = Math.max(0, targetBand - currentBand);

  const getBandDescription = (band: number) => {
    if (band >= 8.0) return 'Very Good User';
    if (band >= 7.0) return 'Good User';
    if (band >= 6.0) return 'Competent User';
    if (band >= 5.0) return 'Modest User';
    return 'Limited User';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Goal Setting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl font-bold text-blue-600">{currentBand}</span>
            <span className="text-gray-400">/</span>
            <span className="text-2xl font-bold text-green-600">{targetBand}</span>
          </div>
          <Progress value={Math.min(progressPercentage, 100)} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">
            {remainingPoints > 0 
              ? `${remainingPoints.toFixed(1)} points to reach your goal`
              : 'Goal achieved! 🎉'
            }
          </p>
        </div>

        {/* Target Band Selector */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Target Band
            </label>
            <Slider
              value={[targetBand]}
              onValueChange={(value) => setTargetBand(value[0])}
              min={5.0}
              max={9.0}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>5.0</span>
            <span>6.0</span>
            <span>7.0</span>
            <span>8.0</span>
            <span>9.0</span>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900">Target: Band {targetBand}</div>
            <div className="text-sm text-gray-600">{getBandDescription(targetBand)}</div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full" size="lg">
          <Award className="w-4 h-4 mr-2" />
          Set Goal
        </Button>

        {/* Motivational Message */}
        {remainingPoints > 0 && (
          <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
            <AlertDescription>
              💪 You're {remainingPoints.toFixed(1)} points away from your goal! 
              Keep practicing and you'll get there.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalSetting;
