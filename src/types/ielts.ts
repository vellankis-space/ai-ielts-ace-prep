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