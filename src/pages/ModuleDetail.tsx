import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
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
  ChevronUp,
  Sparkles,
  BarChart
} from 'lucide-react';
import { motion } from 'framer-motion';

const ModuleDetail = () => {
  const { module } = useParams();
  const [showTechnicalCheck, setShowTechnicalCheck] = useState(false);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [module]);

  // Module configuration
  const moduleConfig = {
    listening: {
      name: 'Listening',
      icon: Headphones,
      gradient: 'from-blue-600 to-cyan-500',
      accentColor: 'text-blue-500',
      bgAccent: 'bg-blue-500/10',
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
      gradient: 'from-emerald-600 to-green-500',
      accentColor: 'text-emerald-500',
      bgAccent: 'bg-emerald-500/10',
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
          difficulty: 'Academic',
          duration: '60 minutes',
          description: 'Three academic passages with varied question types'
        },
        {
          name: 'General Training Reading',
          difficulty: 'General',
          duration: '60 minutes',
          description: 'Workplace and social contexts'
        }
      ]
    },
    writing: {
      name: 'Writing',
      icon: PenTool,
      gradient: 'from-purple-600 to-pink-500',
      accentColor: 'text-purple-500',
      bgAccent: 'bg-purple-500/10',
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
          name: 'General Training Writing',
          difficulty: 'Beginner',
          duration: '60 minutes',
          description: 'Task 1: Letter writing, Task 2: Opinion essay'
        },
        {
          name: 'Academic Writing Practice',
          difficulty: 'Intermediate',
          duration: '60 minutes',
          description: 'Task 1: Graph description, Task 2: Argumentative essay'
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
      gradient: 'from-orange-600 to-red-500',
      accentColor: 'text-orange-500',
      bgAccent: 'bg-orange-500/10',
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
            <Link to="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const IconComponent = currentModule.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Module Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-r ${currentModule.gradient} p-8 md:p-12`}
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white/80 mb-2 text-sm font-medium uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Training
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{currentModule.name} Mastery</h1>
                  <p className="text-white/90 max-w-xl text-lg leading-relaxed">
                    {currentModule.description}
                  </p>
                </div>
              </div>

              {/* Quick Stats (Mock) */}
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white border border-white/10">
                  <div className="text-3xl font-bold">8.5</div>
                  <div className="text-xs opacity-80">Target Band</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white border border-white/10">
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-xs opacity-80">Tests Available</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Key Skills */}
              <motion.div variants={itemVariants}>
                <Card className="glass-card border-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className={`w-5 h-5 ${currentModule.accentColor}`} />
                      Core Competencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentModule.skills.map((skill, index) => (
                        <div key={index} className="flex items-start p-3 rounded-lg bg-white/5 border border-white/5">
                          <CheckCircle className={`w-5 h-5 mr-3 ${currentModule.accentColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-muted-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Feedback Preview */}
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{currentModule.feedback}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tips for Success */}
              <motion.div variants={itemVariants}>
                <Card className="glass-card border-white/5">
                  <CardHeader>
                    <CardTitle
                      className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                      onClick={() => setShowTips(!showTips)}
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        Pro Tips
                      </div>
                      {showTips ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {showTips && (
                    <CardContent>
                      <ul className="space-y-3">
                        {currentModule.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 border border-orange-500/20">
                              <span className="text-orange-500 text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              </motion.div>

              {/* Technical Check */}
              {currentModule.hasTechnicalCheck && (
                <motion.div variants={itemVariants}>
                  <Card className="glass-card border-white/5">
                    <CardHeader>
                      <CardTitle
                        className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setShowTechnicalCheck(!showTechnicalCheck)}
                      >
                        <div className="flex items-center gap-2">
                          {module === 'speaking' ? <Mic className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-blue-500" />}
                          System Check
                        </div>
                        {showTechnicalCheck ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </CardTitle>
                    </CardHeader>
                    {showTechnicalCheck && (
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {module === 'speaking'
                              ? 'Ensure your microphone is enabled and working properly for recording your responses.'
                              : 'Ensure your speakers or headphones are working for clear audio playback.'
                            }
                          </p>
                          <Button variant="outline" className="w-full sm:w-auto">
                            {module === 'speaking' ? 'Test Microphone' : 'Test Audio'}
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Test Selection */}
            <div className="lg:col-span-1">
              <motion.div
                variants={itemVariants}
                className="sticky top-24 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Available Tests</h3>
                  <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">3 Tests</span>
                </div>

                <div className="space-y-4">
                  {currentModule.tests.map((test, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="group relative overflow-hidden rounded-xl bg-card border border-white/5 p-5 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/5"
                    >
                      <div className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity ${currentModule.accentColor}`}>
                        <IconComponent className="w-24 h-24 transform translate-x-8 -translate-y-8" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          {test.difficulty && (
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${test.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                test.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                  test.difficulty === 'Advanced' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                    'bg-primary/10 text-primary border border-primary/20'
                              }`}>
                              {test.difficulty}
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{test.name}</h4>

                        <div className="flex items-center text-xs text-muted-foreground mb-4 gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {test.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart className="w-3.5 h-3.5" />
                            Avg. 6.5
                          </span>
                        </div>

                        <Link to={module === 'writing' && test.name === 'General Training Writing' ? '/modules/writing/general-training' : module === 'writing' && test.name === 'Academic Writing Practice' ? '/modules/writing/academic-practice' : module === 'writing' && test.name === 'Advanced Writing Challenge' ? '/modules/writing/advanced-challenge' : `/modules/${module}/test`}>
                          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" size="sm">
                            Start Assessment
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail;
