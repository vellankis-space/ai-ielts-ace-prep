import React from 'react';
import Layout from '../components/Layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const CookiePolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <Card>
          <CardHeader>
            <CardTitle>Our Use of Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This Cookie Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.
            </p>
            <h2 className="text-2xl font-semibold mb-3">What are cookies?</h2>
            <p className="mb-4">
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
            <h2 className="text-2xl font-semibold mb-3">How AI IELTS Ace Prep uses cookies</h2>
            <p className="mb-4">
              When you use and access the Service, we may place a number of cookies in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisements delivery, including behavioral advertising</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-3">Third-party cookies</h2>
            <p className="mb-4">
              In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
            </p>
            <h2 className="text-2xl font-semibold mb-3">What are your choices regarding cookies?</h2>
            <p className="mb-4">
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
            </p>
            <p className="mb-4">
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
            <h2 className="text-2xl font-semibold mb-3">Types of Cookies We Use</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Essential Cookies</TableCell>
                  <TableCell>Necessary for the website to function properly.</TableCell>
                  <TableCell>Session</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Analytical Cookies</TableCell>
                  <TableCell>Collect information about how visitors use the website.</TableCell>
                  <TableCell>Persistent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Functional Cookies</TableCell>
                  <TableCell>Remember user preferences and choices.</TableCell>
                  <TableCell>Persistent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Advertising Cookies</TableCell>
                  <TableCell>Deliver relevant advertisements to users.</TableCell>
                  <TableCell>Persistent</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <h2 className="text-2xl font-semibold mt-6 mb-3">More Information</h2>
            <p className="mb-4">
              If you have any questions about this Cookie Policy, please contact us:
            </p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>By email: support@aiieltsaceprep.com</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CookiePolicyPage;
