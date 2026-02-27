import React, { useState } from "react";
import theme from '../../../theme';
import { MOCK_TIMES, DAYS, DURATION_OPTIONS, BOOKING_UNTIL_OPTIONS, CUTOFF_OPTIONS } from '../../MockDb';
import { IoSettingsOutline } from "react-icons/io5";


//  StyledSelect (Opening Times table rows)
function StyledSelect({ value, onChange, options, darkMode, border, text, isSelected, extraStyle }) {
  return (
    <div className="relative inline-flex items-center w-full">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: "none",
          padding: "6px 32px 6px 12px",
          borderRadius: 8,
          border: `1px solid ${isSelected ? theme.status?.reconfirmed || "#3b82f6" : border}`,
          background: darkMode ? "#1e2027" : "#fff",
          color: text,
          fontSize: 13,
          cursor: "pointer",
          outline: "none",
          width: "100%",
          ...(extraStyle || {}),
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="absolute right-2.5 pointer-events-none text-[11px] opacity-50" style={{ color: text }}>▾</span>
    </div>
  );
}

//  FieldInput
function FieldInput({ label, value, onChange, darkMode, border, text, multiline, placeholder }) {
  const inputBg = darkMode ? "#1e2027" : "#f1f5f9";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: text, textAlign: 'left', width: '100%' }}>{label}</label>}
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
          style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 13, outline: "none" }} />
      )}
    </div>
  );
}

//  FieldSelect 
function FieldSelect({ label, value, onChange, options, darkMode, border, text }) {
  const inputBg = darkMode ? "#1e2027" : "#f1f5f9";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: text, textAlign: 'left', width: '100%' }}>{label}</label>}
      <div className="relative inline-flex items-center w-full">
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ appearance: "none", padding: "8px 32px 8px 12px", borderRadius: 8, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 13, cursor: "pointer", outline: "none", width: "100%" }}>
          {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
        <span className="absolute right-2.5 pointer-events-none text-[11px] opacity-50" style={{ color: text }}>▾</span>
      </div>
    </div>
  );
}

function NumberSelect({ label, value, onChange, min = 1, max = 100, darkMode, border, text }) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => String(i + min));
  return <FieldSelect label={label} value={value} onChange={onChange} options={options} darkMode={darkMode} border={border} text={text} />;
}

//  Shared footer buttons 
function CardFooter({ onCancel, onSave, cancelLabel = "Cancel", saveLabel = "Save", border }) {
  return (
    <div className="flex items-center justify-end gap-4 px-5 py-4" style={{ borderTop: `1px solid ${border}` }}>
      <button onClick={onCancel} className="px-6 py-1.5 rounded-lg text-[13px] font-semibold cursor-pointer transition-opacity hover:opacity-85"
        style={{ background: "transparent", border: `1.5px solid ${theme.status?.noShow || "#ef4444"}`, color: theme.status?.noShow || "#ef4444" }}>
        {cancelLabel}
      </button>
      <button onClick={onSave} className="px-6 py-1.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-opacity hover:opacity-85"
        style={{ background: theme.status.reconfirmed, color: theme.text_light }}>
        {saveLabel}
      </button>
    </div>
  );
}

