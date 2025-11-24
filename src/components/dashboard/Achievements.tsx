
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
    <Card className="glass-card border-white/5">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Award className="w-5 h-5 mr-2 text-primary" />
          Achievements
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {unlockedCount} of {achievements.length} unlocked
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-4 text-center rounded-xl border transition-all duration-300 ${achievement.unlocked
                ? 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                : 'border-white/5 bg-white/5 opacity-50'
                }`}
            >
              <div className="text-2xl mb-2 relative flex justify-center">
                {achievement.unlocked ? (
                  <span className="drop-shadow-glow">{achievement.icon}</span>
                ) : (
                  <div className="relative">
                    <span className="filter grayscale opacity-50">{achievement.icon}</span>
                    <Lock className="w-4 h-4 absolute -top-1 -right-1 text-muted-foreground" />
                  </div>
                )}
              </div>
              <h4 className={`text-xs font-medium ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                {achievement.title}
              </h4>
              {achievement.unlocked && (
                <Badge variant="secondary" className="mt-2 text-[10px] h-5 bg-primary/20 text-primary border-0">
                  Unlocked
                </Badge>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-sm text-yellow-500 text-center font-medium">
            🏆 Complete more tests to unlock new achievements!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
