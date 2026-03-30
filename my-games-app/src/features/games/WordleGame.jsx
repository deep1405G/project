import { useState } from "react";
import { T } from "../../theme/tokens";
import { Modal, Win } from "../../components/Modal";

const WORDS = [
  "PEACE",
  "SMILE",
  "HAPPY",
  "RELAX",
  "CHILL",
  "BLISS",
  "SUNNY",
  "DANCE",
  "LAUGH",
  "DREAM",
  "LIGHT",
  "FRESH",
  "BRAVE",
  "TRUST",
  "GROWI",
];

export default function WordleGame({ onClose }) {
  const [target] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState([]);
  const [cur, setCur] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const submit = () => {
    if (cur.length !== 5 || won || lost) return;
    const g = cur.toUpperCase();
    const res = g
      .split("")
      .map((ch, i) => ({ ch, s: ch === target[i] ? "c" : target.includes(ch) ? "p" : "a" }));
    const ng = [...guesses, res];
    setGuesses(ng);
    setCur("");
    if (g === target) setWon(true);
    else if (ng.length >= 6) setLost(true);
  };
  const cMap = { c: T.green, p: T.yellow, a: T.card };
  const kb = "QWERTYUIOP|ASDFGHJKL|ZXCVBNM".split("|").map((r) => r.split(""));
  const letterStatus = guesses.flat().reduce((acc, { ch, s }) => {
    if (!acc[ch] || s === "c" || (s === "p" && acc[ch] === "a")) acc[ch] = s;
    return acc;
  }, {});
  return (
    <Modal onClose={onClose} title="💬 MindWord" subtitle="Guess the wellness word">
      {won && <Win msg={`You got it in ${guesses.length} tries!`} />}
      {lost && (
        <div style={{ textAlign: "center", color: T.red, fontWeight: 700, marginBottom: 12 }}>
          😅 Word was: {target}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {Array.from({ length: 6 }).map((_, r) => (
          <div key={r} style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: 5 }).map((_, c) => {
              const g = guesses[r];
              const cell = g?.[c];
              const isCur = r === guesses.length && !won && !lost;
              return (
                <div
                  key={c}
                  style={{
                    flex: 1,
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    background: cell ? cMap[cell.s] : T.card,
                    border: `2px solid ${cell ? cMap[cell.s] : isCur ? T.accent : T.border}`,
                    color: T.text,
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  {cell?.ch || (isCur ? cur[c] || "" : "")}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {kb.map((row, ri) => (
        <div key={ri} style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 5 }}>
          {row.map((k) => (
            <button
              key={k}
              onClick={() => {
                if (!won && !lost) {
                  if (k === "⌫") setCur((c) => c.slice(0, -1));
                  else if (cur.length < 5) setCur((c) => c + k);
                }
              }}
              style={{
                width: 32,
                height: 36,
                borderRadius: 6,
                background: letterStatus[k] ? cMap[letterStatus[k]] : T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {k}
            </button>
          ))}
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={cur}
          onChange={(e) => setCur(e.target.value.toUpperCase().slice(0, 5))}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type & Enter"
          style={{
            flex: 1,
            padding: "9px 14px",
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            color: T.text,
            fontSize: 15,
            textTransform: "uppercase",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={submit}
          style={{
            padding: "9px 18px",
            background: T.accent,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>
    </Modal>
  );
}
