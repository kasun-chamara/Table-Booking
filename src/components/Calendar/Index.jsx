import React, { useState } from "react";
import theme from "../../../theme";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function Calendar(props) {
  const {
    accentColor,
    darkMode = false,
    onDateSelect,
  } = props;
  const palette = darkMode ? theme.dark : theme;
  const bg = palette.cardBg;
  const border = palette.border;
  const text = palette.foreground;
  const subtext = palette.subtext || "#6b7280";
  const navBg = palette.navBg || (darkMode ? "#1e2027" : "#f3f4f6");
  const hoverBg = palette.hoverBg || (darkMode ? "#1e2027" : "#f3f4f6");
  const accent = accentColor || palette.status.reconfirmed;
  const today = new Date();
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [selected, setSelected] = useState(today.getDate());

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  const prevMonth = () => setCurrent(c => {
    const m = c.month === 0 ? 11 : c.month - 1;
    const y = c.month === 0 ? c.year - 1 : c.year;
    return { month: m, year: y };
  });

  const nextMonth = () => setCurrent(c => {
    const m = c.month === 11 ? 0 : c.month + 1;
    const y = c.month === 11 ? c.year + 1 : c.year;
    return { month: m, year: y };
  });

  const handleSelect = (day) => {
    setSelected(day);
    onDateSelect?.(new Date(current.year, current.month, day));
  };

  const isToday = (day) =>
    day === today.getDate() &&
    current.month === today.getMonth() &&
    current.year === today.getFullYear();


  // Build grid cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 20,
        padding: "20px 24px",
        fontFamily: "inherit",
      }}
    >
      {/* Title */}
      <p style={{ fontWeight: 700, fontSize: 18, color: text, marginBottom: 16 }}>
        Calendar
        <span style={{
          marginLeft: 8,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: accent,
          boxShadow: `0 0 6px ${accent}`,
          display: "inline-block",
          verticalAlign: "middle"
        }} />
      </p>

      {/* Month Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg,
          borderRadius: 10,
          padding: "6px 12px",
          marginBottom: 16,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: subtext, fontWeight: 700, fontSize: 16, padding: "2px 6px",
          }}
        >
          «
        </button>
        <span style={{ fontWeight: 600, fontSize: 14, color: text }}>
          {MONTHS[current.month]} {current.year}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: subtext, fontWeight: 700, fontSize: 16, padding: "2px 6px",
          }}
        >
          »
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: subtext, padding: "4px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const isSelected = day === selected;
          const isTod = isToday(day);

          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: isSelected || isTod ? 700 : 400,
                background: isSelected
                  ? accent
                  : "transparent",
                color: isSelected
                  ? "#fff"
                  : isTod
                  ? accent
                  : text,
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => {
                if (!isSelected) e.currentTarget.style.background = hoverBg;
              }}
              onMouseLeave={e => {
                if (!isSelected) e.currentTarget.style.background = "transparent";
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}