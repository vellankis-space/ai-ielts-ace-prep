
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Your Next Steps
        </CardTitle>
        <p className="text-gray-600">
          Personalized recommendations based on your performance
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {recommendations.map((recommendation, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="no-underline hover:no-underline">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-900 font-medium text-left">{recommendation}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700 pl-9">Details about this recommendation...</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Next Practice Test
            </Button>
            <Button variant="outline" className="flex-1">
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
