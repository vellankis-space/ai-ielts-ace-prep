import React, { useState } from 'react';
import { useIELTSReading } from '../hooks/useIELTSReading';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Brain,
  Target,
  GraduationCap,
  Layout as LayoutIcon,
  FileText,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Timer,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Progress } from "@/components/ui/progress";

const IELTSReadingTest: React.FC = () => {
  const {
    passage,
    questions,
    userAnswers,
    testResult,
    isLoading,
    generateTest,
    submitAnswer,
    submitTest
  } = useIELTSReading();

  const [testConfig, setTestConfig] = useState({
    testType: 'academic' as const,
    topic: '',
    difficulty: 'intermediate' as const
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStartTest = async () => {
    if (!testConfig.topic) return;
    await generateTest(testConfig.testType, testConfig.topic, testConfig.difficulty);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Results View
  if (testResult) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary bg-primary/5">Test Complete</Badge>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Performance Analysis
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-l-4 border-l-blue-500 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-blue-600">{testResult.correctAnswers}</span>
                  <span className="text-muted-foreground">/ {testResult.totalQuestions}</span>
                </div>
                <Progress value={(testResult.correctAnswers / testResult.totalQuestions) * 100} className="mt-4 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-l-4 border-l-green-500 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Band Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-green-600">{testResult.bandScore}</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${testResult.bandScore >= 7 ? 'bg-green-100 text-green-700' :
                      testResult.bandScore >= 6 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {testResult.bandScore >= 7 ? 'Advanced' : testResult.bandScore >= 6 ? 'Competent' : 'Developing'}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Based on IELTS scoring criteria</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-l-4 border-l-purple-500 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Brain className="w-8 h-8 text-purple-500 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {testResult.bandScore >= 7 ? 'Excellent comprehension of complex texts.' :
                      testResult.bandScore >= 6 ? 'Good grasp of main ideas, work on details.' :
                        'Focus on vocabulary and skimming techniques.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Detailed Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-6 rounded-xl whitespace-pre-wrap leading-relaxed text-foreground/80">
                {testResult.detailedFeedback}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="shadow-xl hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Start New Test
          </Button>
        </div>
      </div>
    );
  }

  // Setup View
  if (!passage) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Configure Your Assessment</h1>
          <p className="text-muted-foreground text-lg">Customize your reading practice session with AI-generated content.</p>
        </motion.div>

        <div className="grid gap-8">
          {/* Test Type Selection */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Select Module
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['academic', 'general'].map((type) => (
                <div
                  key={type}
                  onClick={() => setTestConfig(prev => ({ ...prev, testType: type as any }))}
                  className={`cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${testConfig.testType === type
                      ? 'border-primary bg-primary/5'
                      : 'border-muted bg-card hover:border-primary/50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl capitalize">{type} Training</h3>
                    {testConfig.testType === type && <CheckCircle className="w-6 h-6 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {type === 'academic'
                      ? 'For university entry. Complex texts on academic subjects.'
                      : 'For migration or work. Texts from books, magazines, and notices.'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Topic Input */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Topic of Interest
            </h2>
            <div className="relative">
              <input
                type="text"
                value={testConfig.topic}
                onChange={(e) => setTestConfig(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="E.g., Artificial Intelligence, Climate Change, Ancient History..."
                className="w-full p-4 pl-12 rounded-xl border border-input bg-background shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
              />
              <Brain className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </section>

          {/* Difficulty Selection */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Target Difficulty
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'beginner', label: 'Band 4-5', color: 'bg-green-500' },
                { value: 'intermediate', label: 'Band 6-7', color: 'bg-yellow-500' },
                { value: 'advanced', label: 'Band 8-9', color: 'bg-red-500' }
              ].map((level) => (
                <div
                  key={level.value}
                  onClick={() => setTestConfig(prev => ({ ...prev, difficulty: level.value as any }))}
                  className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-200 ${testConfig.difficulty === level.value
                      ? 'ring-2 ring-primary border-transparent bg-primary/5'
                      : 'hover:bg-muted/50'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${level.color}`} />
                  <div className="font-semibold capitalize">{level.value}</div>
                  <div className="text-xs text-muted-foreground">{level.label}</div>
                </div>
              ))}
            </div>
          </section>

          <Button
            onClick={handleStartTest}
            disabled={isLoading || !testConfig.topic}
            size="lg"
            className="w-full py-8 text-lg font-bold shadow-xl hover:scale-[1.01] transition-transform"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating Assessment...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Start Assessment <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Test Interface View
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      {/* Test Header */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            {testConfig.testType === 'academic' ? 'Academic Reading' : 'General Training Reading'}
          </Badge>
          <h2 className="font-semibold truncate max-w-md hidden md:block">{passage.title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-mono font-bold">
            <Timer className="w-4 h-4" />
            <span>20:00</span> {/* Placeholder for timer */}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            onClick={submitTest}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white shadow-md"
          >
            {isLoading ? 'Submitting...' : 'Submit Test'}
          </Button>
        </div>
      </header>

      {/* Split Screen Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel: Passage */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ScrollArea className="h-full">
              <div className="p-8 max-w-3xl mx-auto">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h1 className="text-3xl font-bold mb-6 text-foreground">{passage.title}</h1>
                  {passage.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-lg leading-relaxed text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel: Questions */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ScrollArea className="h-full bg-muted/30">
              <div className="p-8 max-w-2xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Questions 1-{questions.length}
                  </h3>
                  <Badge variant="outline">{questions.length} Questions</Badge>
                </div>

                {questions.map((question, qIndex) => (
                  <Card key={question.id} className="border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                          {qIndex + 1}
                        </span>
                        <div className="flex-1 space-y-4">
                          <p className="font-medium text-lg">{question.question}</p>

                          {question.options ? (
                            <div className="grid gap-3">
                              {question.options.map((option, index) => {
                                const optionLetter = String.fromCharCode(65 + index);
                                const isSelected = userAnswers[question.id] === optionLetter;
                                return (
                                  <div
                                    key={index}
                                    onClick={() => submitAnswer(question.id, optionLetter)}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                        : 'border-input hover:bg-muted'
                                      }`}
                                  >
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs font-bold transition-colors ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground text-muted-foreground'
                                      }`}>
                                      {optionLetter}
                                    </div>
                                    <span className={isSelected ? 'text-primary-foreground' : ''}>{option}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={userAnswers[question.id] || ''}
                              onChange={(e) => submitAnswer(question.id, e.target.value)}
                              className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                              placeholder="Type your answer here..."
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default IELTSReadingTest;