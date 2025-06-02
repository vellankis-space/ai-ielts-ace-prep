
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle,
  Volume2,
  Play,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ModuleDetail = () => {
  const { module } = useParams();
  const [showTechnicalCheck, setShowTechnicalCheck] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Module configuration
  const moduleConfig = {
    listening: {
      name: 'Listening',
      icon: Headphones,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'The Listening module consists of 4 sections, lasting approximately 30 minutes. You will hear each audio only once.',
      skills: [
        'Identifying main ideas and specific details',
        'Understanding speaker\'s opinion and attitude',
        'Following arguments and recognizing agreement/disagreement',
        'Identifying the purpose of a conversation or monologue'
      ],
      tips: [
        'Read all questions before the audio starts',
        'Take notes quickly using abbreviations',
        'Pay attention to signpost words (firstly, however, finally)',
        'Don\'t spend too much time on one question'
      ],
      feedback: 'Our AI highlights missed keywords, analyzes your note-taking patterns, and suggests listening strategies based on your performance.',
      hasTechnicalCheck: true,
      tests: [
        {
          name: 'Academic Listening Practice 1',
          difficulty: 'Intermediate',
          duration: '30 minutes',
          description: 'University lecture and academic conversation'
        },
        {
          name: 'General Training Listening',
          difficulty: 'Beginner',
          duration: '30 minutes',
          description: 'Daily life situations and workplace scenarios'
        },
        {
          name: 'Advanced Listening Challenge',
          difficulty: 'Advanced',
          duration: '35 minutes',
          description: 'Complex academic discussions with multiple speakers'
        }
      ]
    },
    reading: {
      name: 'Reading',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'The Reading module includes 3 passages with 40 questions, completed in 60 minutes. Develop skills in scanning, skimming, and detailed reading.',
      skills: [
        'Scanning for specific information',
        'Skimming for general understanding',
        'Understanding main ideas and supporting details',
        'Identifying writer\'s views and claims'
      ],
      tips: [
        'Skim the passage first to get the general idea',
        'Read questions carefully and identify keywords',
        'Manage your time: 20 minutes per passage',
        'Don\'t leave any answers blank'
      ],
      feedback: 'AI analyzes your reading patterns, identifies comprehension gaps, and provides vocabulary enhancement suggestions.',
      hasTechnicalCheck: false,
      tests: [
        {
          name: 'Academic Reading Test 1',
          difficulty: 'Intermediate',
          duration: '60 minutes',
          description: 'Three academic passages with varied question types'
        },
        {
          name: 'General Training Reading',
          difficulty: 'Beginner',
          duration: '60 minutes',
          description: 'Workplace and social contexts'
        },
        {
          name: 'Advanced Reading Challenge',
          difficulty: 'Advanced',
          duration: '60 minutes',
          description: 'Complex academic texts with challenging vocabulary'
        }
      ]
    },
    writing: {
      name: 'Writing',
      icon: PenTool,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'The Writing module consists of 2 tasks completed in 60 minutes. Task 1 focuses on describing data/processes, Task 2 on essay writing.',
      skills: [
        'Task Achievement and Task Response',
        'Coherence and Cohesion',
        'Lexical Resource (vocabulary range)',
        'Grammatical Range and Accuracy'
      ],
      tips: [
        'Spend 20 minutes on Task 1, 40 minutes on Task 2',
        'Plan your essay structure before writing',
        'Use a variety of sentence structures',
        'Leave time to check grammar and spelling'
      ],
      feedback: 'AI provides detailed grammar analysis, vocabulary suggestions, and structural improvements with inline corrections.',
      hasTechnicalCheck: false,
      tests: [
        {
          name: 'Academic Writing Practice',
          difficulty: 'Intermediate',
          duration: '60 minutes',
          description: 'Task 1: Graph description, Task 2: Argumentative essay'
        },
        {
          name: 'General Training Writing',
          difficulty: 'Beginner',
          duration: '60 minutes',
          description: 'Task 1: Letter writing, Task 2: Opinion essay'
        },
        {
          name: 'Advanced Writing Challenge',
          difficulty: 'Advanced',
          duration: '60 minutes',
          description: 'Complex data interpretation and sophisticated essay topics'
        }
      ]
    },
    speaking: {
      name: 'Speaking',
      icon: Mic,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'The Speaking module is an 11-14 minute face-to-face interview with three parts: introduction, long turn, and discussion.',
      skills: [
        'Fluency and Coherence',
        'Lexical Resource (vocabulary)',
        'Grammatical Range and Accuracy',
        'Pronunciation and Intonation'
      ],
      tips: [
        'Speak clearly and at a natural pace',
        'Don\'t memorize answers - be natural',
        'Use a range of vocabulary and grammar',
        'Extend your answers with examples and explanations'
      ],
      feedback: 'AI analyzes pronunciation, fluency patterns, vocabulary usage, and provides detailed speaking improvement strategies.',
      hasTechnicalCheck: true,
      tests: [
        {
          name: 'Speaking Practice Interview',
          difficulty: 'Intermediate',
          duration: '12 minutes',
          description: 'Complete 3-part speaking test simulation'
        },
        {
          name: 'Part 2 Long Turn Practice',
          difficulty: 'Beginner',
          duration: '5 minutes',
          description: 'Focus on the cue card speaking task'
        },
        {
          name: 'Advanced Speaking Challenge',
          difficulty: 'Advanced',
          duration: '15 minutes',
          description: 'Complex discussion topics with follow-up questions'
        }
      ]
    }
  };

  const currentModule = moduleConfig[module as keyof typeof moduleConfig];

  if (!currentModule) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
            <p className="text-gray-600 mb-6">The requested module could not be found.</p>
            <Link to="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const IconComponent = currentModule.icon;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Modules', path: '/modules' },
          { label: currentModule.name }
        ]} />

        {/* Page Header */}
        <div className="flex items-center mb-8">
          <div className={`w-16 h-16 bg-gradient-to-r ${currentModule.color} rounded-xl flex items-center justify-center mr-4`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{currentModule.name} Practice</h1>
            <Link to="/modules" className="text-blue-600 hover:text-blue-800 transition-colors text-sm">
              ← Back to Modules
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Module Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{currentModule.description}</p>
              </CardContent>
            </Card>

            {/* Key Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Key Skills Tested
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentModule.skills.map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tips for Success */}
            <Card>
              <CardHeader>
                <CardTitle 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowTips(!showTips)}
                >
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Tips for Success
                  </div>
                  {showTips ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {showTips && (
                <CardContent>
                  <ul className="space-y-3">
                    {currentModule.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-orange-600 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* AI Feedback Preview */}
            <Card className={`${currentModule.bgColor} border-2 ${currentModule.borderColor}`}>
              <CardHeader>
                <CardTitle className="text-gray-900">AI-Powered Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{currentModule.feedback}</p>
              </CardContent>
            </Card>

            {/* Technical Check (for Speaking/Listening) */}
            {currentModule.hasTechnicalCheck && (
              <Card>
                <CardHeader>
                  <CardTitle 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setShowTechnicalCheck(!showTechnicalCheck)}
                  >
                    <div className="flex items-center">
                      {module === 'speaking' ? <Mic className="w-5 h-5 mr-2 text-red-600" /> : <Volume2 className="w-5 h-5 mr-2 text-blue-600" />}
                      Technical Requirements
                    </div>
                    {showTechnicalCheck ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </CardTitle>
                </CardHeader>
                {showTechnicalCheck && (
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        {module === 'speaking' 
                          ? 'Ensure your microphone is enabled and working properly for recording your responses.'
                          : 'Ensure your speakers or headphones are working for clear audio playback.'
                        }
                      </p>
                      <Button variant="outline" className="flex items-center">
                        {module === 'speaking' ? <Mic className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {module === 'speaking' ? 'Test Microphone' : 'Test Audio'}
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}
          </div>

          {/* Sidebar - Test Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Choose Your Test</CardTitle>
                <CardDescription>Select a practice test to begin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentModule.tests.map((test, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{test.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        test.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        test.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.duration}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{test.description}</p>
                    <Button className="w-full" size="sm">
                      Start This Test
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
                
                {/* Quick Start Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button className="w-full" size="lg">
                    Quick Start - {currentModule.name} Test
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail;
