import { useState } from "react";
import { T } from "../../theme/tokens";
import AuthInput from "./AuthInput";
import { loginWithGoogle } from "./googleAuth";

export default function SignIn({ setUser, goSignUp }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email || !pw) {
      setErr("Please fill in all fields");
      return;
    }
    setUser({ name: email.split("@")[0], email, avatar: "🙂" });
  };
  const googleLogin = () => loginWithGoogle(setUser, setErr, setGoogleLoading);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Segoe UI',system-ui,sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `linear-gradient(135deg,${T.accent},#ec4899)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              margin: "0 auto 16px",
            }}
          >
            🧠
          </div>
          <h1 style={{ color: T.text, fontWeight: 900, fontSize: 28, margin: "0 0 8px" }}>Welcome back</h1>
          <p style={{ color: T.muted, fontSize: 14 }}>Sign in to your MannSaathi account</p>
        </div>
        <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 22, padding: 32 }}>
          <button
            onClick={googleLogin}
            disabled={googleLoading}
            style={{
              width: "100%",
              padding: "12px",
              background: T.card,
              border: `1.5px solid ${T.border}`,
              borderRadius: 12,
              color: T.text,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 24,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ color: T.muted, fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>
          <form onSubmit={submit}>
            <AuthInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
            <AuthInput
              label="Password"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
            />
            {err && (
              <div
                style={{
                  color: T.red,
                  fontSize: 13,
                  marginBottom: 12,
                  padding: "8px 12px",
                  background: `${T.red}11`,
                  borderRadius: 8,
                }}
              >
                {err}
              </div>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                background: `linear-gradient(135deg,${T.accent},#ec4899)`,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Sign In →
            </button>
          </form>
          <p style={{ textAlign: "center", color: T.muted, fontSize: 13, marginTop: 20 }}>
            Don't have an account?{" "}
            <button
              onClick={goSignUp}
              style={{ background: "none", border: "none", color: T.a2, cursor: "pointer", fontWeight: 600, fontSize: 13 }}
            >
              Sign up free
            </button>
          </p>
        </div>
        <p style={{ textAlign: "center", color: T.muted, fontSize: 11, marginTop: 20 }}>
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