// 1. MASTER CONFIGURATIONS
function MasterConfigurations({ darkMode = false, onCancel, onSave }) {
  const palette = darkMode ? theme.dark : theme;
  const bg = palette.cardBg;
  const border = palette.border;
  const text = palette.foreground;
  const s = { darkMode, border, text };

  const [reservationDuration, setReservationDuration]       = useState("30 Min after end");
  const [minPartySize, setMinPartySize]                     = useState("30");
  const [maxPartySize, setMaxPartySize]                     = useState("50");
  const [lastBookingCutoff, setLastBookingCutoff]           = useState("30 Min after end");
  const [timeOfLastReservation, setTimeOfLastReservation]   = useState("Booking allowed until closing");
  const [lastBookingCutoff2, setLastBookingCutoff2]         = useState("30 Min after end");
  const [restaurantName, setRestaurantName]                 = useState("TEST");
  const [restaurantContact, setRestaurantContact]           = useState("0000000000");
  const [restaurantEmail, setRestaurantEmail]               = useState("test@gmail.com");
  const [restaurantWebsite, setRestaurantWebsite]           = useState("test.com");
  const [restaurantAddress, setRestaurantAddress]           = useState("Alison Business Center, 39/40\nAlison Crescent\nSheffield");

  return (
    <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${border}` }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: text, textAlign: 'center', width: '100%' }}>Master Configurations</h1>
        <button className="flex items-center justify-center rounded-full w-9 h-9 border-none cursor-pointer transition-opacity hover:opacity-85"
          style={{ background: theme.status.reconfirmed, color: theme.text_light, fontSize: 18 }}>
         <IoSettingsOutline />
        </button>
      </div>

      <div style={{ padding: "28px 28px 16px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0 24px" }}>
          <FieldSelect label="Default Reservation Duration" value={reservationDuration} onChange={setReservationDuration} options={DURATION_OPTIONS} {...s} />
          <NumberSelect label="Min Party Size" value={minPartySize} onChange={setMinPartySize} min={1} max={100} {...s} />
          <NumberSelect label="Max Party Size" value={maxPartySize} onChange={setMaxPartySize} min={1} max={200} {...s} />
          <FieldSelect label="Last booking cutoff" value={lastBookingCutoff} onChange={setLastBookingCutoff} options={CUTOFF_OPTIONS} {...s} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0 24px" }}>
          <FieldSelect label="Time of last reservation" value={timeOfLastReservation} onChange={setTimeOfLastReservation} options={BOOKING_UNTIL_OPTIONS} {...s} />
          <FieldSelect label="Last booking cutoff" value={lastBookingCutoff2} onChange={setLastBookingCutoff2} options={CUTOFF_OPTIONS} {...s} />
          <FieldInput label="Restaurant Name" value={restaurantName} onChange={setRestaurantName} {...s} />
          <FieldInput label="Restaurant Contact" value={restaurantContact} onChange={setRestaurantContact} {...s} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "0 24px" }}>
          <FieldInput label="Restaurant Email" value={restaurantEmail} onChange={setRestaurantEmail} {...s} />
          <FieldInput label="Restaurant Website" value={restaurantWebsite} onChange={setRestaurantWebsite} {...s} />
          <FieldInput label="Restaurant Address" value={restaurantAddress} onChange={setRestaurantAddress} multiline {...s} />
        </div>
      </div>

      <CardFooter onCancel={onCancel} onSave={onSave} cancelLabel="Remove" saveLabel="Save" border={border} />
    </div>
  );
}

// 3. BOOKING MESSAGES CONFIGURATIONS
function PreviewBanner({ title, subtitle, color = "#22c55e" }) {
  return (
    <div style={{ borderRadius: 10, background: color, padding: "18px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 80, textAlign: "center" }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{title || "\u00a0"}</span>
      {subtitle && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.88)", marginTop: 5, lineHeight: 1.4 }}>{subtitle}</span>}
    </div>
  );
}

function LabeledInput({ accentColor, boldLabel, thinLabel, value, onChange, border, text, darkMode }) {
  const inputBg = darkMode ? "#1e2027" : "#f1f5f9";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, textAlign: 'left', width: '100%' }}>
        <span style={{ fontWeight: 700, color: accentColor }}>{boldLabel}</span>
        <span style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>{thinLabel}</span>
      </label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 13, outline: "none", width: "100%" }} />
    </div>
  );
}

function ConfigCard({ fields, previewTitle, previewSubtitle, previewColor, darkMode, border, text, accentColor }) {
  return (
    <div style={{ background: darkMode ? "#16181d" : "#fff", border: `1px solid ${border}`, borderRadius: 14, padding: "20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {fields.map((f, i) => (
          <LabeledInput key={i} accentColor={accentColor} boldLabel={f.boldLabel} thinLabel={f.thinLabel}
            value={f.value} onChange={f.onChange} border={border} text={text} darkMode={darkMode} />
        ))}
      </div>
      <PreviewBanner title={previewTitle} subtitle={previewSubtitle} color={previewColor} />
    </div>
  );
}

function BookingMessagesConfigurations({ darkMode = false, onCancel, onSave }) {
  const palette = darkMode ? theme.dark : theme;
  const bg     = palette.cardBg;
  const border = palette.border;
  const text   = palette.foreground;
  const s = { darkMode, border, text };

  const [confWidgetTitle,     setConfWidgetTitle]     = useState("Your Reservation is Confirmed...");
  const [confWidgetSubtitle,  setConfWidgetSubtitle]  = useState("You will receive an confirmation email with your reser...");
  const [confEmailTitle,      setConfEmailTitle]      = useState("Your Reservation is now Confirmed");
  const [confEmailSubtitle,   setConfEmailSubtitle]   = useState("Presto Kitchen confirmed your reservation to dine");
  const [reconfEmailTitle,    setReconfEmailTitle]    = useState("Booking reminder...");
  const [reconfEmailSubtitle, setReconfEmailSubtitle] = useState("Presto Kitchen confirmed your reservation to dine");
  const [waitWidgetTitle,     setWaitWidgetTitle]     = useState("Your Reservation is Confirmed...");
  const [waitWidgetSubtitle,  setWaitWidgetSubtitle]  = useState("You will receive an confirmation email with your reser...");
  const [waitEmailTitle,      setWaitEmailTitle]      = useState("Your Reservation is now Confirmed");
  const [waitEmailSubtitle,   setWaitEmailSubtitle]   = useState("Presto Kitchen confirmed your reservation to dine");

  const GREEN = "#22c55e", DARK_GREEN = "#16a34a", PURPLE = "#8b5cf6";

  return (
    <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${border}` }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: text }}>Booking Messages Configurations</h1>
      </div>

      <div style={{ padding: "20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <ConfigCard {...s} accentColor={GREEN} previewColor={GREEN} previewTitle={confWidgetTitle} previewSubtitle={confWidgetSubtitle}
          fields={[
            { boldLabel: "Confirmed booking", thinLabel: " - successful message title (widget)", value: confWidgetTitle, onChange: setConfWidgetTitle },
            { boldLabel: "Confirmed booking", thinLabel: " - successful message subtitle (widget)", value: confWidgetSubtitle, onChange: setConfWidgetSubtitle },
          ]} />
        <ConfigCard {...s} accentColor={GREEN} previewColor={GREEN} previewTitle={confEmailTitle} previewSubtitle={confEmailSubtitle}
          fields={[
            { boldLabel: "Booking Confirmation", thinLabel: " - email title (Email)", value: confEmailTitle, onChange: setConfEmailTitle },
            { boldLabel: "Booking Confirmation", thinLabel: " - email subtitle (Email)", value: confEmailSubtitle, onChange: setConfEmailSubtitle },
          ]} />
        <ConfigCard {...s} accentColor={text} previewColor={DARK_GREEN} previewTitle={reconfEmailTitle} previewSubtitle={reconfEmailSubtitle}
          fields={[
            { boldLabel: "Booking Reconfirmation", thinLabel: " - email title (Email)", value: reconfEmailTitle, onChange: setReconfEmailTitle },
            { boldLabel: "Booking Reconfirmation", thinLabel: " - email subtitle (Email)", value: reconfEmailSubtitle, onChange: setReconfEmailSubtitle },
          ]} />
        <ConfigCard {...s} accentColor="#f59e0b" previewColor={GREEN} previewTitle={waitWidgetTitle} previewSubtitle={waitWidgetSubtitle}
          fields={[
            { boldLabel: "Waiting List booking", thinLabel: " - successful message title (widget)", value: waitWidgetTitle, onChange: setWaitWidgetTitle },
            { boldLabel: "Waiting List booking", thinLabel: " - successful message subtitle (widget)", value: waitWidgetSubtitle, onChange: setWaitWidgetSubtitle },
          ]} />
        <ConfigCard {...s} accentColor="#f59e0b" previewColor={PURPLE} previewTitle={waitEmailTitle} previewSubtitle={waitEmailSubtitle}
          fields={[
            { boldLabel: "Waiting List booking", thinLabel: " - customer email title (Email)", value: waitEmailTitle, onChange: setWaitEmailTitle },
            { boldLabel: "Waiting List booking", thinLabel: " - customer email subtitle (Email)", value: waitEmailSubtitle, onChange: setWaitEmailSubtitle },
          ]} />
      </div>

      <CardFooter onCancel={onCancel} onSave={onSave} cancelLabel="Remove" saveLabel="Save" border={border} />
    </div>
  );
}

