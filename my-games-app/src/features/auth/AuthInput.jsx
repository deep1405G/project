import { useState } from "react";
import { T } from "../../theme/tokens";

export default function AuthInput({ label, type, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  const t = type === "password" ? (show ? "text" : "password") : type;
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6, fontWeight: 500 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={t}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: T.card,
            border: `1.5px solid ${T.border}`,
            borderRadius: 12,
            color: T.text,
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
            boxSizing: "border-box",
            paddingRight: type === "password" ? 42 : 16,
          }}
        />
        {type === "password" && (
          <button
            onClick={() => setShow((s) => !s)}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: T.muted,
              cursor: "pointer",
              fontSize: 16,
              padding: 0,
            }}
          >
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}
