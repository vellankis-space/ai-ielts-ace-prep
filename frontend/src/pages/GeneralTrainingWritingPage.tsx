import React from 'react';
import WritingTestLayout from '../components/WritingTestLayout';

const GeneralTrainingWritingPage = () => {
  const task1Instructions = (
    <div>
      <p className="mb-4">You should spend about 20 minutes on this task.</p>
      <p className="mb-4">You have received a letter from your English-speaking friend, John. He is planning to visit your country.</p>
      <p className="mb-4 font-semibold">Read part of his letter below.</p>
      <div className="bg-white/5 p-4 rounded-lg mb-4 border border-white/10 italic text-muted-foreground">
        “I’m so excited to visit your country! I’d love to know more about the best time to visit and what we can do. Also, could you suggest some interesting places to see?”
      </div>
      <p className="mb-4">Write a letter to John. In your letter, you should:</p>
      <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
        <li>suggest the best time to visit</li>
        <li>suggest some activities</li>
        <li>recommend some interesting places to see</li>
      </ul>
      <p className="text-sm text-muted-foreground">Write at least 150 words.</p>
    </div>
  );

  const task2Instructions = (
    <div>
      <p className="mb-4">You should spend about 40 minutes on this task.</p>
      <p className="mb-4">Some people believe that it is the responsibility of individuals to take care of their own health. Others believe that it is the government’s responsibility.</p>
      <p className="mb-4">Discuss both these views and give your own opinion.</p>
      <p className="text-sm text-muted-foreground">Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.</p>
    </div>
  );

  return (
    <WritingTestLayout
      title="General Training Writing"
      task1Instructions={task1Instructions}
      task2Instructions={task2Instructions}
    />
  );
};

export default GeneralTrainingWritingPage;
