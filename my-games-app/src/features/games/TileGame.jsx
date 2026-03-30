import { useEffect, useState } from "react";
import { Modal, Win } from "../../components/Modal";
import { T } from "../../theme/tokens";

const btnS = {
  width: 44,
  height: 44,
  background: T.card,
  border: `1px solid ${T.border}`,
  borderRadius: 10,
  color: T.text,
  fontSize: 18,
  cursor: "pointer",
};

export default function TileGame({ onClose }) {
  const empty = () => Array.from({ length: 4 }, () => Array(4).fill(0));
  const addRnd = (g) => {
    const e = [];
    g.forEach((r, ri) =>
      r.forEach((v, ci) => {
        if (!v) e.push([ri, ci]);
      })
    );
    if (!e.length) return g;
    const [ri, ci] = e[Math.floor(Math.random() * e.length)];
    const ng = g.map((r) => [...r]);
    ng[ri][ci] = Math.random() < 0.9 ? 2 : 4;
    return ng;
  };
  const [grid, setGrid] = useState(() => addRnd(addRnd(empty())));
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  const move = (dir) => {
    let g = grid.map((r) => [...r]);
    let sc = 0;
    const slide = (row) => {
      const f = row.filter((x) => x);
      const m = [];
      let i = 0;
      while (i < f.length) {
        if (i + 1 < f.length && f[i] === f[i + 1]) {
          const v = f[i] * 2;
          m.push(v);
          sc += v;
          i += 2;
        } else {
          m.push(f[i]);
          i++;
        }
      }
      while (m.length < 4) m.push(0);
      return m;
    };
    if (dir === "left") g = g.map((r) => slide(r));
    else if (dir === "right") g = g.map((r) => slide([...r].reverse()).reverse());
    else if (dir === "up") {
      g = Array.from({ length: 4 }, (_, c) => slide(g.map((r) => r[c])));
      g = Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => g[c][r]));
    } else if (dir === "down") {
      g = Array.from({ length: 4 }, (_, c) => slide(g.map((r) => r[c]).reverse()).reverse());
      g = Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => g[c][r]));
    }
    if (g.flat().some((v) => v === 2048)) setWon(true);
    const ng = addRnd(g);
    setGrid(ng);
    setScore((s) => s + sc);
  };

  useEffect(() => {
    const h = (e) => {
      const m = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
      if (m[e.key]) {
        move(m[e.key]);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [grid]);

  const tileColor = {
    0: T.bg,
    2: "#3b4a6b",
    4: "#4a5a80",
    8: T.accent,
    16: T.pink,
    32: T.orange,
    64: T.red,
    128: T.yellow,
    256: T.green,
    512: T.teal,
    1024: "#c084fc",
    2048: "#ffd700",
  };

  return (
    <Modal
      onClose={onClose}
      title="🔢 MindTiles"
      subtitle={`Score: ${score}`}
      onReset={() => {
        setGrid(addRnd(addRnd(empty())));
        setScore(0);
        setWon(false);
      }}
    >
      {won && <Win msg="You reached 2048! 🎉" />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>
        {grid.flat().map((v, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              background: tileColor[v] || "#8b5cf6",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: v > 99 ? "clamp(14px,3vw,20px)" : "clamp(18px,4vw,26px)",
              color: v > 4 ? T.text : T.muted,
              border: `1px solid ${T.border}`,
              transition: "background 0.15s",
            }}
          >
            {v || ""}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <button onClick={() => move("up")} style={btnS}>
          ↑
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => move("left")} style={btnS}>
            ←
          </button>
          <button onClick={() => move("down")} style={btnS}>
            ↓
          </button>
          <button onClick={() => move("right")} style={btnS}>
            →
          </button>
        </div>
      </div>
    </Modal>
  );
}
