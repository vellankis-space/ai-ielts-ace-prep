import express from 'express';
import openai from '../../../lib/openai.ts';

type Request = express.Request;
type Response = express.Response;

// Academic passage generation prompt
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

// General Training passage generation prompt
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

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { testType, topic, difficulty } = req.body;

    // Validate input
    if (!testType || !topic || !difficulty) {
      return res.status(400).json({ message: 'Missing required parameters: testType, topic, difficulty' });
    }

    // Determine word count based on difficulty
    let wordCount = '600-900';
    let sectionType = 'Section 3 (General Reading)';
    
    if (testType === 'general') {
      switch (difficulty) {
        case 'beginner':
          wordCount = '400-600';
          sectionType = 'Section 1 (Social Survival)';
          break;
        case 'intermediate':
          wordCount = '600-800';
          sectionType = 'Section 2 (Workplace Survival)';
          break;
        case 'advanced':
          wordCount = '800-1000';
          sectionType = 'Section 3 (General Reading)';
          break;
      }
    }

    // Select appropriate prompt
    const prompt = testType === 'academic' 
      ? ACADEMIC_PASSAGE_PROMPT
          .replace('{topic}', topic)
          .replace('{difficulty}', difficulty)
      : GENERAL_PASSAGE_PROMPT
          .replace('{topic}', topic)
          .replace('{wordCount}', wordCount)
          .replace('{difficulty}', difficulty)
          .replace('{sectionType}', sectionType);

    // Generate passage using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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

    res.status(200).json({ passage });
  } catch (error) {
    console.error('Error generating passage:', error);
    res.status(500).json({ message: 'Error generating passage', error: error.message });
  }
}

function parsePassageContent(content: string, testType: string, topic: string, difficulty: string) {
  // Simple parsing implementation - in a production environment, you might want more robust parsing
  const lines = content.split('\n').filter(line => line.trim() !== '');
  
  let title = `${testType.charAt(0).toUpperCase() + testType.slice(1)} Reading: ${topic}`;
  let passageContent = content;
  let wordCount = 0;
  
  // Extract title if present
  const titleMatch = content.match(/Title:\s*(.+)/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }
  
  // Extract passage content
  const passageMatch = content.match(/Passage:\s*([\s\S]*?)(?=Key Points:|Vocabulary Level:|Title:|$)/i);
  if (passageMatch) {
    passageContent = passageMatch[1].trim();
  }
  
  // Calculate word count
  wordCount = passageContent.trim().split(/\s+/).length;
  
  return {
    id: `passage-${Date.now()}`,
    title,
    content: passageContent,
    testType,
    topic,
    difficulty,
    wordCount
  };
}