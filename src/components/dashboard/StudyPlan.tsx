
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, ArrowRight, Target, TrendingUp } from 'lucide-react';

interface StudyPlanProps {
  recommendations: string[];
}

const StudyPlan = ({ recommendations }: StudyPlanProps) => {
  return (
    <Card className="glass-card border-white/5">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Your Next Steps
        </CardTitle>
        <p className="text-muted-foreground">
          Personalized recommendations based on your performance
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {recommendations.map((recommendation, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
              <AccordionTrigger className="no-underline hover:no-underline hover:bg-white/5 px-2 rounded-lg transition-colors">
                <div className="flex items-center space-x-3 text-left">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-foreground font-medium">{recommendation}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <div className="pl-9 pt-2 text-muted-foreground">
                  <p>Detailed breakdown and practice materials for this recommendation...</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="pt-6 mt-2 border-t border-white/5">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Next Practice Test
            </Button>
            <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
              <TrendingUp className="w-4 h-4 mr-2" />
              Review Weakest Area
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlan;
