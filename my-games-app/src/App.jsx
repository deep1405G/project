import { useEffect, useState } from "react";
import { T } from "./theme/tokens";
import { GAMES } from "./features/games/catalog";

import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import Chat from "./features/chat/Chat";
import Experts from "./features/experts/Experts";
import Resources from "./features/resources/Resources";
import CheckHub from "./features/selfChecks/CheckHub";
import GamesGrid from "./screens/GamesGrid";
import Home from "./screens/Home";
import Navbar from "./layout/Navbar";
import GamePickerModal from "./layout/GamePickerModal";

export default function App() {
  const [authScreen, setAuthScreen] = useState("signin");
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("home");
  const [checkScore, setCheckScore] = useState(() => {
    try {
      const raw = localStorage.getItem("mannsaathi.checkScore.v1");
      const val = raw == null ? null : Number(raw);
      return Number.isFinite(val) ? val : null;
    } catch {
      return null;
    }
  });
  const [checkContext, setCheckContext] = useState(() => {
    try {
      const raw = localStorage.getItem("mannsaathi.checkContext.v1");
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  });
  const [activeGame, setActiveGame] = useState(null);
  const [showGamePicker, setShowGamePicker] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appt) => setAppointments((prev) => [appt, ...prev]);
  const cancelAppointment = (id) => setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a)));
  const updateAppointment = (id, updates) => setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));

  const openGame = (id) => {
    if (id === null) {
      setShowGamePicker(true);
      return;
    }
    setActiveGame(id);
    setShowGamePicker(false);
  };

  useEffect(() => {
    try {
      if (checkScore == null) localStorage.removeItem("mannsaathi.checkScore.v1");
      else localStorage.setItem("mannsaathi.checkScore.v1", String(checkScore));
    } catch {}
  }, [checkScore]);

  useEffect(() => {
    try {
      if (!checkContext) localStorage.removeItem("mannsaathi.checkContext.v1");
      else localStorage.setItem("mannsaathi.checkContext.v1", JSON.stringify(checkContext));
    } catch {}
  }, [checkContext]);

  if (!user)
    return authScreen === "signin" ? (
      <SignIn setUser={setUser} goSignUp={() => setAuthScreen("signup")} />
    ) : (
      <SignUp setUser={setUser} goSignIn={() => setAuthScreen("signin")} />
    );

  const ActiveComp = GAMES.find((g) => g.id === activeGame)?.Comp;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Segoe UI',system-ui,sans-serif", color: T.text }}>
      {activeGame && ActiveComp && <ActiveComp onClose={() => setActiveGame(null)} />}

      <GamePickerModal open={showGamePicker} onClose={() => setShowGamePicker(false)} onPick={openGame} />

      <Navbar screen={screen} setScreen={setScreen} user={user} onSignOut={() => setUser(null)} />

      {screen === "home" && <Home setScreen={setScreen} />}
      {screen === "check" && <CheckHub setScreen={setScreen} setCheckScore={setCheckScore} setCheckContext={setCheckContext} />}
      {screen === "chat" && <Chat checkScore={checkScore} checkContext={checkContext} user={user} openGame={openGame} setScreen={setScreen} />}
      {screen === "games" && <GamesGrid openGame={openGame} />}
      {screen === "experts" && <Experts appointments={appointments} onBook={addAppointment} onCancel={cancelAppointment} onUpdate={updateAppointment} />}
      {screen === "resources" && <Resources />}

      <style>{`
        @keyframes bop{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  );
}