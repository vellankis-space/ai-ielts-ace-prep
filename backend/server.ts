import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generatePassageRoute from './src/routes/ielts/generate-passage.ts';
import generateQuestionsRoute from './src/routes/ielts/generate-questions.ts';
import scoreTestRoute from './src/routes/ielts/score-test.ts';

dotenv.config();
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.post('/api/ielts/generate-passage', generatePassageRoute);
app.post('/api/ielts/generate-questions', generateQuestionsRoute);
app.post('/api/ielts/score-test', scoreTestRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});