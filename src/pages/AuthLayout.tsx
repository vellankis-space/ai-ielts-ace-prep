import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

const AuthLayout = () => {
  const location = useLocation();

  const path = location.pathname;
  let authView: 'login' | 'signup' | 'forgotPassword' = 'login';
  if (path === '/signup') {
    authView = 'signup';
  } else if (path === '/forgot-password') {
    authView = 'forgotPassword';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">IELTS AI</span>
          </Link>
          
          <div className="space-y-2">
            
          </div>
        </div>

        {/* Authentication Card */}
        <Card className="border-0 shadow-xl">
          <CardContent className="space-y-6">
            {authView === 'login' && <LoginForm />}
            {authView === 'signup' && <SignupForm />}
            {authView === 'forgotPassword' && <ForgotPasswordForm />}
          </CardContent>
        </Card>

        {/* Features Preview - 21st.dev Placeholder */}
        {authView !== 'forgotPassword' && (
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">Trusted by thousands of IELTS candidates</p>
            <div className="flex justify-center space-x-4 text-xs text-gray-400">
              <span>✓ AI-Powered Practice</span>
              <span>✓ Real-time Feedback</span>
              <span>✓ Progress Tracking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;