/** Shared by the calculators (in the browser) and the worked examples (at build time). */

export type Sex = 'male' | 'female';
export const LB_PER_KG = 2.20462262;
export const CM_PER_IN = 2.54;

export const activityLevels = [
  { key: 'sedentary', label: 'Mostly sitting, little exercise', factor: 1.2 },
  { key: 'light', label: 'Light exercise, 1–3 days a week', factor: 1.375 },
  { key: 'moderate', label: 'Moderate exercise, 3–5 days a week', factor: 1.55 },
  { key: 'very', label: 'Hard exercise, 6–7 days a week', factor: 1.725 },
  { key: 'extra', label: 'Hard exercise and a physical job', factor: 1.9 },
] as const;
export type ActivityKey = (typeof activityLevels)[number]['key'];

export const calorieGoals = [
  { key: 'lose', label: 'Lose fat', delta: -500, proteinPerKg: 1.8 },
  { key: 'maintain', label: 'Maintain weight', delta: 0, proteinPerKg: 1.6 },
  { key: 'gain', label: 'Build muscle', delta: 300, proteinPerKg: 1.8 },
] as const;
export type CalorieGoalKey = (typeof calorieGoals)[number]['key'];

/** Lowest daily target the calculator will suggest without a doctor. */
export const calorieFloor = (sex: Sex) => (sex === 'male' ? 1500 : 1200);

/** Mifflin–St Jeor resting energy expenditure, kcal per day. */
export function bmr(sex: Sex, kg: number, cm: number, age: number) {
  return 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161);
}

export type MacroInput = { sex: Sex; age: number; kg: number; cm: number; activity: ActivityKey; goal: CalorieGoalKey };

export function macros(i: MacroInput) {
  const factor = activityLevels.find((a) => a.key === i.activity)!.factor;
  const goal = calorieGoals.find((g) => g.key === i.goal)!;
  const rest = bmr(i.sex, i.kg, i.cm, i.age);
  const tdee = rest * factor;
  const raw = tdee + goal.delta;
  const floor = calorieFloor(i.sex);
  const kcal = Math.round(Math.max(raw, floor) / 10) * 10;
  const proteinG = Math.round(i.kg * goal.proteinPerKg);
  const fatG = Math.round((kcal * 0.25) / 9);
  const carbsG = Math.max(0, Math.round((kcal - proteinG * 4 - fatG * 9) / 4));
  return { bmr: Math.round(rest), tdee: Math.round(tdee), kcal, floorApplied: raw < floor, proteinG, fatG, carbsG };
}

export const proteinGoals = [
  { key: 'health', label: 'General health (US Dietary Guidelines)', min: 1.2, max: 1.6 },
  { key: 'active', label: 'Regular exercise or sport', min: 1.4, max: 2.0 },
  { key: 'muscle', label: 'Build muscle', min: 1.6, max: 2.2 },
  { key: 'cut', label: 'Lose fat while strength training', min: 1.8, max: 2.2 },
] as const;
export type ProteinGoalKey = (typeof proteinGoals)[number]['key'];

export function proteinRange(kg: number, goal: ProteinGoalKey, meals = 4) {
  const g = proteinGoals.find((x) => x.key === goal)!;
  const min = Math.round(kg * g.min);
  const max = Math.round(kg * g.max);
  return { min, max, perMealMin: Math.round(min / meals), perMealMax: Math.round(max / meals) };
}

export const sources = {
  mifflin: {
    label: 'Mifflin MD, St Jeor ST, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241–247.',
    url: 'https://cancercontrol.cancer.gov/brp/research/group-evaluated-measures/adopt/ree-pal',
  },
  morton: {
    label: 'Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376–384.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28698222/',
  },
  issn: {
    label: 'Jäger R, et al. International Society of Sports Nutrition position stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28642676/',
  },
  dga: {
    label: 'U.S. Department of Agriculture and U.S. Department of Health and Human Services. Dietary Guidelines for Americans, 2025–2030.',
    url: 'https://cdn.realfood.gov/DGA.pdf',
  },
  perMeal: {
    label: 'Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? J Int Soc Sports Nutr. 2018;15:10.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29497353/',
  },
};
