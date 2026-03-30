import {
  Activity,
  ArrowLeft,
  Brain,
  CheckCircle2,
  ChevronRight,
  Handshake,
  MoonStar,
  NotebookPen,
  Quote,
  Wind,
} from "lucide-react";
import { HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";

export const RESOURCES = [
  {
    id: "breathing",
    tag: "Quick Relief",
    title: "Breathing Exercise",
    desc: "4-7-8 technique to calm your nervous system instantly",
    Icon: Wind,
  },
  {
    id: "journaling",
    tag: "Self-Reflection",
    title: "Journaling Prompts",
    desc: "Guided prompts to process emotions and gain clarity",
    Icon: NotebookPen,
  },
  {
    id: "sleep",
    tag: "Sleep",
    title: "Sleep Hygiene",
    desc: "Evidence-based habits for restorative sleep",
    Icon: MoonStar,
  },
  {
    id: "movement",
    tag: "Energy",
    title: "Movement & Mood",
    desc: "How 20 minutes of movement shifts brain chemistry",
    Icon: Activity,
  },
  {
    id: "social",
    tag: "Social",
    title: "Social Connection",
    desc: "Simple ways to build meaningful connections",
    Icon: Handshake,
  },
  {
    id: "reframing",
    tag: "Mindset",
    title: "Cognitive Reframing",
    desc: "CBT techniques to shift unhelpful thought patterns",
    Icon: Brain,
  },
];

function SectionShell({ children }) {
  return (
    <div className="bg-[#0A0A18] px-5 py-12 text-white">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}

function BackToResources() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
    >
      <ArrowLeft size={16} />
      Back to Resources
    </Link>
  );
}

function Hero({ tag, title, description }) {
  return (
    <section className="mb-8 rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
      <span className="inline-flex rounded-full bg-indigo-950/50 px-3 py-1 text-xs font-medium text-indigo-300">
        {tag}
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">{description}</p>
    </section>
  );
}

function ResourceIndexPage() {
  return (
    <SectionShell>
      <section className="mb-10 rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Wellness Resources</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
          Explore practical, evidence-informed tools you can use today to support calm, clarity, and emotional resilience.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {RESOURCES.map(({ id, tag, title, desc, Icon }) => (
          <Link
            key={id}
            to={`/${id}`}
            className="group rounded-xl border border-white/5 bg-[#171730] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400/30"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-indigo-300">
              <Icon size={22} />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-indigo-950/50 px-3 py-1 text-xs font-medium text-indigo-300">
                {tag}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>
            </div>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition group-hover:text-indigo-200">
              Read more
              <ChevronRight size={16} />
            </div>
          </Link>
        ))}
      </section>
    </SectionShell>
  );
}

function BreathingExercisePage() {
  return (
    <SectionShell>
      <BackToResources />
      <Hero
        tag="Quick Relief"
        title="The 4-7-8 Breathing Technique"
        description="This technique acts as a natural tranquilizer for the nervous system, helping to reduce anxiety and induce sleep."
      />

      <section className="rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-white">Steps</h2>
        <ol className="mt-4 space-y-3">
          <li className="rounded-lg border border-white/5 bg-[#171730] p-4 text-slate-300">
            <span className="font-semibold text-white">1.</span> Inhale quietly through your nose for <strong className="text-white">4 seconds</strong>.
          </li>
          <li className="rounded-lg border border-white/5 bg-[#171730] p-4 text-slate-300">
            <span className="font-semibold text-white">2.</span> Hold your breath for <strong className="text-white">7 seconds</strong>.
          </li>
          <li className="rounded-lg border border-white/5 bg-[#171730] p-4 text-slate-300">
            <span className="font-semibold text-white">3.</span> Exhale completely through your mouth, making a whoosh sound, for <strong className="text-white">8 seconds</strong>.
          </li>
        </ol>
        <p className="mt-5 rounded-lg border border-indigo-400/20 bg-indigo-950/30 p-4 text-sm text-indigo-200">
          Repeat this cycle 4 times. Do not rush the counting.
        </p>
      </section>
    </SectionShell>
  );
}

function JournalingPromptsPage() {
  const prompts = [
    "What is taking up the most headspace for me right now, and is it within my control?",
    "List three things, however small, that brought me a moment of peace today.",
    "What is one boundary I need to set this week to protect my energy?",
  ];

  return (
    <SectionShell>
      <BackToResources />
      <Hero
        tag="Self-Reflection"
        title="Guided Self-Reflection"
        description="Taking just 10 minutes to write can help declutter your mind and process complex emotions. Grab a pen and choose one of the following prompts to explore today."
      />

      <section className="grid gap-4">
        {prompts.map((prompt) => (
          <blockquote
            key={prompt}
            className="rounded-xl border border-white/5 bg-[#171730] p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-indigo-300">
              <Quote size={16} />
            </div>
            <p className="text-base leading-7 text-slate-300">“{prompt}”</p>
          </blockquote>
        ))}
      </section>
    </SectionShell>
  );
}

