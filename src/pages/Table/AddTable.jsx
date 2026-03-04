import React, { useState } from 'react';
import theme from '../../../theme';

const TABLE_TYPES = ["Circle", "Square", "Rectangle", "Oval", "Bar"];

const AddTable = ({ darkMode = false, customTheme, onAdd }) => {
  const palette = darkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const [form, setForm] = useState({
    tableNo: "",
    minSeat: "",
    maxSeat: "",
    tableType: "Circle",
    label: "",
    color: "#FF0000",
  });

  const [colorHex, setColorHex] = useState("#FF0000");

  const [tables, setTables] = useState([
    { id: 1, label: "Table - 01", tableNo: "", minSeat: "", maxSeat: "" },
    { id: 2, label: "Table - 02", tableNo: "", minSeat: "", maxSeat: "" },
    { id: 3, label: "Table - 03", tableNo: "", minSeat: "", maxSeat: "" },
    { id: 4, label: "Table - 04", tableNo: "", minSeat: "", maxSeat: "" },
  ]);

  // ── Form handlers ──────────────────────────────────────────────
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleColorChange = (e) => {
    const val = e.target.value;
    setColorHex(val);
    setForm((prev) => ({ ...prev, color: val }));
  };

  const handleHexInput = (e) => {
    let val = e.target.value;
    if (!val.startsWith("#")) val = "#" + val;
    setColorHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setForm((prev) => ({ ...prev, color: val }));
    }
  };

  const handleAdd = () => {
    const newId = tables.length ? Math.max(...tables.map((t) => t.id)) + 1 : 1;
    const newLabel = `Table - ${String(newId).padStart(2, "0")}`;
    setTables((prev) => [...prev, { id: newId, label: newLabel, tableNo: form.tableNo, minSeat: form.minSeat, maxSeat: form.maxSeat }]);
    if (onAdd) onAdd({ ...form, id: newId });
    setForm({ tableNo: "", minSeat: "", maxSeat: "", tableType: "Circle", label: "", color: "#FF0000" });
    setColorHex("#FF0000");
  };

  // ── Card handlers ──────────────────────────────────────────────
  const handleCardChange = (id, field, value) => {
    setTables((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleCardSave = (id) => {
    const table = tables.find((t) => t.id === id);
    if (onAdd) onAdd(table);
  };

  // ── Shared styles ──────────────────────────────────────────────
  const inputStyle = {
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    color: palette.foreground,
    borderRadius: "0.75rem",
    padding: "0.45rem 0.75rem",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: palette.foreground,
    marginBottom: "0.35rem",
    display: "block",
    textAlign: "left",
  };

  const cardInputStyle = {
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    color: palette.foreground,
    borderRadius: "0.65rem",
    padding: "0.4rem 0.65rem",
    fontSize: "0.8rem",
    outline: "none",
    width: "100%",
  };

  const cardLabelStyle = {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: palette.foreground,
    marginBottom: "0.25rem",
    display: "block",
    textAlign: "left",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Add Table Form ── */}
      <div
        className="w-full rounded-3xl border p-6"
        style={{
          background: palette.cardBg,
          borderColor: palette.border,
          color: palette.foreground,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, textAlign: "left", color: palette.foreground }}>
          Add Table
        </h1>

        <div className="flex flex-wrap items-end gap-4">

          {/* Table No */}
          <div style={{ minWidth: "90px", flex: "1 1 90px" }}>
            <label style={labelStyle}>Table No</label>
            <input type="text" value={form.tableNo} onChange={(e) => handleChange("tableNo", e.target.value)} style={inputStyle} />
          </div>

          {/* Min Seat */}
          <div style={{ minWidth: "90px", flex: "1 1 90px" }}>
            <label style={labelStyle}>Min Seat</label>
            <input type="number" min={0} value={form.minSeat} onChange={(e) => handleChange("minSeat", e.target.value)} style={inputStyle} />
          </div>

          {/* Max Seat */}
          <div style={{ minWidth: "110px", flex: "1 1 110px" }}>
            <label style={labelStyle}>Max Seat</label>
            <input type="number" min={0} value={form.maxSeat} onChange={(e) => handleChange("maxSeat", e.target.value)} style={inputStyle} />
          </div>

          {/* Table Type */}
          <div style={{ minWidth: "120px", flex: "1 1 120px" }}>
            <label style={labelStyle}>Table Type</label>
            <div style={{ position: "relative" }}>
              <select
                value={form.tableType}
                onChange={(e) => handleChange("tableType", e.target.value)}
                style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: "2.2rem", cursor: "pointer" }}
              >
                {TABLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <span style={{ position: "absolute", right: "0.7rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: palette.foreground, opacity: 0.5 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Label */}
          <div style={{ minWidth: "100px", flex: "1 1 100px" }}>
            <label style={labelStyle}>Label</label>
            <input type="text" value={form.label} onChange={(e) => handleChange("label", e.target.value)} style={inputStyle} />
          </div>

          {/* Color */}
          <div style={{ minWidth: "130px", flex: "0 0 auto" }}>
            <label style={labelStyle}>Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: "0.75rem", padding: "0.35rem 0.65rem" }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer", margin: 0 }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: form.color, border: `2px solid ${palette.border}`, flexShrink: 0 }} />
                <input type="color" value={form.color} onChange={handleColorChange} style={{ opacity: 0, position: "absolute", width: "26px", height: "26px", cursor: "pointer", border: "none" }} />
              </label>
              <input
                type="text"
                value={colorHex.replace("#", "").toUpperCase()}
                onChange={handleHexInput}
                maxLength={7}
                style={{ background: "transparent", border: "none", outline: "none", color: palette.foreground, fontSize: "0.85rem", fontWeight: "600", width: "68px", fontFamily: "monospace" }}
              />
            </div>
          </div>

          {/* Add Button */}
          <div style={{ flex: "0 0 auto" }}>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: palette.status.reconfirmed, color: palette.buttonText || "#fff", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M14 3v18M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
              </svg>
              Add New Table
            </button>
          </div>

        </div>
      </div>

      {/* ── Table Cards Grid — 4 columns ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {tables.map((table) => (
          <div
            key={table.id}
            className="rounded-2xl border p-4"
            style={{
              background: palette.cardBg,
              borderColor: palette.border,
              color: palette.foreground,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              position: "relative",
            }}
          >
            {/* Color dot — top right corner */}
            <div style={{
              position: "absolute",
              top: "0.85rem",
              right: "0.85rem",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: table.color || "#FF0000",
              border: `2px solid ${palette.border}`,
            }} />
            {/* Card Title */}
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: palette.foreground, margin: 0, paddingRight: "1.5rem" }}>
              {table.label}
            </p>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <label style={cardLabelStyle}>Table No</label>
                <input
                  type="text"
                  value={table.tableNo}
                  onChange={(e) => handleCardChange(table.id, "tableNo", e.target.value)}
                  style={cardInputStyle}
                />
              </div>
              <div>
                <label style={cardLabelStyle}>Min Seat</label>
                <input
                  type="number"
                  min={0}
                  value={table.minSeat}
                  onChange={(e) => handleCardChange(table.id, "minSeat", e.target.value)}
                  style={cardInputStyle}
                />
              </div>
              <div>
                <label style={cardLabelStyle}>Max Seat</label>
                <input
                  type="number"
                  min={0}
                  value={table.maxSeat}
                  onChange={(e) => handleCardChange(table.id, "maxSeat", e.target.value)}
                  style={cardInputStyle}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => handleCardSave(table.id)}
              style={{
                marginTop: "auto",
                background: palette.status.reconfirmed,
                color: palette.buttonText || "#fff",
                border: "none",
                borderRadius: "0.65rem",
                padding: "0.5rem 1rem",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AddTable;