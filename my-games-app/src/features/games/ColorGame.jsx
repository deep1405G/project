import { useState } from "react";
import { Modal } from "../../components/Modal";
import { T } from "../../theme/tokens";

const COLORS_D = [
  { n: "Red", h: "#ef4444" },
  { n: "Blue", h: "#3b82f6" },
  { n: "Green", h: "#22c55e" },
  { n: "Yellow", h: "#eab308" },
  { n: "Purple", h: "#a855f7" },
  { n: "Orange", h: "#f97316" },
  { n: "Pink", h: "#ec4899" },
  { n: "Teal", h: "#14b8a6" },
];

export default function ColorGame({ onClose }) {
  const gen = () => {
    const s = [...COLORS_D].sort(() => Math.random() - 0.5);
    return { word: s[0], color: s[1], choices: s.slice(0, 4) };
  };
  const [q, setQ] = useState(gen);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [fb, setFb] = useState(null);
  const ans = (n) => {
    const ok = n === q.color.n;
    setFb(ok ? "✅ Correct!" : "❌ " + q.color.n);
    if (ok) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else setStreak(0);
    setTotal((t) => t + 1);
    setTimeout(() => {
      setFb(null);
      setQ(gen());
    }, 900);
  };
  return (
    <Modal onClose={onClose} title="🎨 Color Clash" subtitle="Name the INK color, not the word!">
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 16, fontSize: 13 }}>
        <span style={{ color: T.green }}>Score: {score}</span>
        <span style={{ color: T.yellow }}>🔥 Streak: {streak}</span>
        <span style={{ color: T.muted }}>Total: {total}</span>
      </div>
      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: q.color.h,
          textAlign: "center",
          padding: "20px 0",
          background: T.card,
          borderRadius: 14,
          marginBottom: 16,
          letterSpacing: 2,
        }}
      >
        {q.word.n}
      </div>
      {fb && (
        <div
          style={{
            textAlign: "center",
            fontWeight: 700,
            marginBottom: 10,
            fontSize: 15,
            color: fb.startsWith("✅") ? T.green : T.red,
          }}
        >
          {fb}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.choices.map((c) => (
          <button
            key={c.n}
            onClick={() => ans(c.n)}
            style={{
              padding: "12px",
              background: T.card,
              border: `2px solid ${T.border}`,
              borderRadius: 12,
              color: T.text,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = c.h)}
            onMouseLeave={(e) => (e.target.style.borderColor = T.border)}
          >
            {c.n}
          </button>
        ))}
      </div>
    </Modal>
  );
}
