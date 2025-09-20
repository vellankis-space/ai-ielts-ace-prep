import { useState, useCallback } from 'react';
import { IELTSPassage, IELTSQuestion } from '../types/ielts';

export interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  bandScore: number;
  questionResults: {
    questionId: string;
    userAnswer: string;
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation: string;
  }[];
  detailedFeedback: string;
  timestamp: string;
}

export const useIELTSReading = () => {
  const [passage, setPassage] = useState<IELTSPassage | null>(null);
  const [questions, setQuestions] = useState<IELTSQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const generateTest = useCallback(async (
    testType: 'academic' | 'general',
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  ) => {
    setIsLoading(true);
    try {
      // Generate passage
      const passageResponse = await fetch('/api/ielts/generate-passage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testType, topic, difficulty })
      });
      
      if (!passageResponse.ok) {
        throw new Error(`Failed to generate passage: ${passageResponse.status}`);
      }
      
      const passageData = await passageResponse.json();
      setPassage(passageData.passage);

      // Generate questions
      const questionsResponse = await fetch('/api/ielts/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          passage: passageData.passage.content,
          testType,
          questionCount: 40
        })
      });
      
      if (!questionsResponse.ok) {
        throw new Error(`Failed to generate questions: ${questionsResponse.status}`);
      }
      
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData.questions);
      
    } catch (error) {
      console.error('Error generating test:', error);
      // In a real application, you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback((questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const submitTest = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ielts/score-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions,
          userAnswers,
          testType: passage?.testType
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to score test: ${response.status}`);
      }
      
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      console.error('Error scoring test:', error);
      // In a real application, you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, [questions, userAnswers, passage]);

  return {
    passage,
    questions,
    userAnswers,
    testResult,
    isLoading,
    generateTest,
    submitAnswer,
    submitTest
  };
};