
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  CheckCircle,
  AlertCircle,
  Download,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Target,
  BookOpen,
  Award,
  Eye,
  Play,
  FileText,
  Mic,
  Volume2
} from 'lucide-react';

// Define interfaces for better type safety
interface Subscores {
  [key: string]: number;
}

interface Section {
  name: string;
  score: number;
  questions?: number;
  correct?: number;
  subscores?: Subscores;
}

interface ModuleResults {
  overallScore: number;
  totalQuestions?: number;
  correctAnswers?: number;
  sections: Section[];
  strengths: string[];
  weaknesses: string[];
}

const TestResults = () => {
  const { module } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock test results data with proper typing
  const testResults: Record<string, ModuleResults> = {
    listening: {
      overallScore: 6.5,
      totalQuestions: 40,
      correctAnswers: 26,
      sections: [
        { name: 'Section 1', score: 7.0, questions: 10, correct: 8 },
        { name: 'Section 2', score: 6.5, questions: 10, correct: 6 },
        { name: 'Section 3', score: 6.0, questions: 10, correct: 6 },
        { name: 'Section 4', score: 6.5, questions: 10, correct: 6 }
      ],
      strengths: [
        'Excellent performance in everyday conversation contexts',
        'Strong understanding of factual information',
        'Good comprehension of speaker attitudes'
      ],
      weaknesses: [
        'Difficulty with academic vocabulary in lectures',
        'Missed some detail questions in Section 4',
        'Need to improve note-taking skills for longer passages'
      ]
    },
    reading: {
      overallScore: 6.0,
      totalQuestions: 40,
      correctAnswers: 24,
      sections: [
        { name: 'Passage 1', score: 6.5, questions: 13, correct: 9 },
        { name: 'Passage 2', score: 6.0, questions: 13, correct: 8 },
        { name: 'Passage 3', score: 5.5, questions: 14, correct: 7 }
      ],
      strengths: [
        'Good understanding of main ideas',
        'Strong performance on multiple choice questions',
        'Effective scanning for specific information'
      ],
      weaknesses: [
        'Struggle with inference questions',
        'Time management issues in final passage',
        'Difficulty with complex sentence matching'
      ]
    },
    writing: {
      overallScore: 6.0,
      sections: [
        { 
          name: 'Task 1', 
          score: 6.0,
          subscores: {
            taskAchievement: 6.0,
            coherenceCohesion: 6.0,
            lexicalResource: 6.0,
            grammaticalRange: 5.5
          }
        },
        { 
          name: 'Task 2', 
          score: 6.0,
          subscores: {
            taskResponse: 6.0,
            coherenceCohesion: 6.0,
            lexicalResource: 6.0,
            grammaticalRange: 6.0
          }
        }
      ],
      strengths: [
        'Clear task achievement in both tasks',
        'Good use of cohesive devices',
        'Appropriate register and tone'
      ],
      weaknesses: [
        'Limited range of complex grammatical structures',
        'Some repetitive vocabulary usage',
        'Minor errors in article usage'
      ]
    },
    speaking: {
      overallScore: 6.5,
      sections: [
        { 
          name: 'Part 1', 
          score: 7.0,
          subscores: {
            fluencyCoherence: 7.0,
            lexicalResource: 6.5,
            grammaticalRange: 6.5,
            pronunciation: 7.0
          }
        },
        { 
          name: 'Part 2', 
          score: 6.0,
          subscores: {
            fluencyCoherence: 6.0,
            lexicalResource: 6.0,
            grammaticalRange: 6.0,
            pronunciation: 7.0
          }
        },
        { 
          name: 'Part 3', 
          score: 6.5,
          subscores: {
            fluencyCoherence: 6.5,
            lexicalResource: 6.0,
            grammaticalRange: 6.0,
            pronunciation: 7.0
          }
        }
      ],
      strengths: [
        'Excellent pronunciation and natural rhythm',
        'Confident delivery in familiar topics',
        'Good use of discourse markers'
      ],
      weaknesses: [
        'Some hesitation in abstract discussions',
        'Limited vocabulary for complex topics',
        'Occasional grammatical errors under pressure'
      ]
    }
  };

  const currentResults = testResults[module as string];
  const moduleNames: Record<string, string> = {
    listening: 'Listening',
    reading: 'Reading',
    writing: 'Writing',
    speaking: 'Speaking'
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.0) return 'text-green-600';
    if (score >= 6.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 7.0) return 'bg-green-50 border-green-200';
    if (score >= 6.0) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getBandDescription = (score: number) => {
    if (score >= 7.0) return 'Good User - Operational command with some inaccuracies';
    if (score >= 6.0) return 'Competent User - Effective operational command';
    if (score >= 5.0) return 'Modest User - Partial operational command';
    return 'Limited User - Basic operational command';
  };

  const formatSubscoreKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const recommendations = [
    {
      title: 'Focus on Academic Vocabulary',
      description: 'Practice with academic word lists and subject-specific terminology',
      action: 'Start Vocabulary Builder',
      icon: BookOpen
    },
    {
      title: 'Improve Time Management',
      description: 'Take timed practice tests to build speed and accuracy',
      action: 'Try Timed Practice',
      icon: Target
    },
    {
      title: 'Grammar Enhancement',
      description: 'Work on complex sentence structures and error correction',
      action: 'Grammar Exercises',
      icon: FileText
    }
  ];

  if (!currentResults) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Results Not Found</h1>
            <Link to="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Modules', path: '/modules' },
          { label: moduleNames[module as string] || 'Module', path: `/modules/${module}` },
          { label: 'Test Results' }
        ]} />

        {/* Header with Overall Score */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {moduleNames[module as string] || 'Module'} Test Results
            </h1>
            <p className="text-gray-600">
              Great effort! Here's your detailed performance analysis
            </p>
          </div>

          <Card className={`max-w-md mx-auto ${getScoreBackground(currentResults.overallScore)}`}>
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="mb-4">
                <div className={`text-4xl font-bold ${getScoreColor(currentResults.overallScore)} mb-2`}>
                  {currentResults.overallScore}
                </div>
                <div className="text-lg font-medium text-gray-900">Overall Band Score</div>
              </div>
              <div className="mb-4">
                <Progress value={(currentResults.overallScore / 9) * 100} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>4.5</span>
                  <span>9.0</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {getBandDescription(currentResults.overallScore)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="recommendations">Next Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Module-Specific Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Section Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {currentResults.sections.map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{section.name}</h4>
                        {section.correct && section.questions && (
                          <p className="text-sm text-gray-600">
                            {section.correct}/{section.questions} correct
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(section.score)}`}>
                          {section.score}
                        </div>
                        {section.subscores && (
                          <div className="text-xs text-gray-500 space-y-1">
                            {Object.entries(section.subscores).map(([key, value]) => (
                              <div key={key}>
                                {formatSubscoreKey(key)}: {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentResults.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <TrendingDown className="w-5 h-5 mr-2" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentResults.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question-by-Question Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {module === 'listening' || module === 'reading' ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((questionNum) => (
                      <div key={questionNum} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Question {questionNum}</span>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-sm text-green-600">Correct</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Your answer: <span className="font-medium">B) The rent is higher than expected</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Explanation: The speaker mentions that the accommodation costs more than initially budgeted.
                        </div>
                      </div>
                    ))}
                  </div>
                ) : module === 'writing' ? (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Task 1 Analysis</h4>
                      <div className="bg-gray-50 p-4 rounded mb-4">
                        <p className="text-sm font-mono leading-relaxed">
                          The chart shows the percentage of households in owned and rented accommodation...
                          <span className="bg-yellow-200 px-1">However</span>, there was a significant change...
                        </p>
                      </div>
                      <div className="text-sm space-y-2">
                        <p><span className="text-green-600">✓ Good:</span> Clear overview statement</p>
                        <p><span className="text-orange-600">⚠ Improve:</span> Use more varied linking words instead of "However"</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Part 1 Analysis</h4>
                      <div className="flex items-center mb-3">
                        <Play className="w-4 h-4 mr-2" />
                        <span className="text-sm">Recording transcript available</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded mb-4">
                        <p className="text-sm font-mono leading-relaxed">
                          "Well, I come from a small town... um... it's quite peaceful there..."
                        </p>
                      </div>
                      <div className="text-sm space-y-2">
                        <p><span className="text-green-600">✓ Good:</span> Natural pronunciation and clear delivery</p>
                        <p><span className="text-orange-600">⚠ Improve:</span> Reduce hesitation with filler words</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p>
                    Your performance shows strong foundational skills with clear areas for targeted improvement. 
                    You demonstrate good understanding of main ideas and can communicate effectively, but focusing 
                    on specific areas will help you achieve your target band score.
                  </p>
                </div>

                {module === 'writing' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Suggested Improvements:</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm mb-2">
                        <span className="line-through text-red-600">However, there was a significant change</span>
                        <span className="text-green-600 ml-2">→ Nevertheless, a notable transformation occurred</span>
                      </p>
                      <p className="text-xs text-gray-600">Use more sophisticated linking words for better coherence</p>
                    </div>
                  </div>
                )}

                {module === 'speaking' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Pronunciation Notes:</h4>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Volume2 className="w-4 h-4 mr-2" />
                        <span className="text-sm">Word stress patterns need attention</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Practice stress in words like "photography" (pho-TO-gra-phy)
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Practice Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <rec.icon className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{rec.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                          <Button size="sm" variant="outline">
                            {rec.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => navigate(`/modules/${module}/test`)}
            variant="outline"
            className="flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Review Your Answers
          </Button>
          
          <Button className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Full Report (PDF)
          </Button>
          
          <Button
            onClick={() => navigate(`/modules/${module}/test`)}
            variant="outline"
            className="flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Test
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TestResults;
