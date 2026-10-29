/** Numbers for the phone screens and the week grid, all taken from the app's bundled sample plan. */
import week from '@/data/sample-week.json';

export type Meal = { dayIndex: number; slot: string; name: string; kcal: number; proteinG: number; carbsG: number; fatG: number; ingredients: { name: string; aisle: string; grams: number; shoppable?: boolean }[] };
export type WorkoutItem = { exerciseName: string; sets: number; reps: string; restSeconds?: number };
export type Workout = { dayIndex: number; focus: string; estimatedMinutes: number; items: WorkoutItem[] };

export const meals = week.meals as Meal[];
export const workouts = week.workouts as Workout[];
export const targets = week.targets;
export const profile = week.profile;

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const SLOT_LABEL: Record<string, string> = { breakfast: 'Breakfast', lunch: 'Lunch', snack: 'Snack', dinner: 'Dinner' };
const mealTimes = profile.mealTimes as Record<string, string>;

export function clock(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${ap}`;
}
export const slotTime = (slot: string) => clock(mealTimes[slot] ?? '12:00');

export function dayMeals(i: number) {
  const order = ['breakfast', 'lunch', 'snack', 'dinner'];
  return meals.filter((m) => m.dayIndex === i).sort((a, b) => order.indexOf(a.slot) - order.indexOf(b.slot));
}
export function dayTotals(i: number) {
  return dayMeals(i).reduce((t, m) => ({ kcal: t.kcal + m.kcal, p: t.p + m.proteinG, c: t.c + m.carbsG, f: t.f + m.fatG }), { kcal: 0, p: 0, c: 0, f: 0 });
}
export const dayWorkouts = (i: number) => workouts.filter((w) => w.dayIndex === i);

/** Share of daily calories from each macro, from the targets. */
export const macroSplit = (() => {
  const p = targets.proteinG * 4, c = targets.carbsG * 4, f = targets.fatG * 9, t = p + c + f;
  return { p: Math.round((p / t) * 100), c: Math.round((c / t) * 100), f: Math.round((f / t) * 100) };
})();

const AISLE_LABEL: Record<string, string> = {
  produce: 'Produce', dairy_eggs: 'Dairy and eggs', meat_seafood: 'Meat and seafood', bakery: 'Bakery', pantry_dry: 'Pantry',
  pantry_canned: 'Canned goods', spices_herbs: 'Spices and herbs', oils_vinegars: 'Oils and vinegars', condiments_sauces: 'Condiments and sauces',
  nuts_seeds: 'Nuts and seeds', snacks_sweets: 'Snacks',
};
/** The week's grocery list: one line per ingredient, summed across meals, grouped by aisle. */
export const groceries = (() => {
  const aisles = new Map<string, Map<string, { grams: number; meals: number }>>();
  for (const m of meals)
    for (const ing of m.ingredients) {
      if (ing.shoppable === false) continue;
      const a = aisles.get(ing.aisle) ?? new Map();
      const name = ing.name.charAt(0).toUpperCase() + ing.name.slice(1);
      const e = a.get(name) ?? { grams: 0, meals: 0 };
      e.grams += ing.grams; e.meals += 1; a.set(name, e); aisles.set(ing.aisle, a);
    }
  const list = [...aisles.entries()].map(([key, items]) => ({
    key, label: AISLE_LABEL[key] ?? key,
    items: [...items.entries()].map(([name, v]) => ({ name, ...v })).sort((x, y) => x.name.localeCompare(y.name)),
  }));
  return { aisles: list, itemCount: list.reduce((n, a) => n + a.items.length, 0) };
})();

export const workoutsThisWeek = workouts.filter((w) => w.estimatedMinutes >= 30).length;