function SleepHygienePage() {
  const tips = [
    {
      label: "Consistency",
      text: "Go to bed and wake up at the exact same time every day, even on weekends.",
    },
    {
      label: "Digital Sunset",
      text: "Turn off all screens at least 60 minutes before bed to prevent blue light from suppressing melatonin.",
    },
    {
      label: "Temperature",
      text: "Keep your bedroom cool, ideally between 15-19°C (60-67°F).",
    },
    {
      label: "Caffeine Curfew",
      text: "Avoid consuming caffeine at least 8 hours before your target bedtime.",
    },
  ];

  return (
    <SectionShell>
      <BackToResources />
      <Hero
        tag="Sleep"
        title="Habits for Restorative Sleep"
        description="Quality sleep is the foundation of mental well-being. Implement these evidence-based practices to align your circadian rhythm."
      />

      <section className="rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
        <ul className="space-y-4">
          {tips.map((tip) => (
            <li key={tip.label} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
              <p className="text-slate-300">
                <strong className="text-white">{tip.label}:</strong> {tip.text}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}

function MovementMoodPage() {
  const actions = [
    "Take a brisk 20-minute walk outside without headphones to practice mindfulness.",
    "Complete a 15-minute gentle stretching or yoga routine to release physical tension.",
    "Dance to three of your favorite high-energy songs.",
  ];

  return (
    <SectionShell>
      <BackToResources />
      <Hero
        tag="Energy"
        title="The Chemistry of Movement"
        description="You don't need a grueling workout to see mental health benefits. Just 20 minutes of moderate movement increases blood circulation to the brain and triggers the release of endorphins, serotonin, and dopamine."
      />

      <section className="rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-white">Actionable Ideas</h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-300">
          {actions.map((item) => (
            <li key={item} className="leading-7">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}

function SocialConnectionPage() {
  const actions = [
    "Send a \"thinking of you\" text to a friend you haven't spoken to in a month.",
    "Schedule a 15-minute voice or video call instead of texting.",
    "Practice active listening: in your next conversation, focus entirely on understanding the other person rather than formulating your reply.",
  ];

  return (
    <SectionShell>
      <BackToResources />
      <Hero
        tag="Social"
        title="Building Meaningful Connections"
        description="Humans are wired for connection. Isolation increases stress hormones, while meaningful social interactions release oxytocin, which promotes feelings of trust and safety."
      />

      <section className="rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-white">Simple Actions</h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-300">
          {actions.map((item) => (
            <li key={item} className="leading-7">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </SectionShell>
  );
}

function CognitiveReframingPage() {
  return (
    <SectionShell>
      <BackToResources />
      <Hero
        tag="Mindset"
        title="Shifting Unhelpful Thoughts"
        description="Cognitive reframing is a core CBT (Cognitive Behavioral Therapy) technique used to identify and dispute irrational or maladaptive thoughts."
      />

      <section className="rounded-xl border border-white/5 bg-[#171730] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-white">The 3-Step Process</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border border-white/5 bg-[#171730] p-4 text-slate-300 leading-7">
            <span className="font-semibold text-white">1. Catch It:</span> Notice when you are experiencing a strong negative emotion and identify the exact thought causing it (e.g., "I'm going to fail this project").
          </li>
          <li className="rounded-lg border border-white/5 bg-[#171730] p-4 text-slate-300 leading-7">
            <span className="font-semibold text-white">2. Check It:</span> Look for evidence. Is this thought a 100% undeniable fact? Are you falling into a "thinking trap" like catastrophizing or all-or-nothing thinking?
          </li>
          <li className="rounded-lg border border-white/5 bg-[#171730] p-4 text-slate-300 leading-7">
            <span className="font-semibold text-white">3. Change It:</span> Replace the thought with a more balanced, realistic perspective (e.g., "This project is challenging, but I have overcome difficult tasks before").
          </li>
        </ol>
      </section>
    </SectionShell>
  );
}

function ResourcesRouter() {
  return (
    <Routes>
      <Route path="/" element={<ResourceIndexPage />} />
      <Route path="/breathing" element={<BreathingExercisePage />} />
      <Route path="/journaling" element={<JournalingPromptsPage />} />
      <Route path="/sleep" element={<SleepHygienePage />} />
      <Route path="/movement" element={<MovementMoodPage />} />
      <Route path="/social" element={<SocialConnectionPage />} />
      <Route path="/reframing" element={<CognitiveReframingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function Resources() {
  return (
    <HashRouter>
      <ResourcesRouter />
    </HashRouter>
  );
}
