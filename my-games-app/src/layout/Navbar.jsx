import { T } from "../theme/tokens";

export default function Navbar({ screen, setScreen, user, onSignOut }) {
  return (
    <div style={{ background: T.panel, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          maxWidth: 1100,
          margin: "0 auto",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: `linear-gradient(135deg,${T.accent},#ec4899)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            🧠
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, color: T.text }}>MannSaathi</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {[
            ["home", "🏠", "Home"],
            ["check", "📋", "Check"],
            ["chat", "💬", "Chat"],
            ["games", "🎮", "Games"],
            ["experts", "🩺", "Experts"],
            ["resources", "📚", "Resources"],
          ].map(([s, ico, lbl]) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              style={{
                padding: "7px 14px",
                borderRadius: 18,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: screen === s ? T.accent : "transparent",
                color: screen === s ? "#fff" : T.muted,
                transition: "all 0.2s",
              }}
            >
              {ico} {lbl}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: "6px 12px",
            }}
          >
            <span style={{ fontSize: 16 }}>{user.avatar}</span>
            <span style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{user.name}</span>
          </div>
          <button
            onClick={onSignOut}
            style={{
              padding: "7px 12px",
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 16,
              color: T.muted,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
