import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Cookie } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
              <Cookie className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>
          </div>

          <Card className="glass-card border-white/5">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <p className="lead text-lg text-muted-foreground mb-8">
                  This Cookie Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-foreground">What are cookies?</h2>
                <p className="mb-6 text-muted-foreground">
                  Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-foreground">How AI IELTS Ace Prep uses cookies</h2>
                <p className="mb-4 text-muted-foreground">
                  When you use and access the Service, we may place a number of cookies in your web browser. We use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside mb-6 pl-4 text-muted-foreground space-y-2">
                  <li>To enable certain functions of the Service</li>
                  <li>To provide analytics</li>
                  <li>To store your preferences</li>
                  <li>To enable advertisements delivery, including behavioral advertising</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-foreground">Third-party cookies</h2>
                <p className="mb-6 text-muted-foreground">
                  In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-foreground">What are your choices regarding cookies?</h2>
                <p className="mb-4 text-muted-foreground">
                  If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
                </p>
                <p className="mb-6 text-muted-foreground">
                  Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-foreground">Types of Cookies We Use</h2>
                <div className="rounded-md border border-white/10 overflow-hidden mb-8">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-foreground font-semibold">Type</TableHead>
                        <TableHead className="text-foreground font-semibold">Purpose</TableHead>
                        <TableHead className="text-foreground font-semibold">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">Essential Cookies</TableCell>
                        <TableCell className="text-muted-foreground">Necessary for the website to function properly.</TableCell>
                        <TableCell className="text-muted-foreground">Session</TableCell>
                      </TableRow>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">Analytical Cookies</TableCell>
                        <TableCell className="text-muted-foreground">Collect information about how visitors use the website.</TableCell>
                        <TableCell className="text-muted-foreground">Persistent</TableCell>
                      </TableRow>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">Functional Cookies</TableCell>
                        <TableCell className="text-muted-foreground">Remember user preferences and choices.</TableCell>
                        <TableCell className="text-muted-foreground">Persistent</TableCell>
                      </TableRow>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">Advertising Cookies</TableCell>
                        <TableCell className="text-muted-foreground">Deliver relevant advertisements to users.</TableCell>
                        <TableCell className="text-muted-foreground">Persistent</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-foreground">More Information</h2>
                <p className="mb-4 text-muted-foreground">
                  If you have any questions about this Cookie Policy, please contact us:
                </p>
                <ul className="list-disc list-inside mb-6 pl-4 text-muted-foreground">
                  <li>By email: support@aiieltsaceprep.com</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicyPage;
