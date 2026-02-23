import React, { useState } from "react";
import { IoPrint, IoCallOutline, IoEyeOutline, IoDocumentAttachOutline, IoTimeOutline } from "react-icons/io5";
import { CiSearch, CiBoxList, CiViewTable } from "react-icons/ci";
import theme from '../../../theme';
import MOCK_DATA from '../../MockDb';
import ReminderConfirmModal from '../CardComponents/ReminderCard/Index';
import BookingDetailsModal from '../CardComponents/ClientDetails';

const STATUS_CONFIG = {
  waitingList: { label: "Waiting List", bg: theme.status.waitingList, color: theme.text_light },
  unallocated: { label: "Unallocated",  bg: theme.status.unallocated, color: theme.text_light },
  confirmed:   { label: "Confirmed",    bg: theme.status.confirmed,   color: theme.text_light },
  reconfirmed: { label: "Reconfirmed",  bg: theme.status.reconfirmed, color: theme.text_light },
  seated:      { label: "Seated",       bg: theme.status.seated,      color: theme.text_light },
  left:        { label: "Left",         bg: theme.status.left,        color: theme.text_light },
  noShow:      { label: "No Show",      bg: theme.status.noShow,      color: theme.text_light },
  cancelled:   { label: "Cancelled",    bg: theme.status.cancelled,   color: theme.text_light },
};

const COLS = ["Table", "Customer", "Time", "PAX", "Notes", "Src", "Dep £", "Status", "Action"];

function ViewBtn({ id, Icon, label, currentView, darkMode, text, subtext, onSetView }) {
  return (
    <button
      onClick={() => onSetView(id)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
        fontSize: 13, fontWeight: 500,
        background: currentView === id ? (darkMode ? "#32363e" : "#fff") : "transparent",
        color: currentView === id ? text : subtext,
        boxShadow: currentView === id ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
        transition: "all 0.15s",
      }}
    >
      {Icon && (
        <span style={{ fontSize: 15, display: "flex", alignItems: "center" }}>
          <Icon />
        </span>
      )}
      {label}
    </button>
  );
}

