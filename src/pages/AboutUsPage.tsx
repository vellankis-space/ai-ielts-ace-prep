import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Zap, Globe, Sparkles, Award } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  const stats = [
    { label: 'Active Students', value: '15,000+' },
    { label: 'Practice Questions', value: '5,000+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Countries', value: '120+' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision Learning',
      description: 'We believe in targeted practice. Our AI identifies your exact weaknesses and provides specific exercises to turn them into strengths.'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Waiting for results kills momentum. Our AI provides immediate, detailed feedback on your writing and speaking performance.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Quality education should be accessible to everyone. We strive to make premium IELTS preparation affordable and available worldwide.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Head of Education',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      bio: 'Former IELTS Examiner with 15 years of experience in ESL education.'
    },
    {
      name: 'Michael Chen',
      role: 'Lead AI Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'PhD in Natural Language Processing from Stanford University.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      bio: 'Award-winning UX designer passionate about ed-tech.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-24">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              Our Mission
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Democratizing <span className="text-primary">Elite</span> <br />
              IELTS Preparation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We combine advanced Artificial Intelligence with proven pedagogical methods to help students worldwide achieve their dream scores and unlock global opportunities.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-white/5 py-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our product and our team every day.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="glass-card border-white/5 p-6 hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experts in education, technology, and design working together.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="group text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/5 group-hover:border-primary/20 transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-primary text-sm font-medium mb-3">{member.role}</div>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
