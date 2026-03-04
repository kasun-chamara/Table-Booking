import React, { useState } from 'react';
import theme from '../../../theme';

const SAMPLE_TABLES = [
  { id: 1,  label: "T2",  color: "#8B3A3A" },
  { id: 2,  label: "T12", color: "#C0444A" },
  { id: 3,  label: "T14", color: "#2B2B2B" },
  { id: 4,  label: "T15", color: "#2E7D6B" },
  { id: 5,  label: "T4",  color: "#1C1C1C" },
  { id: 6,  label: "T1",  color: "#3D6B4F" },
  { id: 7,  label: "T24", color: "#9B3D8C" },
  { id: 8,  label: "T11", color: "#4CAF50" },
  { id: 9,  label: "T3",  color: "#5C2A1E" },
];

const TableGroups = ({ darkMode = false, customTheme, onCreate }) => {
  const palette = darkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const [form, setForm] = useState({
    groupName: "",
    minSeats: "",
    maxSeats: "",
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTable = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!form.groupName) return;
    const selected = SAMPLE_TABLES.filter((t) => selectedIds.includes(t.id));
    const newGroup = { id: Date.now(), ...form, tables: selected };
    setGroups((prev) => [...prev, newGroup]);
    if (onCreate) onCreate(newGroup);
    setForm({ groupName: "", minSeats: "", maxSeats: "" });
    setSelectedIds([]);
  };

  const handleRemove = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Create New Table Group Card ── */}
      <div
        className="w-full rounded-3xl border p-6"
        style={{
          background: palette.cardBg,
          borderColor: palette.border,
          color: palette.foreground,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, textAlign: "left", color: palette.foreground }}>
          Table Groups
        </h1>

        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, textAlign: "left", color: palette.foreground }}>
          Create New Table Group
        </h2>

        {/* Form Row */}
        <div className="flex flex-wrap items-end gap-4" style={{ marginBottom: "1.25rem" }}>

          {/* Group Name */}
          <div style={{ minWidth: "180px", flex: "2 1 180px" }}>
            <label style={labelStyle}>Group Name</label>
            <input
              type="text"
              value={form.groupName}
              onChange={(e) => handleChange("groupName", e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Min Seats */}
          <div style={{ minWidth: "120px", flex: "1 1 120px" }}>
            <label style={labelStyle}>Min Seats</label>
            <input
              type="number"
              min={0}
              value={form.minSeats}
              onChange={(e) => handleChange("minSeats", e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Max Seats */}
          <div style={{ minWidth: "120px", flex: "1 1 120px" }}>
            <label style={labelStyle}>Max Seats</label>
            <input
              type="number"
              min={0}
              value={form.maxSeats}
              onChange={(e) => handleChange("maxSeats", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Select Tables */}
        <div>
          <label style={{ ...labelStyle, marginBottom: "0.6rem" }}>Select Tables</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>

            {SAMPLE_TABLES.map((table) => {
              const isSelected = selectedIds.includes(table.id);
              return (
                <button
                  key={table.id}
                  onClick={() => toggleTable(table.id)}
                  style={{
                    background: isSelected ? (palette.status?.reconfirmed || '#007bff') : palette.cardBg,
                    color: isSelected ? (palette.buttonText || '#fff') : palette.foreground,
                    border: isSelected
                      ? 'none'
                      : `.5px solid ${palette.border}`,
                    borderRadius: "0.6rem",
                    padding: "0.45rem 0",
                    width: "72px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    opacity: isSelected ? 1 : 0.85,
                    transition: "all 0.15s",
                    outline: "none",
                    boxShadow: isSelected ? `0 0 0 2px ${palette.foreground}33` : "none",
                  }}
                >
                  {table.label}
                </button>
              );
            })}

            {/* Create Group button — inline at the end */}
            <div style={{ marginLeft: "auto" }}>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: palette.status.reconfirmed,
                  color: palette.buttonText || "#fff",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  borderRadius: "0.75rem",
                  padding: "0.6rem 1.4rem",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                }}
              >
                Create Group
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ── Group Cards Grid ── */}
      {groups.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {groups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border p-4"
              style={{
                background: palette.cardBg,
                borderColor: palette.border,
                color: palette.foreground,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                textAlign: "center",
              }}
            >
              {/* Group Name */}
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: palette.foreground, margin: 0 }}>
                Table Group: {group.groupName}
              </p>

              {/* Divider */}
              <div style={{ height: "1px", background: palette.border }} />

              {/* Min / Max */}
              <p style={{ fontSize: "0.8rem", color: palette.foreground, opacity: 0.7, margin: 0 }}>
                Min Seat {group.minSeats || 0} / Max Seats {group.maxSeats || 0}
              </p>

              {/* Table tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
                {group.tables.map((t) => (
                  <span
                    key={t.id}
                    style={{
                      border: `2px solid ${palette.border}`,
                      color: palette.foreground,
                      borderRadius: "0.5rem",
                      padding: "0.2rem 0.65rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      background: "transparent",
                    }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: palette.border }} />

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(group.id)}
                style={{
                  background: palette.status?.noShow || "#E53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.65rem",
                  padding: "0.5rem 1rem",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TableGroups;