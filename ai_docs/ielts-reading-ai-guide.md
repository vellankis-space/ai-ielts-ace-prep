# AI-Powered IELTS Reading Module: Complete Implementation Guide

## Executive Summary

This guide provides a comprehensive, step-by-step approach to implementing an AI-powered IELTS Reading module using OpenAI's GPT models with prompt engineering techniques. The solution covers both IELTS Academic and General Training reading tests, including passage generation, question creation, answer validation, and scoring with detailed feedback.

## Table of Contents

1. [OpenAI API Integration Setup](#openai-api-integration-setup)
2. [Master Prompts for IELTS Reading](#master-prompts-for-ielts-reading)
3. [Frontend Integration Architecture](#frontend-integration-architecture)
4. [Backend Implementation](#backend-implementation)
5. [Academic vs General Training Differences](#academic-vs-general-training-differences)
6. [Question Type Implementations](#question-type-implementations)
7. [Scoring and Feedback System](#scoring-and-feedback-system)
8. [Testing and Quality Assurance](#testing-and-quality-assurance)

## OpenAI API Integration Setup

### Prerequisites

```bash
npm install openai
npm install @types/node
```

### Environment Configuration

Create `.env.local` file:
```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_ORGANIZATION=org-your-org-id
```

### Basic OpenAI Client Setup

```typescript
// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

export default openai;
```

### API Configuration for IELTS Reading

```typescript
// types/ielts.ts
export interface IELTSPassage {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  testType: 'academic' | 'general';
  wordCount: number;
  topic: string;
}

export interface IELTSQuestion {
  id: string;
  passageId: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: number;
}

export type QuestionType = 
  | 'multiple_choice'
  | 'true_false_not_given'
  | 'yes_no_not_given'
  | 'matching_headings'
  | 'matching_information'
  | 'matching_features'
  | 'sentence_completion'
  | 'summary_completion'
  | 'short_answer'
  | 'diagram_labeling'
  | 'flow_chart_completion'
  | 'table_completion'
  | 'note_completion'
  | 'matching_sentence_endings';
```

## Master Prompts for IELTS Reading

### 1. Academic Reading Passage Generation

```typescript
const ACADEMIC_PASSAGE_PROMPT = `
You are an expert IELTS Academic Reading passage creator. Generate a reading passage following these requirements:

**REQUIREMENTS:**
- Topic: {topic}
- Word count: 600-900 words
- Difficulty: {difficulty}
- Academic style with formal register
- Include complex sentence structures and academic vocabulary
- Source style: journal article, research paper, or academic magazine

**CONTENT STRUCTURE:**
1. Introduction paragraph (2-3 sentences)
2. Body paragraphs (3-4 paragraphs, each 100-150 words)
3. Conclusion paragraph (2-3 sentences)

**ACADEMIC FEATURES TO INCLUDE:**
- Factual, analytical, and descriptive content
- Technical terminology relevant to the topic
- References to studies, research, or expert opinions
- Cause-and-effect relationships
- Comparisons and contrasts
- Statistical data or examples

**OUTPUT FORMAT:**
Title: [Compelling academic title]
Passage: [Full passage text]
Key Points: [3-5 main ideas for question generation]
Vocabulary Level: [Estimated CEFR level]

Generate the passage now for topic: "{topic}"
`;

const GENERAL_PASSAGE_PROMPT = `
You are an expert IELTS General Training Reading passage creator. Generate a reading passage following these requirements:

**REQUIREMENTS:**
- Topic: {topic}
- Word count: {wordCount}
- Difficulty: {difficulty}
- General interest style appropriate for daily life
- Section type: {sectionType}

**SECTION TYPES:**
Section 1 (Social Survival): Advertisements, notices, timetables, brochures (2-3 short texts, 150-200 words each)
Section 2 (Workplace Survival): Job descriptions, contracts, training materials (2 texts, 250-350 words each)
Section 3 (General Reading): Newspaper articles, magazines, general interest topics (1 text, 500-700 words)

**CONTENT CHARACTERISTICS:**
- Practical, everyday English
- Real-life situations and contexts
- Clear, straightforward language
- Relevant to English-speaking environments
- Topics: work, social situations, education, shopping, health, etc.

**OUTPUT FORMAT:**
Title: [Practical, relevant title]
Passage: [Full passage text matching section requirements]
Context: [Where this text might be found in real life]
Key Information: [Important details for question creation]

Generate the passage now for topic: "{topic}" and section type: "{sectionType}"
`;
```

### 2. Question Generation Prompts by Type

#### True/False/Not Given Questions

```typescript
const TRUE_FALSE_NOT_GIVEN_PROMPT = `
You are an expert IELTS Reading question creator specializing in True/False/Not Given questions.

**PASSAGE:**
{passage}

**TASK:** Create {numberOfQuestions} True/False/Not Given questions that test reading comprehension skills.

**QUESTION GUIDELINES:**
- True: Information explicitly stated in the passage
- False: Information contradicts what is stated in the passage
- Not Given: Information is neither confirmed nor contradicted

**DIFFICULTY DISTRIBUTION:**
- Easy (Band 5-6): {easyCount} questions - Direct information matching
- Medium (Band 6.5-7): {mediumCount} questions - Require inference or paraphrasing
- Hard (Band 7.5+): {hardCount} questions - Complex reasoning or subtle differences

**OUTPUT FORMAT:**
Question {number}: [Statement to evaluate]
Answer: [True/False/Not Given]
Explanation: [Why this is the correct answer, referencing specific passage text]
Difficulty: [Easy/Medium/Hard]
Band Level: [5.0-9.0]

**IMPORTANT RULES:**
- Avoid questions where the answer is too obvious
- Include balanced distribution of True/False/Not Given answers
- Test understanding, not just word matching
- Use paraphrasing and synonyms
- Ensure each statement is clearly verifiable from the passage

Generate the questions now:
`;
```

#### Multiple Choice Questions

```typescript
const MULTIPLE_CHOICE_PROMPT = `
You are an expert IELTS Reading question creator specializing in Multiple Choice questions.

**PASSAGE:**
{passage}

**TASK:** Create {numberOfQuestions} multiple choice questions (A, B, C, D format).

**QUESTION TYPES TO INCLUDE:**
1. Main idea questions (What is the main purpose of the passage?)
2. Detail questions (According to the passage, what...)
3. Inference questions (The author suggests that...)
4. Vocabulary questions (The word X in paragraph Y means...)

**ANSWER CHOICE GUIDELINES:**
- One clearly correct answer
- Three plausible but incorrect distractors
- Distractors should be related to the passage content
- Avoid "all of the above" or "none of the above"
- Use paraphrasing in correct answers

**OUTPUT FORMAT:**
Question {number}: [Clear, specific question]
A) [Option A]
B) [Option B] 
C) [Option C]
D) [Option D]
Correct Answer: [Letter]
Explanation: [Why the correct answer is right and others are wrong]
Difficulty: [Easy/Medium/Hard]
Skills Tested: [Main idea/Detail/Inference/Vocabulary]

Generate the questions now:
`;
```

#### Matching Headings Questions

```typescript
const MATCHING_HEADINGS_PROMPT = `
You are an expert IELTS Reading question creator specializing in Matching Headings questions.

**PASSAGE:**
{passage}

**TASK:** Create a matching headings exercise with {numberOfParagraphs} paragraphs and {numberOfHeadings} heading options.

**HEADING CREATION RULES:**
- Each heading should capture the main idea of a paragraph
- Include {extraHeadings} extra headings as distractors
- Use clear, concise language
- Avoid repeating exact words from paragraphs
- Make headings distinctly different from each other
- Focus on main ideas, not supporting details

**PARAGRAPH ANALYSIS:**
For each paragraph, identify:
- Main topic/theme
- Key supporting points
- Function in the overall text

**OUTPUT FORMAT:**
Headings List:
i) [Heading option 1]
ii) [Heading option 2]
iii) [Heading option 3]
[Continue with all options...]

Paragraph Matching:
Paragraph A: [Correct heading number] - [Brief justification]
Paragraph B: [Correct heading number] - [Brief justification]
[Continue for all paragraphs...]

Explanation for each paragraph:
Paragraph A matches heading [X] because [detailed explanation]
[Continue for all paragraphs...]

Generate the exercise now:
`;
```

### 3. Answer Validation and Scoring Prompts

```typescript
const ANSWER_SCORING_PROMPT = `
You are an expert IELTS Reading examiner. Evaluate the student's answers and provide detailed feedback.

**TEST INFORMATION:**
Test Type: {testType} (Academic/General Training)
Passage Topic: {topic}
Total Questions: {totalQuestions}

**STUDENT ANSWERS:**
{studentAnswers}

**CORRECT ANSWERS:**
{correctAnswers}

**SCORING TASK:**
1. Compare each student answer with the correct answer
2. Award 1 point for each correct answer (exact match required)
3. Calculate band score using official IELTS conversion
4. Provide detailed feedback on performance

**BAND SCORE CONVERSION (Academic):**
39-40 correct: Band 9.0
37-38 correct: Band 8.5
36 correct: Band 8.0
34-35 correct: Band 7.5
32-33 correct: Band 7.0
30-31 correct: Band 6.5
27-29 correct: Band 6.0
23-26 correct: Band 5.5
19-22 correct: Band 5.0
15-18 correct: Band 4.5
12-14 correct: Band 4.0
9-11 correct: Band 3.5
6-8 correct: Band 3.0
4-5 correct: Band 2.5
3 correct: Band 2.0
2 correct: Band 1.5
1 correct: Band 1.0
0 correct: Band 0.0

**BAND SCORE CONVERSION (General Training):**
40 correct: Band 9.0
39 correct: Band 8.5
37-38 correct: Band 8.0
36 correct: Band 7.5
34-35 correct: Band 7.0
32-33 correct: Band 6.5
30-31 correct: Band 6.0
26-29 correct: Band 5.5
23-25 correct: Band 5.0
19-22 correct: Band 4.5
15-18 correct: Band 4.0
12-14 correct: Band 3.5
9-11 correct: Band 3.0
6-8 correct: Band 2.5
4-5 correct: Band 2.0
2-3 correct: Band 1.5
1 correct: Band 1.0
0 correct: Band 0.0

**OUTPUT FORMAT:**
Score Summary:
- Questions Correct: {X}/40
- Reading Band Score: {X.X}
- Performance Level: [Excellent/Good/Satisfactory/Needs Improvement]

Question-by-Question Analysis:
Q1: ✓/✗ Student: [answer] | Correct: [answer] | {feedback if wrong}
[Continue for all questions]

Detailed Feedback:
- Strengths: [Areas where student performed well]
- Weaknesses: [Areas needing improvement]
- Question Types Analysis: [Performance by question type]
- Improvement Strategies: [Specific recommendations]
- Next Steps: [What to focus on for better performance]

Generate the detailed score report now:
`;
```

### 4. Adaptive Difficulty Prompts

```typescript
const ADAPTIVE_DIFFICULTY_PROMPT = `
You are an IELTS Reading adaptive assessment system. Based on the student's previous performance, adjust the difficulty of subsequent questions.

**STUDENT PROFILE:**
Current Performance: {currentScore}/40
Target Band Score: {targetBand}
Previous Test Results: {previousResults}
Weak Areas: {weakAreas}
Strong Areas: {strongAreas}

**ADAPTATION RULES:**
- If student score > target: Increase difficulty by 0.5 band levels
- If student score = target: Maintain current difficulty
- If student score < target: Decrease difficulty by 0.5 band levels
- Focus 70% of questions on weak areas
- Include 30% questions in strong areas for confidence

**DIFFICULTY ADJUSTMENT:**
Current Level: {currentLevel}
Recommended Level: [Calculate based on performance]
Question Distribution:
- Easy (Band 5-6): {percentage}%
- Medium (Band 6.5-7.5): {percentage}%
- Hard (Band 8-9): {percentage}%

**PERSONALIZATION:**
- Prioritize question types where student scored < 60%
- Reduce question types where student scored > 85%
- Maintain variety to ensure comprehensive skill testing

Generate personalized test recommendations:
`;
```

## Frontend Integration Architecture

### React Hook for IELTS Reading Tests

```typescript
// hooks/useIELTSReading.ts
import { useState, useCallback } from 'react';
import { IELTSPassage, IELTSQuestion, TestResult } from '../types/ielts';

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
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData.questions);
      
    } catch (error) {
      console.error('Error generating test:', error);
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
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      console.error('Error scoring test:', error);
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
```

### React Components

```typescript
// components/IELTSReadingTest.tsx
import React, { useState } from 'react';
import { useIELTSReading } from '../hooks/useIELTSReading';
import PassageDisplay from './PassageDisplay';
import QuestionPanel from './QuestionPanel';
import ResultsDisplay from './ResultsDisplay';

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

  const handleStartTest = async () => {
    await generateTest(testConfig.testType, testConfig.topic, testConfig.difficulty);
  };

  if (testResult) {
    return <ResultsDisplay result={testResult} />;
  }

  if (!passage) {
    return (
      <div className="test-setup">
        <h2>IELTS Reading Test Setup</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleStartTest(); }}>
          <div>
            <label>Test Type:</label>
            <select 
              value={testConfig.testType}
              onChange={(e) => setTestConfig(prev => ({ 
                ...prev, 
                testType: e.target.value as 'academic' | 'general' 
              }))}
            >
              <option value="academic">Academic</option>
              <option value="general">General Training</option>
            </select>
          </div>
          
          <div>
            <label>Topic:</label>
            <input
              type="text"
              value={testConfig.topic}
              onChange={(e) => setTestConfig(prev => ({ 
                ...prev, 
                topic: e.target.value 
              }))}
              placeholder="Enter topic (e.g., Technology, Environment, History)"
              required
            />
          </div>

          <div>
            <label>Difficulty:</label>
            <select
              value={testConfig.difficulty}
              onChange={(e) => setTestConfig(prev => ({ 
                ...prev, 
                difficulty: e.target.value as any 
              }))}
            >
              <option value="beginner">Beginner (Band 4-5)</option>
              <option value="intermediate">Intermediate (Band 6-7)</option>
              <option value="advanced">Advanced (Band 8-9)</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Test...' : 'Start Test'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="ielts-reading-test">
      <div className="test-layout">
        <div className="passage-section">
          <PassageDisplay passage={passage} />
        </div>
        <div className="questions-section">
          <QuestionPanel 
            questions={questions}
            userAnswers={userAnswers}
            onAnswerSubmit={submitAnswer}
            onTestSubmit={submitTest}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default IELTSReadingTest;
```

## Backend Implementation

### API Routes with Supabase Integration

```typescript
// pages/api/ielts/generate-passage.ts
import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../../lib/openai';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { testType, topic, difficulty } = req.body;

    const prompt = testType === 'academic' 
      ? ACADEMIC_PASSAGE_PROMPT.replace('{topic}', topic).replace('{difficulty}', difficulty)
      : GENERAL_PASSAGE_PROMPT.replace('{topic}', topic).replace('{difficulty}', difficulty);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert IELTS test creator with 20+ years of experience."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const generatedContent = completion.choices[0].message.content;
    
    // Parse the generated content to extract passage details
    const passage = parsePassageContent(generatedContent, testType, topic, difficulty);

    // Store in Supabase
    const { data, error } = await supabase
      .from('ielts_passages')
      .insert([passage])
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ passage: data });
  } catch (error) {
    console.error('Error generating passage:', error);
    res.status(500).json({ message: 'Error generating passage' });
  }
}

function parsePassageContent(content: string, testType: string, topic: string, difficulty: string) {
  // Implementation to parse the AI-generated content into structured data
  const lines = content.split('\n');
  const titleMatch = content.match(/Title:\s*(.+)/);
  const passageMatch = content.match(/Passage:\s*([\s\S]*?)(?=Key Points:|Vocabulary Level:|$)/);
  
  return {
    title: titleMatch ? titleMatch[1] : `${testType} Reading: ${topic}`,
    content: passageMatch ? passageMatch[1].trim() : content,
    testType,
    topic,
    difficulty,
    wordCount: passageMatch ? passageMatch[1].trim().split(/\s+/).length : 0
  };
}
```

```typescript
// pages/api/ielts/generate-questions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../../lib/openai';
import { supabase } from '../../../lib/supabase';

const QUESTION_TYPE_DISTRIBUTION = {
  academic: {
    'true_false_not_given': 4,
    'multiple_choice': 5,
    'matching_headings': 6,
    'sentence_completion': 8,
    'short_answer': 3,
    'matching_information': 6,
    'summary_completion': 4,
    'matching_features': 4
  },
  general: {
    'multiple_choice': 8,
    'true_false_not_given': 6,
    'matching_information': 8,
    'sentence_completion': 6,
    'short_answer': 4,
    'matching_headings': 4,
    'note_completion': 4
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { passage, testType, questionCount = 40 } = req.body;
    const distribution = QUESTION_TYPE_DISTRIBUTION[testType];
    
    const allQuestions = [];

    for (const [questionType, count] of Object.entries(distribution)) {
      const questions = await generateQuestionsByType(passage, questionType, count);
      allQuestions.push(...questions);
    }

    // Store questions in Supabase
    const { data, error } = await supabase
      .from('ielts_questions')
      .insert(allQuestions)
      .select();

    if (error) throw error;

    res.status(200).json({ questions: data });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ message: 'Error generating questions' });
  }
}

async function generateQuestionsByType(passage: string, questionType: string, count: number) {
  let prompt = '';
  
  switch (questionType) {
    case 'true_false_not_given':
      prompt = TRUE_FALSE_NOT_GIVEN_PROMPT
        .replace('{passage}', passage)
        .replace('{numberOfQuestions}', count.toString());
      break;
    case 'multiple_choice':
      prompt = MULTIPLE_CHOICE_PROMPT
        .replace('{passage}', passage)
        .replace('{numberOfQuestions}', count.toString());
      break;
    // Add more question types...
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert IELTS question creator. Create precise, well-crafted questions that test reading comprehension skills accurately."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.5,
    max_tokens: 1500
  });

  return parseQuestions(completion.choices[0].message.content, questionType);
}

function parseQuestions(content: string, questionType: string) {
  // Implementation to parse AI-generated questions into structured format
  const questions = [];
  const questionBlocks = content.split(/Question \d+:/);
  
  questionBlocks.slice(1).forEach((block, index) => {
    const question = parseQuestionBlock(block, questionType, index + 1);
    if (question) questions.push(question);
  });
  
  return questions;
}
```

```typescript
// pages/api/ielts/score-test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../../lib/openai';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { questions, userAnswers, testType } = req.body;

    // Calculate basic score
    let correctAnswers = 0;
    const questionResults = [];

    questions.forEach((question: any) => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = compareAnswers(userAnswer, question.correctAnswer, question.type);
      
      if (isCorrect) correctAnswers++;
      
      questionResults.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      });
    });

    // Generate detailed feedback using AI
    const feedbackPrompt = ANSWER_SCORING_PROMPT
      .replace('{testType}', testType)
      .replace('{totalQuestions}', questions.length.toString())
      .replace('{studentAnswers}', JSON.stringify(userAnswers))
      .replace('{correctAnswers}', JSON.stringify(questions.map(q => ({ id: q.id, answer: q.correctAnswer }))));

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an experienced IELTS examiner providing detailed, constructive feedback."
        },
        {
          role: "user",
          content: feedbackPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const bandScore = calculateBandScore(correctAnswers, testType);
    
    const result = {
      totalQuestions: questions.length,
      correctAnswers,
      bandScore,
      questionResults,
      detailedFeedback: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    };

    // Store results in Supabase
    const { data, error } = await supabase
      .from('ielts_test_results')
      .insert([result])
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(result);
  } catch (error) {
    console.error('Error scoring test:', error);
    res.status(500).json({ message: 'Error scoring test' });
  }
}

function compareAnswers(userAnswer: string, correctAnswer: string | string[], questionType: string): boolean {
  // Implementation for different answer comparison logic based on question type
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some(answer => 
      userAnswer?.toLowerCase().trim() === answer.toLowerCase().trim()
    );
  }
  
  return userAnswer?.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();
}

function calculateBandScore(correctAnswers: number, testType: 'academic' | 'general'): number {
  // IELTS Band Score conversion tables
  const academicBands = [
    { min: 39, band: 9.0 }, { min: 37, band: 8.5 }, { min: 35, band: 8.0 },
    { min: 33, band: 7.5 }, { min: 30, band: 7.0 }, { min: 27, band: 6.5 },
    { min: 23, band: 6.0 }, { min: 19, band: 5.5 }, { min: 15, band: 5.0 },
    { min: 13, band: 4.5 }, { min: 10, band: 4.0 }, { min: 8, band: 3.5 },
    { min: 6, band: 3.0 }, { min: 4, band: 2.5 }, { min: 3, band: 2.0 },
    { min: 2, band: 1.5 }, { min: 1, band: 1.0 }, { min: 0, band: 0.0 }
  ];

  const generalBands = [
    { min: 40, band: 9.0 }, { min: 39, band: 8.5 }, { min: 37, band: 8.0 },
    { min: 36, band: 7.5 }, { min: 34, band: 7.0 }, { min: 32, band: 6.5 },
    { min: 30, band: 6.0 }, { min: 26, band: 5.5 }, { min: 23, band: 5.0 },
    { min: 19, band: 4.5 }, { min: 15, band: 4.0 }, { min: 12, band: 3.5 },
    { min: 9, band: 3.0 }, { min: 6, band: 2.5 }, { min: 4, band: 2.0 },
    { min: 2, band: 1.5 }, { min: 1, band: 1.0 }, { min: 0, band: 0.0 }
  ];

  const bands = testType === 'academic' ? academicBands : generalBands;
  
  for (const { min, band } of bands) {
    if (correctAnswers >= min) return band;
  }
  
  return 0.0;
}
```

## Academic vs General Training Differences

### Content Differences

```typescript
const ACADEMIC_CHARACTERISTICS = {
  sources: [
    'Academic journals', 
    'Research papers', 
    'University textbooks',
    'Scientific magazines',
    'Professional publications'
  ],
  topics: [
    'Science and technology',
    'History and archaeology', 
    'Environmental issues',
    'Social sciences',
    'Arts and culture',
    'Medicine and health',
    'Education and psychology'
  ],
  language: {
    register: 'formal',
    vocabulary: 'academic and technical',
    complexity: 'complex sentence structures',
    style: 'analytical, descriptive, discursive'
  }
};

const GENERAL_CHARACTERISTICS = {
  section1: {
    sources: ['Advertisements', 'Notices', 'Timetables', 'Brochures'],
    topics: ['Shopping', 'Accommodation', 'Travel', 'Social activities'],
    texts: '2-3 short texts',
    wordCount: '150-200 words each'
  },
  section2: {
    sources: ['Job descriptions', 'Contracts', 'Training materials', 'Company policies'],
    topics: ['Work-related situations', 'Training courses', 'Workplace procedures'],
    texts: '2 texts',
    wordCount: '250-350 words each'
  },
  section3: {
    sources: ['Newspapers', 'Magazines', 'Online articles'],
    topics: ['General interest', 'Current events', 'Opinion pieces'],
    texts: '1 long text',
    wordCount: '500-700 words'
  }
};
```

### Question Type Implementation Differences

```typescript
// Academic-specific question generation
const generateAcademicQuestions = async (passage: string) => {
  return {
    'matching_headings': 6, // More common in Academic
    'true_false_not_given': 4,
    'sentence_completion': 8, // Academic vocabulary focus
    'summary_completion': 4,
    'multiple_choice': 5,
    'matching_information': 6,
    'short_answer': 3,
    'diagram_labeling': 2, // Scientific diagrams
    'matching_features': 2
  };
};

// General Training-specific question generation
const generateGeneralQuestions = async (passage: string) => {
  return {
    'multiple_choice': 8, // More straightforward options
    'true_false_not_given': 6,
    'matching_information': 8,
    'sentence_completion': 6,
    'short_answer': 4,
    'matching_headings': 4,
    'note_completion': 4 // Practical note-taking
  };
};
```

## Testing and Quality Assurance

### Automated Testing Suite

```typescript
// tests/ielts-reading.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IELTSReadingTest } from '../components/IELTSReadingTest';

describe('IELTS Reading Test', () => {
  test('generates academic passage correctly', async () => {
    render(<IELTSReadingTest />);
    
    // Configure test
    fireEvent.change(screen.getByLabelText(/test type/i), { 
      target: { value: 'academic' } 
    });
    fireEvent.change(screen.getByLabelText(/topic/i), { 
      target: { value: 'Climate Change' } 
    });
    
    // Start test
    fireEvent.click(screen.getByText(/start test/i));
    
    await waitFor(() => {
      expect(screen.getByText(/climate change/i)).toBeInTheDocument();
    });
  });

  test('validates True/False/Not Given answers correctly', async () => {
    // Test implementation for answer validation
  });

  test('calculates band scores accurately', () => {
    const testCases = [
      { correct: 40, testType: 'academic', expected: 9.0 },
      { correct: 35, testType: 'academic', expected: 8.0 },
      { correct: 30, testType: 'academic', expected: 7.0 },
      { correct: 23, testType: 'academic', expected: 6.0 }
    ];

    testCases.forEach(({ correct, testType, expected }) => {
      const bandScore = calculateBandScore(correct, testType);
      expect(bandScore).toBe(expected);
    });
  });
});
```

### Quality Metrics and Monitoring

```typescript
// lib/quality-metrics.ts
export const validateQuestionQuality = (questions: IELTSQuestion[]) => {
  const metrics = {
    difficultyDistribution: analyzeDifficultyDistribution(questions),
    questionTypeBalance: analyzeQuestionTypeBalance(questions),
    answerDistribution: analyzeAnswerDistribution(questions),
    vocabularyLevel: analyzeVocabularyLevel(questions)
  };

  return {
    isValid: validateMetrics(metrics),
    suggestions: generateQualityRecommendations(metrics),
    metrics
  };
};

const analyzeDifficultyDistribution = (questions: IELTSQuestion[]) => {
  // Implementation for analyzing question difficulty spread
};

const analyzeQuestionTypeBalance = (questions: IELTSQuestion[]) => {
  // Ensure proper distribution of question types
};
```

## Performance Optimization

### Caching Strategy

```typescript
// lib/cache.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cachePassage = async (key: string, passage: IELTSPassage, ttl = 3600) => {
  await redis.setex(`passage:${key}`, ttl, JSON.stringify(passage));
};

export const getCachedPassage = async (key: string): Promise<IELTSPassage | null> => {
  const cached = await redis.get(`passage:${key}`);
  return cached ? JSON.parse(cached) : null;
};

export const generateCacheKey = (testType: string, topic: string, difficulty: string) => {
  return `${testType}-${topic.toLowerCase().replace(/\s+/g, '-')}-${difficulty}`;
};
```

### Rate Limiting

```typescript
// middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const ieltsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 test generations per windowMs
  message: {
    error: 'Too many test generation requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
```

## Deployment and Monitoring

### Environment Configuration

```env
# Production Environment Variables
OPENAI_API_KEY=sk-prod-your-api-key
OPENAI_ORGANIZATION=org-your-production-org
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
REDIS_URL=redis://your-redis-url:6379
NODE_ENV=production
```

### Monitoring and Analytics

```typescript
// lib/analytics.ts
export const trackTestGeneration = async (userId: string, testType: string, topic: string) => {
  await supabase.from('analytics_events').insert({
    user_id: userId,
    event_type: 'test_generated',
    properties: { testType, topic },
    timestamp: new Date().toISOString()
  });
};

export const trackTestCompletion = async (userId: string, bandScore: number, testType: string) => {
  await supabase.from('analytics_events').insert({
    user_id: userId,
    event_type: 'test_completed',
    properties: { bandScore, testType },
    timestamp: new Date().toISOString()
  });
};
```

This comprehensive guide provides a complete implementation framework for your AI-powered IELTS Reading module using OpenAI's GPT models with prompt engineering, supporting both Academic and General Training tests with full frontend-backend integration.