import { demoData, departments, Month } from '../data/demo';

export type Intent = 'labor_increase' | 'largest_department' | 'reduce_costs' | 'month_comparison' | 'general';
export const latest = demoData[demoData.length - 1];
export const previous = demoData[demoData.length - 2];

export function variance(actual: number, budget: number) { return actual - budget; }
export function variancePct(actual: number, budget: number) { return budget ? (actual - budget) / budget * 100 : 0; }
export function laborPerOccupiedRoom(m: Month) { return m.occupancy ? m.laborCost / (312 * m.occupancy / 100) : 0; }

export function classifyQuestion(question: string): Intent {
  const q = question.trim().toLowerCase();
  if (!q) return 'general';
  if (/(compare|previous month|month over month|mom|prior month)/.test(q)) return 'month_comparison';
  if (/(department|largest variance|caused)/.test(q)) return 'largest_department';
  if (/(reduce|lower|save|improve)/.test(q)) return 'reduce_costs';
  if (/(why|increase|increased|above budget|labor cost)/.test(q)) return 'labor_increase';
  return 'general';
}

const departmentBaseline: Record<string, number> = { Housekeeping: 65000, 'Front Office': 32000, 'Food and Beverage': 48000, Maintenance: 20400 };
export function largestDepartmentVariance(m: Month = latest) {
  return departments.map(name => ({ name, actual: m.departments[name], budget: departmentBaseline[name], variance: m.departments[name] - departmentBaseline[name] }))
    .sort((a, b) => b.variance - a.variance)[0];
}

export function analysisForQuestion(question: string) {
  const intent = classifyQuestion(question);
  const driver = largestDepartmentVariance(latest);
  const totalVariance = variance(latest.laborCost, latest.laborBudget);
  const overtimeIncrease = (latest.overtimeHours / previous.overtimeHours - 1) * 100;
  const monthChange = latest.laborCost - previous.laborCost;
  const monthChangePct = monthChange / previous.laborCost * 100;
  const base = { intent, question: question.trim(), confidence: 0.94, sources: ['Monthly labor report · Oct 2024', 'Occupancy and room revenue · Oct 2024', 'Department labor ledger · Oct 2024'] };
  if (intent === 'labor_increase') return { ...base, title: 'Why did labor costs increase last month?', summary: `Labor costs were ${variancePct(latest.laborCost, latest.laborBudget).toFixed(1)}% above budget last month.`, metrics: { actualLaborCost: latest.laborCost, laborBudget: latest.laborBudget, budgetVariance: totalVariance, overtimeIncrease, occupancy: latest.occupancy, laborPerOccupiedRoom: laborPerOccupiedRoom(latest) }, mainDriver: driver.name, recommendations: ['Review housekeeping staffing during high-occupancy periods.', 'Use staggered shifts on weekends.', 'Set an overtime approval threshold.'] };
  if (intent === 'largest_department') return { ...base, title: 'Which department caused the largest variance?', summary: `${driver.name} caused the largest labor variance in October.`, department: { name: driver.name, actualCost: driver.actual, budgetBaseline: driver.budget, variance: driver.variance, percentageContribution: driver.variance / totalVariance * 100 }, recommendation: 'Compare scheduled hours with occupied rooms and review Housekeeping overtime approvals before the next high-occupancy weekend.' };
  if (intent === 'reduce_costs') return { ...base, title: 'How can we reduce labor costs?', summary: `The current labor baseline is ${money(latest.laborCost)} with ${money(latest.overtimeCost)} in overtime cost.`, baseline: { laborCost: latest.laborCost, overtimeCost: latest.overtimeCost, estimatedSavingsOpportunity: latest.overtimeCost * .15 }, recommendations: ['Stagger Housekeeping shifts around occupancy peaks.', 'Set an overtime approval threshold and review exceptions weekly.', 'Compare scheduled hours with occupied rooms by department.'], tradeoff: 'Reducing overtime too aggressively may affect room readiness and service levels during high-occupancy periods.' };
  if (intent === 'month_comparison') return { ...base, title: 'How does this month compare with the previous month?', summary: `Labor cost increased ${money(monthChange)} (${monthChangePct.toFixed(1)}%) month over month.`, comparison: { currentLaborCost: latest.laborCost, previousLaborCost: previous.laborCost, dollarChange: monthChange, percentageChange: monthChangePct, currentOccupancy: latest.occupancy, previousOccupancy: previous.occupancy, occupancyChange: latest.occupancy - previous.occupancy, interpretation: 'Labor efficiency weakened: labor cost grew faster than occupancy, driven by higher overtime hours.' } };
  return { ...base, title: 'I can analyze hotel labor performance.', summary: 'Try one of the suggested questions to get a deterministic, evidence-backed analysis.', supportedQuestions: ['Why did labor costs increase last month?', 'Which department caused the largest variance?', 'How can we reduce labor costs?', 'Compare this month with the previous month.'] };
}

function money(n: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n); }
