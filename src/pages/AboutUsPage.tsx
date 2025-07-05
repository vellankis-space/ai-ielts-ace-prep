import React from 'react';
import Layout from '../components/Layout';

const AboutUsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to AI IELTS Ace Prep! We are dedicated to providing cutting-edge AI-powered tools and resources to help you excel in your IELTS examination. Our platform offers personalized study plans, mock tests, and detailed performance analytics to guide you every step of the way.
        </p>
        <p className="text-lg mb-4">
          Our mission is to make IELTS preparation accessible, efficient, and effective for everyone, everywhere. We believe that with the right tools and guidance, every student can achieve their desired band score.
        </p>
        <p className="text-lg">
          For more information, feel free to explore our features or contact us directly.
        </p>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
