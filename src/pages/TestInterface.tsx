
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Mic,
  MicOff,
  CheckCircle,
  AlertCircle,
  FileText,
  Maximize2,
  Minimize2,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TestInterface = () => {
  const { module } = useParams();
  const navigate = useNavigate();

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isZenMode, setIsZenMode] = useState(false);

  // Audio/Recording state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Module configuration
  const moduleConfig = {
    listening: {
      name: 'Listening',
      totalTime: 30 * 60,
      totalQuestions: 40,
      color: 'blue',
      sections: [
        { name: 'Section 1', questions: 10, description: 'Conversation in everyday context' },
        { name: 'Section 2', questions: 10, description: 'Monologue in everyday context' },
        { name: 'Section 3', questions: 10, description: 'Conversation in educational context' },
        { name: 'Section 4', questions: 10, description: 'Academic lecture' }
      ]
    },
    reading: {
      name: 'Reading',
      totalTime: 60 * 60,
      totalQuestions: 40,
      color: 'emerald',
      sections: [
        { name: 'Passage 1', questions: 13, description: 'Academic text with varied question types' },
        { name: 'Passage 2', questions: 13, description: 'Academic text with varied question types' },
        { name: 'Passage 3', questions: 14, description: 'Academic text with varied question types' }
      ]
    },
    writing: {
      name: 'Writing',
      totalTime: 60 * 60,
      totalQuestions: 2,
      color: 'purple',
      sections: [
        { name: 'Task 1', questions: 1, description: 'Describe visual information (20 minutes)' },
        { name: 'Task 2', questions: 1, description: 'Essay writing (40 minutes)' }
      ]
    },
    speaking: {
      name: 'Speaking',
      totalTime: 14 * 60,
      totalQuestions: 3,
      color: 'orange',
      sections: [
        { name: 'Part 1', questions: 1, description: 'Introduction and interview (4-5 minutes)' },
        { name: 'Part 2', questions: 1, description: 'Long turn (3-4 minutes)' },
        { name: 'Part 3', questions: 1, description: 'Discussion (4-5 minutes)' }
      ]
    }
  };

  const currentModule = moduleConfig[module as keyof typeof moduleConfig];

  // Initialize timer
  useEffect(() => {
    if (currentModule) {
      setTimeRemaining(currentModule.totalTime);
    }
  }, [currentModule]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionNum: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionNum]: value }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < currentModule.totalQuestions) setCurrentQuestion(currentQuestion + 1);
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const toggleAudio = () => setIsPlaying(!isPlaying);
  const toggleRecording = () => setIsRecording(!isRecording);
  const submitTest = () => {
    setIsActive(false);
    navigate(`/modules/${module}/results`);
  };

  if (!currentModule) return <div>Test not found</div>;

  const renderQuestionContent = () => {
    switch (module) {
      case 'listening':
        return (
          <div className="space-y-6">
            <Card className="glass-card border-white/5 bg-blue-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Audio Track 1</h3>
                      <p className="text-xs text-muted-foreground">Section 1</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggleAudio}
                    className="h-10 w-10 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </Button>
                </div>
                <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300" style={{ width: `${audioProgress}%` }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{formatTime(Math.floor(audioProgress * 3 / 100))}</span>
                  <span>03:00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5">
              <CardHeader>
                <CardTitle className="text-lg">Question {currentQuestion}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-lg">What is the speaker's main concern about the accommodation?</p>
                <RadioGroup
                  value={answers[currentQuestion] || ''}
                  onValueChange={(value) => handleAnswerChange(currentQuestion, value)}
                  className="space-y-3"
                >
                  {['The location is too far from the city center', 'The rent is higher than expected', 'The facilities are not adequate', 'The contract terms are unclear'].map((option, idx) => (
                    <div key={idx} className={cn(
                      "flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer",
                      answers[currentQuestion] === String.fromCharCode(65 + idx)
                        ? "bg-primary/10 border-primary/50"
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}>
                      <RadioGroupItem value={String.fromCharCode(65 + idx)} id={String.fromCharCode(65 + idx)} />
                      <label htmlFor={String.fromCharCode(65 + idx)} className="flex-1 cursor-pointer font-medium">
                        {String.fromCharCode(65 + idx)}) {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        );

      case 'reading':
        return (
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <Card className="glass-card border-white/5 h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Passage 1: The Impact of Urbanization</span>
                  <Button variant="ghost" size="icon"><Maximize2 className="w-4 h-4" /></Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-6">
                  <div className="prose prose-invert max-w-none text-base leading-relaxed">
                    <p>Urbanization, the process by which rural areas become urbanized as a result of economic development and industrialization, has been one of the most significant demographic trends of the modern era. As cities continue to grow and expand, they bring both opportunities and challenges that affect millions of people worldwide.</p>
                    <p>The rapid pace of urban growth has led to the development of megacities—urban areas with populations exceeding 10 million people. These massive population centers serve as economic hubs, driving innovation and providing employment opportunities for diverse populations. However, this concentration of people also creates substantial challenges in terms of infrastructure, housing, and environmental sustainability.</p>
                    <p>One of the most pressing issues facing modern cities is the provision of adequate housing. As urban populations grow, the demand for affordable housing often outstrips supply, leading to the development of informal settlements and increasing homelessness. City planners and policymakers must balance the need for economic growth with the requirement to provide basic services and quality of life for all residents.</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Question {currentQuestion}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6">
                <p className="mb-6 text-lg font-medium">According to the passage, urbanization is primarily caused by:</p>
                <RadioGroup
                  value={answers[currentQuestion] || ''}
                  onValueChange={(value) => handleAnswerChange(currentQuestion, value)}
                  className="space-y-3"
                >
                  {['Population growth in rural areas', 'Economic development and industrialization', 'Government policies promoting city life', 'Environmental factors affecting rural areas'].map((option, idx) => (
                    <div key={idx} className={cn(
                      "flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer",
                      answers[currentQuestion] === String.fromCharCode(65 + idx)
                        ? "bg-primary/10 border-primary/50"
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}>
                      <RadioGroupItem value={String.fromCharCode(65 + idx)} id={String.fromCharCode(65 + idx)} />
                      <label htmlFor={String.fromCharCode(65 + idx)} className="flex-1 cursor-pointer font-medium">
                        {String.fromCharCode(65 + idx)}) {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        );

      case 'writing':
        return (
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <Card className="glass-card border-white/5 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Task {currentQuestion}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="bg-white/5 rounded-xl p-6 mb-6">
                  <p className="font-medium mb-4 text-muted-foreground">
                    {currentQuestion === 1 ? 'You should spend about 20 minutes on this task.' : 'You should spend about 40 minutes on this task.'}
                  </p>
                  <p className="text-lg mb-4">
                    {currentQuestion === 1
                      ? 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.'
                      : 'Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future.'}
                  </p>
                  {currentQuestion === 1 && (
                    <div className="bg-white/5 rounded-lg h-48 flex items-center justify-center border border-white/10 mb-4">
                      <span className="text-muted-foreground">[Chart Placeholder]</span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion === 1
                      ? 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
                      : 'Discuss both these views and give your own opinion.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 h-full flex flex-col">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Your Response</CardTitle>
                <div className="text-xs text-muted-foreground">
                  {(answers[currentQuestion] || '').split(' ').filter(w => w.length > 0).length} words
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <Textarea
                  placeholder="Start typing your answer here..."
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  className="h-full resize-none border-0 bg-transparent p-6 focus-visible:ring-0 text-base leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'speaking':
        return (
          <div className="max-w-2xl mx-auto space-y-8 py-12">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto animate-pulse">
                <Mic className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold">Part {currentQuestion}: {currentQuestion === 1 ? 'Introduction' : currentQuestion === 2 ? 'Long Turn' : 'Discussion'}</h2>
              <p className="text-muted-foreground">
                {currentQuestion === 1 && "Answer questions about yourself and familiar topics"}
                {currentQuestion === 2 && "Speak for 1-2 minutes on the given topic"}
                {currentQuestion === 3 && "Discuss abstract topics related to Part 2"}
              </p>
            </div>

            <Card className="glass-card border-white/5 bg-orange-500/5">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="w-full bg-white/5 rounded-full h-16 flex items-center justify-center mb-8 relative overflow-hidden">
                  {isRecording && (
                    <div className="absolute inset-0 bg-orange-500/10 animate-pulse" />
                  )}
                  <div className="flex gap-1 items-end h-8">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-orange-500 rounded-full transition-all duration-100"
                        style={{ height: isRecording ? `${Math.random() * 100}%` : '20%' }}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={toggleRecording}
                  className={cn(
                    "h-16 px-8 rounded-full text-lg font-medium transition-all shadow-lg",
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                      : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20"
                  )}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4 text-muted-foreground">Topic Card</h3>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-lg font-medium mb-4">Describe a memorable journey you have taken.</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• where you went</li>
                    <li>• how you traveled</li>
                    <li>• who you went with</li>
                    <li>• and explain why this journey was memorable</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className={cn("min-h-screen bg-background flex flex-col", isZenMode ? "fixed inset-0 z-50" : "pt-20 pb-20")}>
        {/* Test Header */}
        <div className="border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-bold text-lg">{currentModule.name} Test</h1>
                <div className="flex items-center text-xs text-muted-foreground space-x-2">
                  <span>Question {currentQuestion} of {currentModule.totalQuestions}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{currentModule.sections[0].name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded-full border",
                timeRemaining < 300 ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-white/5 border-white/10"
              )}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsZenMode(!isZenMode)}>
                {isZenMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>
              <Button onClick={submitTest} size="sm" className="bg-primary hover:bg-primary/90">
                Submit
              </Button>
            </div>
          </div>
          <Progress value={(currentQuestion / currentModule.totalQuestions) * 100} className="h-0.5 rounded-none bg-transparent" />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 h-full py-6">
            {renderQuestionContent()}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-white/5 bg-background/50 backdrop-blur-xl p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button variant="outline" onClick={goToPrevQuestion} disabled={currentQuestion === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="flex space-x-2">
              {[...Array(Math.min(10, currentModule.totalQuestions))].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i + 1 === currentQuestion ? "bg-primary scale-125" :
                      i + 1 < currentQuestion ? "bg-primary/50" : "bg-white/10"
                  )}
                />
              ))}
            </div>
            <Button onClick={goToNextQuestion} disabled={currentQuestion === currentModule.totalQuestions}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestInterface;
