import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="w-full max-w-sm"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0">
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white">
            <Play className="mr-2 h-4 w-4" />
            Play Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GameCard;
