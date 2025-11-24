import React from 'react';
import { Brain, Trophy, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
    const features = [
        {
            icon: Brain,
            title: "Neural Scoring Engine",
            description: "Our proprietary AI analyzes 50+ linguistic markers to provide instant, examiner-level feedback that pinpoints exactly how to improve."
        },
        {
            icon: Trophy,
            title: "Adaptive Exam Simulation",
            description: "Experience the pressure of the real test with dynamic question sets that adapt to your performance level in real-time."
        },
        {
            icon: TrendingUp,
            title: "Predictive Analytics",
            description: "Don't just track progress—forecast it. Our algorithms predict your likely band score with 98% accuracy based on your learning trajectory."
        },
        {
            icon: Target,
            title: "Full-Spectrum Analysis",
            description: "Comprehensive breakdown of your Listening, Reading, Writing, and Speaking skills, identifying micro-weaknesses others miss."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-24 bg-background relative min-h-[60vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Why Top Performers Choose IELTS AI</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We don't just teach English; we decode the exam. Our platform combines advanced machine learning with deep pedagogical insights.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
