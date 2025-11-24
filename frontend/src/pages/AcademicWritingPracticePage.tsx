import React from 'react';
import WritingTestLayout from '../components/WritingTestLayout';

const AcademicWritingPracticePage = () => {
  const task1Instructions = (
    <div>
      <p className="mb-4">You should spend about 20 minutes on this task.</p>
      <p className="mb-4">The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.</p>
      <p className="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
      <p className="text-sm text-gray-600">Write at least 150 words.</p>
    </div>
  );

  const task1Content = (
    <div className="bg-gray-100 rounded-lg p-8 my-4 text-center">
      <p className="text-gray-600">[Bar chart showing housing tenure data would be displayed here]</p>
    </div>
  );

  const task2Instructions = (
    <div>
      <p className="mb-4">You should spend about 40 minutes on this task.</p>
      <p className="mb-4">Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology.</p>
      <p className="mb-4">Discuss both these views and give your own opinion.</p>
      <p className="text-sm text-gray-600">Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.</p>
    </div>
  );

  return (
    <WritingTestLayout
      title="Academic Writing Practice"
      task1Instructions={task1Instructions}
      task1Content={task1Content}
      task2Instructions={task2Instructions}
    />
  );
};

export default AcademicWritingPracticePage;
