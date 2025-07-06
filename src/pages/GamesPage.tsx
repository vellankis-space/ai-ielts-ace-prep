import React, { useState } from 'react';
import Layout from '../components/Layout';
import GameCard from '../components/games/GameCard';
import ParallaxBackground from '../components/games/ParallaxBackground';
import { motion } from 'framer-motion';

const games = [
  {
    title: 'Vocabulary Builder',
    description: 'Expand your lexicon with our engaging vocabulary game. Learn new words and their meanings in a fun and interactive way.',
    imageUrl: '/placeholder.svg',
  },
  {
    title: 'Grammar Guardian',
    description: 'Test your grammar skills and become a master of sentence structure. Identify and correct grammatical errors to score points.',
    imageUrl: '/placeholder.svg',
  },
  {
    title: 'Listening Challenge',
    description: 'Sharpen your listening skills with a variety of audio clips and comprehension questions. Prepare for the IELTS listening test.',
    imageUrl: '/placeholder.svg',
  },
];

const GamesPage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Layout>
      <ParallaxBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Mini-Games for IELTS Prep
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Sharpen your skills and have fun with our collection of mini-games designed to help you prepare for the IELTS exam.
          </p>
        </div>
        <div
          className="relative w-full h-[600px] flex items-center justify-center -mt-32"
          style={{ perspective: '1000px' }}
        >
          {games.map((game, index) => {
            const offset = index - 1;
            const isHovered = hoveredIndex === index;
            const isNotHovered = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={index}
                className="absolute"
                layout
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: 1,
                  y: isHovered ? -20 : Math.abs(offset) * 60,
                  x: hoveredIndex !== null ? (index - hoveredIndex) * 250 : (index - 1) * 200,
                  scale: isHovered ? 1.15 : 0.9,
                  rotateY: isHovered ? 0 : (hoveredIndex !== null ? (index - hoveredIndex) * -25 : (index - 1) * -25),
                  zIndex: isHovered ? 3 : (offset === 0 ? 2 : 1),
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 40 }}
              >
                <GameCard
                  title={game.title}
                  description={game.description}
                  imageUrl={game.imageUrl}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;