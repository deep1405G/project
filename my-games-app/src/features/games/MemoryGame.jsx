import { useState } from "react";
import { T } from "../../theme/tokens";
import { Modal, Win } from "../../components/Modal";

const MEM_EMOJIS = ["🌸", "🦋", "🌈", "⭐", "🎵", "🍕", "🐶", "🦊", "🌙", "💎", "🔥", "🎯"];

export default function MemoryGame({ onClose }) {
  const mk = () =>
    [...MEM_EMOJIS, ...MEM_EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((e, i) => ({ id: i, e, flipped: false, matched: false }));
  const [cards, setCards] = useState(mk);
  const [sel, setSel] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [lock, setLock] = useState(false);
  const flip = (id) => {
    if (lock) return;
    const c = cards.find((x) => x.id === id);
    if (c.flipped || c.matched || sel.length === 2) return;
    const ns = [...sel, id];
    setCards((p) => p.map((x) => (x.id === id ? { ...x, flipped: true } : x)));
    if (ns.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = ns.map((i) => cards.find((x) => x.id === i));
      if (a.e === b.e) {
        setCards((p) => p.map((x) => (ns.includes(x.id) ? { ...x, matched: true } : x)));
        setSel([]);
        setLock(false);
        if (cards.filter((x) => x.matched).length + 2 === cards.length) setWon(true);
      } else
        setTimeout(() => {
          setCards((p) => p.map((x) => (ns.includes(x.id) ? { ...x, flipped: false } : x)));
          setSel([]);
          setLock(false);
        }, 850);
    } else setSel(ns);
  };
  const reset = () => {
    setCards(mk());
    setSel([]);
    setMoves(0);
    setWon(false);
    setLock(false);
  };
  return (
    <Modal onClose={onClose} title="🧠 Memory Match" subtitle={`Moves: ${moves}`} onReset={reset}>
      {won && <Win msg={`Matched all pairs in ${moves} moves!`} onReset={reset} />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
        {cards.map((c) => (
          <div
            key={c.id}
            onClick={() => flip(c.id)}
            style={{
              aspectRatio: "1",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(16px,3vw,24px)",
              cursor: "pointer",
              transition: "all 0.25s",
              userSelect: "none",
              background: c.flipped || c.matched ? (c.matched ? `${T.green}33` : T.card) : T.accent,
              border: `2px solid ${c.matched ? T.green : c.flipped ? T.a2 : T.border}`,
            }}
          >
            {c.flipped || c.matched ? c.e : "?"}
          </div>
        ))}
      </div>
    </Modal>
  );
}
