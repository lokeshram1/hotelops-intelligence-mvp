import { describe, expect, it } from 'vitest';
import { analysisForQuestion, classifyQuestion } from '../lib/analytics';

describe('HotelOps deterministic assistant', () => {
  it('classifies labor increase questions', () => expect(classifyQuestion('Why did labor costs increase last month?')).toBe('labor_increase'));
  it('classifies department questions', () => expect(classifyQuestion('Which department caused the largest variance?')).toBe('largest_department'));
  it('classifies cost reduction questions', () => expect(classifyQuestion('How can we reduce labor costs?')).toBe('reduce_costs'));
  it('classifies month comparison questions', () => expect(classifyQuestion('Compare this month with the previous month.')).toBe('month_comparison'));
  it('returns distinct response branches', () => {
    const answers = ['Why did labor costs increase last month?', 'Which department caused the largest variance?', 'How can we reduce labor costs?', 'Compare this month with the previous month.'].map(analysisForQuestion);
    expect(new Set(answers.map(answer => answer.intent)).size).toBe(4);
    expect(answers[1].department?.name).toBe('Housekeeping');
    expect(answers[2].baseline?.estimatedSavingsOpportunity).toBe(2700);
    expect(answers[3].comparison?.dollarChange).toBe(14600);
  });
  it('falls back distinctly for unsupported questions', () => expect(analysisForQuestion('What is the weather?').intent).toBe('general'));
});
