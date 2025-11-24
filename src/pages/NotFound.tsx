import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative text-9xl font-bold text-primary/20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-24 h-24 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link to="/">
                <Home className="mr-2 w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="border-white/10 hover:bg-white/5"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
