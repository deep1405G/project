import { useState } from "react";
import { Modal } from "../../components/Modal";
import { T } from "../../theme/tokens";

export const EXPERTS = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    avatar: "👩‍⚕️",
    specialty: "Anxiety & Stress Management",
    experience: "12 years",
    rating: 4.9,
    reviews: 234,
    fee: "₹800",
    lang: "Hindi, English",
    bio: "Specializes in CBT and mindfulness-based stress reduction. Helped 500+ clients overcome anxiety disorders.",
    available: ["Mon 10-1PM", "Wed 2-5PM", "Fri 10-1PM"],
    col: T.accent,
  },
  {
    id: 2,
    name: "Dr. Arjun Mehta",
    avatar: "👨‍⚕️",
    specialty: "Depression & Mood Disorders",
    experience: "15 years",
    rating: 4.8,
    reviews: 312,
    fee: "₹1000",
    lang: "Hindi, English, Gujarati",
    bio: "Expert in treating clinical depression, bipolar disorder, and emotional regulation using evidence-based approaches.",
    available: ["Tue 11-2PM", "Thu 3-6PM", "Sat 10-1PM"],
    col: T.green,
  },
  {
    id: 3,
    name: "Dr. Ananya Iyer",
    avatar: "👩‍💼",
    specialty: "Relationship & Family Therapy",
    experience: "10 years",
    rating: 4.9,
    reviews: 198,
    fee: "₹900",
    lang: "English, Tamil, Hindi",
    bio: "Couples counseling, family dynamics, and attachment-based therapy. Creates safe spaces for difficult conversations.",
    available: ["Mon 2-5PM", "Wed 10-1PM", "Sat 11-2PM"],
    col: T.pink,
  },
  {
    id: 4,
    name: "Dr. Rohan Kapoor",
    avatar: "👨‍🔬",
    specialty: "Addiction & Behavioral Issues",
    experience: "8 years",
    rating: 4.7,
    reviews: 156,
    fee: "₹750",
    lang: "Hindi, English, Punjabi",
    bio: "Specializes in substance abuse recovery, gaming addiction, and behavioral modification using motivational interviewing.",
    available: ["Tue 10-1PM", "Thu 2-5PM", "Fri 3-6PM"],
    col: T.orange,
  },
  {
    id: 5,
    name: "Dr. Meera Nair",
    avatar: "👩‍🏫",
    specialty: "Child & Adolescent Psychology",
    experience: "11 years",
    rating: 4.9,
    reviews: 278,
    fee: "₹850",
    lang: "English, Malayalam, Hindi",
    bio: "Works with children and teens facing academic stress, bullying, ADHD, and self-esteem issues. Play therapy certified.",
    available: ["Mon 3-6PM", "Wed 11-2PM", "Fri 10-1PM"],
    col: T.teal,
  },
  {
    id: 6,
    name: "Dr. Vikram Singh",
    avatar: "👨‍⚕️",
    specialty: "Trauma & PTSD Recovery",
    experience: "14 years",
    rating: 4.8,
    reviews: 201,
    fee: "₹1100",
    lang: "Hindi, English",
    bio: "EMDR certified therapist specializing in trauma recovery, PTSD, and complex grief. Compassionate and patient-centered approach.",
    available: ["Tue 2-5PM", "Thu 10-1PM", "Sat 10-2PM"],
    col: T.yellow,
  },
];

