import { site, money, yearlyPerMonth } from './site';

export type QA = { q: string; a: string };

const priceAnswer = () => {
  return `ZivaAI Pro costs ${money(site.price.monthly)} a month, or ${money(site.price.yearly)} a year, which works out to ${money(yearlyPerMonth())} a month. Apple bills the subscription, and you can cancel any time in Settings on your iPhone.`;
};

const trialAnswer = () =>
  site.price.freeTrialDays > 0
    ? `Yes. New subscribers get ${site.price.freeTrialDays} days free, and Apple reminds you before the first charge.`
    : 'No. The setup questions are free, but building your plan needs a ZivaAI Pro subscription.';

export const faq: QA[] = [
  { q: 'What is ZivaAI?', a: `${site.definition} It runs on ${site.platforms} with ${site.minOS}.` },
  { q: 'How much does ZivaAI cost?', a: priceAnswer() },
  { q: 'Is there a free trial?', a: trialAnswer() },
  {
    q: 'Does ZivaAI count calories from photos?',
    a: "Yes. Take a photo of a meal or describe it in a sentence, and ZivaAI estimates its calories, protein, carbs and fat. Planned meals already have them worked out, so you can just tick one as eaten.",
  },
  {
    q: 'Can I log my workouts in ZivaAI?',
    a: "Yes. Start a planned workout and log one set at a time, a whole exercise, or the whole workout at once. Each exercise shows what you lifted last time, the summary shows your new personal bests, and you can log sets from the Lock Screen and Dynamic Island without opening the app. There's no rest timer or running clock.",
  },
  {
    q: 'Can I log with Siri?',
    a: 'Yes. Say "Log my breakfast in Ziva" to tick a planned meal, "Log food in Ziva" to describe something else, or "Log my set in Ziva" during a workout. The Action Button and a Lock Screen control open food logging too.',
  },
  {
    q: 'Does Ziva change my plan from what I log?',
    a: "Not yet. Your log is kept beside the plan, with a calendar and graphs of your eating and training, but Ziva, the coach, can't see it. To change the plan, ask Ziva in the chat.",
  },
  {
    q: 'Can ZivaAI plan vegetarian, vegan, halal or kosher meals?',
    a: 'Yes. ZivaAI plans vegetarian, vegan, pescatarian, halal, kosher, gluten-free and dairy-free weeks, leaves out your allergies and the foods you avoid, and cooks across 12 cuisines, from Mediterranean and Indian to Mexican, Japanese and Korean.',
  },
  {
    q: 'Can I work out at home with no equipment?',
    a: 'Yes. Tell ZivaAI what you have, whether that is a full gym, a few dumbbells or nothing at all, and it builds 20 to 60 minute sessions around it. Every exercise has pictures and step-by-step instructions.',
  },
  {
    q: 'Can ZivaAI work around an injury?',
    a: "It plans around a sore knee, shoulder or back by choosing exercises that don't load it. It isn't medical advice: for an injury or a health condition, check with a doctor first.",
  },
  {
    q: 'How do I change my plan?',
    a: 'Ask Ziva in the chat, by typing or by voice: swap a meal, make dinner quicker, move a workout or add a rest day. You see each change before it happens, and you can undo it.',
  },
  { q: 'Is ZivaAI on Android?', a: `No. ZivaAI is available for ${site.platforms} with ${site.minOS}.` },
  {
    q: 'Where is my data stored?',
    a: "Your answers, plan, chats, reminders, logs and photos are stored on your device, not on ZivaAI's servers. To write or change your plan and estimate the food you log, the app sends what's needed through ZivaAI's server to OpenAI after you agree, and the server discards it once it has replied. Sign in with Apple gives ZivaAI no name or email.",
  },
  {
    q: 'Who is ZivaAI for?',
    a: `Adults, ${site.minAge} and over, who want their week of meals and training planned for them, and an easy way to log what they actually eat and lift. ZivaAI gives general wellness guidance, not medical advice.`,
  },
  {
    q: 'How do I cancel?',
    a: 'Apple bills the subscription, so you cancel with Apple: on your iPhone, open Settings, tap your name, then Subscriptions, then ZivaAI. Cancel at least 24 hours before the period ends to avoid the next charge.',
  },
];

export const homeFaq = faq.filter((x) =>
  ['What is ZivaAI?', 'How much does ZivaAI cost?', 'Does ZivaAI count calories from photos?', 'Can I log my workouts in ZivaAI?', 'Can I work out at home with no equipment?', 'Is ZivaAI on Android?'].includes(x.q),
);
