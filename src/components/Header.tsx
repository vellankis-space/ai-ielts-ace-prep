
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, BookOpen, Headphones, PenTool, Mic, FileText, LogOut, BarChart3, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/auth-context';
import { Button } from '@/components/ui/button';
import GameModeToggle from './GameModeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const modules = [
    { name: 'Listening', icon: Headphones, path: '/modules/listening' },
    { name: 'Reading', icon: BookOpen, path: '/modules/reading' },
    { name: 'Writing', icon: PenTool, path: '/modules/writing' },
    { name: 'Speaking', icon: Mic, path: '/modules/speaking' },
    { name: 'Full Mock Test', icon: FileText, path: '/mock-test' },
    { name: 'Diagnostic Test', icon: User, path: '/diagnostic-test' }
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const showGameToggle = ['/dashboard', '/games'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden group-hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="IELTS AI Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">IELTS AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                Dashboard
              </Link>
            )}

            <div className="relative">
              <button
                onMouseEnter={() => setIsModulesOpen(true)}
                onMouseLeave={() => setIsModulesOpen(false)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors outline-none ${location.pathname.startsWith('/modules') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <span>Modules</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isModulesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Modules Dropdown */}
              <div
                onMouseEnter={() => setIsModulesOpen(true)}
                onMouseLeave={() => setIsModulesOpen(false)}
                className={`absolute top-full left-0 mt-2 w-64 p-2 bg-popover/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl transition-all duration-200 ${isModulesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
              >
                {modules.map((module) => (
                  <Link
                    key={module.name}
                    to={module.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive(module.path) ? 'text-primary bg-white/5' : 'text-muted-foreground hover:text-primary hover:bg-white/5'}`}
                  >
                    <module.icon className="w-4 h-4" />
                    <span>{module.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {user && (
              <Link
                to="/games"
                className={`text-sm font-medium transition-colors ${isActive('/games') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                Games
              </Link>
            )}

            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${isActive('/blog') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Blog
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user && showGameToggle && <GameModeToggle />}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center border border-white/10">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 p-2 bg-popover/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-white/5 transition-all"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-white/5 transition-all"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-2 border-t border-white/5">
            {user && (
              <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
                Dashboard
              </Link>
            )}

            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modules</div>
              {modules.map((module) => (
                <Link
                  key={module.name}
                  to={module.path}
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <module.icon className="w-4 h-4" />
                  <span>{module.name}</span>
                </Link>
              ))}
            </div>

            <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
              Pricing
            </Link>
            <Link to="/blog" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
              Blog
            </Link>

            <div className="border-t border-white/5 pt-4 space-y-2">
              {user ? (
                <>
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center border border-white/10">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        </span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/profile" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 px-3">
                  <Link to="/login" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-lg shadow-primary/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
