import { describe, expect, it } from 'vitest';
import { analysisForQuestion, classifyQuestion } from '../lib/analytics';

describe('HotelOps assistant intents', () => {
  it('classifies and answers all four supported questions differently', () => {
    const questions = [
      'Why did labor costs increase last month?',
      'Which department caused the largest variance?',
      'How can we reduce labor costs?',
      'Compare this month with the previous month.',
    ];
    const results = questions.map(analysisForQuestion);
    expect(results.map(result => result.intent)).toEqual(['labor_increase', 'largest_department', 'reduce_costs', 'month_comparison']);
    expect(new Set(results.map(result => result.title)).size).toBe(4);
  });
  it('returns a general fallback for unsupported questions', () => {
    expect(classifyQuestion('What is the weather?')).toBe('general');
    expect(analysisForQuestion('What is the weather?').supportedQuestions).toHaveLength(4);
  });
});
