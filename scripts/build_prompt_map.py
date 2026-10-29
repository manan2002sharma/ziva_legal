"""Builds data/prompt-map.csv: the prompts a ZivaAI buyer might ask an AI assistant or Google.

Every option comes from the app itself (OnboardingVocabulary.swift and the exercise catalog), so each
prompt maps to something ZivaAI really plans. Run from the website folder:

    python3 scripts/build_prompt_map.py [path/to/exercises.json]

Columns: prompt, cluster, intent_weight (3 category/vs, 2 plan, 1 info, branded tracked regardless),
target_page (the page type that should answer it), head_term (what to look up for Google volume),
google_volume and score are left empty for the volume pass.
"""
import csv, itertools, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'data', 'prompt-map.csv')
CATALOG = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', '..', 'ZivaIosApp', 'Resources', 'ExerciseCatalog', 'exercises.json')

rows, seen = [], set()
def add(prompt, cluster, weight, page, head):
    p = ' '.join(prompt.split()).strip()
    if p.lower() in seen: return
    seen.add(p.lower()); rows.append([p, cluster, weight, page, head, '', ''])

# ---------- 1. Category: "best app" prompts ----------
nouns = ['AI meal planner app', 'AI workout planner app', 'app that plans meals and workouts', 'meal and workout planner app',
         'AI personal trainer app', 'AI diet coach app', 'AI nutrition coach app', 'meal plan app with a grocery list',
         'weekly meal planner app', 'fitness app with meal plans', 'AI fitness coach app', 'workout app with a meal plan',
         'macro meal planner app', 'high protein meal planner app', 'AI meal prep app']
cat_t = ['best {n}', 'best {n} 2026', 'best {n} for iPhone', 'best {n} for beginners', 'best free {n}', 'what is the best {n}',
         'best {n} for weight loss', 'best {n} to build muscle', 'which {n} is worth paying for', '{n} recommendations']
for n in nouns:
    for t in cat_t: add(t.format(n=n), 'category', 3, 'comparison', n.lower().replace(' a ', ' '))

# ---------- 2. Alternatives and vs ----------
comps = ['Fitbod', 'MacroFactor', 'Eat This Much', 'Noom', 'Mealime', 'MyFitnessPal', 'Cal AI', 'Lose It', 'Future', 'Planfit',
         'Fitia', 'Jefit', 'Freeletics', 'PlateJoy', 'Hevy', 'Ladder', 'Samsung Food', 'Whisk', 'FoodiePrep', 'JuggernautAI']
alt_t = ['{c} alternative', 'best {c} alternative', 'apps like {c}', 'cheaper alternative to {c}', '{c} vs ZivaAI',
         'is {c} worth it in 2026', '{c} alternative that also plans workouts and meals', 'free {c} alternative']
for c in comps:
    for t in alt_t: add(t.format(c=c), 'alternatives', 3, 'alternatives', f'{c.lower()} alternative')
top = ['Fitbod', 'MacroFactor', 'Eat This Much', 'Noom', 'Mealime', 'MyFitnessPal', 'Cal AI', 'Planfit']
for a, b in itertools.combinations(top, 2): add(f'{a} vs {b}', 'alternatives', 3, 'vs', f'{a.lower()} vs {b.lower()}')

