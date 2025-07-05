import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { AnimatedTestimonials } from '../components/AnimatedTestimonials';
import { useAuth } from '@/hooks/auth-context';
import { 
  Star, 
  Users, 
  Trophy, 
  Brain, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  ArrowRight, 
  Play,
  CheckCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Scoring & Feedback",
      description: "Get instant, detailed feedback with personalized improvement suggestions powered by advanced AI"
    },
    {
      icon: Trophy,
      title: "Realistic Mock Tests",
      description: "Practice with authentic IELTS-style questions that mirror the actual exam format and difficulty"
    },
    {
      icon: TrendingUp,
      title: "Personalized Study Plans",
      description: "Adaptive learning paths that adjust to your strengths and focus on areas needing improvement"
    },
    {
      icon: Users,
      title: "Comprehensive Module Coverage",
      description: "Complete preparation for all four IELTS modules: Listening, Reading, Writing, and Speaking"
    }
  ];

  const modules = [
    {
      icon: Headphones,
      name: "Listening",
      description: "Master audio comprehension with diverse accents and realistic test scenarios",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      name: "Reading",
      description: "Improve reading speed and comprehension with academic and general texts",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: PenTool,
      name: "Writing",
      description: "Excel in Task 1 and Task 2 with AI-powered grammar and structure feedback",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mic,
      name: "Speaking",
      description: "Build confidence with pronunciation analysis and fluency improvement",
      color: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      designation: "Software Engineer",
      src: "/lovable-uploads/ed62ef41-93b5-4eaa-b357-37abef1fe644.png",
      score: "8.5",
      quote: "IELTS AI helped me improve from 6.5 to 8.5 in just 3 months. The AI feedback was incredibly detailed and actionable. I couldn't believe how much my writing and speaking improved with their personalized suggestions."
    },
    {
      name: "Mohammed Al-Rashid",
      designation: "Medical Student",
      src: "/lovable-uploads/1be0c8d4-9452-4154-b2ee-b8a534d44ed4.png",
      score: "7.5",
      quote: "The Speaking module practice was a game-changer. I gained so much confidence before my actual test. The pronunciation feedback helped me identify and fix issues I never knew I had."
    },
    {
      name: "Elena Kowalski",
      designation: "Business Analyst",
      src: "/lovable-uploads/85b711da-06c3-4571-9411-1d32b4f33cec.png",
      score: "8.0",
      quote: "The personalized study plan kept me focused on my weak areas. Highly recommend for serious IELTS preparation. The adaptive learning really made a difference in my final score."
    },
    {
      name: "James Mitchell",
      designation: "Marketing Manager",
      src: "/lovable-uploads/122b1b5d-785d-4ce4-b803-9aff2c761893.png",
      score: "7.0",
      quote: "The mock tests were incredibly realistic and helped me understand exactly what to expect. The detailed feedback on my writing tasks was particularly helpful for improving my band score."
    },
    {
      name: "Raj Patel",
      designation: "Data Analyst",
      src: "/lovable-uploads/2d82cedf-c3aa-4345-b1bb-70df73de414d.png",
      score: "8.0",
      quote: "I was struggling with the listening section, but the AI-powered practice sessions helped me improve significantly. The variety of accents and topics prepared me well for the actual test."
    }
  ];

  const stats = [
    { number: "15,000+", label: "Students Helped" },
    { number: "1.2", label: "Average Band Improvement" },
    { number: "95%", label: "Pass Rate" },
    { number: "5,000+", label: "Practice Questions" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Ace Your IELTS with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  AI-Powered Precision
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Personalized feedback, adaptive learning, and realistic practice tests to boost your score. 
                Join thousands of successful IELTS candidates who achieved their target bands.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <BarChart3 className="mr-2 w-5 h-5" />
                      Go to Dashboard
                    </Link>
                    <Link
                      to="/modules"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <BookOpen className="mr-2 w-5 h-5" />
                      Browse Modules
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/diagnostic-test"
                      className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Start Your Free Diagnosis
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                      <Play className="mr-2 w-5 h-5" />
                      Watch Demo
                    </button>
                  </>
                )}
              </div>
              
              {/* Trust indicators */}
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  {user ? 'Personalized Learning' : 'No Credit Card Required'}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  Instant Results
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your IELTS Progress</h3>
                <div className="space-y-4">
                  {['Listening: 7.5', 'Reading: 7.0', 'Writing: 6.5', 'Speaking: 7.0'].map((skill, index) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-gray-600">{skill.split(':')[0]}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-1000"
                            style={{ width: `${(parseFloat(skill.split(':')[1]) / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-blue-600">{skill.split(':')[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Band Score</span>
                    <span className="text-2xl font-bold text-blue-600">7.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How IELTS AI Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology provides comprehensive IELTS preparation with personalized insights and real-time feedback
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Master Every IELTS Module
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation for all four IELTS modules with AI-powered insights and practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{module.name}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <Link 
                    to={`/modules/${module.name.toLowerCase()}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Explore Module
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/modules"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 hover:shadow-lg transition-colors"
            >
              View All Modules
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Animated Testimonials Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students who achieved their target IELTS scores
            </p>
          </div>
          
          <AnimatedTestimonials 
            testimonials={testimonials} 
            autoplay={true}
            className="max-w-6xl"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Achieve Your Target IELTS Score?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your personalized IELTS preparation journey today with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/diagnostic-test"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Start Free Diagnostic Test
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/modules"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore All Modules
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
