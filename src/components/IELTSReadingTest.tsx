import React, { useState } from 'react';
import { useIELTSReading } from '../hooks/useIELTSReading';

const IELTSReadingTest: React.FC = () => {
  const {
    passage,
    questions,
    userAnswers,
    testResult,
    isLoading,
    generateTest,
    submitAnswer,
    submitTest
  } = useIELTSReading();

  const [testConfig, setTestConfig] = useState({
    testType: 'academic' as const,
    topic: '',
    difficulty: 'intermediate' as const
  });

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateTest(testConfig.testType, testConfig.topic, testConfig.difficulty);
  };

  if (testResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your IELTS Reading Test Results</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Score Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Questions Correct</p>
              <p className="text-2xl font-bold">{testResult.correctAnswers}/{testResult.totalQuestions}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Band Score</p>
              <p className="text-2xl font-bold">{testResult.bandScore}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-2xl font-bold">
                {testResult.bandScore >= 7 ? 'Excellent' : 
                 testResult.bandScore >= 6 ? 'Good' : 
                 testResult.bandScore >= 5 ? 'Satisfactory' : 'Needs Improvement'}
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">Detailed Feedback</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
            {testResult.detailedFeedback}
          </div>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Take Another Test
        </button>
      </div>
    );
  }

  if (!passage) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">IELTS Reading Test Setup</h1>
        <form onSubmit={handleStartTest} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testType">
              Test Type
            </label>
            <select
              id="testType"
              value={testConfig.testType}
              onChange={(e) => setTestConfig(prev => ({ 
                ...prev, 
                testType: e.target.value as 'academic' | 'general' 
              }))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="academic">Academic</option>
              <option value="general">General Training</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topic">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={testConfig.topic}
              onChange={(e) => setTestConfig(prev => ({ 
                ...prev, 
                topic: e.target.value 
              }))}
              placeholder="Enter topic (e.g., Technology, Environment, History)"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={testConfig.difficulty}
              onChange={(e) => setTestConfig(prev => ({ 
                ...prev, 
                difficulty: e.target.value as any 
              }))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner (Band 4-5)</option>
              <option value="intermediate">Intermediate (Band 6-7)</option>
              <option value="advanced">Advanced (Band 8-9)</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Generating Test...' : 'Start Test'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{passage.title}</h1>
        <button 
          onClick={submitTest}
          disabled={isLoading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Passage Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Reading Passage</h2>
            <div className="prose max-w-none">
              {passage.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Questions Section */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Questions</h2>
            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <p className="font-medium mb-2">{question.question}</p>
                  
                  {question.options ? (
                    <div className="space-y-2">
                      {question.options.map((option, index) => {
                        const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                        return (
                          <div key={index} className="flex items-center">
                            <input
                              type="radio"
                              id={`${question.id}-${optionLetter}`}
                              name={question.id}
                              value={optionLetter}
                              checked={userAnswers[question.id] === optionLetter}
                              onChange={(e) => submitAnswer(question.id, e.target.value)}
                              className="mr-2"
                            />
                            <label htmlFor={`${question.id}-${optionLetter}`}>
                              {optionLetter}) {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={userAnswers[question.id] || ''}
                      onChange={(e) => submitAnswer(question.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your answer..."
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IELTSReadingTest;