// DEFAULT EXPORT — all 3 cards stacked
export default function OpeningTimes({ darkMode = false, onCancel, onSave }) {
  const palette  = darkMode ? theme.dark : theme;
  const bg       = palette.cardBg;
  const surface  = palette.surface  || (darkMode ? "#1e2027" : "#f8fafc");
  const border   = palette.border;
  const text     = palette.foreground;
  const subtext  = palette.subtext  || (darkMode ? "#94a3b8" : "#64748b");
  const headerBg = palette.headerBg || (darkMode ? "#1e2027" : "#f1f5f9");
  const rowHover = palette.hoverBg  || (darkMode ? "#1e2027" : "#f8faff");

  const [rows, setRows] = useState(
    DAYS.map((day, i) => ({ id: i + 1, day, fromTime: "12:00", toTime: "12:00" }))
  );

  const updateTime = (id, field, value) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const accentColor = theme.status?.reconfirmed || "#3b82f6";
  const COLS = ["No", "Day of Week", "From Time", "To Time"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── 1. Master Configurations ── */}
      <MasterConfigurations darkMode={darkMode} onCancel={onCancel} onSave={onSave} />

      {/* ── 2. Opening Times ── */}
      <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: text, textAlign: 'center', width: '100%' }}>Opening Times</h1>
          <button className="flex items-center justify-center rounded-full w-9 h-9 border-none cursor-pointer transition-opacity hover:opacity-85"
            style={{ background: theme.status.reconfirmed, color: theme.text_light, fontSize: 18 }}>
            <IoSettingsOutline />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: headerBg }}>
                {COLS.map(col => (
                  <th key={col} className="px-3.5 py-2.5 text-center text-[12px] font-semibold whitespace-nowrap"
                    style={{ color: subtext, borderBottom: `1px solid ${border}` }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                return (
                  <tr key={row.id}
                    className="transition-colors duration-100"
                    style={{
                      borderBottom: `1px solid ${border}`,
                      background: i % 2 === 0 ? bg : surface,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = rowHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? bg : surface; }}
                  >
                    <td className="px-3.5 py-3 text-center font-semibold" style={{ color: accentColor, width: 80 }}>#{row.id}</td>
                    <td className="px-3.5 py-3 text-center font-medium" style={{ color: text }}>{row.day}</td>
                    <td className="px-3.5 py-3 text-center">
                      <StyledSelect value={row.fromTime} onChange={val => updateTime(row.id, "fromTime", val)}
                        options={MOCK_TIMES} darkMode={darkMode} border={border} text={text} extraStyle={{ minWidth: 120 }} />
                    </td>
                    <td className="px-3.5 py-3 text-center">
                      <StyledSelect value={row.toTime} onChange={val => updateTime(row.id, "toTime", val)}
                        options={MOCK_TIMES} darkMode={darkMode} border={border} text={text} extraStyle={{ minWidth: 120 }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <CardFooter onCancel={onCancel} onSave={onSave} cancelLabel="Cancel" saveLabel="Save"  border={border} />
      </div>

      <BookingMessagesConfigurations darkMode={darkMode} onCancel={onCancel} onSave={onSave} />

    </div>
  );
}