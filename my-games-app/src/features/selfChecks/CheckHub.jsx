import { useState } from "react";
import { T } from "../../theme/tokens";

const CHECK_TESTS = [
  {
    id: "depression",
    icon: "💜",
    title: "Depression Screen",
    subtitle: "9 questions · past 2 weeks",
    max: 27,
    col: T.pink,
    options: [
      { l: "Not at all", v: 0 },
      { l: "A few days", v: 1 },
      { l: "Many days", v: 2 },
      { l: "Almost every day", v: 3 },
    ],
    questions: [
      { id: "d1", text: "little interest or enjoyment in things you usually like" },
      { id: "d2", text: "feeling down, heavy, or hopeless" },
      { id: "d3", text: "sleep troubles (too little, too much, or not restful)" },
      { id: "d4", text: "low energy or getting tired easily" },
      { id: "d5", text: "appetite changes (eating much less or much more than usual)" },
      { id: "d6", text: "feeling bad about yourself, like you let yourself or others down" },
      { id: "d7", text: "trouble focusing (work, reading, conversations, shows)" },
      { id: "d8", text: "moving/speaking slower than usual — or feeling unusually restless" },
      { id: "d9", text: "thoughts about self-harm, or wishing you weren't here" },
    ],
    band: (s) =>
      s <= 4
        ? {
            label: "Minimal",
            col: T.green,
            emoji: "🌿",
            desc: "things look fairly steady right now. keep doing the basics that support you.",
          }
        : s <= 9
          ? {
              label: "Mild",
              col: T.yellow,
              emoji: "⚡",
              desc: "there may be some low mood showing up. small daily supports can really help.",
            }
          : s <= 14
            ? {
                label: "Moderate",
                col: T.orange,
                emoji: "🟠",
                desc: "it might help to talk to someone you trust and build a simple plan for the next week.",
              }
            : s <= 19
              ? {
                  label: "Moderately Severe",
                  col: T.red,
                  emoji: "🔴",
                  desc: "consider reaching out for professional support. you don't have to carry this alone.",
                }
              : {
                  label: "Severe",
                  col: T.red,
                  emoji: "🆘",
                  desc: "please consider professional help soon. if you're in danger, seek urgent support.",
                },
  },
  {
    id: "anxiety",
    icon: "💙",
    title: "Anxiety Screen",
    subtitle: "7 questions · past 2 weeks",
    max: 21,
    col: T.teal,
    options: [
      { l: "Never", v: 0 },
      { l: "Some days", v: 1 },
      { l: "More days than not", v: 2 },
      { l: "Nearly every day", v: 3 },
    ],
    questions: [
      { id: "a1", text: "feeling nervous, keyed up, or on edge" },
      { id: "a2", text: "struggling to stop worrying once it starts" },
      { id: "a3", text: "worrying about lots of different things" },
      { id: "a4", text: "having a hard time relaxing" },
      { id: "a5", text: "feeling so restless it's hard to sit still" },
      { id: "a6", text: "getting irritated or short-tempered more easily than usual" },
      { id: "a7", text: "feeling afraid something bad might happen" },
    ],
    band: (s) =>
      s <= 4
        ? {
            label: "Minimal",
            col: T.green,
            emoji: "🌿",
            desc: "your anxiety signals look low right now. keep protecting your routines.",
          }
        : s <= 9
          ? {
              label: "Mild",
              col: T.yellow,
              emoji: "⚡",
              desc: "some anxiety is showing up. grounding + breathing practices can help.",
            }
          : s <= 14
            ? {
                label: "Moderate",
                col: T.orange,
                emoji: "🟠",
                desc: "it may help to reduce overload and talk through what's driving the worry.",
              }
            : {
                label: "Severe",
                col: T.red,
                emoji: "🔴",
                desc: "consider professional support. you deserve steady help, not just coping alone.",
              },
  },
  {
    id: "stress",
    icon: "🧡",
    title: "Stress Check",
    subtitle: "10 questions · past month",
    max: 40,
    col: T.yellow,
    options: [
      { l: "Never", v: 0 },
      { l: "Rarely", v: 1 },
      { l: "Sometimes", v: 2 },
      { l: "Often", v: 3 },
      { l: "Very often", v: 4 },
    ],
    questions: [
      { id: "s1", text: "felt overwhelmed by things you needed to do" },
      { id: "s2", text: "felt like you couldn't manage important parts of your life" },
      { id: "s3", text: "felt tense or \"wound up\"" },
      { id: "s4", text: "found yourself upset by something unexpected" },
      { id: "s5", text: "felt you couldn't keep up with everything" },
      { id: "s6", text: "felt frustrated because situations felt out of your control" },
      { id: "s7", text: "felt difficulties piling up faster than you could handle" },
      { id: "s8", text: "had trouble switching off your mind" },
      { id: "s9", text: "felt drained even after rest" },
      { id: "s10", text: "felt pressure building day after day" },
    ],
    band: (s) =>
      s <= 13
        ? {
            label: "Low Stress",
            col: T.green,
            emoji: "🌿",
            desc: "your stress level looks on the lower side overall.",
          }
        : s <= 26
          ? {
              label: "Moderate Stress",
              col: T.yellow,
              emoji: "⚡",
              desc: "stress is present, but manageable with the right habits and support.",
            }
          : {
              label: "High Stress",
              col: T.red,
              emoji: "🔴",
              desc: "your stress looks high. consider support + practical changes to protect your energy.",
            },
  },
];

