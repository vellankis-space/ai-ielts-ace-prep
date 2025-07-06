import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, BookOpen, Headphones, Puzzle, PenTool, Mic, Trophy, Star, BarChart3, TrendingUp, Users } from 'lucide-react';

const icons = [
  { icon: Lightbulb, size: 'w-16 h-16', top: '10%', left: '15%', depth: 0.2 },
  { icon: BookOpen, size: 'w-12 h-12', top: '20%', left: '80%', depth: 0.4 },
  { icon: Headphones, size: 'w-20 h-20', top: '70%', left: '10%', depth: 0.6 },
  { icon: Puzzle, size: 'w-14 h-14', top: '80%', left: '90%', depth: 0.3 },
  { icon: Lightbulb, size: 'w-8 h-8', top: '50%', left: '50%', depth: 0.5 },
  { icon: BookOpen, size: 'w-10 h-10', top: '90%', left: '40%', depth: 0.25 },
  { icon: PenTool, size: 'w-12 h-12', top: '30%', left: '5%', depth: 0.35 },
  { icon: Mic, size: 'w-16 h-16', top: '60%', left: '70%', depth: 0.45 },
  { icon: Trophy, size: 'w-14 h-14', top: '5%', left: '60%', depth: 0.55 },
  { icon: Star, size: 'w-10 h-10', top: '85%', left: '25%', depth: 0.15 },
  { icon: BarChart3, size: 'w-16 h-16', top: '40%', left: '90%', depth: 0.2 },
  { icon: TrendingUp, size: 'w-12 h-12', top: '75%', left: '50%', depth: 0.3 },
  { icon: Users, size: 'w-14 h-14', top: '15%', left: '30%', depth: 0.4 },
];

const ParallaxBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {icons.map((item, index) => {
        const x = (mousePosition.x - window.innerWidth / 2) * item.depth;
        const y = (mousePosition.y - window.innerHeight / 2) * item.depth;

        return (
          <motion.div
            key={index}
            className={`absolute ${item.size} text-blue-200`}
            style={{
              top: item.top,
              left: item.left,
            }}
            animate={{
              x: x,
              y: y,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.5 }}
          >
            <item.icon className="w-full h-full" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParallaxBackground;
