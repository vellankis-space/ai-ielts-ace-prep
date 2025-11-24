import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden min-h-[50vh] flex items-center">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

            <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold tracking-tight mb-6"
                >
                    Unlock Your Potential with AI Precision
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-muted-foreground mb-10"
                >
                    Don't leave your future to chance. Get the score you deserve with the world's most advanced IELTS preparation platform.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/diagnostic-test">
                        <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20">
                            Start Your Free AI Assessment
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
