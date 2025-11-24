import express from 'express';
import openai from '../../lib/openai.ts';

type Request = express.Request;
type Response = express.Response;

// Answer scoring prompt
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

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { questions, userAnswers, testType } = req.body;

    // Validate input
    if (!questions || !userAnswers || !testType) {
      return res.status(400).json({
        message: 'Missing required parameters: questions, userAnswers, testType'
      });
    }

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

    // Calculate band score
    const bandScore = calculateBandScore(correctAnswers, testType);

    // Generate detailed feedback using AI
    const formattedStudentAnswers = Object.entries(userAnswers).map(
      ([id, answer]) => `Q${id.split('-')[1]}: ${answer}`
    ).join('\n');

    const formattedCorrectAnswers = questions.map(
      (q: any) => `Q${q.id.split('-')[1]}: ${Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' or ') : q.correctAnswer}`
    ).join('\n');

    const topic = questions.length > 0 ? questions[0].topic || 'Reading' : 'Reading';

    const feedbackPrompt = ANSWER_SCORING_PROMPT
      .replace('{testType}', testType)
      .replace('{topic}', topic)
      .replace('{totalQuestions}', questions.length.toString())
      .replace('{studentAnswers}', formattedStudentAnswers)
      .replace('{correctAnswers}', formattedCorrectAnswers);

    // Generate feedback using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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

    const result = {
      totalQuestions: questions.length,
      correctAnswers,
      bandScore,
      questionResults,
      detailedFeedback: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error scoring test:', error);
    res.status(500).json({ message: 'Error scoring test', error: error.message });
  }
}

function compareAnswers(userAnswer: string, correctAnswer: string | string[], questionType: string): boolean {
  // Implementation for different answer comparison logic based on question type
  if (!userAnswer) return false;

  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some(answer =>
      userAnswer?.toLowerCase().trim() === answer.toLowerCase().trim()
    );
  }

  // For multiple choice, we might have "A" vs "A)"
  if (questionType === 'multiple_choice') {
    const normalizedUserAnswer = userAnswer.toLowerCase().replace(/[).]/g, '').trim();
    const normalizedCorrectAnswer = (correctAnswer as string).toLowerCase().replace(/[).]/g, '').trim();
    return normalizedUserAnswer === normalizedCorrectAnswer;
  }

  return userAnswer?.toLowerCase().trim() === (correctAnswer as string)?.toLowerCase().trim();
}

function calculateBandScore(correctAnswers: number, testType: string): number {
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