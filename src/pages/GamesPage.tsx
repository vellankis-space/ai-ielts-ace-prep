import React from 'react';
import Layout from '@/components/Layout';
import GameCard from '@/components/games/GameCard';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Ear, PenTool } from 'lucide-react';

const games = [
  {
    title: 'Vocabulary Builder',
    description: 'Expand your lexicon with our engaging vocabulary game. Learn new words and their meanings in a fun and interactive way.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    icon: Brain,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    title: 'Grammar Guardian',
    description: 'Test your grammar skills and become a master of sentence structure. Identify and correct grammatical errors to score points.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    icon: PenTool,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    title: 'Listening Challenge',
    description: 'Sharpen your listening skills with a variety of audio clips and comprehension questions. Prepare for the IELTS listening test.',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800',
    icon: Ear,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
];

const GamesPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                Practice Games
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Make learning fun with interactive challenges designed to boost your IELTS score.
              </p>
            </motion.div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GameCard {...game} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;