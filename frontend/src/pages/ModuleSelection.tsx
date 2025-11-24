import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  FileText,
  User,
  ArrowRight,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ModuleSelection = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 80; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location.search]);

  const modules = [
    {
      id: 'listening',
      name: 'Listening',
      icon: Headphones,
      description: 'Master audio comprehension with diverse accents and realistic test scenarios.',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      path: '/modules/listening'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: BookOpen,
      description: 'Improve reading speed and comprehension with academic and general texts.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      path: '/modules/reading'
    },
    {
      id: 'writing',
      name: 'Writing',
      icon: PenTool,
      description: 'Excel in Task 1 and Task 2 with AI-powered grammar and structure feedback.',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      path: '/modules/writing'
    },
    {
      id: 'speaking',
      name: 'Speaking',
      icon: Mic,
      description: 'Build confidence with pronunciation analysis and fluency improvement.',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
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
      description: 'Identify your strengths and weaknesses across all modules. Get personalized recommendations.',
      duration: '1h 30min',
      difficulty: 'Adaptive',
      path: '/diagnostic-test',
      featured: false
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Modules' }]} />

          {/* Page Header */}
          <div className="text-center mb-16 mt-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              <span>Comprehensive Preparation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Choose Your Module
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a specific module to practice or take a comprehensive test to assess your overall performance.
            </p>
          </div>

          {/* IELTS Modules Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <Target className="mr-2 h-6 w-6 text-primary" />
              Practice Individual Modules
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module) => (
                <Link key={module.id} to={module.path} className="group">
                  <Card className="h-full p-6 glass-card hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-primary/20">
                    <div className={`w-14 h-14 ${module.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <module.icon className={`w-7 h-7 ${module.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {module.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {module.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary mt-auto">
                      Start Practice
                      <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Full Tests Section */}
          <div id="comprehensive-test" className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              Comprehensive Tests
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {additionalTests.map((test) => (
                <Link key={test.id} to={test.path} className="group">
                  <Card className={`h-full p-8 glass-card transition-all duration-300 border-white/5 hover:border-primary/20 ${test.featured ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white/5'
                    }`}>
                    {test.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          Recommended
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${test.featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'
                        }`}>
                        <test.icon className="w-8 h-8" />
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center justify-end text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1.5" />
                          {test.duration}
                        </div>
                        <div className="flex items-center justify-end text-sm text-muted-foreground">
                          <User className="w-4 h-4 mr-1.5" />
                          {test.difficulty}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {test.name}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {test.description}
                    </p>

                    <Button className={`w-full ${test.featured ? '' : 'variant-secondary'}`}>
                      {test.id === 'mock-test' ? 'Start Full Mock Test' : 'Take Diagnostic Test'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="glass-panel rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Not sure where to start? Take our diagnostic test to identify your strengths and weaknesses,
                or dive into individual modules to focus on specific skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/diagnostic-test">
                  <Button size="lg">
                    Take Diagnostic Test
                    <Target className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="bg-transparent border-white/10 hover:bg-white/5">
                    Contact Support
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleSelection;
