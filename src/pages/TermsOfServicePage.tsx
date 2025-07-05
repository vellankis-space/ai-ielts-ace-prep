import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';

const TermsOfServicePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <Card>
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <p className="mb-4">
                Welcome to AI IELTS Ace Prep! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms and all policies incorporated by reference.
              </p>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By creating an account, accessing, or using the services, you signify that you have read, understood, and agree to be bound by these Terms, whether or not you are a registered user of our services.
              </p>
              <h2 className="text-2xl font-semibold mb-3">2. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <h2 className="text-2xl font-semibold mb-3">3. Privacy Policy</h2>
              <p className="mb-4">
                Your access to and use of the service is also conditioned on your acceptance of and compliance with the Privacy Policy. Our Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your personal information when you use the application or the website and tells you about your privacy rights and how the law protects you.
              </p>
              <h2 className="text-2xl font-semibold mb-3">4. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
              </p>
              <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
              <p className="mb-4">
                The service and its original content (excluding content provided by you or other users), features, and functionality are and will remain the exclusive property of AI IELTS Ace Prep and its licensors.
              </p>
              <h2 className="text-2xl font-semibold mb-3">6. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
              </p>
              <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at support@aiieltsaceprep.com.
              </p>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;