export default function BookingTable({ darkMode = false }) {
  const [view, setView]               = useState("list");
  const [search, setSearch]           = useState("");
  const [selected, setSelected]       = useState([]);
  const [reminderOpen, setReminderOpen] = useState(false);
  // ✅ Moved here — was incorrectly inside JSX
  const [detailsOpen, setDetailsOpen]   = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const palette  = darkMode ? theme.dark : theme;
  const bg       = palette.cardBg;
  const surface  = palette.surface  || (darkMode ? "#1e2027" : "#f8fafc");
  const border   = palette.border;
  const text     = palette.foreground;
  const subtext  = palette.subtext  || (darkMode ? "#94a3b8" : "#64748b");
  const headerBg = palette.headerBg || (darkMode ? "#1e2027" : "#f1f5f9");
  const rowHover = palette.hoverBg  || (darkMode ? "#1e2027" : "#f8faff");

  const filtered = MOCK_DATA.filter(r =>
    r.customer.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleViewDetails = (row) => {
    setSelectedBooking(row);
    setDetailsOpen(true);
  };

  const viewBtnProps = { currentView: view, darkMode, text, subtext, onSetView: setView };

  return (
    <div style={{ background: bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>

      {/* ── Toolbar ── */}
      <div style={{
        display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10,
        padding: "12px 16px", borderBottom: `1px solid ${border}`, background: surface,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 2,
          background: darkMode ? "#1e2027" : "#f1f5f9",
          borderRadius: 10, padding: 3,
        }}>
          <ViewBtn id="list"     Icon={CiBoxList}     label="List"     {...viewBtnProps} />
          <ViewBtn id="timeline" Icon={IoTimeOutline} label="Timeline" {...viewBtnProps} />
          <ViewBtn id="table"    Icon={CiViewTable}   label="Table"    {...viewBtnProps} />
        </div>

        <div style={{
          flex: 1, minWidth: 160, maxWidth: 280,
          display: "flex", alignItems: "center", gap: 8,
          background: darkMode ? "#1e2027" : "#fff",
          border: `1px solid ${border}`, borderRadius: 10, padding: "6px 12px",
        }}>
          <CiSearch style={{ color: subtext, fontSize: 16 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: text, width: "100%" }}
          />
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          {["Excel", "PDF"].map(btn => (
            <button key={btn} style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: `1px solid ${border}`, background: "transparent", color: text, cursor: "pointer",
            }}>{btn}</button>
          ))}
          <button style={{
            width: 34, height: 34, borderRadius: 8, border: `1px solid ${border}`,
            background: "transparent", cursor: "pointer", color: text,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>
            <IoPrint />
          </button>
        </div>
      </div>

      {/* ── Action row ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${border}` }}>
        <button style={{
          padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
          border: `1px solid #ef4444`, cursor: "pointer", background: "transparent",
          color: "#ef4444", transition: "all 0.15s",
        }}>Show Cancelled</button>
        <button
          onClick={() => setReminderOpen(true)}
          style={{
            padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
            border: `1px solid ${border}`, background: "transparent", color: text, cursor: "pointer",
          }}
        >Reminder</button>
      </div>

      {/* ── Modals ── */}
      <ReminderConfirmModal
        open={reminderOpen}
        onClose={() => setReminderOpen(false)}
        onConfirm={() => setReminderOpen(false)}
        isDarkMode={darkMode}
      />
      <BookingDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onSave={(data) => console.log(data)}
        booking={selectedBooking}
        darkMode={darkMode}
      />

      {/* ── Table ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {COLS.map(col => (
                <th key={col} style={{
                  padding: "10px 14px", textAlign: "center", verticalAlign: "middle",
                  fontWeight: 600, color: subtext, fontSize: 12,
                  borderBottom: `1px solid ${border}`, whiteSpace: "nowrap",
                }}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => {
              const st         = STATUS_CONFIG[row.status] || STATUS_CONFIG.confirmed;
              const isSelected = selected.includes(row.id);
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: `1px solid ${border}`,
                    background: isSelected
                      ? (darkMode ? theme.dark.primary.green_100 : theme.primary.green_100)
                      : i % 2 === 0 ? bg : surface,
                    transition: "background 0.12s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = rowHover; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isSelected ? (darkMode ? theme.dark.primary.green_100 : theme.primary.green_100) : (i % 2 === 0 ? bg : surface); }}
                >
                  {/* Table badges */}
                  <td style={{ padding: "10px 14px", textAlign: "center", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "center" }}>
                      {row.tables.map(t => (
                        <span key={t} style={{
                          background: "#22c55e", color: "#fff",
                          borderRadius: 6, padding: "2px 7px", fontWeight: 700, fontSize: 12,
                        }}>{t}</span>
                      ))}
                    </div>
                  </td>

                  {/* Customer */}
                  <td style={{ padding: "10px 14px", textAlign: "center", verticalAlign: "middle" }}>
                    <div style={{ fontWeight: 600, color: text }}>{row.customer}</div>
                    <div style={{ color: subtext, fontSize: 11, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      <IoCallOutline /> {row.phone}
                    </div>
                  </td>

                  {/* Time */}
                  <td style={{ padding: "10px 14px", color: text, whiteSpace: "nowrap", textAlign: "center" }}>
                    {row.time}
                  </td>

                  {/* PAX */}
                  <td style={{ padding: "10px 14px", color: text, textAlign: "center" }}>
                    {row.pax}
                  </td>

                  {/* Notes */}
                  <td style={{ padding: "10px 14px", textAlign: "center", verticalAlign: "middle" }}>
                    <IoDocumentAttachOutline style={{ color: subtext, fontSize: 18 }} />
                  </td>

                  {/* Src */}
                  <td style={{ padding: "10px 14px", color: text, fontWeight: 600, textAlign: "center" }}>
                    {row.src}
                  </td>

                  {/* Dep */}
                  <td style={{ padding: "10px 14px", color: text, fontWeight: 500, textAlign: "center" }}>
                    £ {row.dep.toFixed(2)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: "10px 14px", textAlign: "center" }}>
                    <span style={{
                      background: st.bg, color: st.color,
                      borderRadius: 20, padding: "4px 14px",
                      fontWeight: 600, fontSize: 12, whiteSpace: "nowrap",
                    }}>{st.label}</span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: "10px 14px", textAlign: "center", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      
                      <button
                        onClick={() => handleViewDetails(row)}
                        style={{
                          background: "transparent", border: `1px solid ${border}`,
                          borderRadius: 8, padding: "4px 4px", cursor: "pointer",
                          color: subtext, fontSize: 18,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <IoEyeOutline />
                      </button>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(row.id)}
                        style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#22c55e" }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: subtext }}>
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}