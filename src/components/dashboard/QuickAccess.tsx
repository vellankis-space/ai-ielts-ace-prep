
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  PenTool, 
  Headphones, 
  Mic, 
  FileText, 
  Target,
  ArrowRight 
} from 'lucide-react';

const QuickAccess = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Choose a Module',
      description: 'Practice specific skills',
      icon: BookOpen,
      color: 'bg-blue-500',
      action: () => navigate('/modules')
    },
    {
      title: 'Full Mock Test',
      description: 'Complete IELTS simulation',
      icon: FileText,
      color: 'bg-green-500',
      action: () => navigate('/mock-test')
    },
    {
      title: 'Listening Practice',
      description: 'Improve listening skills',
      icon: Headphones,
      color: 'bg-purple-500',
      action: () => navigate('/modules/listening')
    },
    {
      title: 'Writing Practice',
      description: 'Enhance writing abilities',
      icon: PenTool,
      color: 'bg-orange-500',
      action: () => navigate('/modules/writing')
    },
    {
      title: 'Speaking Practice',
      description: 'Practice speaking tasks',
      icon: Mic,
      color: 'bg-red-500',
      action: () => navigate('/modules/speaking')
    },
    {
      title: 'Diagnostic Test',
      description: 'Assess your current level',
      icon: Target,
      color: 'bg-teal-500',
      action: () => navigate('/diagnostic')
    }
  ];

  return (
    <Card>
      <CardContent className="p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Ready to Continue Learning?
          </CardTitle>
          <p className="text-gray-600">
            Choose your next practice session or take a full mock test
          </p>
        </CardHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300"
              onClick={action.action}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-medium mr-1">Start Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            💡 Tip: Regular practice is key to improving your IELTS score!
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/modules')}
          >
            View All Modules
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
