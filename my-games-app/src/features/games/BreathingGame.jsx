import { useEffect, useRef, useState } from "react";
import { T } from "../../theme/tokens";
import { Modal } from "../../components/Modal";

export default function BreathingGame({ onClose }) {
  const PH = {
    in: { lbl: "Breathe In", dur: 4, col: T.accent },
    hold: { lbl: "Hold", dur: 7, col: T.yellow },
    out: { lbl: "Breathe Out", dur: 8, col: T.green },
  };
  const ORD = ["in", "hold", "out"];
  const [ph, setPh] = useState("idle");
  const [cnt, setCnt] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [run, setRun] = useState(false);
  const tmr = useRef(null);
  useEffect(() => {
    if (!run) return;
    if (ph === "idle") {
      setPh("in");
      setCnt(PH.in.dur);
      return;
    }
    if (cnt <= 0) {
      const nx = ORD[(ORD.indexOf(ph) + 1) % 3];
      if (nx === "in") setCycles((c) => c + 1);
      setPh(nx);
      setCnt(PH[nx].dur);
      return;
    }
    tmr.current = setTimeout(() => setCnt((c) => c - 1), 1000);
    return () => clearTimeout(tmr.current);
  }, [run, ph, cnt]);
  const toggle = () => {
    if (run) {
      setRun(false);
      setPh("idle");
      setCnt(0);
      clearTimeout(tmr.current);
    } else setRun(true);
  };
  const col = ph === "idle" ? T.a2 : PH[ph]?.col;
  const scale = ph === "in" ? 1.55 : ph === "hold" ? 1.55 : 0.75;
  return (
    <Modal onClose={onClose} title="🌬️ 4-7-8 Breathing" subtitle={`Cycles: ${cycles}`}>
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <div
          style={{
            position: "relative",
            width: 160,
            height: 160,
            margin: "0 auto 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `${col}22`,
              border: `2px solid ${col}44`,
              transform: `scale(${run ? scale : 1})`,
              transition: `transform ${run && ph !== "idle" ? PH[ph]?.dur : 0.5}s ease-in-out`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "65%",
              height: "65%",
              borderRadius: "50%",
              background: `${col}33`,
              border: `2px solid ${col}77`,
              transform: `scale(${run ? scale * 0.9 : 1})`,
              transition: `transform ${run && ph !== "idle" ? PH[ph]?.dur : 0.5}s ease-in-out`,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: col }}>{run && ph !== "idle" ? cnt : "✦"}</div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 4 }}>{run ? PH[ph]?.lbl || "" : "Ready"}</div>
          </div>
        </div>
        <button
          onClick={toggle}
          style={{
            padding: "12px 36px",
            background: run ? `${T.red}33` : `linear-gradient(135deg,${T.accent},#ec4899)`,
            color: run ? T.red : "#fff",
            border: run ? `1px solid ${T.red}` : "none",
            borderRadius: 30,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {run ? "Stop" : "Start"}
        </button>
      </div>
    </Modal>
  );
}
