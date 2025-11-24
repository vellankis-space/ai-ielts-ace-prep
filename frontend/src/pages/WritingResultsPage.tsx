import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WritingResultsPage = () => {
  const location = useLocation();
  const { task1Answer, task2Answer } = location.state || {};

  const getWordCount = (text: string) => {
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Writing Test Results</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Task 1 Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{task1Answer || 'No answer submitted for Task 1.'}</p>
            <p className="text-sm text-gray-600">Word Count: {getWordCount(task1Answer)}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Task 2 Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{task2Answer || 'No answer submitted for Task 2.'}</p>
            <p className="text-sm text-gray-600">Word Count: {getWordCount(task2Answer)}</p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link to="/modules/writing">
            <Button>Back to Writing Module</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default WritingResultsPage;
