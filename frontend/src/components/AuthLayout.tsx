import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import PageTransition from './PageTransition';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <PageTransition className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Visuals */}
            <div className="relative hidden lg:flex flex-col justify-between p-10 bg-zinc-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-zinc-900 to-zinc-900"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>

                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10">
                    <Link to="/" className="flex items-center space-x-2 group w-fit">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">IELTS AI</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-medium leading-relaxed text-zinc-300">
                            "The AI feedback was incredibly detailed. It felt like having a personal tutor available 24/7. I improved my band score from 6.5 to 8.0 in just two months."
                        </p>
                        <footer className="text-sm text-zinc-500">
                            — Sarah Chen, Software Engineer
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <p className="mt-2 text-muted-foreground">{subtitle}</p>
                    </div>

                    {children}
                </div>
            </div>
        </PageTransition>
    );
};

export default AuthLayout;
