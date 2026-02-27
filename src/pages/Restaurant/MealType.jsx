import React, { useState } from "react";
import theme from '../../../theme';
import { MOCK_TIMES } from '../../MockDb';
import { GiHotMeal } from "react-icons/gi";


const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CUTOFF_OPTIONS = [
  "15 Min after end",
  "30 Min after end",
  "45 Min after end",
  "1 Hour after end",
  "2 Hours after end",
];

let nextId = 2;

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
          minWidth: 100,
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

export default function MealTypeRestrictions({ darkMode = false }) {

  const palette  = darkMode ? theme.dark : theme;
  const bg       = palette.cardBg;
  const surface  = palette.surface  || (darkMode ? "#1e2027" : "#f8fafc");
  const border   = palette.border;
  const text     = palette.foreground;
  const subtext  = palette.subtext  || (darkMode ? "#94a3b8" : "#64748b");
  const headerBg = palette.headerBg || (darkMode ? "#1e2027" : "#f1f5f9");
  const rowHover = palette.hoverBg  || (darkMode ? "#1e2027" : "#f8faff");

  const [mealTitle, setMealTitle] = useState("Lunch");
  const [cutoff, setCutoff]       = useState("30 Min after end");

  // Static fixed rows for the top table — never changes
  // Static fixed rows for the top table — now 1 to 7
  const INITIAL_ROWS = Array.from({ length: 7 }, (_, idx) => ({
    id: idx + 1,
    title: "Lunch",
    cutoff: "30 Min after end",
    days: DAYS.map(day => ({ day, fromTime: "12:00", toTime: "12:00" })),
  }));

  // mealCards — drives the bottom cards, can be removed independently
  const [mealCards, setMealCards] = useState([
    {
      id: 1,
      title: "Lunch",
      cutoff: "30 Min after end",
      days: DAYS.map(day => ({ day, fromTime: "12:00", toTime: "12:00" })),
    },
  ]);

  const [expandedId, setExpandedId] = useState(() => 1); // always expanded by default

  const addNew = () => {
    if (!mealTitle.trim()) return;
    const newEntry = {
      id: nextId++,
      title: mealTitle,
      cutoff,
      days: DAYS.map(day => ({ day, fromTime: "12:00", toTime: "12:00" })),
    };
    setMealCards(prev => [...prev, { ...newEntry }]); // only add a card, table is static
    setExpandedId(newEntry.id);
  };

  // Only removes from cards — table is untouched
  const removeMeal = (id) => {
    setMealCards(prev => prev.filter(m => m.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const updateMealField = (id, field, value) => {
    setMealCards(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const updateTime = (mealId, dayIndex, field, value) => {
    setMealCards(prev =>
      prev.map(m =>
        m.id === mealId
          ? { ...m, days: m.days.map((d, i) => i === dayIndex ? { ...d, [field]: value } : d) }
          : m
      )
    );
  };

  const COLS = ["No", "Day of Week", "From Time", "To Time"];

  return (
    <div className="flex flex-col gap-5">

      {/* ── TOP CARD: Add form + table ── */}
      <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>

        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}` }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, textAlign: 'left', color: text }}>
            Add new meal type and set time restrictions
          </h1>
        </div>

        {/* Controls toolbar */}
        <div
          className="flex flex-wrap items-end gap-4 px-5 py-4"
          style={{ borderBottom: `1px solid ${border}`, background: surface }}
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext ,textAlign: 'left'}}>
              Meal Type Title
            </div>
            <StyledSelect
              value={mealTitle}
              onChange={setMealTitle}
              options={["Breakfast", "Lunch", "Dinner"]}
              darkMode={darkMode}
              border={border}
              text={text}
              extraStyle={{ minWidth: 160 }}
            />
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext ,textAlign: 'left'}}>
              Last booking cutoff
            </div>
            <StyledSelect
              value={cutoff}
              onChange={setCutoff}
              options={CUTOFF_OPTIONS}
              darkMode={darkMode}
              border={border}
              text={text}
              extraStyle={{ minWidth: 180 }}
            />
          </div>

          <button
            onClick={addNew}
            className="px-5 py-1.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-opacity hover:opacity-85 cursor-pointer border-none"
            style={{ background: theme.status.reconfirmed, color: theme.text_light }}
          >
            Add New
          </button>
        </div>

        {/* Table */}
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
              {INITIAL_ROWS.map(meal => (
                <tr
                  key={`meal-row-${meal.id}`}
                  className="transition-colors duration-100 cursor-default"
                  style={{
                    borderBottom: `1px solid ${border}`,
                    background: meal.id % 2 === 0 ? bg : surface,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = rowHover}
                  onMouseLeave={e => e.currentTarget.style.background = meal.id % 2 === 0 ? bg : surface}
                >
                  <td className="px-3.5 py-3 text-center font-semibold" style={{ color: theme.status?.reconfirmed, width: 80 }}>
                    #{meal.id}
                  </td>
                  <td className="px-3.5 py-3 text-center font-medium" style={{ color: text }}>
                    {meal.days[0].day}
                  </td>
                  <td className="px-3.5 py-3 text-center">
                    <StyledSelect
                      value={meal.days[0].fromTime}
                      onChange={val => updateTime(meal.id, 0, "fromTime", val)}
                      options={MOCK_TIMES}
                      darkMode={darkMode}
                      border={border}
                      text={text}
                      extraStyle={{ minWidth: 120 }}
                    />
                  </td>
                  <td className="px-3.5 py-3 text-center">
                    <StyledSelect
                      value={meal.days[0].toTime}
                      onChange={val => updateTime(meal.id, 0, "toTime", val)}
                      options={MOCK_TIMES}
                      darkMode={darkMode}
                      border={border}
                      text={text}
                      extraStyle={{ minWidth: 120 }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Meal cards — completely separate from the card above ── */}
      {mealCards.length > 0 && (
        <div className="flex flex-col gap-3">

          {/* ── "Current Meal Configuration" heading with lines either side ── */}
          <div className="flex items-center gap-3" style={{ margin: '16px 0 16px 0' }}>
            <div style={{ flex: 1, height: 2, background: border, borderRadius: 2 }} />
            <h1 style={{ fontSize: 24, fontWeight: 700, marginTop: 0, color: text, whiteSpace: 'nowrap' }}>
              Current Meal Configuration
            </h1>
            <div style={{ flex: 1, height: 2, background: border, borderRadius: 2 }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealCards.map(meal => (
              <div
                key={meal.id}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${border}`,
                  overflow: "hidden",
                  background: bg,
                }}
              >
                {/* Green banner header — always expanded, no toggle */}
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{ background: theme.primary.green_500 }}
                >
                  <span className="text-lg font-bold" style={{ color: theme.text_light }}>
                    {meal.title || "Untitled"}
                  </span>
                  <span
                    className="flex items-center justify-center rounded-full w-8 h-8"
                    style={{ background: "rgba(255,255,255,0.25)", color: theme.text_light, fontSize: 16 }}
                  >
                    <GiHotMeal />
                  </span>
                </div>

                {/* Always visible content */}
                <div>
                    {/* Editable fields */}
                    <div
                      className="flex flex-wrap items-end gap-4 px-5 py-4"
                      style={{ borderBottom: `1px solid ${border}`, background: surface }}
                    >
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext, textAlign: 'left' }}>
                          Meal Type Title
                        </div>
                        <StyledSelect
                          value={meal.title}
                          onChange={val => updateMealField(meal.id, "title", val)}
                          options={["Breakfast", "Lunch", "Dinner"]}
                          darkMode={darkMode}
                          border={border}
                          text={text}
                          extraStyle={{ minWidth: 160 }}
                        />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext, textAlign: 'left' }}>
                          Last booking cutoff
                        </div>
                        <StyledSelect
                          value={meal.cutoff}
                          onChange={val => updateMealField(meal.id, "cutoff", val)}
                          options={CUTOFF_OPTIONS}
                          darkMode={darkMode}
                          border={border}
                          text={text}
                          extraStyle={{ minWidth: 180 }}
                        />
                      </div>
                    </div>

                    {/* Days table */}
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
                          {Array.from({ length: 7 }, (_, idx) => (
                            <tr
                              key={`meal-card-row-${meal.id}-${idx+1}`}
                              className="transition-colors duration-100 cursor-default"
                              style={{
                                borderBottom: `1px solid ${border}`,
                                background: idx % 2 === 0 ? bg : surface,
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = rowHover}
                              onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? bg : surface}
                            >
                              <td className="px-3.5 py-3 text-center font-semibold" style={{ color: theme.status?.reconfirmed, width: 80 }}>
                                #{idx+1}
                              </td>
                              <td className="px-3.5 py-3 text-center font-medium" style={{ color: text }}>
                                {meal.days[idx % meal.days.length].day}
                              </td>
                              <td className="px-3.5 py-3 text-center">
                                <StyledSelect
                                  value={meal.days[idx % meal.days.length].fromTime}
                                  onChange={val => updateTime(meal.id, idx % meal.days.length, "fromTime", val)}
                                  options={MOCK_TIMES}
                                  darkMode={darkMode}
                                  border={border}
                                  text={text}
                                  extraStyle={{ minWidth: 120 }}
                                />
                              </td>
                              <td className="px-3.5 py-3 text-center">
                                <StyledSelect
                                  value={meal.days[idx % meal.days.length].toTime}
                                  onChange={val => updateTime(meal.id, idx % meal.days.length, "toTime", val)}
                                  options={MOCK_TIMES}
                                  darkMode={darkMode}
                                  border={border}
                                  text={text}
                                  extraStyle={{ minWidth: 120 }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Remove / Save */}
                    <div
                      className="flex items-center justify-end gap-4 px-5 py-4"
                      style={{ borderTop: `1px solid ${border}` }}
                    >
                      <button
                        onClick={() => removeMeal(meal.id)}
                        className="px-6 py-1.5 rounded-lg text-[13px] font-semibold cursor-pointer transition-opacity hover:opacity-85"
                        style={{
                          background: "transparent",
                          border: `1.5px solid ${theme.status?.noShow || theme.status?.noshow || "#ef4444"}`,
                          color: theme.status?.noShow || theme.status?.noshow || "#ef4444",
                        }}
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="px-6 py-1.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-opacity hover:opacity-85"
                        style={{ background: theme.status.reconfirmed, color: theme.text_light }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}