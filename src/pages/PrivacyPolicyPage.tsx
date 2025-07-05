import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Privacy Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <p className="mb-4">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <h2 className="text-2xl font-semibold mb-3">1. Collecting and Using Your Personal Data</h2>
              <h3 className="text-xl font-semibold mb-2">1.1 Types of Data Collected</h3>
              <h4 className="text-lg font-semibold mb-1">Personal Data</h4>
              <p className="mb-4">
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="list-disc list-inside mb-4 pl-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Usage Data</li>
              </ul>
              <h4 className="text-lg font-semibold mb-1">Usage Data</h4>
              <p className="mb-4">
                Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
              <h3 className="text-xl font-semibold mb-2">1.2 Use of Your Personal Data</h3>
              <p className="mb-4">
                The Company may use Personal Data for the following purposes:
              </p>
              <ul className="list-disc list-inside mb-4 pl-4">
                <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li>To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                <li>To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
                <li>To manage Your requests: To attend and manage Your requests to Us.</li>
                <li>For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                <li>For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
              </ul>
              <h2 className="text-2xl font-semibold mb-3">2. Disclosure of Your Personal Data</h2>
              <h3 className="text-xl font-semibold mb-2">2.1 With Service Providers</h3>
              <p className="mb-4">
                We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
              </p>
              <h3 className="text-xl font-semibold mb-2">2.2 For Business Transfers</h3>
              <p className="mb-4">
                We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
              </p>
              <h3 className="text-xl font-semibold mb-2">2.3 With Affiliates</h3>
              <p className="mb-4">
                We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
              </p>
              <h3 className="text-xl font-semibold mb-2">2.4 With Business Partners</h3>
              <p className="mb-4">
                We may share Your information with Our business partners to offer You certain products, services or promotions.
              </p>
              <h3 className="text-xl font-semibold mb-2">2.5 With Other Users</h3>
              <p className="mb-4">
                When You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
              </p>
              <h3 className="text-xl font-semibold mb-2">2.6 With Your Consent</h3>
              <p className="mb-4">
                We may disclose Your personal information for any other purpose with Your consent.
              </p>
              <h2 className="text-2xl font-semibold mb-3">3. Retention of Your Personal Data</h2>
              <p className="mb-4">
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
              </p>
              <h2 className="text-2xl font-semibold mb-3">4. Security of Your Personal Data</h2>
              <p className="mb-4">
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
              <h2 className="text-2xl font-semibold mb-3">5. Links to Other Websites</h2>
              <p className="mb-4">
                Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
              </p>
              <h2 className="text-2xl font-semibold mb-3">6. Changes to this Privacy Policy</h2>
              <p className="mb-4">
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
              </p>
              <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, you can contact us:
              </p>
              <ul className="list-disc list-inside mb-4 pl-4">
                <li>By email: support@aiieltsaceprep.com</li>
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
