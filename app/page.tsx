import Link from 'next/link';
import { site, money, yearlyPerMonth } from '@/lib/site';
import { homeFaq } from '@/lib/faq';
import { appSchema } from '@/lib/schema';
import { targets } from '@/lib/week';
import { AppStoreButton } from '@/components/AppStoreButton';
import { WeekStrip } from '@/components/WeekStrip';
import { FaqList } from '@/components/FaqList';
import { JsonLd } from '@/components/JsonLd';
import { FeatureTabs } from '@/components/FeatureTabs';
import { Icon } from '@/components/Icon';
import { Phone } from '@/components/Phone';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { ChatScreen } from '@/components/screens/ChatScreen';
import { MealsScreen } from '@/components/screens/MealsScreen';
import { WorkoutScreen } from '@/components/screens/WorkoutScreen';
import { GroceryScreen } from '@/components/screens/GroceryScreen';
import { LogFoodScreen } from '@/components/screens/LogFoodScreen';
import { SessionScreen } from '@/components/screens/SessionScreen';
import { PhotosScreen } from '@/components/screens/PhotosScreen';

const diets = ['Vegetarian', 'Vegan', 'Pescatarian', 'Halal', 'Kosher', 'Gluten-free', 'Dairy-free'];
const cuisines = ['Mediterranean', 'Mexican', 'Japanese', 'Indian', 'Italian', 'American', 'Chinese', 'Thai', 'Middle Eastern', 'Korean', 'French', 'Latin American'];
const training = ['Full gym', 'A few dumbbells', 'No equipment', '20 min', '30 min', '45 min', '60 min', 'Strength', 'HIIT', 'Mobility', 'Calisthenics'];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="pill"><img src="/images/ziva.png" alt="" width={18} height={20} />AI meal and workout planner for iPhone</p>
            <h1>
              Meet ZivaAI
              <span>Meals, workouts and groceries, planned for your week</span>
            </h1>
            <p className="hero__lede">
              Tell Ziva your goal, the food you like and the equipment you have. In about a minute you get a week of meals and workouts
              and one grocery list. Snap a meal to count its calories, log every set, and change anything by asking.
            </p>
            <div className="hero__actions">
              <AppStoreButton campaign="web-home-hero" size="l" />
              <p className="hero__note">For iPhone and iPad with iOS 18 or later</p>
            </div>
          </div>
          <div className="hero__art" aria-label="ZivaAI app screens">
            <Phone label="Asking Ziva to swap a dinner, with the change shown before it is applied" scale={0.68} className="hero__phone hero__phone--b"><ChatScreen /></Phone>
            <Phone label="ZivaAI home screen with today's meals and workout" scale={0.68} className="hero__phone hero__phone--a"><HomeScreen /></Phone>
            <div className="hero__tag hero__tag--kcal" aria-hidden="true"><Icon name="flame" size={16} /><b>{targets.kcal.toLocaleString('en-US')} kcal</b><span>daily target</span></div>
            <div className="hero__mascot" aria-hidden="true">
              <span className="hero__bubble">Hi, I&rsquo;m Ziva!</span>
              <img src="/images/ziva.png" alt="" width={99} height={110} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--warm" id="features">
        <div className="wrap">
          <div className="section__head">
            <h2>What ZivaAI plans for you</h2>
            <p>One set of answers drives your meals, your training and your shopping, so they always fit together.</p>
          </div>
          <FeatureTabs
            features={[
              {
                key: 'meals', title: 'Meals that fit your goal',
                text: 'Breakfast, lunch, dinner and snacks with calories, protein, carbs and fat worked out for every meal. Vegetarian, vegan, halal, kosher and more, across 12 cuisines.',
                screen: <Phone label="ZivaAI meal screen for Thursday" scale={0.74}><MealsScreen /></Phone>,
              },
              {
                key: 'workouts', title: 'Workouts for the gym or home',
                text: 'Sessions of 20 to 60 minutes on the days you choose, built for a full gym, a few dumbbells or no equipment, and planned around a sore knee, shoulder or back.',
                screen: <Phone label="ZivaAI workout screen for Wednesday" scale={0.74}><WorkoutScreen /></Phone>,
              },
              {
                key: 'coach', title: 'A coach you can just ask',
                text: 'Ask Ziva to swap a meal, make dinner quicker or move a workout, by typing or by voice. You see every change before it happens, and you can undo it.',
                screen: <Phone label="Chatting with Ziva" scale={0.74}><ChatScreen /></Phone>,
              },
              {
                key: 'groceries', title: 'One shop for the whole week',
                text: 'Every ingredient from your meals, added up into one list sorted by aisle. Tick items off in the store or share the list.',
                screen: <Phone label="ZivaAI weekly grocery list" scale={0.74}><GroceryScreen /></Phone>,
              },
            ]}
          />
        </div>
      </section>

      <section className="section" id="logging">
        <div className="wrap">
          <div className="section__head">
            <h2>Then log what you actually eat and lift</h2>
            <p>The plan is what Ziva suggests. The log is what happened, kept by day right beside it.</p>
          </div>
          <FeatureTabs
            features={[
              {
                key: 'food', title: 'Snap a meal, get the calories',
                text: 'Take a photo of your plate or describe it in a sentence, and Ziva estimates its calories, protein, carbs and fat, and says what it assumed. A planned meal is one tap: its numbers are already worked out.',
                screen: <Phone label="Ziva's calorie estimate for a photo of a chicken burrito bowl" scale={0.74} dark><LogFoodScreen /></Phone>,
              },
              {
                key: 'sets', title: 'Log every set, beat your best',
                text: "Tick sets as you go, with last session's numbers beside each exercise and your personal bests saved. Your workout shows on the Lock Screen and Dynamic Island, and Siri can log a set or a meal in one sentence.",
                screen: <Phone label="A ZivaAI workout in progress, logging sets of push-ups" scale={0.74}><SessionScreen /></Phone>,
              },
              {
                key: 'progress', title: 'A photo a day, side by side',
                text: 'Take a daily progress photo with a ghost of the last one to line it up, then compare two days or play them as a timelapse. A month calendar and graphs show your eating and training. Progress photos never leave your phone.',
                screen: <Phone label="ZivaAI progress photos, newest first" scale={0.74}><PhotosScreen /></Phone>,
              },
            ]}
          />
        </div>
      </section>

      <section className="section section--warm">
        <div className="wrap">
          <div className="section__head">
            <h2>A real week from ZivaAI</h2>
            <p>The app&rsquo;s sample plan: a weight-loss goal of {targets.kcal.toLocaleString('en-US')} kcal a day, four workouts with free weights and cables, and a sore knee.</p>
          </div>
          <WeekStrip />
        </div>
      </section>

      <section className="section section--mint">
        <div className="wrap">
          <div className="section__head">
            <h2>Why people choose ZivaAI</h2>
            <p>A planner first: it decides the week for you, then changes it when life does.</p>
          </div>
          <div className="cards3">
            <div className="card">
              <span className="card__icon"><Icon name="layers" /></span>
              <h3>Plan and log in one app</h3>
              <p>Meals, workouts and groceries come from the same answers, so the shopping list matches the menu, and what you eat and lift is logged right beside the plan.</p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="chat" /></span>
              <h3>Change anything by asking</h3>
              <p>Swap a meal, move a session or add a rest day in a sentence. Ziva shows the change first and updates the groceries and reminders with it.</p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="lock" /></span>
              <h3>Your plan stays on your phone</h3>
              <p>Sign in with Apple, with no email or password. Your plan, chats, logs and photos are stored on your device, and Ziva asks before anything is sent to OpenAI. Progress photos never leave it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap dark__grid">
          <div>
            <h2>Planned around how you eat and train</h2>
            <p className="dark__lede">Pick what fits your life. ZivaAI leaves out your allergies and the foods you avoid, and matches recipes to your cooking skill and grocery budget.</p>
            <h3>Diets</h3>
            <ul className="chips">{diets.map((d) => <li key={d}>{d}</li>)}</ul>
            <h3>Cuisines</h3>
            <ul className="chips">{cuisines.map((d) => <li key={d}>{d}</li>)}</ul>
            <h3>Training</h3>
            <ul className="chips">{training.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="dark__art">
            <Phone label="ZivaAI home screen in dark mode" scale={0.7} dark><HomeScreen /></Phone>
          </div>
        </div>
      </section>

      <section className="section section--mint">
        <div className="wrap narrow">
          <div className="section__head">
            <h2>Frequently asked questions</h2>
            <p>Short answers about what ZivaAI does and what it costs.</p>
          </div>
          <FaqList items={homeFaq} />
          <p className="center"><Link className="btn-ghost" href="/faq">See all questions</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta">
            <img src="/images/ziva.png" alt="" width={99} height={110} className="cta__mascot" />
            <h2>Plan next week tonight</h2>
            <p>ZivaAI Pro is {money(site.price.yearly)} a year ({money(yearlyPerMonth())} a month) or {money(site.price.monthly)} monthly, billed by Apple. Cancel any time.</p>
            <AppStoreButton campaign="web-home-footer" size="l" />
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          appSchema(),
          { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, publisher: { '@id': `${site.url}/#organization` } },
        ]}
      />
    </>
  );
}
