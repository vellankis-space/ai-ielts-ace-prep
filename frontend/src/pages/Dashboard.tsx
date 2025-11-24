import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/auth-context';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import TestHistory from '@/components/dashboard/TestHistory';
import StudyPlan from '@/components/dashboard/StudyPlan';
import StrengthsWeaknesses from '@/components/dashboard/StrengthsWeaknesses';
import GoalSetting from '@/components/dashboard/GoalSetting';
import Achievements from '@/components/dashboard/Achievements';
import QuickAccess from '@/components/dashboard/QuickAccess';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Welcome Section */}
            <motion.div variants={itemVariants}>
              <WelcomeSection user={user} userData={userData} />
            </motion.div>

            {/* Progress Overview */}
            <motion.div variants={itemVariants}>
              <ProgressOverview userData={userData} />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Test History */}
                <motion.div variants={itemVariants}>
                  <TestHistory tests={userData.recentTests} />
                </motion.div>

                {/* Study Plan */}
                <motion.div variants={itemVariants}>
                  <StudyPlan recommendations={userData.recommendations} />
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Strengths & Weaknesses */}
                <motion.div variants={itemVariants}>
                  <StrengthsWeaknesses
                    strengths={userData.strengths}
                    weaknesses={userData.weaknesses}
                    moduleAverages={userData.moduleAverages}
                  />
                </motion.div>

                {/* Goal Setting */}
                <motion.div variants={itemVariants}>
                  <GoalSetting
                    currentBand={userData.currentBand}
                    targetBand={targetBand}
                    setTargetBand={setTargetBand}
                  />
                </motion.div>

                {/* Achievements */}
                <motion.div variants={itemVariants}>
                  <Achievements achievements={userData.achievements} />
                </motion.div>
              </div>
            </div>

            {/* Quick Access */}
            <motion.div variants={itemVariants}>
              <QuickAccess />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
