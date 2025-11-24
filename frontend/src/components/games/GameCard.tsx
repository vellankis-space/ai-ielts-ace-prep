import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, LucideIcon } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl, icon: Icon, color, bgColor, borderColor }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group relative`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <CardHeader className="p-0 relative">
          <div className="h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 relative z-10">
          <CardTitle className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>

        <CardFooter className="p-6 pt-0 relative z-10 mt-auto">
          <Button className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 hover:border-primary transition-all duration-300 group/btn">
            <Play className="mr-2 h-4 w-4" />
            Play Now
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GameCard;
