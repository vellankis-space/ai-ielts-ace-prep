
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">IELTS AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered IELTS preparation platform helping students achieve their target scores with personalized feedback and adaptive learning.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/modules" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Modules
                </Link>
              </li>
              <li>
                <Link to="/mock-test" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about-us" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 IELTS AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span>support@ieltsai.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
