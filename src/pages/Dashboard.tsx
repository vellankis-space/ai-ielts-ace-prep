
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import { useAuth } from '@/hooks/useAuth';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import TestHistory from '@/components/dashboard/TestHistory';
import StudyPlan from '@/components/dashboard/StudyPlan';
import StrengthsWeaknesses from '@/components/dashboard/StrengthsWeaknesses';
import GoalSetting from '@/components/dashboard/GoalSetting';
import Achievements from '@/components/dashboard/Achievements';
import QuickAccess from '@/components/dashboard/QuickAccess';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [targetBand, setTargetBand] = useState(7.0);

  // Mock user data - in real app this would come from API
  const userData = {
    currentBand: 6.2,
    targetBand: targetBand,
    moduleAverages: {
      listening: 7.0,
      reading: 6.5,
      writing: 5.5,
      speaking: 6.0
    },
    recentTests: [
      {
        id: 1,
        date: '2025-06-10',
        module: 'Writing - Task 2',
        score: 6.0,
        type: 'practice' as const
      },
      {
        id: 2,
        date: '2025-06-08',
        module: 'Listening - Full Test',
        score: 7.5,
        type: 'mock' as const
      },
      {
        id: 3,
        date: '2025-06-05',
        module: 'Reading - Academic',
        score: 6.5,
        type: 'practice' as const
      },
      {
        id: 4,
        date: '2025-06-03',
        module: 'Speaking - Part 2',
        score: 6.0,
        type: 'practice' as const
      },
      {
        id: 5,
        date: '2025-06-01',
        module: 'Full Mock Test',
        score: 6.2,
        type: 'mock' as const
      }
    ],
    strengths: ['Listening comprehension', 'Vocabulary range', 'Pronunciation'],
    weaknesses: ['Complex sentence formation', 'Task achievement in writing', 'Coherence and cohesion'],
    achievements: [
      { id: 1, title: 'Completed 5 Tests', icon: '🎯', unlocked: true },
      { id: 2, title: 'Improved Writing by 0.5', icon: '📝', unlocked: true },
      { id: 3, title: 'Perfect Listening Score', icon: '👂', unlocked: false },
      { id: 4, title: '7-Day Streak', icon: '🔥', unlocked: true },
      { id: 5, title: 'First Mock Test', icon: '🏆', unlocked: true },
      { id: 6, title: 'Band 7 Achiever', icon: '⭐', unlocked: false }
    ],
    recommendations: [
      'Focus on Complex Sentence Formation in Writing',
      'Practice Writing Task 2 - Advanced Essay #3',
      'Work on coherence and cohesion techniques',
      'Review academic vocabulary for reading'
    ],
    testsThisWeek: 3,
    totalTests: 15,
    studyStreak: 7
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'Dashboard' }]} />
          
          <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeSection user={user} userData={userData} />
            
            {/* Progress Overview */}
            <ProgressOverview userData={userData} />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Test History */}
                <TestHistory tests={userData.recentTests} />
                
                {/* Study Plan */}
                <StudyPlan recommendations={userData.recommendations} />
              </div>
              
              {/* Right Column */}
              <div className="space-y-8">
                {/* Strengths & Weaknesses */}
                <StrengthsWeaknesses 
                  strengths={userData.strengths}
                  weaknesses={userData.weaknesses}
                  moduleAverages={userData.moduleAverages}
                />
                
                {/* Goal Setting */}
                <GoalSetting 
                  currentBand={userData.currentBand}
                  targetBand={targetBand}
                  setTargetBand={setTargetBand}
                />
                
                {/* Achievements */}
                <Achievements achievements={userData.achievements} />
              </div>
            </div>
            
            {/* Quick Access */}
            <QuickAccess />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
