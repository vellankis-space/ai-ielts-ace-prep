
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to home
        if (session?.user) {
          navigate('/');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've been successfully logged in.",
          });
        }
      } else {
        // Sign up flow
        if (password !== confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive",
          });
          return;
        }

        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName
            }
          }
        });

        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });

    if (error) {
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Redirect if already authenticated
  if (user) {
    return null;
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
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to continue your IELTS preparation journey' 
                : 'Start your IELTS preparation with AI-powered practice'
              }
            </p>
          </div>
        </div>

        {/* Authentication Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in your information to create an account'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Login - 21st.dev Placeholder */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full py-3 text-sm font-medium"
                onClick={handleGoogleSignIn}
              >
                {/* 21st.dev: Replace with Google icon component */}
                <div className="w-5 h-5 mr-2 bg-red-500 rounded"></div>
                Continue with Google
              </Button>
              
              {/* 21st.dev: Add more social providers */}
              <div className="hidden">
                {/* Placeholder for additional social login buttons */}
                {/* GitHub, Apple, Microsoft, etc. */}
              </div>
            </div>

            {/* Divider - 21st.dev Placeholder */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 py-3"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-3"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 py-3"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 py-3"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password Link - 21st.dev Placeholder */}
              {isLogin && (
                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    {/* 21st.dev: Replace with loading spinner component */}
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                )}
              </Button>
            </form>

            {/* Terms and Privacy - 21st.dev Placeholder */}
            {!isLogin && (
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </Link>
              </p>
            )}

            {/* Switch between Login/Signup */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview - 21st.dev Placeholder */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Trusted by thousands of IELTS candidates</p>
          <div className="flex justify-center space-x-4 text-xs text-gray-400">
            <span>✓ AI-Powered Practice</span>
            <span>✓ Real-time Feedback</span>
            <span>✓ Progress Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
