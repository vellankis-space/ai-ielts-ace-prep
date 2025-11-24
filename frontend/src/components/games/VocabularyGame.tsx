import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VocabularyGame = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Vocabulary Builder (Placeholder)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">This is a placeholder for a vocabulary mini-game. Imagine interactive exercises here!</p>
        <Button className="w-full">Start Game</Button>
      </CardContent>
    </Card>
  );
};

export default VocabularyGame;
