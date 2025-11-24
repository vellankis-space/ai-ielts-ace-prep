import React from 'react';
import Layout from '@/components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle } from 'lucide-react';

const FaqPage: React.FC = () => {
  const faqItems = [
    {
      question: "What is AI IELTS Ace Prep?",
      answer: "AI IELTS Ace Prep is an AI-powered platform designed to help you prepare for the IELTS exam. We offer personalized study plans, mock tests, and detailed performance analytics.",
    },
    {
      question: "How does the AI help in my preparation?",
      answer: "Our AI analyzes your strengths and weaknesses, provides tailored feedback, and suggests areas for improvement. It adapts to your learning style to optimize your study efficiency.",
    },
    {
      question: "Are the mock tests realistic?",
      answer: "Yes, our mock tests are designed to simulate the actual IELTS exam environment, including timing and question formats, to give you a realistic test-taking experience.",
    },
    {
      question: "Can I track my progress?",
      answer: "Absolutely! The platform provides comprehensive progress tracking and analytics, allowing you to monitor your scores, identify trends, and see your improvement over time.",
    },
    {
      question: "Is there a free trial?",
      answer: "Please check our pricing page for information on free trials and subscription plans.",
    },
    {
      question: "Can I use the platform on mobile?",
      answer: "Yes, our platform is fully responsive and works seamlessly on smartphones and tablets, allowing you to practice anytime, anywhere.",
    },
    {
      question: "How accurate is the AI scoring for Writing and Speaking?",
      answer: "Our AI models are trained on thousands of real IELTS responses graded by certified examiners. While no AI is perfect, our scoring typically falls within 0.5 bands of an official examiner's score.",
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Find answers to common questions about our platform, pricing, and the IELTS exam.
            </p>

            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for answers..."
                className="pl-12 h-12 bg-white/5 border-white/10 rounded-full focus:border-primary/50 text-lg"
              />
            </div>
          </div>

          <div className="glass-card border-white/5 rounded-2xl p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index} className="border-white/5 px-4 rounded-lg hover:bg-white/5 transition-colors">
                  <AccordionTrigger className="text-lg font-medium text-left hover:no-underline hover:text-primary transition-colors py-6">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary/50" />
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pb-6 pl-8 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
