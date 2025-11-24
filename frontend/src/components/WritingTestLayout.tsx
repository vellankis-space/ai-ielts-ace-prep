import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, FileText, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Layout from '@/components/Layout';

interface WritingTestLayoutProps {
  title: string;
  task1Instructions: React.ReactNode;
  task2Instructions: React.ReactNode;
  task1Content?: React.ReactNode;
}

const WritingTestLayout: React.FC<WritingTestLayoutProps> = ({ title, task1Instructions, task2Instructions, task1Content }) => {
  const [testState, setTestState] = useState('not_started'); // not_started, task_1, task_2, finished
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isActive, setIsActive] = useState(false);
  const [task1Answer, setTask1Answer] = useState('');
  const [task2Answer, setTask2Answer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      submitTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getWordCount = (text: string) => {
    return text.split(/\s+/).filter(Boolean).length;
  };

  const startTest = () => {
    setTestState('task_1');
    setIsActive(true);
  };

  const continueToTask2 = () => {
    setTestState('task_2');
  };

  const submitTest = () => {
    setIsActive(false);
    setTestState('finished');
    navigate('/modules/writing/results', { state: { task1Answer, task2Answer } });
  };

  if (testState === 'finished') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="glass-card max-w-md w-full text-center p-8 border-white/5">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Test Submitted!</h1>
            <p className="text-muted-foreground mb-8">Your writing has been submitted for analysis.</p>
            <Link to="/modules/writing">
              <Button className="w-full">Back to Writing Module</Button>
            </Link>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="text-muted-foreground text-sm flex items-center mt-1">
                <Link to="/modules/writing" className="hover:text-primary transition-colors flex items-center">
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Back to Modules
                </Link>
              </p>
            </div>

            {testState !== 'not_started' && (
              <div className={`px-4 py-2 rounded-full border flex items-center space-x-2 ${timeRemaining < 300
                  ? 'bg-red-500/10 border-red-500/20 text-red-500'
                  : 'bg-white/5 border-white/10 text-foreground'
                }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-medium text-lg">{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>

          {/* Initial State */}
          {testState === 'not_started' && (
            <Card className="glass-card border-white/5 text-center p-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                This is a timed test. You will have 60 minutes to complete two writing tasks.
                Make sure you are in a quiet environment.
              </p>
              <Button onClick={startTest} size="lg" className="px-8">Start Test</Button>
            </Card>
          )}

          {/* Task 1 */}
          {testState === 'task_1' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Task 1</span>
                    <span className="text-xs font-normal px-2 py-1 rounded bg-white/10">20 Minutes Recommended</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-invert max-w-none text-sm">
                    {task1Instructions}
                  </div>
                  {task1Content && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      {task1Content}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5 flex flex-col h-[600px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Your Response</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Textarea
                    placeholder="Type your answer for Task 1 here..."
                    className="flex-1 resize-none bg-transparent border-0 focus-visible:ring-0 p-0 text-base leading-relaxed"
                    value={task1Answer}
                    onChange={(e) => setTask1Answer(e.target.value)}
                  />
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground">Word Count: {getWordCount(task1Answer)}</span>
                    <Button onClick={continueToTask2}>Continue to Task 2</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Task 2 */}
          {testState === 'task_2' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Task 2</span>
                    <span className="text-xs font-normal px-2 py-1 rounded bg-white/10">40 Minutes Recommended</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-invert max-w-none text-sm">
                    {task2Instructions}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5 flex flex-col h-[600px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Your Response</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Textarea
                    placeholder="Type your answer for Task 2 here..."
                    className="flex-1 resize-none bg-transparent border-0 focus-visible:ring-0 p-0 text-base leading-relaxed"
                    value={task2Answer}
                    onChange={(e) => setTask2Answer(e.target.value)}
                  />
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-4">
                    <Button variant="ghost" size="sm" onClick={() => setTestState('task_1')}>Back to Task 1</Button>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">Word Count: {getWordCount(task2Answer)}</span>
                      <Button onClick={submitTest} className="bg-primary hover:bg-primary/90">
                        Submit Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {timeRemaining < 300 && isActive && (
            <Alert variant="destructive" className="mt-6 bg-red-500/10 border-red-500/20 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                You have less than 5 minutes remaining.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WritingTestLayout;