# ---------- 3. Plans: meals, workouts, both ----------
diets = ['', 'vegetarian', 'vegan', 'pescatarian', 'halal', 'kosher', 'gluten-free', 'dairy-free']
goals = [('for weight loss', 'weight loss'), ('to build muscle', 'muscle gain'), ('to maintain weight', 'maintenance')]
cuisines = ['Mediterranean', 'Mexican', 'Japanese', 'Indian', 'Italian', 'American', 'Chinese', 'Thai', 'Middle Eastern', 'Korean', 'French', 'Latin American']
kcals = [1500, 1800, 2000, 2200, 2500, 3000]  # nothing under 1,500 kcal: matches the app's floor
audiences = ['women', 'men', 'beginners', 'busy professionals', 'college students', 'families']
obstacles = ['people with no time to cook', 'people who get bored of meals', 'people who eat out a lot', 'evening snackers', 'people on a tight grocery budget']
for d in diets:
    dd = (d + ' ').lstrip()
    for g, gk in goals:
        add(f'7-day {dd}meal plan {g}', 'plans', 2, 'meal-plan', f'{dd}meal plan {gk}')
        add(f'{dd}meal plan {g} with grocery list', 'plans', 2, 'meal-plan', f'{dd}meal plan {gk}')
        add(f'high protein {dd}meal plan {g}', 'plans', 2, 'meal-plan', f'high protein {dd}meal plan')
        add(f'{dd}meal prep plan for the week {g}', 'plans', 2, 'meal-plan', f'{dd}meal prep plan')
        add(f'cheap {dd}meal plan {g}', 'plans', 2, 'meal-plan', f'cheap {dd}meal plan')
        for meal in ['breakfast', 'lunch', 'dinner']:
            add(f'{dd}{meal} ideas {g}', 'plans', 2, 'meal-plan', f'{dd}{meal} ideas')
    for k in kcals: add(f'{k:,} calorie {dd}meal plan', 'plans', 2, 'meal-plan', f'{k} calorie {dd}meal plan')
    for a in audiences: add(f'{dd}meal plan for {a}', 'plans', 2, 'meal-plan', f'{dd}meal plan for {a}')
    for n in [3, 5, 7, 14, 30]: add(f'{n}-day {dd}meal plan', 'plans', 2, 'meal-plan', f'{n} day {dd}meal plan')
for k in kcals: add(f'{k:,} calorie high protein meal plan', 'plans', 2, 'meal-plan', f'{k} calorie high protein meal plan')
for c in cuisines:
    for g, gk in goals: add(f'{c} meal plan {g}', 'plans', 2, 'meal-plan', f'{c.lower()} meal plan')
    add(f'healthy {c} meal prep ideas', 'plans', 2, 'meal-plan', f'{c.lower()} meal prep')
for o in obstacles:
    for g, gk in goals: add(f'meal plan {g} for {o}', 'plans', 2, 'meal-plan', f'meal plan {gk}')

equip = [('full gym', 'gym'), ('dumbbell-only', 'dumbbell'), ('no-equipment home', 'home'), ('kettlebell', 'kettlebell')]
wgoals = [('lose fat', 'fat loss'), ('build muscle', 'muscle building'), ('get stronger', 'strength')]
levels = ['beginners', 'intermediate lifters', 'advanced lifters']
for (e, ek), days, (g, gk), lv in itertools.product(equip, [3, 4, 5], wgoals, levels):
    add(f'{days}-day {e} workout plan for {lv} to {g}', 'plans', 2, 'workout-plan', f'{days} day {ek} workout plan')
for (e, ek), mins, (g, gk) in itertools.product(equip, [20, 30, 45, 60], wgoals):
    add(f'{mins}-minute {e} workout to {g}', 'plans', 2, 'workout-plan', f'{mins} minute {ek} workout')
for inj, (e, ek) in itertools.product(['a bad knee', 'shoulder pain', 'lower back pain'], equip):
    for g, gk in wgoals: add(f'{e} workout plan with {inj} to {g}', 'plans', 2, 'workout-plan', f'workout with {inj.replace("a ", "")}')
for split, (e, ek) in itertools.product(['push pull legs', 'upper lower', 'full body', 'bro split'], equip):
    add(f'{split} {e} workout plan', 'plans', 2, 'workout-plan', f'{split} workout plan')
for a, (e, ek) in itertools.product(['women', 'men', 'beginners', 'people over 40', 'people over 50', 'busy people', 'college students'], equip):
    add(f'{e} workout plan for {a}', 'plans', 2, 'workout-plan', f'workout plan for {a}')
for style in ['HIIT', 'calisthenics', 'mobility', 'core', 'stretching', 'cardio', 'strength']:
    for lv in ['beginners', 'intermediate']: add(f'weekly {style} plan for {lv}', 'plans', 2, 'workout-plan', f'{style.lower()} workout plan')
for g, gk in goals + [('to tone up', 'toning'), ('to get fit after a break', 'getting back in shape')]:
    for a in ['', 'women ', 'men ', 'beginners ']:
        add(f'meal and workout plan {g}' + (f' for {a.strip()}' if a else ''), 'plans', 2, 'meal-plan', f'meal and workout plan {gk}')
        add(f'4-week diet and exercise plan {g}' + (f' for {a.strip()}' if a else ''), 'plans', 2, 'meal-plan', f'diet and exercise plan {gk}')


