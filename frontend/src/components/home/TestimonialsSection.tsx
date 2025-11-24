import React from 'react';
import { AnimatedTestimonials } from '../AnimatedTestimonials';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            designation: "Software Engineer",
            src: "/lovable-uploads/ed62ef41-93b5-4eaa-b357-37abef1fe644.png",
            score: "8.5",
            quote: "I was stuck at Band 6.5 for a year. The AI identified a recurring semantic error in my writing that no human tutor caught. I hit Band 8.5 in 3 months."
        },
        {
            name: "Mohammed Al-Rashid",
            designation: "Medical Student",
            src: "/lovable-uploads/1be0c8d4-9452-4154-b2ee-b8a534d44ed4.png",
            score: "7.5",
            quote: "The Speaking module is terrifyingly realistic. It prepared me for the examiner's pressure better than any mock test I've ever taken."
        },
        {
            name: "Elena Kowalski",
            designation: "Business Analyst",
            src: "/lovable-uploads/85b711da-06c3-4571-9411-1d32b4f33cec.png",
            score: "8.0",
            quote: "The predictive scoring is accurate to within 0.5 bands. I walked into the exam knowing exactly what I was going to get. No surprises."
        }
    ];

    return (
        <section className="py-24 bg-background min-h-[60vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Real Results, Verified by Data</h2>
                    <p className="text-muted-foreground">
                        Join the top 1% of test-takers who use AI to secure their future.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatedTestimonials
                        testimonials={testimonials}
                        autoplay={true}
                        className="max-w-5xl mx-auto"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
