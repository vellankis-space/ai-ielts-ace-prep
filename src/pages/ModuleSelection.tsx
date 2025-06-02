
import React from 'react';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  FileText, 
  User, 
  ArrowRight,
  Clock,
  Target
} from 'lucide-react';

const ModuleSelection = () => {
  const modules = [
    {
      id: 'listening',
      name: 'Listening',
      icon: Headphones,
      description: 'Master audio comprehension with diverse accents and realistic test scenarios. Practice identifying main ideas, specific details, and speaker opinions.',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-200 hover:border-blue-400',
      bgColor: 'hover:bg-blue-50',
      path: '/modules/listening'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: BookOpen,
      description: 'Improve reading speed and comprehension with academic and general texts. Develop skills in scanning, skimming, and detailed reading.',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-200 hover:border-green-400',
      bgColor: 'hover:bg-green-50',
      path: '/modules/reading'
    },
    {
      id: 'writing',
      name: 'Writing',
      icon: PenTool,
      description: 'Excel in Task 1 and Task 2 with AI-powered grammar and structure feedback. Learn to organize ideas clearly and use appropriate vocabulary.',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-200 hover:border-purple-400',
      bgColor: 'hover:bg-purple-50',
      path: '/modules/writing'
    },
    {
      id: 'speaking',
      name: 'Speaking',
      icon: Mic,
      description: 'Build confidence with pronunciation analysis and fluency improvement. Practice all three parts of the Speaking test with AI feedback.',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-200 hover:border-orange-400',
      bgColor: 'hover:bg-orange-50',
      path: '/modules/speaking'
    }
  ];

  const additionalTests = [
    {
      id: 'mock-test',
      name: 'Full Mock Test',
      icon: FileText,
      description: 'Take a complete, timed IELTS simulation covering all four modules. Get a comprehensive band score prediction.',
      duration: '2h 45min',
      difficulty: 'All Levels',
      path: '/mock-test',
      featured: true
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Test',
      icon: Target,
      description: 'Identify your strengths and weaknesses across all modules. Get personalized recommendations for your study plan.',
      duration: '1h 30min',
      difficulty: 'Adaptive',
      path: '/diagnostic',
      featured: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Modules' }]} />
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your IELTS Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a specific module to practice or take a comprehensive test to assess your overall performance.
          </p>
        </div>

        {/* IELTS Modules Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Practice Individual Modules
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`group bg-white rounded-xl border-2 ${module.borderColor} ${module.bgColor} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {module.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  <Link
                    to={module.path}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Start {module.name} Practice
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Tests Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Comprehensive Tests
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {additionalTests.map((test) => (
              <div
                key={test.id}
                className={`relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                  test.featured 
                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-white' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {test.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      test.featured 
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500' 
                        : 'bg-gradient-to-r from-gray-600 to-gray-700'
                    }`}>
                      <test.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {test.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        {test.difficulty}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {test.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {test.description}
                  </p>
                  <Link
                    to={test.path}
                    className={`inline-flex items-center justify-center w-full px-6 py-4 font-semibold rounded-lg transition-colors ${
                      test.featured
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {test.id === 'mock-test' ? 'Start Full Mock Test' : 'Take Diagnostic Test'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Not sure where to start? Take our diagnostic test to identify your strengths and weaknesses, 
            or dive into individual modules to focus on specific skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/diagnostic"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Diagnostic Test
              <Target className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Contact Support
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleSelection;