for d in diets[1:]:
    for c in cuisines: add(f'{d} {c} meal plan', 'plans', 2, 'meal-plan', f'{d} {c.lower()} meal plan')
    for a in audiences:
        for g, gk in goals[:2]: add(f'{d} meal plan for {a} {g}', 'plans', 2, 'meal-plan', f'{d} meal plan {gk}')
for (e, ek), a in itertools.product(equip, ['women', 'men', 'beginners', 'people over 40', 'people over 50', 'busy people', 'college students']):
    for g, gk in wgoals: add(f'{e} workout plan for {a} to {g}', 'plans', 2, 'workout-plan', f'{ek} workout plan {gk}')
for days, (g, gk) in itertools.product([3, 4, 5], wgoals): add(f'best {days}-day workout split to {g}', 'plans', 2, 'workout-plan', f'{days} day workout split')
for days, (e, ek) in itertools.product([3, 4, 5], equip): add(f'{days} days a week {e} routine', 'plans', 2, 'workout-plan', f'{days} day {ek} routine')
for skill in ['beginner cooks', 'people who hate cooking', 'confident home cooks']:
    for g, gk in goals: add(f'easy meal plan {g} for {skill}', 'plans', 2, 'meal-plan', f'easy meal plan {gk}')

# ---------- 4. How-to and info ----------
with open(CATALOG) as f: ex = json.load(f)['exercises']
pick = [e for e in ex if e['category'] == 'strength' and e['difficulty'] in ('beginner', 'intermediate') and e['mechanic'] == 'compound']
pick = sorted(pick, key=lambda e: len(e['name_en']))[:230]
for e in pick:
    n = e['name_en']
    add(f'{n} alternatives', 'info', 1, 'exercise-alternatives', f'{n.lower()} alternative')
    if not e.get('is_bodyweight'): add(f'{n} alternative at home', 'info', 1, 'exercise-alternatives', f'{n.lower()} alternative at home')
for lb in range(120, 260, 10):
    add(f'how much protein should a {lb} lb person eat to build muscle', 'info', 1, 'tool-protein', 'how much protein to build muscle')
    add(f'how many calories should I eat to lose weight at {lb} lb', 'info', 1, 'tool-macro', 'how many calories to lose weight')
info = ['how much protein do I need a day', 'how much protein per meal to build muscle', 'how to calculate macros for weight loss',
        'how to calculate macros to build muscle', 'what are macros', 'how to make a weekly meal plan', 'how to meal prep for the week',
        'how to make a grocery list for the week', 'how to eat high protein on a budget', 'high protein vegetarian foods',
        'high protein vegan foods', 'how to eat halal and build muscle', 'how many days a week should I work out', 'how long should a workout be',
        'is 30 minutes of exercise a day enough', 'how to start working out at the gym', 'how to work out at home with no equipment',
        'how to lose fat and build muscle at the same time', 'what is a calorie deficit', 'how many calories in a calorie deficit',
        'TDEE calculator', 'BMR calculator', 'macro calculator', 'protein calculator', 'calorie calculator for weight loss',
        'what is progressive overload', 'how to warm up before lifting', 'how many sets and reps to build muscle', 'rest days per week',
        'how to stay consistent with working out', 'how to stop snacking at night', 'what to eat before a workout', 'what to eat after a workout',
        'healthy meals when eating out', 'can AI make a meal plan', 'can ChatGPT make a meal plan', 'can ChatGPT make a workout plan',
        'is an AI personal trainer worth it', 'AI meal plan generator', 'AI workout plan generator', 'free AI meal plan', 'free AI workout plan']
for q in info: add(q, 'info', 1, 'blog-or-tool', q)


for e in pick:
    if e['body_part'] in ('upper_legs', 'lower_legs') and len(e['name_en']) < 26:
        add(f"{e['name_en']} alternative for bad knees", 'info', 1, 'exercise-alternatives', f"{e['name_en'].lower()} alternative bad knees")
    if e['body_part'] in ('shoulders', 'chest') and len(e['name_en']) < 26:
        add(f"{e['name_en']} alternative for shoulder pain", 'info', 1, 'exercise-alternatives', f"{e['name_en'].lower()} alternative shoulder pain")
