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
    a: "No. ZivaAI plans your meals in advance, with calories, protein, carbs and fat already worked out for every meal. It doesn't log food from photos or barcodes.",
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
    a: "Your answers, plan, chats and reminders are stored on your device, not on ZivaAI's servers. To write or change your plan, the app sends what's needed through ZivaAI's server to OpenAI after you agree, and the server discards it once it has replied. Sign in with Apple gives ZivaAI no name or email.",
  },
  {
    q: 'Who is ZivaAI for?',
    a: `Adults, ${site.minAge} and over, who want their week of meals and training planned for them. ZivaAI gives general wellness guidance, not medical advice.`,
  },
  {
    q: 'How do I cancel?',
    a: 'Apple bills the subscription, so you cancel with Apple: on your iPhone, open Settings, tap your name, then Subscriptions, then ZivaAI. Cancel at least 24 hours before the period ends to avoid the next charge.',
  },
];

export const homeFaq = faq.filter((x) =>
  ['What is ZivaAI?', 'How much does ZivaAI cost?', 'Does ZivaAI count calories from photos?', 'Can I work out at home with no equipment?', 'Is ZivaAI on Android?'].includes(x.q),
);
