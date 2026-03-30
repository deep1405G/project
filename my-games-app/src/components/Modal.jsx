import { T } from "../theme/tokens";

export function Modal({ children, onClose, title, subtitle, onReset }) {
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
        padding: 16,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: T.panel,
          border: `1px solid ${T.border}`,
          borderRadius: 22,
          padding: 24,
          width: "100%",
          maxWidth: 500,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ color: T.text, fontWeight: 800, margin: 0, fontSize: 18 }}>{title}</h2>
            {subtitle && (
              <p style={{ color: T.muted, fontSize: 12, margin: "3px 0 0" }}>{subtitle}</p>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {onReset && (
              <button
                onClick={onReset}
                style={{
                  padding: "6px 14px",
                  background: T.accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                ↺ Reset
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                padding: "6px 12px",
                background: T.card,
                color: T.muted,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Win({ msg, bad, onReset }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px 0 14px",
        marginBottom: 14,
        background: bad ? `${T.red}22` : `${T.green}22`,
        borderRadius: 12,
        color: bad ? T.red : T.green,
        fontWeight: 700,
        fontSize: 15,
      }}
    >
      {bad ? "😅" : "🎉"} {msg}{" "}
      {onReset && (
        <button
          onClick={onReset}
          style={{
            marginLeft: 10,
            padding: "4px 12px",
            background: "transparent",
            border: `1px solid currentColor`,
            borderRadius: 10,
            color: "inherit",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}