export default function CheckHub({ setScreen, setCheckScore, setCheckContext }) {
  const resultsKey = "mannsaathi.selfchecks.v1";
  const [activeTestId, setActiveTestId] = useState(null);
  const [results, setResults] = useState(() => {
    try {
      const raw = localStorage.getItem(resultsKey);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });

  const storeResult = (test, score, bandLabel, flags) => {
    const next = {
      ...results,
      [test.id]: { score, max: test.max, label: bandLabel, at: new Date().toISOString(), flags: flags || {} },
    };
    setResults(next);
    try {
      localStorage.setItem(resultsKey, JSON.stringify(next));
    } catch {}
  };

  const activeTest = CHECK_TESTS.find((t) => t.id === activeTestId);
  if (activeTest)
    return (
      <SelfCheckRunner
        test={activeTest}
        setScreen={setScreen}
        onExit={() => setActiveTestId(null)}
        onComplete={({ score, bandLabel, flags }) => {
          setCheckScore(score);
          setCheckContext?.({ testId: activeTest.id, max: activeTest.max, title: activeTest.title });
          storeResult(activeTest, score, bandLabel, flags);
        }}
      />
    );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📋 Choose a Self-Check</h2>
      <p style={{ color: T.muted, marginBottom: 28, fontSize: 14 }}>
        Pick what fits best right now. results are for self-awareness, not diagnosis.
      </p>
      <div style={{ display: "grid", gap: 14 }}>
        {CHECK_TESTS.map((t) => {
          const last = results?.[t.id];
          return (
            <button
              key={t.id}
              onClick={() => setActiveTestId(t.id)}
              style={{
                textAlign: "left",
                padding: "18px 18px",
                background: `${t.col}16`,
                border: `1.5px solid ${t.col}44`,
                borderRadius: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 16,
                  background: `${t.col}22`,
                  border: `1px solid ${t.col}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {t.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4, color: "white" }}>{t.title}</div>
                <div style={{ color: T.muted, fontSize: 12 }}>{t.subtitle}</div>
                {last && (
                  <div style={{ marginTop: 8, fontSize: 12, color: T.muted }}>
                    last: <span style={{ color: T.text, fontWeight: 700 }}>{last.score}/{last.max}</span> · {last.label}
                  </div>
                )}
              </div>
              <div style={{ color: T.muted, fontSize: 14, fontWeight: 700 }}>→</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelfCheckRunner({ test, setScreen, onExit, onComplete }) {
  const [ans, setAns] = useState({});
  const [cur, setCur] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(null);

  const q = test.questions;
  const prog = ((cur + 1) / q.length) * 100;

  const answer = (v) => {
    const id = q[cur].id;
    const next = { ...ans, [id]: v };
    setAns(next);
    if (cur < q.length - 1) {
      setCur(cur + 1);
      return;
    }
    const s = Object.values(next).reduce((a, b) => a + Number(b || 0), 0);
    setScore(s);
    setDone(true);

    const flags = {
      selfHarm: test.id === "depression" && Number(next?.d9 || 0) > 0,
    };
    const band = test.band(s);
    onComplete?.({ score: s, bandLabel: band.label, flags });
  };

  const reset = () => {
    setAns({});
    setCur(0);
    setDone(false);
    setScore(null);
  };

  if (done && score !== null) {
    const band = test.band(score);
    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>{band.emoji}</div>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: band.col, marginBottom: 8 }}>{band.label}</h2>
        <div style={{ fontSize: 50, fontWeight: 900, marginBottom: 8, color: band.col }}>
          {score}
          <span style={{ fontSize: 18, color: T.muted }}>/{test.max}</span>
        </div>
        <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 22px" }}>{band.desc}</p>

        {test.id === "depression" && Number(ans?.d9 || 0) > 0 && (
          <div
            style={{
              background: `${T.red}15`,
              border: `1px solid ${T.red}44`,
              borderRadius: 18,
              padding: 18,
              textAlign: "left",
              margin: "0 auto 18px",
              maxWidth: 560,
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 8 }}>🆘 if you're feeling unsafe right now</div>
            <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.8 }}>
              please reach out to a local helpline or emergency services.
              <div style={{ marginTop: 8 }}>
                <div>
                  <strong style={{ color: T.text }}>iCall (India):</strong> 9152987821
                </div>
                <div>
                  <strong style={{ color: T.text }}>Vandrevala Foundation:</strong> 1860-2662-345
                </div>
                <div>
                  <strong style={{ color: T.text }}>International:</strong> iasp.info/resources/Crisis_Centres
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setScreen("chat")}
            style={{
              padding: "11px 26px",
              background: `linear-gradient(135deg,${T.accent},#ec4899)`,
              color: "#fff",
              border: "none",
              borderRadius: 28,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Talk to MannSaathi 💬
          </button>
          <button
            onClick={() => setScreen("resources")}
            style={{
              padding: "11px 26px",
              background: "transparent",
              color: T.a2,
              border: `1.5px solid ${T.accent}`,
              borderRadius: 28,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Explore Resources
          </button>
          <button
            onClick={reset}
            style={{
              padding: "11px 26px",
              background: "transparent",
              color: T.muted,
              border: `1.5px solid ${T.border}`,
              borderRadius: 28,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Retake
          </button>
          <button
            onClick={onExit}
            style={{
              padding: "11px 26px",
              background: "transparent",
              color: T.muted,
              border: `1.5px solid ${T.border}`,
              borderRadius: 28,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Choose another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 18 }}>
        <button
          onClick={onExit}
          style={{
            padding: "7px 12px",
            background: "transparent",
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            color: T.muted,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          ← back
        </button>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 800 }}>{test.title}</div>
          <div style={{ fontSize: 12, color: T.muted }}>{test.subtitle}</div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: T.muted }}>
          <span>
            Question {cur + 1} of {q.length}
          </span>
          <span>{Math.round(prog)}%</span>
        </div>
        <div style={{ height: 5, background: T.border, borderRadius: 3 }}>
          <div
            style={{
              height: "100%",
              width: `${prog}%`,
              background: `linear-gradient(90deg,${T.accent},#ec4899)`,
              borderRadius: 3,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "32px 24px" }}>
        <div
          style={{
            display: "inline-block",
            background: `${test.col}22`,
            borderRadius: 8,
            padding: "3px 12px",
            fontSize: 11,
            color: test.col,
            marginBottom: 18,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {test.id}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.6, marginBottom: 22, textTransform: "capitalize" }}>{q[cur].text}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {test.options.map((o) => (
            <button
              key={o.v}
              onClick={() => answer(o.v)}
              style={{
                padding: "14px 18px",
                background: "transparent",
                border: `1.5px solid ${T.border}`,
                borderRadius: 12,
                color: T.text,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.accent;
                e.currentTarget.style.background = `${T.accent}11`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {o.l}
              <span style={{ color: T.muted, fontSize: 11, fontWeight: 700 }}>{o.v}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { CHECK_TESTS };
