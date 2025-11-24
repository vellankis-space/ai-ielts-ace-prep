import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, FileText } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>
          </div>

          <Card className="glass-card border-white/5">
            <CardContent className="p-8">
              <ScrollArea className="h-[600px] pr-6">
                <div className="prose prose-invert max-w-none">
                  <p className="lead text-lg text-muted-foreground mb-8">
                    Welcome to AI IELTS Ace Prep! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms and all policies incorporated by reference.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
                  <p className="mb-6 text-muted-foreground">
                    By creating an account, accessing, or using the services, you signify that you have read, understood, and agree to be bound by these Terms, whether or not you are a registered user of our services.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Changes to Terms</h2>
                  <p className="mb-6 text-muted-foreground">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Privacy Policy</h2>
                  <p className="mb-6 text-muted-foreground">
                    Your access to and use of the service is also conditioned on your acceptance of and compliance with the Privacy Policy. Our Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your personal information when you use the application or the website and tells you about your privacy rights and how the law protects you.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">4. User Accounts</h2>
                  <p className="mb-6 text-muted-foreground">
                    When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
                  <p className="mb-6 text-muted-foreground">
                    The service and its original content (excluding content provided by you or other users), features, and functionality are and will remain the exclusive property of AI IELTS Ace Prep and its licensors.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Termination</h2>
                  <p className="mb-6 text-muted-foreground">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Governing Law</h2>
                  <p className="mb-6 text-muted-foreground">
                    These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact Us</h2>
                  <p className="mb-6 text-muted-foreground">
                    If you have any questions about these Terms, please contact us at support@aiieltsaceprep.com.
                  </p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;
