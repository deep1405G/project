import { T } from "../theme/tokens";
import { GAMES } from "../features/games/catalog";

export default function GamesGrid({ openGame }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🎮 Stress Busters</h2>
      <p style={{ color: T.muted, fontSize: 14, marginBottom: 32 }}>
        Quick games to reset your brain. Click any to play instantly — also accessible from the chat!
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18 }}>
        {GAMES.map((g) => (
          <div
            key={g.id}
            onClick={() => openGame(g.id)}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 18,
              padding: 22,
              cursor: "pointer",
              transition: "all 0.22s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = g.col;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 38, marginBottom: 12 }}>{g.icon}</div>
            <div
              style={{
                display: "inline-block",
                background: `${g.col}22`,
                padding: "3px 10px",
                borderRadius: 8,
                fontSize: 11,
                color: g.col,
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Mini Game
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{g.name}</div>
            <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{g.desc}</div>
            <div style={{ color: g.col, fontSize: 13, fontWeight: 600 }}>Play now →</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 32,
          background: `${T.accent}18`,
          border: `1px solid ${T.accent}44`,
          borderRadius: 18,
          padding: 22,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 36 }}>💬</div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Launch games from Chat too!</div>
          <div style={{ color: T.muted, fontSize: 13 }}>
            Just tap any game button above the chat input — no need to leave the conversation.
          </div>
        </div>
      </div>
    </div>
  );
}
