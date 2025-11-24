import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ModulesSection from '@/components/home/ModulesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
