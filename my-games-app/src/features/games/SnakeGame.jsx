import { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Win } from "../../components/Modal";
import { T } from "../../theme/tokens";

export default function SnakeGame({ onClose }) {
  const SIZE = 20,
    CELL = 18;
  const [snake, setSnake] = useState([
    [10, 10],
    [10, 9],
    [10, 8],
  ]);
  const [dir, setDir] = useState([0, 1]);
  const [food, setFood] = useState([5, 5]);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef([0, 1]);
  const snakeRef = useRef([
    [10, 10],
    [10, 9],
    [10, 8],
  ]);
  const foodRef = useRef([5, 5]);

  const rndFood = useCallback((s) => {
    let f;
    do {
      f = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
    } while (s.some(([r, c]) => r === f[0] && c === f[1]));
    return f;
  }, []);

  useEffect(() => {
    const h = (e) => {
      const m = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
        w: [-1, 0],
        s: [1, 0],
        a: [0, -1],
        d: [0, 1],
      };
      const nd = m[e.key];
      if (!nd) return;
      const [dr, dc] = dirRef.current;
      if (nd[0] === -dr && nd[1] === -dc) return;
      dirRef.current = nd;
      setDir(nd);
      e.preventDefault();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    if (!running || dead) return;
    const t = setInterval(() => {
      const cur = snakeRef.current;
      const [dr, dc] = dirRef.current;
      const head = [cur[0][0] + dr, cur[0][1] + dc];
      if (
        head[0] < 0 ||
        head[0] >= SIZE ||
        head[1] < 0 ||
        head[1] >= SIZE ||
        cur.some(([r, c]) => r === head[0] && c === head[1])
      ) {
        setDead(true);
        setRunning(false);
        return;
      }
      const ate = head[0] === foodRef.current[0] && head[1] === foodRef.current[1];
      const ns = ate ? [head, ...cur] : [head, ...cur.slice(0, -1)];
      if (ate) {
        const nf = rndFood(ns);
        foodRef.current = nf;
        setFood(nf);
        setScore((s) => s + 10);
      }
      snakeRef.current = ns;
      setSnake([...ns]);
    }, 120);
    return () => clearInterval(t);
  }, [running, dead, rndFood]);

  const reset = () => {
    const s = [
      [10, 10],
      [10, 9],
      [10, 8],
    ];
    snakeRef.current = s;
    dirRef.current = [0, 1];
    const f = [5, 5];
    foodRef.current = f;
    setSnake(s);
    setDir([0, 1]);
    setFood(f);
    setDead(false);
    setScore(0);
    setRunning(false);
  };
  const arrowBtn = (label, d) => (
    <button
      onClick={() => {
        const [dr, dc] = dirRef.current;
        if (d[0] === -dr && d[1] === -dc) return;
        dirRef.current = d;
        setDir(d);
      }}
      style={{
        width: 44,
        height: 44,
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        color: T.text,
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </button>
  );

  return (
    <Modal onClose={onClose} title="🐍 Chill Snake" subtitle={`Score: ${score}`} onReset={reset}>
      {dead && <Win msg={`Game Over! Score: ${score}`} bad onReset={reset} />}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${SIZE},${CELL}px)`,
            gap: 1,
            background: T.border,
            borderRadius: 8,
            overflow: "hidden",
            border: `2px solid ${T.border}`,
          }}
        >
          {Array.from({ length: SIZE }).map((_, r) =>
            Array.from({ length: SIZE }).map((_, c) => {
              const isHead = snake[0]?.[0] === r && snake[0]?.[1] === c;
              const isBody = snake.slice(1).some(([sr, sc]) => sr === r && sc === c);
              const isFood = food[0] === r && food[1] === c;
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: isHead ? T.accent : isBody ? T.a2 + "99" : isFood ? T.green : T.bg,
                  }}
                />
              );
            })
          )}
        </div>
        <button
          onClick={() => setRunning((r) => !r)}
          style={{
            padding: "8px 24px",
            background: running ? `${T.yellow}33` : `linear-gradient(135deg,${T.accent},#ec4899)`,
            color: running ? T.yellow : "#fff",
            border: running ? `1px solid ${T.yellow}` : "none",
            borderRadius: 20,
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div>{arrowBtn("↑", [-1, 0])}</div>
          <div style={{ display: "flex", gap: 4 }}>
            {arrowBtn("←", [0, -1])}
            {arrowBtn("↓", [1, 0])}
            {arrowBtn("→", [0, 1])}
          </div>
        </div>
      </div>
    </Modal>
  );
}
