import React, { useState } from "react";
import theme from '../../../theme';
import { MOCK_DATES, MOCK_TIMES } from '../../MockDb';

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

function StyledSelect({ value, onChange, options, darkMode, border, text, extraStyle }) {
  return (
    <div className="relative inline-flex items-center">
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
          ...(extraStyle || {}),
        }}
      >
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span
        className="absolute right-2.5 pointer-events-none text-[11px] opacity-50"
        style={{ color: text }}
      >▾</span>
    </div>
  );
}

export default function SuspendedBookingSlots({ darkMode = false }) {

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

  const addSlot    = () => setSlots(s => [...s, { id: nextId++, fromDate, fromTime, toDate, toTime }]);
  const removeSlot = (id) => setSlots(s => s.filter(x => x.id !== id));

  const COLS = ["From Date", "From Time", "To Date", "To Time", "Action"];

  return (
    <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>

      {/* ── Header ── */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}` }}>
        <h1 className="text-2xl font-bold text-left mb-4" style={{ color: text }}>
          Suspended Booking Slots
        </h1>
      </div>

      {/* ── Controls toolbar ── */}
      <div
        className="flex flex-wrap items-end gap-4 px-5 py-3.5"
        style={{ borderBottom: `1px solid ${border}`, background: surface }}
      >
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext , textAlign: 'left'}}>
            Closed from Date
          </div>
          <StyledSelect value={fromDate} onChange={setFromDate} options={MOCK_DATES} darkMode={darkMode} border={border} text={text} extraStyle={{ minWidth: 180 }} />
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext, textAlign: 'left' }}>
            Closed from Time
          </div>
          <StyledSelect value={fromTime} onChange={setFromTime} options={MOCK_TIMES} darkMode={darkMode} border={border} text={text} extraStyle={{ minWidth: 180 }} />
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext, textAlign: 'left' }}>
            Closed to Date
          </div>
          <StyledSelect value={toDate} onChange={setToDate} options={MOCK_DATES} darkMode={darkMode} border={border} text={text} extraStyle={{ minWidth: 180 }} />
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext, textAlign: 'left' }}>
            Closed to Time
          </div>
          <StyledSelect value={toTime} onChange={setToTime} options={MOCK_TIMES} darkMode={darkMode} border={border} text={text} extraStyle={{ minWidth: 180 }} />
        </div>

        <button
          onClick={addSlot}
          className="px-4 py-1.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-opacity hover:opacity-85 cursor-pointer border-none"
          style={{
            background: theme.status.reconfirmed,
            color: theme.text_light,
          }}
        >
          Add a suspend slot
        </button>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {COLS.map(col => (
                <th
                  key={col}
                  className="px-3.5 py-2.5 text-center text-[12px] font-semibold whitespace-nowrap"
                  style={{ color: subtext, borderBottom: `1px solid ${border}` }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {slots.map((slot, i) => (
              <tr
                key={slot.id}
                className="transition-colors duration-100 cursor-default"
                style={{
                  borderBottom: `1px solid ${border}`,
                  background: i % 2 === 0 ? bg : surface,
                }}
                onMouseEnter={e => e.currentTarget.style.background = rowHover}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? bg : surface}
              >
                <td className="px-3.5 py-3 font-medium" style={{ color: text }}>
                  {formatDate(slot.fromDate)}
                </td>
                <td className="px-3.5 py-3" style={{ color: text }}>
                  {formatTime(slot.fromTime)}
                </td>
                <td className="px-3.5 py-3 font-medium" style={{ color: text }}>
                  {formatDate(slot.toDate)}
                </td>
                <td className="px-3.5 py-3" style={{ color: text }}>
                  {formatTime(slot.toTime)}
                </td>
                <td className="px-3.5 py-3 text-center align-middle">
                  <button
                    onClick={() => removeSlot(slot.id)}
                    className="bg-transparent border-none cursor-pointer p-0 inline-flex items-center justify-center"
                    title="Remove slot"
                  >
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="13" cy="13" r="12"
                        stroke={theme.status?.noshow || theme.status?.noShow}
                        strokeWidth="1.5"
                        fill={darkMode
                          ? (theme.dark?.status?.noshow ? `${theme.dark.status.noshow}22` : "rgba(239,68,68,0.15)")
                          : (theme.status?.noshow ? `${theme.status.noshow}15` : "rgba(239,68,68,0.07)")
                        }
                      />
                      <path
                        d="M9 9L17 17M17 9L9 17"
                        stroke={theme.status?.noshow || theme.status?.noShow}
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
          <div className="text-center py-10" style={{ color: subtext }}>
            No suspended slots added.
          </div>
        )}
      </div>
    </div>
  );
}