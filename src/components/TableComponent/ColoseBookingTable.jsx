import React, { useState } from "react";
import theme from '../../../theme';

// ── Helpers ───────────────────────────────────────────────────────────────────
const DATES = [
  "2020-10-23", "2020-10-24", "2020-10-25", "2020-10-26",
  "2020-10-27", "2020-10-28", "2020-10-29", "2020-10-30",
];

const TIMES = [
  "00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30",
  "04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30",
  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
  "20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30",
];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  return d
    .toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    .replace(/(\d+)/, `${day}${suffix}`);
}

function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

let nextId = 6;

// ── Styled Select ─────────────────────────────────────────────────────────────
function StyledSelect({ value, onChange, options, darkMode, border, text }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: "none",
          padding: "6px 32px 6px 12px",
          borderRadius: 8,
          border: `1px solid ${border}`,
          background: darkMode ? "#1e2027" : "#fff",
          color: text,
          fontSize: 13,
          cursor: "pointer",
          outline: "none",
          minWidth: 130,
        }}
      >
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span style={{
        position: "absolute", right: 10, pointerEvents: "none",
        color: text, fontSize: 11, opacity: 0.5,
      }}>▾</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SuspendedBookingSlots({ darkMode = false }) {

  // ── Palette resolution — identical pattern to BookingTable ──────────────────
  const palette  = darkMode ? theme.dark : theme;
  const bg       = palette.cardBg;
  const surface  = palette.surface  || (darkMode ? "#1e2027" : "#f8fafc");
  const border   = palette.border;
  const text     = palette.foreground;
  const subtext  = palette.subtext  || (darkMode ? "#94a3b8" : "#64748b");
  const headerBg = palette.headerBg || (darkMode ? "#1e2027" : "#f1f5f9");
  const rowHover = palette.hoverBg  || (darkMode ? "#1e2027" : "#f8faff");

  const [fromDate, setFromDate] = useState("2020-10-23");
  const [fromTime, setFromTime] = useState("00:30");
  const [toDate,   setToDate]   = useState("2020-10-23");
  const [toTime,   setToTime]   = useState("00:30");

  const [slots, setSlots] = useState([
    { id: 1, fromDate: "2026-01-29", fromTime: "00:00", toDate: "2026-01-29", toTime: "23:30" },
    { id: 2, fromDate: "2026-01-29", fromTime: "00:00", toDate: "2026-01-29", toTime: "23:30" },
    { id: 3, fromDate: "2026-01-29", fromTime: "00:00", toDate: "2026-01-29", toTime: "23:30" },
    { id: 4, fromDate: "2026-01-29", fromTime: "00:00", toDate: "2026-01-29", toTime: "23:30" },
    { id: 5, fromDate: "2026-01-29", fromTime: "00:00", toDate: "2026-01-29", toTime: "23:30" },
  ]);

  const addSlot   = () => setSlots(s => [...s, { id: nextId++, fromDate, fromTime, toDate, toTime }]);
  const removeSlot = (id) => setSlots(s => s.filter(x => x.id !== id));

  const COLS = ["From Date", "From Time", "To Date", "To Time", "Action"];

  return (
    <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>

      {/* ── Header ── */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}` }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: text }}>
          Add Suspended Booking Slots
        </h2>
      </div>

      {/* ── Controls toolbar — same surface/border/padding as BookingTable toolbar ── */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 16,
        padding: "14px 20px", borderBottom: `1px solid ${border}`, background: surface,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: subtext, marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Closed from Date
          </div>
          <StyledSelect value={fromDate} onChange={setFromDate} options={DATES} darkMode={darkMode} border={border} text={text} />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: subtext, marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Closed from Time
          </div>
          <StyledSelect value={fromTime} onChange={setFromTime} options={TIMES} darkMode={darkMode} border={border} text={text} />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: subtext, marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Closed to Date
          </div>
          <StyledSelect value={toDate} onChange={setToDate} options={DATES} darkMode={darkMode} border={border} text={text} />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: subtext, marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Closed to Time
          </div>
          <StyledSelect value={toTime} onChange={setToTime} options={TIMES} darkMode={darkMode} border={border} text={text} />
        </div>

        {/* Green button — uses same green as table badges in BookingTable */}
        <button
          onClick={addSlot}
          style={{
            padding: "7px 18px",
            borderRadius: 8,
            border: "none",
            background: "#22c55e",   // same green used in BookingTable table badges
            color: theme.text_light,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          + Add a suspend slot
        </button>
      </div>

      {/* ── Table — identical structure/styles to BookingTable ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {COLS.map(col => (
                <th key={col} style={{
                  padding: "10px 14px",
                  textAlign: col === "Action" ? "center" : "left",
                  fontWeight: 600,
                  color: subtext,
                  fontSize: 12,
                  borderBottom: `1px solid ${border}`,
                  whiteSpace: "nowrap",
                }}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {slots.map((slot, i) => (
              <tr
                key={slot.id}
                style={{
                  borderBottom: `1px solid ${border}`,
                  background: i % 2 === 0 ? bg : surface,
                  transition: "background 0.12s",
                  cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.background = rowHover}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? bg : surface}
              >
                <td style={{ padding: "12px 14px", color: text, fontWeight: 500 }}>
                  {formatDate(slot.fromDate)}
                </td>
                <td style={{ padding: "12px 14px", color: text }}>
                  {formatTime(slot.fromTime)}
                </td>
                <td style={{ padding: "12px 14px", color: text, fontWeight: 500 }}>
                  {formatDate(slot.toDate)}
                </td>
                <td style={{ padding: "12px 14px", color: text }}>
                  {formatTime(slot.toTime)}
                </td>
                <td style={{ padding: "12px 14px", textAlign: "center", verticalAlign: "middle" }}>
                  <button
                    onClick={() => removeSlot(slot.id)}
                    style={{
                      background: "transparent", border: "none",
                      cursor: "pointer", padding: 0,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                    title="Remove slot"
                  >
                    {/* Red × circle — uses theme.status.cancelled for colour consistency */}
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="13" cy="13" r="12"
                        stroke={theme.status?.cancelled || theme.status?.noShow}
                        strokeWidth="1.5"
                        fill={darkMode
                          ? (theme.dark?.status?.cancelled ? `${theme.dark.status.cancelled}22` : "rgba(239,68,68,0.15)")
                          : (theme.status?.cancelled ? `${theme.status.cancelled}15` : "rgba(239,68,68,0.07)")
                        }
                      />
                      <path
                        d="M9 9L17 17M17 9L9 17"
                        stroke={theme.status?.cancelled || theme.status?.noShow}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {slots.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: subtext }}>
            No suspended slots added.
          </div>
        )}
      </div>
    </div>
  );
}