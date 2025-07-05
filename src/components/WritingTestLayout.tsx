import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    // In a real app, you'd save the answers and navigate to a results page
    // For now, we'll just log the answers and show a finished message.
    console.log('Task 1 Answer:', task1Answer);
    console.log('Task 2 Answer:', task2Answer);
    navigate('/modules/writing/results', { state: { task1Answer, task2Answer } });
  };

  if (testState === 'finished') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Test Submitted!</h1>
        <p className="text-gray-600 mb-8">Your writing has been submitted for analysis.</p>
        <Link to="/modules/writing">
          <Button>Back to Writing Module</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <Clock className={`w-5 h-5 ${timeRemaining < 300 ? 'text-red-500' : 'text-blue-600'}`} />
              <div>
                <p className="text-sm text-gray-600">Time Remaining</p>
                <p className={`text-lg font-bold ${timeRemaining < 300 ? 'text-red-500' : 'text-blue-600'}`}>
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Initial State */}
      {testState === 'not_started' && (
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="text-gray-700 mb-6">This is a timed test. You will have 60 minutes to complete two writing tasks. Click "Start Test" when you are ready to begin.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/modules/writing">
                <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Back to Module</Button>
            </Link>
            <Button onClick={startTest}>Start Test</Button>
          </div>
        </Card>
      )}

      {/* Task 1 */}
      {testState === 'task_1' && (
        <Card>
          <CardHeader>
            <CardTitle>Task 1</CardTitle>
          </CardHeader>
          <CardContent>
            {task1Instructions}
            {task1Content}
            <Textarea
              placeholder="Type your answer for Task 1 here..."
              className="min-h-[300px] mt-4"
              value={task1Answer}
              onChange={(e) => setTask1Answer(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-2">Word Count: {getWordCount(task1Answer)}</p>
            <div className="mt-6 text-right">
              <Button onClick={continueToTask2}>Continue to Task 2</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task 2 */}
      {testState === 'task_2' && (
        <Card>
          <CardHeader>
            <CardTitle>Task 2</CardTitle>
          </CardHeader>
          <CardContent>
            {task2Instructions}
            <Textarea
              placeholder="Type your answer for Task 2 here..."
              className="min-h-[400px] mt-4"
              value={task2Answer}
              onChange={(e) => setTask2Answer(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-2">Word Count: {getWordCount(task2Answer)}</p>
            <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setTestState('task_1')}>Back to Task 1</Button>
                <Button onClick={submitTest} className="bg-green-600 hover:bg-green-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Submit Test
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {timeRemaining < 300 && isActive && (
          <Alert variant="destructive" className="mt-6">
              <Clock className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                  You have less than 5 minutes remaining.
              </AlertDescription>
          </Alert>
      )}
    </div>
  );
};

export default WritingTestLayout;
