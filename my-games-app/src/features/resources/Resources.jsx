import { T } from "../../theme/tokens";

export const RESOURCES = [
  { id: "breathing", icon: "🧘", title: "Breathing Exercise", desc: "4-7-8 technique to calm your nervous system instantly", tag: "Quick Relief" },
  { id: "journaling", icon: "📓", title: "Journaling Prompts", desc: "Guided prompts to process emotions and gain clarity", tag: "Self-Reflection" },
  { id: "sleep", icon: "🌙", title: "Sleep Hygiene", desc: "Evidence-based habits for restorative sleep", tag: "Sleep" },
  { id: "movement", icon: "🏃", title: "Movement & Mood", desc: "How 20 minutes of movement shifts brain chemistry", tag: "Energy" },
  { id: "social", icon: "🤝", title: "Social Connection", desc: "Simple ways to build meaningful connections", tag: "Social" },
  { id: "reframing", icon: "🧠", title: "Cognitive Reframing", desc: "CBT techniques to shift unhelpful thought patterns", tag: "Mindset" },
];

export default function Resources() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📚 Wellness Resources</h2>
      <p style={{ color: T.muted, marginBottom: 36, fontSize: 14 }}>Evidence-based tools to support your mental health journey.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18, marginBottom: 40 }}>
        {RESOURCES.map((r) => (
          <div
            key={r.id}
            style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22, transition: "all 0.2s", cursor: "default" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.accent;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 30, marginBottom: 12 }}>{r.icon}</div>
            <div style={{ display: "inline-block", background: `${T.accent}22`, borderRadius: 8, padding: "3px 10px", fontSize: 11, color: T.a2, marginBottom: 10 }}>{r.tag}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{r.title}</div>
            <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.7 }}>{r.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${T.red}15`, border: `1px solid ${T.red}44`, borderRadius: 18, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>🆘</div>
        <h3 style={{ fontWeight: 700, marginBottom: 12 }}>In Crisis? You're Not Alone.</h3>
        <div style={{ color: T.muted, fontSize: 13, lineHeight: 2.2 }}>
          <div>
            <strong style={{ color: T.text }}>MANAS (India):</strong>Call 14416{" "}
          </div>
          <div>
            <strong style={{ color: T.text }}>Vandrevala Foundation Helpline:</strong>1860-2662-345
          </div>
          <div>
            <strong style={{ color: T.text }}>iCall (India):</strong> 9152987821
          </div>
          <div>
            <strong style={{ color: T.text }}>International:</strong> iasp.info/resources/Crisis_Centres
          </div>
        </div>
      </div>
    </div>
  );
}
