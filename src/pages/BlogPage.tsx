import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: "Top 10 Tips for IELTS Writing Task 2",
            excerpt: "Master the essay writing section with these proven strategies from expert examiners.",
            author: "Dr. Sarah Johnson",
            date: "June 15, 2025",
            readTime: "5 min read",
            category: "Writing",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
            slug: "top-10-tips-ielts-writing-task-2"
        },
        {
            id: 2,
            title: "How to Improve Your Speaking Fluency",
            excerpt: "Practical exercises to help you speak more naturally and confidently during the test.",
            author: "Mark Thompson",
            date: "June 12, 2025",
            readTime: "4 min read",
            category: "Speaking",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
            slug: "improve-speaking-fluency"
        },
        {
            id: 3,
            title: "Understanding IELTS Reading Question Types",
            excerpt: "A comprehensive guide to tackling True/False/Not Given and other tricky question formats.",
            author: "Emily Chen",
            date: "June 10, 2025",
            readTime: "7 min read",
            category: "Reading",
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800",
            slug: "ielts-reading-question-types"
        },
        {
            id: 4,
            title: "Listening Section: Avoiding Common Traps",
            excerpt: "Learn how to identify distractors and stay focused during the listening test.",
            author: "David Wilson",
            date: "June 8, 2025",
            readTime: "6 min read",
            category: "Listening",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
            slug: "listening-section-traps"
        },
        {
            id: 5,
            title: "Vocabulary for Band 9",
            excerpt: "Essential academic vocabulary to boost your score in Writing and Speaking.",
            author: "Dr. Sarah Johnson",
            date: "June 5, 2025",
            readTime: "8 min read",
            category: "Vocabulary",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
            slug: "vocabulary-band-9"
        },
        {
            id: 6,
            title: "Time Management Strategies",
            excerpt: "How to effectively manage your time across all four modules of the IELTS exam.",
            author: "Mark Thompson",
            date: "June 1, 2025",
            readTime: "5 min read",
            category: "General",
            image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800",
            slug: "time-management-strategies"
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-background pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            IELTS Insights & Tips
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Expert advice, study strategies, and latest updates to help you prepare effectively.
                        </p>
                    </div>

                    {/* Featured Post */}
                    <div className="mb-16">
                        <Link to={`/blog/${posts[0].slug}`} className="group">
                            <div className="relative rounded-2xl overflow-hidden aspect-[21/9] glass-card border-white/5">
                                <img
                                    src={posts[0].image}
                                    alt={posts[0].title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                                    <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
                                        {posts[0].category}
                                    </Badge>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {posts[0].title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground mb-6 line-clamp-2">
                                        {posts[0].excerpt}
                                    </p>
                                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-2" />
                                            {posts[0].author}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {posts[0].date}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {posts[0].readTime}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(1).map((post) => (
                            <Link key={post.id} to={`/blog/${post.slug}`} className="group h-full">
                                <Card className="h-full glass-card border-white/5 hover:bg-white/5 transition-colors overflow-hidden flex flex-col">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="secondary" className="backdrop-blur-md bg-background/50">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="mt-auto">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5">
                            Load More Articles
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BlogPage;
