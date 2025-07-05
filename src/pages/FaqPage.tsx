import React from 'react';
import Layout from '../components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

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
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
};

export default FaqPage;
