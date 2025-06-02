
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
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
  FileText
} from 'lucide-react';

const TestInterface = () => {
  const { module } = useParams();
  const navigate = useNavigate();
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  // Audio/Recording state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Module configuration
  const moduleConfig = {
    listening: {
      name: 'Listening',
      totalTime: 30 * 60, // 30 minutes in seconds
      totalQuestions: 40,
      sections: [
        { name: 'Section 1', questions: 10, description: 'Conversation in everyday context' },
        { name: 'Section 2', questions: 10, description: 'Monologue in everyday context' },
        { name: 'Section 3', questions: 10, description: 'Conversation in educational context' },
        { name: 'Section 4', questions: 10, description: 'Academic lecture' }
      ]
    },
    reading: {
      name: 'Reading',
      totalTime: 60 * 60, // 60 minutes in seconds
      totalQuestions: 40,
      sections: [
        { name: 'Passage 1', questions: 13, description: 'Academic text with varied question types' },
        { name: 'Passage 2', questions: 13, description: 'Academic text with varied question types' },
        { name: 'Passage 3', questions: 14, description: 'Academic text with varied question types' }
      ]
    },
    writing: {
      name: 'Writing',
      totalTime: 60 * 60, // 60 minutes in seconds
      totalQuestions: 2,
      sections: [
        { name: 'Task 1', questions: 1, description: 'Describe visual information (20 minutes)' },
        { name: 'Task 2', questions: 1, description: 'Essay writing (40 minutes)' }
      ]
    },
    speaking: {
      name: 'Speaking',
      totalTime: 14 * 60, // 14 minutes in seconds
      totalQuestions: 3,
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
      // Auto-submit test when time is up
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer changes
  const handleAnswerChange = (questionNum: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNum]: value
    }));
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestion < currentModule.totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Audio controls (for Listening)
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Recording controls (for Speaking)
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Submit test
  const submitTest = () => {
    setIsActive(false);
    navigate(`/modules/${module}/results`);
  };

  if (!currentModule) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
            <Link to="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Render question content based on module type
  const renderQuestionContent = () => {
    switch (module) {
      case 'listening':
        return (
          <div className="space-y-6">
            {/* Audio Player */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
                  Audio Player - Section 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={toggleAudio}
                    className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{formatTime(Math.floor(audioProgress * 3 / 100))}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  You will hear the audio only once. Take notes as you listen.
                </p>
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">What is the speaker's main concern about the accommodation?</p>
                <RadioGroup 
                  value={answers[currentQuestion] || ''} 
                  onValueChange={(value) => handleAnswerChange(currentQuestion, value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="A" />
                    <label htmlFor="A" className="cursor-pointer">A) The location is too far from the city center</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id="B" />
                    <label htmlFor="B" className="cursor-pointer">B) The rent is higher than expected</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="C" />
                    <label htmlFor="C" className="cursor-pointer">C) The facilities are not adequate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D" id="D" />
                    <label htmlFor="D" className="cursor-pointer">D) The contract terms are unclear</label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        );

      case 'reading':
        return (
          <div className="space-y-6">
            {/* Reading Passage */}
            <Card>
              <CardHeader>
                <CardTitle>Passage 1: The Impact of Urbanization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-sm leading-relaxed">
                  <p>
                    Urbanization, the process by which rural areas become urbanized as a result of economic development and industrialization, has been one of the most significant demographic trends of the modern era. As cities continue to grow and expand, they bring both opportunities and challenges that affect millions of people worldwide.
                  </p>
                  <p>
                    The rapid pace of urban growth has led to the development of megacities—urban areas with populations exceeding 10 million people. These massive population centers serve as economic hubs, driving innovation and providing employment opportunities for diverse populations. However, this concentration of people also creates substantial challenges in terms of infrastructure, housing, and environmental sustainability.
                  </p>
                  <p>
                    One of the most pressing issues facing modern cities is the provision of adequate housing. As urban populations grow, the demand for affordable housing often outstrips supply, leading to the development of informal settlements and increasing homelessness. City planners and policymakers must balance the need for economic growth with the requirement to provide basic services and quality of life for all residents.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  According to the passage, urbanization is primarily caused by:
                </p>
                <RadioGroup 
                  value={answers[currentQuestion] || ''} 
                  onValueChange={(value) => handleAnswerChange(currentQuestion, value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="A" />
                    <label htmlFor="A" className="cursor-pointer">A) Population growth in rural areas</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id="B" />
                    <label htmlFor="B" className="cursor-pointer">B) Economic development and industrialization</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="C" />
                    <label htmlFor="C" className="cursor-pointer">C) Government policies promoting city life</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D" id="D" />
                    <label htmlFor="D" className="cursor-pointer">D) Environmental factors affecting rural areas</label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        );

      case 'writing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task {currentQuestion}: {currentQuestion === 1 ? 'Academic Writing Task 1' : 'Academic Writing Task 2'}</CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuestion === 1 ? (
                  <div>
                    <p className="mb-4">
                      You should spend about 20 minutes on this task.
                    </p>
                    <p className="mb-4">
                      The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-8 mb-4 text-center">
                      <p className="text-gray-600">[Chart would be displayed here]</p>
                      <p className="text-sm text-gray-500 mt-2">Bar chart showing housing tenure data</p>
                    </div>
                    <p className="mb-4">
                      Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Write at least 150 words.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4">
                      You should spend about 40 minutes on this task.
                    </p>
                    <p className="mb-4">
                      Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology.
                    </p>
                    <p className="mb-4">
                      Discuss both these views and give your own opinion.
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.
                    </p>
                  </div>
                )}
                
                <Textarea 
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                  <span>Word count: {(answers[currentQuestion] || '').split(' ').filter(word => word.length > 0).length}</span>
                  <span>Minimum: {currentQuestion === 1 ? '150' : '250'} words</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'speaking':
        return (
          <div className="space-y-6">
            {/* Recording Interface */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="w-5 h-5 mr-2 text-orange-600" />
                  Speaking Test - Part {currentQuestion}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    onClick={toggleRecording}
                    className={`${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                  {isRecording && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-600 font-medium">Recording...</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {currentQuestion === 1 && "Answer questions about yourself and familiar topics"}
                  {currentQuestion === 2 && "Speak for 1-2 minutes on the given topic"}
                  {currentQuestion === 3 && "Discuss abstract topics related to Part 2"}
                </p>
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentQuestion === 1 && "Part 1: Introduction & Interview"}
                  {currentQuestion === 2 && "Part 2: Long Turn"}
                  {currentQuestion === 3 && "Part 3: Discussion"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuestion === 1 && (
                  <div>
                    <p className="mb-4">The examiner will ask you questions about yourself. Answer naturally and provide some detail.</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Sample Questions:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• What's your name?</li>
                        <li>• Where are you from?</li>
                        <li>• Do you work or study?</li>
                        <li>• Tell me about your hometown.</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {currentQuestion === 2 && (
                  <div>
                    <p className="mb-4">You have 1 minute to prepare. You can make notes. Then speak for 1-2 minutes.</p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="font-medium mb-2">Topic:</p>
                      <p className="mb-3">Describe a memorable journey you have taken.</p>
                      <p className="text-sm mb-2">You should say:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• where you went</li>
                        <li>• how you traveled</li>
                        <li>• who you went with</li>
                        <li>• and explain why this journey was memorable</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {currentQuestion === 3 && (
                  <div>
                    <p className="mb-4">The examiner will ask you more abstract questions related to the Part 2 topic.</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Discussion Topics:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• How has travel changed in your country?</li>
                        <li>• What are the benefits of traveling?</li>
                        <li>• Do you think people travel too much nowadays?</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Module not found</div>;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Modules', path: '/modules' },
          { label: currentModule.name, path: `/modules/${module}` },
          { label: 'Test' }
        ]} />

        {/* Header with Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {currentModule.name} Test
            </h1>
            <p className="text-gray-600 mt-1">
              Question {currentQuestion} of {currentModule.totalQuestions}
            </p>
          </div>
          
          {/* Timer */}
          <Card className="mt-4 lg:mt-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Time Remaining</p>
                  <p className={`text-lg font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                    {formatTime(timeRemaining)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderQuestionContent()}
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={goToPrevQuestion}
                disabled={currentQuestion === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-3">
                {currentQuestion < currentModule.totalQuestions ? (
                  <Button onClick={goToNextQuestion} className="flex items-center">
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={submitTest} className="bg-green-600 hover:bg-green-700">
                    Submit Test
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Test Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round((currentQuestion / currentModule.totalQuestions) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(currentQuestion / currentModule.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sections */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Sections</h4>
                  <div className="space-y-2">
                    {currentModule.sections.map((section, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{section.name}</span>
                          <span className="text-gray-500">{section.questions}Q</span>
                        </div>
                        <p className="text-gray-600 text-xs">{section.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Review Answers
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Section
                    </Button>
                  </div>
                </div>

                {/* Warning */}
                {timeRemaining < 300 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-red-800 text-sm font-medium">
                        Less than 5 minutes remaining!
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestInterface;