function BookingModal({ expert, onClose, onBook }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState("In-person");
  const [booked, setBooked] = useState(false);
  const handleBook = () => {
    if (!date || !slot) return;
    const appt = {
      id: "APT" + Date.now(),
      expertId: expert.id,
      expertName: expert.name,
      expertAvatar: expert.avatar,
      specialty: expert.specialty,
      date,
      slot,
      reason,
      mode,
      fee: expert.fee,
      status: "Confirmed",
      bookedAt: new Date().toLocaleString(),
    };
    onBook(appt);
    setBooked(true);
  };
  if (booked)
    return (
      <Modal onClose={onClose} title="✅ Appointment Booked!">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <h3 style={{ color: T.green, marginBottom: 8 }}>Successfully Booked!</h3>
          <p style={{ color: T.muted, fontSize: 14, marginBottom: 6 }}>
            with <strong style={{ color: T.text }}>{expert.name}</strong>
          </p>
          <p style={{ color: T.muted, fontSize: 13 }}>
            {date} · {slot}
          </p>
          {reason && (
            <p style={{ color: T.muted, fontSize: 12, marginTop: 8, fontStyle: "italic" }}>
              "{reason}"
            </p>
          )}
          <button
            onClick={onClose}
            style={{
              marginTop: 20,
              padding: "11px 28px",
              background: `linear-gradient(135deg,${T.accent},#ec4899)`,
              color: "#fff",
              border: "none",
              borderRadius: 20,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Done
          </button>
        </div>
      </Modal>
    );
  return (
    <Modal onClose={onClose} title={`📅 Book with ${expert.name}`} subtitle={expert.specialty}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: 14, background: T.card, borderRadius: 14, border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 36 }}>{expert.avatar}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{expert.name}</div>
          <div style={{ color: expert.col, fontSize: 12 }}>{expert.specialty}</div>
          <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>
            {expert.fee}/session · {expert.lang}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: T.card,
            border: `1.5px solid ${T.border}`,
            borderRadius: 10,
            color: T.text,
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
            boxSizing: "border-box",
            colorScheme: "dark",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Available Slots</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {expert.available.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              style={{
                padding: "8px 14px",
                background: slot === s ? `${expert.col}33` : T.card,
                border: `1.5px solid ${slot === s ? expert.col : T.border}`,
                borderRadius: 10,
                color: slot === s ? expert.col : T.muted,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: slot === s ? 700 : 500,
                transition: "all 0.2s",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Session Mode</label>
        <div style={{ display: "flex", gap: 8 }}>
          {["In-person", "Video Call", "Phone Call"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "8px 14px",
                background: mode === m ? `${expert.col}33` : T.card,
                border: `1.5px solid ${mode === m ? expert.col : T.border}`,
                borderRadius: 10,
                color: mode === m ? expert.col : T.muted,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: mode === m ? 700 : 500,
                transition: "all 0.2s",
              }}
            >
              {m === "In-person" ? "🏥" : m === "Video Call" ? "📹" : "📞"} {m}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Reason (optional)</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Brief description of what you'd like to discuss..."
          rows={2}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: T.card,
            border: `1.5px solid ${T.border}`,
            borderRadius: 10,
            color: T.text,
            fontSize: 13,
            outline: "none",
            fontFamily: "inherit",
            resize: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <button
        onClick={handleBook}
        disabled={!date || !slot}
        style={{
          width: "100%",
          padding: "13px",
          background: !date || !slot ? T.border : `linear-gradient(135deg,${T.accent},#ec4899)`,
          color: !date || !slot ? T.muted : "#fff",
          border: "none",
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: !date || !slot ? "not-allowed" : "pointer",
        }}
      >
        Confirm Booking →
      </button>
    </Modal>
  );
}

function EditAppointmentModal({ appointment, onClose, onSave }) {
  const expert = EXPERTS.find((e) => e.id === appointment.expertId) || { available: [] };
  const [date, setDate] = useState(appointment.date);
  const [slot, setSlot] = useState(appointment.slot);
  const [reason, setReason] = useState(appointment.reason || "");
  const [mode, setMode] = useState(appointment.mode || "In-person");
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    if (!date || !slot) return;
    onSave(appointment.id, { date, slot, reason, mode, status: "Confirmed", bookedAt: new Date().toLocaleString() });
    setSaved(true);
  };
  if (saved)
    return (
      <Modal onClose={onClose} title="✅ Appointment Updated!">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>✏️</div>
          <h3 style={{ color: T.green, marginBottom: 8 }}>Updated Successfully!</h3>
          <p style={{ color: T.muted, fontSize: 14, marginBottom: 6 }}>
            with <strong style={{ color: T.text }}>{appointment.expertName}</strong>
          </p>
          <p style={{ color: T.muted, fontSize: 13 }}>
            {date} · {slot}
          </p>
          <button
            onClick={onClose}
            style={{
              marginTop: 20,
              padding: "11px 28px",
              background: `linear-gradient(135deg,${T.accent},#ec4899)`,
              color: "#fff",
              border: "none",
              borderRadius: 20,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Done
          </button>
        </div>
      </Modal>
    );
  return (
    <Modal onClose={onClose} title={`✏️ Update Appointment`} subtitle={`${appointment.expertName} — ${appointment.specialty}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: 14, background: T.card, borderRadius: 14, border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 36 }}>{appointment.expertAvatar}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{appointment.expertName}</div>
          <div style={{ color: T.a2, fontSize: 12 }}>{appointment.specialty}</div>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: T.card,
            border: `1.5px solid ${T.border}`,
            borderRadius: 10,
            color: T.text,
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
            boxSizing: "border-box",
            colorScheme: "dark",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Available Slots</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {expert.available.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              style={{
                padding: "8px 14px",
                background: slot === s ? `${T.accent}33` : T.card,
                border: `1.5px solid ${slot === s ? T.accent : T.border}`,
                borderRadius: 10,
                color: slot === s ? T.a2 : T.muted,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: slot === s ? 700 : 500,
                transition: "all 0.2s",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Session Mode</label>
        <div style={{ display: "flex", gap: 8 }}>
          {["In-person", "Video Call", "Phone Call"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "8px 14px",
                background: mode === m ? `${T.accent}33` : T.card,
                border: `1.5px solid ${mode === m ? T.accent : T.border}`,
                borderRadius: 10,
                color: mode === m ? T.a2 : T.muted,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: mode === m ? 700 : 500,
                transition: "all 0.2s",
              }}
            >
              {m === "In-person" ? "🏥" : m === "Video Call" ? "📹" : "📞"} {m}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, color: T.muted, marginBottom: 6 }}>Reason (optional)</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Brief description..."
          rows={2}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: T.card,
            border: `1.5px solid ${T.border}`,
            borderRadius: 10,
            color: T.text,
            fontSize: 13,
            outline: "none",
            fontFamily: "inherit",
            resize: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <button
        onClick={handleSave}
        disabled={!date || !slot}
        style={{
          width: "100%",
          padding: "13px",
          background: !date || !slot ? T.border : `linear-gradient(135deg,${T.accent},#ec4899)`,
          color: !date || !slot ? T.muted : "#fff",
          border: "none",
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: !date || !slot ? "not-allowed" : "pointer",
        }}
      >
        Save Changes →
      </button>
    </Modal>
  );
}

export default function Experts({ appointments, onBook, onCancel, onUpdate }) {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [editingAppt, setEditingAppt] = useState(null);
  const [tab, setTab] = useState("experts");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 20px" }}>
      {selectedExpert && <BookingModal expert={selectedExpert} onClose={() => setSelectedExpert(null)} onBook={onBook} />}
      {editingAppt && (
        <EditAppointmentModal
          appointment={editingAppt}
          onClose={() => setEditingAppt(null)}
          onSave={(id, updates) => {
            onUpdate(id, updates);
            setEditingAppt(null);
          }}
        />
      )}

      <h2 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>🩺 Mental Health Experts</h2>
      <p style={{ color: T.muted, fontSize: 14, marginTop: 6, marginBottom: 24 }}>
        Book a session with certified psychologists and therapists.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <button
          onClick={() => setTab("experts")}
          style={{
            padding: "10px 22px",
            borderRadius: 24,
            border: tab === "experts" ? "none" : `1.5px solid ${T.border}`,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            background: tab === "experts" ? `${T.accent}22` : "transparent",
            color: tab === "experts" ? T.a2 : T.muted,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          🔍 Browse Experts
        </button>
        <button
          onClick={() => setTab("appointments")}
          style={{
            padding: "10px 22px",
            borderRadius: 24,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            background: tab === "appointments" ? `linear-gradient(135deg,${T.accent},#ec4899)` : T.card,
            color: tab === "appointments" ? "#fff" : T.muted,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          📋 My Appointments{" "}
          {appointments.length > 0 && (
            <span
              style={{
                background: "#ec4899",
                color: "#fff",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {appointments.length}
            </span>
          )}
        </button>
      </div>

      {tab === "experts" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
          {EXPERTS.map((ex) => (
            <div
              key={ex.id}
              style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, padding: 22, transition: "all 0.22s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ex.col;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${ex.col}22`,
                    border: `2px solid ${ex.col}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {ex.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{ex.name}</div>
                  <div style={{ color: ex.col, fontSize: 12, fontWeight: 600 }}>{ex.specialty}</div>
                </div>
              </div>
              <p style={{ color: T.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}>{ex.bio}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                <span style={{ background: `${T.green}22`, color: T.green, padding: "3px 10px", borderRadius: 8, fontSize: 11 }}>
                  ⭐ {ex.rating} ({ex.reviews})
                </span>
                <span style={{ background: `${T.accent}22`, color: T.a2, padding: "3px 10px", borderRadius: 8, fontSize: 11 }}>
                  🕐 {ex.experience}
                </span>
                <span style={{ background: `${T.yellow}22`, color: T.yellow, padding: "3px 10px", borderRadius: 8, fontSize: 11 }}>
                  💰 {ex.fee}
                </span>
              </div>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>🗣️ {ex.lang} · 📅 {ex.available.join(", ")}</div>
              <button
                onClick={() => setSelectedExpert(ex)}
                style={{
                  width: "100%",
                  padding: "11px",
                  background: `linear-gradient(135deg,${ex.col},${T.accent})`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Book Appointment →
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "appointments" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28 }}>
            {[
              [appointments.length, "Total Appointments", T.accent],
              [confirmed, "Confirmed Appointments", T.green],
              [cancelled, "Cancelled Appointments", T.red],
            ].map(([val, label, col]) => (
              <div key={label} style={{ background: T.card, border: `1.5px solid ${col}44`, borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: col, marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>

          {appointments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 50, marginBottom: 16 }}>📋</div>
              <h3 style={{ color: T.muted, fontWeight: 600, marginBottom: 8 }}>No appointments yet</h3>
              <p style={{ color: T.muted, fontSize: 13 }}>Book a session with one of our experts to get started.</p>
              <button
                onClick={() => setTab("experts")}
                style={{ marginTop: 20, padding: "10px 24px", background: T.accent, color: "#fff", border: "none", borderRadius: 16, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
              >
                Browse Experts
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>All Appointments</h3>
                <span style={{ fontSize: 12, color: T.muted }}>
                  {appointments.length} record{appointments.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 28 }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 780 }}>
                    <thead>
                      <tr style={{ background: T.panel }}>
                        {["EXPERT", "DATE & TIME", "MODE", "FEE", "STATUS", "ACTION"].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "13px 16px",
                              textAlign: "left",
                              fontSize: 11,
                              color: T.muted,
                              fontWeight: 700,
                              borderBottom: `1px solid ${T.border}`,
                              whiteSpace: "nowrap",
                              letterSpacing: 0.5,
                              textTransform: "uppercase",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => {
                        const isActive = selectedAppt && selectedAppt.id === a.id;
                        return (
                          <tr
                            key={a.id}
                            onClick={() => setSelectedAppt((prev) => (prev && prev.id === a.id ? null : a))}
                            style={{
                              borderBottom: `1px solid ${T.border}22`,
                              cursor: "pointer",
                              background: isActive ? `${T.accent}11` : "transparent",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) e.currentTarget.style.background = `${T.accent}08`;
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <td style={{ padding: "14px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${T.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                  {a.expertAvatar}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 700, fontSize: 13 }}>{a.expertName}</div>
                                  <div style={{ color: T.muted, fontSize: 11 }}>{a.specialty}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <div style={{ fontWeight: 700, fontSize: 13 }}>{new Date(a.date).toDateString()}</div>
                              <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{a.slot}</div>
                            </td>
                            <td style={{ padding: "14px 16px", fontSize: 13, color: T.muted }}>{a.mode || "In-person"}</td>
                            <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: T.green }}>{a.fee || "—"}</td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ background: a.status === "Cancelled" ? `${T.red}22` : `${T.green}22`, color: a.status === "Cancelled" ? T.red : T.green, padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
                                {a.status}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }} onClick={(e) => e.stopPropagation()}>
                              {a.status !== "Cancelled" ? (
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button
                                    onClick={() => setEditingAppt(a)}
                                    style={{ padding: "6px 14px", background: `${T.accent}22`, color: T.a2, border: `1px solid ${T.accent}44`, borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = `${T.accent}44`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = `${T.accent}22`;
                                    }}
                                  >
                                    Update
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm("Cancel this appointment?")) onCancel(a.id);
                                    }}
                                    style={{ padding: "6px 14px", background: `${T.red}22`, color: T.red, border: `1px solid ${T.red}44`, borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = `${T.red}44`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = `${T.red}22`;
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <span style={{ color: T.muted, fontSize: 11, fontStyle: "italic" }}>—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ maxHeight: selectedAppt ? 500 : 0, opacity: selectedAppt ? 1 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, margin 0.4s ease", marginTop: selectedAppt ? 0 : -8 }}>
                {selectedAppt && (
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Appointment Details</h3>
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${T.accent}22`, border: `2px solid ${T.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                            {selectedAppt.expertAvatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 16 }}>{selectedAppt.expertName}</div>
                            <div style={{ color: T.muted, fontSize: 12, marginTop: 4, display: "flex", flexWrap: "wrap", gap: 8 }}>
                              <span>📅 {new Date(selectedAppt.date).toDateString()}</span>
                              <span>· 🕐 {selectedAppt.slot}</span>
                              <span>
                                · {selectedAppt.mode === "Video Call" ? "📹" : selectedAppt.mode === "Phone Call" ? "📞" : "🏥"} {selectedAppt.mode || "In-person"}
                              </span>
                            </div>
                            <div style={{ color: T.muted, fontSize: 11, marginTop: 4 }}>
                              Booked: {selectedAppt.bookedAt} · ID: {selectedAppt.id}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ background: selectedAppt.status === "Cancelled" ? `${T.red}22` : `${T.green}22`, color: selectedAppt.status === "Cancelled" ? T.red : T.green, padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700 }}>
                            {selectedAppt.status}
                          </span>
                          <div style={{ fontSize: 18, fontWeight: 800, color: T.green, marginTop: 8 }}>{selectedAppt.fee || "—"}</div>
                        </div>
                      </div>
                      {selectedAppt.reason && (
                        <div style={{ marginTop: 16, padding: "12px 16px", background: `${T.accent}08`, borderRadius: 10, border: `1px solid ${T.border}` }}>
                          <div style={{ fontSize: 11, color: T.muted, marginBottom: 4, fontWeight: 600 }}>REASON</div>
                          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>{selectedAppt.reason}</div>
                        </div>
                      )}
                      {selectedAppt.status !== "Cancelled" && (
                        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                          <button
                            onClick={() => setEditingAppt(selectedAppt)}
                            style={{ padding: "9px 20px", background: `${T.accent}22`, color: T.a2, border: `1px solid ${T.accent}44`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = `${T.accent}44`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = `${T.accent}22`;
                            }}
                          >
                            ✏️ Update Appointment
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Cancel this appointment?")) {
                                onCancel(selectedAppt.id);
                                setSelectedAppt({ ...selectedAppt, status: "Cancelled" });
                              }
                            }}
                            style={{ padding: "9px 20px", background: `${T.red}22`, color: T.red, border: `1px solid ${T.red}44`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = `${T.red}44`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = `${T.red}22`;
                            }}
                          >
                            ✕ Cancel Appointment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: 32, background: `${T.green}15`, border: `1px solid ${T.green}44`, borderRadius: 18, padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 36 }}>🔒</div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>100% Confidential</div>
          <div style={{ color: T.muted, fontSize: 13 }}>
            All sessions are private and secure. Your mental health journey stays between you and your therapist.
          </div>
        </div>
      </div>
    </div>
  );
}
