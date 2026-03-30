import { T } from "../theme/tokens";

export default function Home({ setScreen }) {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            display: "inline-block",
            background: `${T.accent}22`,
            border: `1px solid ${T.accent}44`,
            borderRadius: 20,
            padding: "6px 18px",
            marginBottom: 22,
            fontSize: 12,
            color: T.a2,
          }}
        >
          Free · Anonymous · Always Here
        </div>
        <h1
          style={{
            fontSize: "clamp(28px,5vw,52px)",
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: 18,
            background: `linear-gradient(135deg,${T.text},${T.a2},#ec4899)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Mental Wellness
          <br />
          Starts Here
        </h1>
        <p style={{ fontSize: 17, color: T.muted, maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.8 }}>
          Check in with yourself. Chat with your AI buddy. Play stress-relief games. Discover real resources.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setScreen("check")}
            style={{
              padding: "13px 30px",
              background: `linear-gradient(135deg,${T.accent},#ec4899)`,
              color: "#fff",
              border: "none",
              borderRadius: 28,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 0 30px ${T.accent}44`,
            }}
          >
            Start Self-Check →
          </button>
          <button
            onClick={() => setScreen("chat")}
            style={{
              padding: "13px 30px",
              background: "transparent",
              color: T.a2,
              border: `1.5px solid ${T.accent}`,
              borderRadius: 28,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Talk to MannSaathi 💬
          </button>
          <button
            onClick={() => setScreen("games")}
            style={{
              padding: "13px 30px",
              background: `${T.teal}22`,
              color: T.teal,
              border: `1.5px solid ${T.teal}55`,
              borderRadius: 28,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Play Games 🎮
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
        {[
          ["🔒", "100% Anonymous", "No account needed. No data stored."],
          ["⚡", "Instant Insights", "Quick self-check tests (depression, anxiety, stress)."],
          ["💬", "Friendly AI Chat", "Talk like texting a real friend."],
          ["🎮", "6 Stress Games", "Playable from chat or games tab."],
        ].map(([ico, t, d]) => (
          <div
            key={t}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 16,
              padding: 22,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{ico}</div>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{t}</div>
            <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
