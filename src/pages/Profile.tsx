import React from 'react';
import { useAuth } from '@/hooks/auth-context';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Calendar, Award, Settings, LogOut, TrendingUp, Clock, BookOpen, Shield, Bell, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const stats = [
    { label: 'Tests Completed', value: '12', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Study Hours', value: '24.5', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { label: 'Average Band', value: '6.5', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { label: 'Current Streak', value: '5 Days', icon: Award, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative mb-12"
          >
            {/* Cover Image */}
            <div className="h-64 rounded-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-white/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="absolute -bottom-16 left-8 right-8 flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="flex items-end gap-6">
                <Avatar className="w-32 h-32 border-4 border-background shadow-2xl ring-4 ring-white/5">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-4xl bg-secondary text-primary">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="mb-4 space-y-1">
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    {user.user_metadata?.full_name || 'IELTS Candidate'}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex gap-3">
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button onClick={signOut} variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="glass-card border-white/5 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className={`p-4 rounded-2xl bg-white/5 border ${stat.border} flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                      <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg">Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">Free Plan</p>
                        <p className="text-xs text-muted-foreground">Basic features</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Upgrade</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Tabs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="w-full justify-start bg-white/5 border border-white/5 p-1 mb-6 rounded-xl">
                  <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Activity</TabsTrigger>
                  <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Security</TabsTrigger>
                  <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="glass-card border-white/5">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest practice sessions and mock tests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                          <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <div>
                          <p className="text-lg font-medium">No recent activity</p>
                          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                            You haven't taken any tests yet. Start a practice session to see your progress here.
                          </p>
                        </div>
                        <Button variant="outline" className="mt-4">Start Practice</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="glass-card border-white/5">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your password and account security.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Password</p>
                              <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Change</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" disabled>Verified</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="glass-card border-white/5">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose what updates you want to receive.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {['Daily Study Reminder', 'Weekly Progress Report', 'New Features & Updates'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                          <div className="h-6 w-11 bg-primary/20 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 h-4 w-4 bg-primary rounded-full shadow-sm"></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
