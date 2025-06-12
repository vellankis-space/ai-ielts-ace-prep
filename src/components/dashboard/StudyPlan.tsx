
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <div className="flex-grow">
                <p className="text-gray-900 font-medium">{recommendation}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 mt-1" />
            </div>
          ))}
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlan;
