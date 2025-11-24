import React from 'react';
import WritingTestLayout from '../components/WritingTestLayout';

const AdvancedWritingChallengePage = () => {
  const task1Instructions = (
    <div>
      <p className="mb-4">You should spend about 20 minutes on this task.</p>
      <p className="mb-4">The table below shows the results of a survey which sampled 10,000 people in five different countries. The survey asked people about their reasons for travelling.</p>
      <p className="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
      <p className="text-sm text-gray-600">Write at least 150 words.</p>
    </div>
  );

  const task1Content = (
    <div className="bg-gray-100 rounded-lg p-8 my-4 text-center">
      <p className="text-gray-600">[Table showing survey results would be displayed here]</p>
    </div>
  );

  const task2Instructions = (
    <div>
      <p className="mb-4">You should spend about 40 minutes on this task.</p>
      <p className="mb-4">In some countries, more and more people are becoming overweight. This is a serious problem that needs to be addressed.</p>
      <p className="mb-4">What are the causes of this problem? What solutions can you suggest?</p>
      <p className="text-sm text-gray-600">Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.</p>
    </div>
  );

  return (
    <WritingTestLayout
      title="Advanced Writing Challenge"
      task1Instructions={task1Instructions}
      task1Content={task1Content}
      task2Instructions={task2Instructions}
    />
  );
};

export default AdvancedWritingChallengePage;
