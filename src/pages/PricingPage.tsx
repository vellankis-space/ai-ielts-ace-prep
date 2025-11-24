import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            description: 'Essential tools for IELTS preparation',
            features: [
                '1 Full Mock Test per month',
                'Basic AI Scoring for Writing',
                'Limited Practice Questions',
                'Community Support',
            ],
            notIncluded: [
                'Advanced AI Feedback',
                'Speaking Pronunciation Analysis',
                'Unlimited Mock Tests',
                'Personalized Study Plan',
            ],
            cta: 'Get Started',
            variant: 'outline' as const,
        },
        {
            name: 'Pro',
            price: '$29',
            period: '/month',
            description: 'Everything you need to achieve Band 8+',
            features: [
                'Unlimited Full Mock Tests',
                'Advanced AI Feedback & Scoring',
                'Speaking Pronunciation Analysis',
                'Personalized Study Plan',
                'Priority Support',
                'All Practice Modules',
            ],
            notIncluded: [],
            cta: 'Start Free Trial',
            variant: 'default' as const,
            popular: true,
        },
        {
            name: 'Lifetime',
            price: '$149',
            period: '/one-time',
            description: 'One-time payment for lifetime access',
            features: [
                'All Pro Features',
                'Lifetime Access',
                'Future Updates Included',
                'Exclusive Webinars',
                '1-on-1 Expert Consultation (1hr)',
            ],
            notIncluded: [],
            cta: 'Get Lifetime Access',
            variant: 'outline' as const,
        },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-background pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choose the plan that fits your preparation needs. No hidden fees. Cancel anytime.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-8 glass-card border-white/5 flex flex-col ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline mb-2">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                                    </div>
                                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                                </div>

                                <div className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start">
                                            <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                    {plan.notIncluded.map((feature) => (
                                        <div key={feature} className="flex items-start text-muted-foreground/50">
                                            <X className="w-5 h-5 mr-3 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant={plan.variant}
                                    className={`w-full h-12 text-base ${plan.popular ? 'shadow-lg shadow-primary/20' : ''}`}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Can I cancel my subscription?", a: "Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period." },
                                { q: "Is there a free trial?", a: "Yes, we offer a 7-day free trial for the Pro plan so you can experience all the features before committing." },
                                { q: "How accurate is the AI scoring?", a: "Our AI models are trained on thousands of real IELTS tests and have a 95% correlation with official examiner scores." },
                            ].map((faq, i) => (
                                <div key={i} className="glass-panel p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                                    <p className="text-muted-foreground">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PricingPage;