for lb in range(120, 260, 10):
    add(f'how many calories should a {lb} lb woman eat to lose weight', 'info', 1, 'tool-macro', 'calories to lose weight woman')
    add(f'how many calories should a {lb} lb man eat to build muscle', 'info', 1, 'tool-macro', 'calories to build muscle man')
    add(f'how much protein does a {lb} lb woman need', 'info', 1, 'tool-protein', 'protein for women')
more_info = ['how to plan meals for the week on a budget', 'how to eat healthy when busy', 'how to meal prep for weight loss', 'how to meal prep for muscle gain',
    'what to eat to build muscle', 'what to eat to lose belly fat', 'is a high protein diet safe', 'how much water should I drink a day',
    'how many grams of carbs a day to lose weight', 'how much fat should I eat a day', 'what is a good macro split for fat loss',
    'what is a good macro split for muscle gain', 'how to count macros without an app', 'how to build a balanced plate',
    'how to get enough protein as a vegetarian', 'how to get enough protein as a vegan', 'halal high protein meals', 'kosher high protein meals',
    'gluten-free high protein meals', 'dairy-free high protein meals', 'how to start strength training as a woman', 'how to start strength training after 40',
    'how to build muscle at home', 'can you build muscle with dumbbells only', 'full body vs split workout', 'how long to see results from working out',
    'how to work out with a bad knee', 'exercises to avoid with lower back pain', 'how to lose weight without counting calories',
    'how to get back into working out', 'how to plan workouts for the week', 'how to change a workout plan that is not working',
    'what is a deload week', 'how to track progress at the gym', 'how to make meal prep less boring', 'quick high protein dinners',
    'high protein breakfast ideas', 'high protein snacks', 'grocery list for building muscle', 'grocery list for weight loss']
for q in more_info: add(q, 'info', 1, 'blog-or-tool', q)

# ---------- 5. Branded ----------
branded = ['what is ZivaAI', 'ZivaAI app', 'ZivaAI review', 'is ZivaAI worth it', 'is ZivaAI legit', 'ZivaAI price', 'how much does ZivaAI cost',
           'ZivaAI free trial', 'ZivaAI on Android', 'ZivaAI meal planner', 'ZivaAI workout planner', 'ZivaAI cancel subscription',
           'ZivaAI vs Fitbod', 'ZivaAI vs MacroFactor', 'ZivaAI vs Eat This Much', 'ZivaAI vs Noom', 'ZivaAI vs MyFitnessPal',
           'ZivaAI vs Cal AI', 'ZivaAI vs Mealime', 'ZivaAI vs ChatGPT for meal plans', 'does ZivaAI work for vegetarians',
           'does ZivaAI do halal meal plans', 'can ZivaAI plan home workouts', 'does ZivaAI count calories', 'is ZivaAI safe',
           'ZivaAI privacy', 'who makes ZivaAI', 'ZivaAI reddit', 'ZivaAI app review 2026', 'ZivaAI coach', 'ZivaAI grocery list',
           'ZivaAI pros and cons', 'ZivaAI customer support', 'ZivaAI subscription', 'ZivaAI for weight loss', 'ZivaAI for muscle gain',
           'ZivaAI for beginners', 'ZivaAI for women', 'ZivaAI kosher', 'ZivaAI vegan', 'ZivaAI gluten-free', 'ZivaAI iPad', 'ZivaAI Apple Watch',
           'ZivaAI yearly plan', 'ZivaAI refund', 'ZivaAI delete account', 'ZivaAI how it works', 'ZivaAI chat coach', 'ZivaAI vs Planfit', 'ZivaAI vs Fitia']
for q in branded: add(q, 'branded', 3, 'home-pricing-faq', 'zivaai')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['prompt', 'cluster', 'intent_weight', 'target_page', 'head_term', 'google_volume', 'score']); w.writerows(rows)
from collections import Counter
print(len(rows), 'prompts', dict(Counter(r[1] for r in rows)))
