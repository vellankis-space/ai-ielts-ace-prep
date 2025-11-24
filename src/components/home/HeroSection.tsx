import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, BarChart3, BookOpen, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/auth-context';

const HeroSection = () => {
    const { user } = useAuth();

    const stats = [
        { number: "50k+", label: "Active Learners" },
        { number: "1.5+", label: "Avg. Band Increase" },
        { number: "98%", label: "Success Rate" },
        { number: "10M+", label: "AI Predictions" }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8"
                >
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    <span>The Future of Language Assessment</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                >
                    IELTS Mastery, <br />
                    <span className="text-gradient-accent">Engineered by AI.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Stop guessing. Start improving. Our military-grade Neural Engine analyzes your performance in real-time to guarantee your target band score with surgical precision.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {user ? (
                        <>
                            <Link to="/dashboard">
                                <Button size="lg" className="h-12 px-8 text-base">
                                    <BarChart3 className="mr-2 w-5 h-5" />
                                    Access Command Center
                                </Button>
                            </Link>
                            <Link to="/modules">
                                <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                    <BookOpen className="mr-2 w-5 h-5" />
                                    Explore Modules
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/diagnostic-test">
                                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                                    Get Your AI Score Prediction
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                <Play className="mr-2 w-5 h-5" />
                                See How It Works
                            </Button>
                        </>
                    )}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/5 pt-12"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
