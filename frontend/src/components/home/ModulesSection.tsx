import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Headphones, BookOpen, PenTool, Mic, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ModulesSection = () => {
    const modules = [
        {
            icon: Headphones,
            name: "Listening",
            description: "Train your ear with 100+ accents and dynamic audio environments. Our AI isolates difficult frequencies to boost comprehension.",
            color: "text-blue-400",
            bg: "bg-blue-400/10"
        },
        {
            icon: BookOpen,
            name: "Reading",
            description: "Speed-read with purpose. Our smart highlighter tracks your eye movement patterns and suggests optimization techniques.",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10"
        },
        {
            icon: PenTool,
            name: "Writing",
            description: "Get line-by-line semantic analysis. We don't just fix grammar; we enhance coherence, vocabulary, and argumentative structure.",
            color: "text-purple-400",
            bg: "bg-purple-400/10"
        },
        {
            icon: Mic,
            name: "Speaking",
            description: "Practice with a responsive AI interlocutor. Receive instant feedback on pronunciation, fluency, and lexical resource.",
            color: "text-orange-400",
            bg: "bg-orange-400/10"
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
        <section className="py-24 bg-secondary/20 min-h-[60vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Comprehensive Training Modules</h2>
                        <p className="text-muted-foreground max-w-xl">
                            Isolate and conquer every aspect of the IELTS exam with dedicated, AI-driven training environments.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/modules">
                            <Button variant="ghost" className="group">
                                View All Modules
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {modules.map((module, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Link to={`/modules/${module.name.toLowerCase()}`} className="group">
                                <div className="glass-card p-6 rounded-2xl h-full hover:bg-white/5 transition-colors">
                                    <div className={`w-14 h-14 ${module.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <module.icon className={`w-7 h-7 ${module.color}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{module.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                                    <div className="flex items-center text-sm font-medium text-primary">
                                        Start Training
                                        <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ModulesSection;
