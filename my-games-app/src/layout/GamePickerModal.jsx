import { T } from "../theme/tokens";
import { GAMES } from "../features/games/catalog";

export default function GamePickerModal({ open, onClose, onPick }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 20,
      }}
    >
      <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 22, padding: 28, maxWidth: 520, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontWeight: 800, margin: 0 }}>🎮 Pick a Game</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.muted, fontSize: 22, cursor: "pointer" }}>
            ✕
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => onPick(g.id)}
              style={{
                padding: "14px 16px",
                background: T.card,
                border: `1.5px solid ${T.border}`,
                borderRadius: 14,
                color: T.text,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = g.col)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
            >
              <span style={{ fontSize: 26 }}>{g.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{g.name}</div>
                <div style={{ color: T.muted, fontSize: 11 }}>{g.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
