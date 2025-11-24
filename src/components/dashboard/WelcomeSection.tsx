
import React from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, TrendingUp, Target, User, Sparkles } from 'lucide-react';

interface WelcomeSectionProps {
  user: SupabaseUser;
  userData: {
    currentBand: number;
    testsThisWeek: number;
    studyStreak: number;
  };
}

const WelcomeSection = ({ user, userData }: WelcomeSectionProps) => {
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary/20 via-primary/5 to-background">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-full blur opacity-25" />
              <Avatar className="w-16 h-16 border-2 border-background relative">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold flex items-center justify-center">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                Welcome back, {userName}!
                <span className="animate-pulse-glow inline-block">👋</span>
              </h1>
              <p className="text-muted-foreground text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Keep up the excellent work on your IELTS journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="glass-panel rounded-xl p-4 text-center min-w-[100px] border border-white/5 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2 text-primary">
                <Target className="w-4 h-4 mr-1.5" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Band</span>
              </div>
              <div className="text-2xl font-bold">{userData.currentBand}</div>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center min-w-[100px] border border-white/5 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2 text-primary">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tests</span>
              </div>
              <div className="text-2xl font-bold">{userData.testsThisWeek}</div>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center min-w-[100px] border border-white/5 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2 text-primary">
                <TrendingUp className="w-4 h-4 mr-1.5" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Streak</span>
              </div>
              <div className="text-2xl font-bold">{userData.studyStreak} <span className="text-xs font-normal text-muted-foreground">days</span></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
