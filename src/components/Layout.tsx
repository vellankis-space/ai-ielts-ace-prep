
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-grow flex flex-col relative">
        <PageTransition className="flex-grow flex flex-col">
          {children}
        </PageTransition>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
