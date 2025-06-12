
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, TrendingUp, Target } from 'lucide-react';

interface WelcomeSectionProps {
  user: User;
  userData: {
    currentBand: number;
    testsThisWeek: number;
    studyStreak: number;
  };
}

const WelcomeSection = ({ user, userData }: WelcomeSectionProps) => {
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-teal-500 text-white border-0">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <Avatar className="w-16 h-16 border-2 border-white/20">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-white/20 text-white text-xl font-semibold">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Keep up the excellent work on your IELTS journey
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Current Band</span>
              </div>
              <div className="text-2xl font-bold">{userData.currentBand}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">This Week</span>
              </div>
              <div className="text-2xl font-bold">{userData.testsThisWeek}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Study Streak</span>
              </div>
              <div className="text-2xl font-bold">{userData.studyStreak} days</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
