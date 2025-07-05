
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Lock } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Achievements
        </CardTitle>
        <p className="text-sm text-gray-600">
          {unlockedCount} of {achievements.length} unlocked
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`relative p-3 text-center ${achievement.unlocked
                ? 'border-green-200 bg-green-50 hover:bg-green-100'
                : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <CardContent className="p-0">
                <div className="text-2xl mb-2 relative">
                  {achievement.unlocked ? (
                    achievement.icon
                  ) : (
                    <div className="relative">
                      <span className="filter grayscale">{achievement.icon}</span>
                      <Lock className="w-4 h-4 absolute top-0 right-0 text-gray-400" />
                    </div>
                  )}
                </div>
                <h4 className={`text-xs font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                  {achievement.title}
                </h4>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Unlocked
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            🏆 Complete more tests to unlock new achievements!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
