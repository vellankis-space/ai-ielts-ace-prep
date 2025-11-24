import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const BlogPostPage = () => {
    const { slug } = useParams();

    // Mock data - in a real app, fetch based on slug
    const post = {
        title: "Top 10 Tips for IELTS Writing Task 2",
        excerpt: "Master the essay writing section with these proven strategies from expert examiners.",
        author: "Dr. Sarah Johnson",
        date: "June 15, 2025",
        readTime: "5 min read",
        category: "Writing",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200",
        content: `
      <p class="lead text-xl text-muted-foreground mb-8">
        Writing Task 2 is often considered the most challenging part of the IELTS exam. It requires you to write a formal essay of at least 250 words in 40 minutes. Here are our top tips to help you succeed.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Understand the Question Type</h2>
      <p class="mb-6">
        Before you start writing, identify what type of essay you are being asked to write. Is it an opinion essay? A discussion essay? A problem-solution essay? Each type requires a specific structure.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Plan Before You Write</h2>
      <p class="mb-6">
        Spend the first 5 minutes planning your essay. Outline your main arguments and supporting examples. This will ensure your essay is coherent and cohesive, which accounts for 25% of your score.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Use a Clear Structure</h2>
      <p class="mb-6">
        A standard 4-paragraph structure works best for most essays:
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Introduction:</strong> Paraphrase the question and state your thesis.</li>
          <li><strong>Body Paragraph 1:</strong> First main idea with supporting details.</li>
          <li><strong>Body Paragraph 2:</strong> Second main idea with supporting details.</li>
          <li><strong>Conclusion:</strong> Summarize your main points and restate your opinion.</li>
        </ul>
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Focus on Vocabulary</h2>
      <p class="mb-6">
        Use a wide range of vocabulary, but ensure you use it correctly. Don't just memorize complex words; understand their collocations and context.
      </p>
      
      <div class="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
        <p class="font-medium text-primary">Pro Tip:</p>
        <p class="mt-2">Always leave 2-3 minutes at the end to proofread your work. Check for spelling mistakes and grammatical errors.</p>
      </div>
    `
    };

    return (
        <Layout>
            <article className="min-h-screen bg-background pt-20 pb-20">
                {/* Hero Image */}
                <div className="w-full h-[40vh] relative overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                    <Link to="/blog">
                        <Button variant="ghost" className="mb-6 text-white hover:text-primary hover:bg-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>

                    <div className="bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                {post.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium">{post.author}</div>
                                    <div className="text-sm text-muted-foreground">{post.date}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Bookmark className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div
                            className="prose prose-invert prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPostPage;
