import express from 'express';
import openai from '../../lib/openai.ts';

type Request = express.Request;
type Response = express.Response;

// Question type distribution for Academic and General Training
const QUESTION_TYPE_DISTRIBUTION = {
  academic: {
    'multiple_choice': 5,
    'true_false_not_given': 4,
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
    'matching_headings': 4,
    'sentence_completion': 6,
    'short_answer': 4,
    'matching_information': 8,
    'note_completion': 4
  }
};

// True/False/Not Given question prompt
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

// Multiple choice question prompt
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

// Matching headings prompt
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

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { passage, testType, questionCount = 40 } = req.body;

    // Validate input
    if (!passage || !testType) {
      return res.status(400).json({ message: 'Missing required parameters: passage, testType' });
    }

    // Get question distribution based on test type
    const distribution = QUESTION_TYPE_DISTRIBUTION[testType as keyof typeof QUESTION_TYPE_DISTRIBUTION] ||
      QUESTION_TYPE_DISTRIBUTION.academic;

    // Generate questions for each question type
    const allQuestions = [];
    let questionIdCounter = 1;

    for (const [questionType, count] of Object.entries(distribution)) {
      const questions = await generateQuestionsByType(
        passage,
        questionType,
        count,
        questionIdCounter
      );

      allQuestions.push(...questions);
      questionIdCounter += questions.length;
    }

    res.status(200).json({ questions: allQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ message: 'Error generating questions', error: error.message });
  }
}

async function generateQuestionsByType(
  passage: string,
  questionType: string,
  count: number,
  startId: number
) {
  let prompt = '';

  switch (questionType) {
    case 'true_false_not_given':
      prompt = TRUE_FALSE_NOT_GIVEN_PROMPT
        .replace('{passage}', passage)
        .replace('{numberOfQuestions}', count.toString())
        .replace('{easyCount}', Math.ceil(count * 0.3).toString())
        .replace('{mediumCount}', Math.ceil(count * 0.4).toString())
        .replace('{hardCount}', Math.ceil(count * 0.3).toString());
      break;

    case 'multiple_choice':
      prompt = MULTIPLE_CHOICE_PROMPT
        .replace('{passage}', passage)
        .replace('{numberOfQuestions}', count.toString());
      break;

    case 'matching_headings':
      // For matching headings, we need to determine paragraph count
      const paragraphCount = passage.split('\n\n').filter(p => p.trim().length > 0).length || 5;
      prompt = MATCHING_HEADINGS_PROMPT
        .replace('{passage}', passage)
        .replace('{numberOfParagraphs}', paragraphCount.toString())
        .replace('{numberOfHeadings}', (paragraphCount + 2).toString())
        .replace('{extraHeadings}', '2');
      break;

    default:
      // For other question types, we'll use a generic prompt template
      prompt = `
You are an expert IELTS Reading question creator. Create ${count} ${questionType} questions based on the passage below.

**PASSAGE:**
${passage}

**TASK:** Create ${count} ${questionType} questions.

Follow standard IELTS question formats and guidelines for this question type.
Include a mix of difficulty levels.
Provide the correct answer and explanation for each question.

Generate the questions now:
`;
  }

  try {
    // Generate questions using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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

    // Parse the generated questions
    return parseQuestions(completion.choices[0].message.content, questionType, startId);
  } catch (error) {
    console.error(`Error generating ${questionType} questions:`, error);
    return [];
  }
}

function parseQuestions(content: string, questionType: string, startId: number) {
  // Simple parsing implementation - in a production environment, you might want more robust parsing
  const questions = [];
  const lines = content.split('\n').filter(line => line.trim() !== '');

  // This is a simplified parser - a full implementation would need more sophisticated parsing
  // based on the specific format of each question type
  let currentQuestion = null;
  let questionCounter = startId;

  for (const line of lines) {
    if (line.toLowerCase().startsWith('question')) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }

      currentQuestion = {
        id: `question-${questionCounter}`,
        passageId: '',
        type: questionType,
        question: line.substring(line.indexOf(':') + 1).trim(),
        options: [],
        correctAnswer: '',
        explanation: '',
        difficulty: 5.0
      };

      questionCounter++;
    } else if (currentQuestion) {
      if (line.toLowerCase().startsWith('a)') || line.toLowerCase().startsWith('b)') ||
        line.toLowerCase().startsWith('c)') || line.toLowerCase().startsWith('d)')) {
        currentQuestion.options.push(line.substring(3).trim());
      } else if (line.toLowerCase().startsWith('correct answer:')) {
        currentQuestion.correctAnswer = line.substring(15).trim();
      } else if (line.toLowerCase().startsWith('answer:')) {
        currentQuestion.correctAnswer = line.substring(8).trim();
      } else if (line.toLowerCase().startsWith('explanation:')) {
        currentQuestion.explanation = line.substring(12).trim();
      } else if (line.toLowerCase().startsWith('difficulty:')) {
        const difficultyText = line.substring(11).trim().toLowerCase();
        if (difficultyText.includes('easy')) {
          currentQuestion.difficulty = 5.0;
        } else if (difficultyText.includes('medium')) {
          currentQuestion.difficulty = 6.5;
        } else if (difficultyText.includes('hard')) {
          currentQuestion.difficulty = 7.5;
        }
      } else if (currentQuestion.question && currentQuestion.question.length < 200) {
        // Append to question if it's a continuation
        currentQuestion.question += ' ' + line.trim();
      }
    }
  }

  // Add the last question
  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}