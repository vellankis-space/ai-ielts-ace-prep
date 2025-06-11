
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {user.user_metadata?.full_name || 'IELTS Candidate'}
                </h1>
                <p className="text-blue-100">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="font-medium">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview - 21st.dev Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Progress Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">0</p>
                      <p className="text-sm text-gray-500">Tests Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-teal-500">0</p>
                      <p className="text-sm text-gray-500">Hours Practiced</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-center text-sm text-gray-500">
                  {/* 21st.dev: Replace with progress tracking components */}
                  Start practicing to see your progress!
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity - 21st.dev Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent activity</p>
                <p className="text-sm">Complete your first test to see your activity here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
