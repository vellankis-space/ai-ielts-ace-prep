
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
  ArrowRight,
  Sparkles
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
      color: 'bg-emerald-500',
      action: () => navigate('/mock-test')
    },
    {
      title: 'Listening Practice',
      description: 'Improve listening skills',
      icon: Headphones,
      color: 'bg-indigo-500',
      action: () => navigate('/modules/listening')
    },
    {
      title: 'Writing Practice',
      description: 'Enhance writing abilities',
      icon: PenTool,
      color: 'bg-purple-500',
      action: () => navigate('/modules/writing')
    },
    {
      title: 'Speaking Practice',
      description: 'Practice speaking tasks',
      icon: Mic,
      color: 'bg-orange-500',
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
    <Card className="glass-card border-white/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <CardContent className="p-8">
        <CardHeader className="text-center px-0 pt-0 pb-8">
          <CardTitle className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Ready to Continue Learning?
          </CardTitle>
          <p className="text-muted-foreground">
            Choose your next practice session or take a full mock test
          </p>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={action.action}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {action.description}
                </p>
                <div className="flex items-center justify-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Start Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-yellow-500">💡</span>
            Tip: Regular practice is key to improving your IELTS score!
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/modules')}
            className="border-white/10 hover:bg-white/5"
          >
            View All Modules
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
