
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Target, Award, Sparkles } from 'lucide-react';

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
    <Card className="glass-card border-white/5">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Goal Setting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Current Progress */}
        <div className="text-center bg-white/5 rounded-xl p-6 border border-white/5">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-3xl font-bold text-blue-400">{currentBand}</span>
            <span className="text-muted-foreground text-xl">/</span>
            <span className="text-3xl font-bold text-emerald-400">{targetBand}</span>
          </div>
          <Progress value={Math.min(progressPercentage, 100)} className="h-2 mb-3 bg-white/10" />
          <p className="text-sm text-muted-foreground">
            {remainingPoints > 0
              ? `${remainingPoints.toFixed(1)} points to reach your goal`
              : 'Goal achieved! 🎉'
            }
          </p>
        </div>

        {/* Target Band Selector */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
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

          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>5.0</span>
            <span>6.0</span>
            <span>7.0</span>
            <span>8.0</span>
            <span>9.0</span>
          </div>

          <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="font-medium text-primary mb-1">Target: Band {targetBand}</div>
            <div className="text-sm text-muted-foreground">{getBandDescription(targetBand)}</div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full shadow-lg shadow-primary/20" size="lg">
          <Award className="w-4 h-4 mr-2" />
          Update Goal
        </Button>

        {/* Motivational Message */}
        {remainingPoints > 0 && (
          <Alert variant="default" className="bg-blue-500/10 border-blue-500/20 text-blue-400">
            <Sparkles className="h-4 w-4" />
            <AlertDescription className="ml-2">
              You're {remainingPoints.toFixed(1)} points away! Keep practicing.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalSetting;
