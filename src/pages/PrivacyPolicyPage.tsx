import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lock } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>
          </div>

          <Card className="glass-card border-white/5">
            <CardContent className="p-8">
              <ScrollArea className="h-[600px] pr-6">
                <div className="prose prose-invert max-w-none">
                  <p className="lead text-lg text-muted-foreground mb-8">
                    This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Collecting and Using Your Personal Data</h2>
                  <h3 className="text-xl font-medium mb-3 text-foreground/90">1.1 Types of Data Collected</h3>
                  <h4 className="text-lg font-medium mb-2 text-foreground/80">Personal Data</h4>
                  <p className="mb-4 text-muted-foreground">
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="list-disc list-inside mb-6 pl-4 text-muted-foreground space-y-2">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Usage Data</li>
                  </ul>
                  <h4 className="text-lg font-medium mb-2 text-foreground/80">Usage Data</h4>
                  <p className="mb-6 text-muted-foreground">
                    Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                  </p>

                  <h3 className="text-xl font-medium mb-3 text-foreground/90">1.2 Use of Your Personal Data</h3>
                  <p className="mb-4 text-muted-foreground">
                    The Company may use Personal Data for the following purposes:
                  </p>
                  <ul className="list-disc list-inside mb-6 pl-4 text-muted-foreground space-y-2">
                    <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                    <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                    <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased.</li>
                    <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                    <li>To provide You with news, special offers and general information about other goods, services and events.</li>
                    <li>To manage Your requests: To attend and manage Your requests to Us.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Disclosure of Your Personal Data</h2>
                  <p className="mb-4 text-muted-foreground">
                    We may share Your personal information in the following situations:
                  </p>
                  <ul className="list-disc list-inside mb-6 pl-4 text-muted-foreground space-y-2">
                    <li>With Service Providers: To monitor and analyze the use of our Service, to contact You.</li>
                    <li>For Business Transfers: In connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business.</li>
                    <li>With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
                    <li>With Business Partners: We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                    <li>With other users: When You share personal information or otherwise interact in the public areas with other users.</li>
                    <li>With Your consent: We may disclose Your personal information for any other purpose with Your consent.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Retention of Your Personal Data</h2>
                  <p className="mb-6 text-muted-foreground">
                    The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Security of Your Personal Data</h2>
                  <p className="mb-6 text-muted-foreground">
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Links to Other Websites</h2>
                  <p className="mb-6 text-muted-foreground">
                    Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Changes to this Privacy Policy</h2>
                  <p className="mb-6 text-muted-foreground">
                    We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact Us</h2>
                  <p className="mb-4 text-muted-foreground">
                    If you have any questions about this Privacy Policy, you can contact us:
                  </p>
                  <ul className="list-disc list-inside mb-6 pl-4 text-muted-foreground">
                    <li>By email: support@aiieltsaceprep.com</li>
                  </ul>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
