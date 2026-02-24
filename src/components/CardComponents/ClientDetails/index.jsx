import React, { useState } from "react";
import ReactDOM from "react-dom";
import { MOCK_BOOKING } from "../../../MockDb";
import theme from "../../../../theme";
import { TbListDetails } from "react-icons/tb";
import { MdCall } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import BookingModal from "../AllocatedTables/Index";

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

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Brunch", "Afternoon Tea"];

function generateTimeSlots() {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    for (let m of [0, 30]) {
      const hour   = h % 12 === 0 ? 12 : h % 12;
      const minute = m === 0 ? "00" : "30";
      const ampm   = h < 12 ? "AM" : "PM";
      slots.push(`${hour}:${minute} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function Caret({ subtextCol }) {
  return (
    <span
      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
      style={{ color: subtextCol }}
    >▾</span>
  );
}

export default function BookingDetailsModal({ open, onClose, onSave, booking = MOCK_BOOKING, darkMode = false }) {
  const [specialReq, setSpecialReq]       = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [from, setFrom]                   = useState(booking?.from      || "5:00 PM");
  const [to, setTo]                       = useState(booking?.to        || "5:00 PM");
  const [partySize, setPartySize]         = useState(booking?.partySize || "01");
  const [mealType, setMealType]           = useState(booking?.mealType  || "Lunch");
  // ✅ New — date picker state
  const [date, setDate]                   = useState(booking?.date      || new Date().toISOString().split("T")[0]);

  // AllocatedTables modal state
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);

  if (!open) return null;

  const st = STATUS_CONFIG[booking?.status] || STATUS_CONFIG.confirmed;

  const handleSave = () => {
    onSave?.({ ...booking, date, from, to, partySize, mealType, specialReq, internalNotes });
    onClose?.();
  };

  // Palette from theme (like NewBooking)
  const palette = darkMode ? theme.dark : theme;
  const bg = palette.cardBg;
  const inputBg = palette.surface || (darkMode ? "#1e2027" : "#f8fafc");
  const inputBorder = palette.border;
  const inputText = palette.foreground;
  const subtextCol = palette.subtext || (darkMode ? "#94a3b8" : "#64748b");
  const labelCol = palette.foreground;
  const dividerCol = darkMode ? "border-[#2e2e45]" : "border-[#e2e8f0]";

  const selectStyle = { background: inputBg, borderColor: inputBorder, color: inputText };
  const selectClass = "w-full rounded-xl px-3 py-2.5 text-sm appearance-none outline-none cursor-pointer border pr-8";
  const textareaClass = `w-full rounded-xl px-3 py-2.5 text-sm outline-none border resize-none h-24 ${
    darkMode
      ? "bg-[#2a2a3e] border-[#2e2e45] text-slate-100 placeholder:text-slate-500"
      : "bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400"
  }`;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[99999] flex justify-center items-start bg-black/60 px-4 pt-10 pb-6 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border`}
        style={{
          background: bg,
          borderColor: inputBorder,
        }}
      >

        {/* ── Title ── */}
        <div
          className={`flex items-center gap-4 px-6 py-5 border-b border`}
          style={{ borderColor: inputBorder }}
        >
          <div
            className="w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0"
            style={{ borderColor: STATUS_CONFIG.reconfirmed.bg, background: darkMode ? theme.dark.cardBg : theme.cardBg }}
          >
            <TbListDetails size={22} color={STATUS_CONFIG.reconfirmed.bg} />
          </div>
          <span className="text-xl font-bold" style={{ color: darkMode ? theme.dark.foreground : theme.foreground }}>
            Booking Details
          </span>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">

          {/* ── Customer Row ── */}
          <div className={`flex items-center gap-3 pb-5 border-b ${dividerCol}`} style={{ borderColor: inputBorder }}>
            <div className={`w-14 h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center border
              ${darkMode ? "border-[#2e2e45] bg-[#2a2a3e]" : "border-slate-200 bg-slate-100"}
            `}>
              {booking?.avatarSrc ? (
                <img src={booking.avatarSrc} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" className="fill-slate-400">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`font-bold text-base ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                {booking?.customer}
              </p>
              <p className={`text-xs mt-0.5 flex items-center gap-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                <MdCall size={13} style={{ marginRight: 2 }} />
                {booking?.phone}
              </p>
              {booking?.email && (
                <p className={`text-xs mt-0.5 flex items-center gap-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  <CiMail size={13} style={{ marginRight: 2 }} />
                  {booking.email}
                </p>
              )}
            </div>

            <span
              className="text-white text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
              style={{ background: st.bg }}
            >
              {st.label}
            </span>
          </div>

          {/* ── Date / Time / Party / Meal ── */}
          <div className={`pb-5 border-b ${dividerCol}`} style={{ borderColor: inputBorder }}>

            {/* ✅ Date Picker — replaces read-only text */}
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-sm font-semibold" style={{ color: labelCol }}>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border cursor-pointer"
                style={{
                  background: inputBg,
                  borderColor: inputBorder,
                  color: inputText,
                  colorScheme: darkMode ? "dark" : "light",
                }}
              />
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              {/* From */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: labelCol }}>From</label>
                <div className="relative">
                  <select value={from} onChange={e => setFrom(e.target.value)} className={selectClass} style={selectStyle}>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <Caret subtextCol={subtextCol} />
                </div>
              </div>
              {/* To */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: labelCol }}>To</label>
                <div className="relative">
                  <select value={to} onChange={e => setTo(e.target.value)} className={selectClass} style={selectStyle}>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <Caret subtextCol={subtextCol} />
                </div>
              </div>
              {/* Party Size */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: labelCol }}>Party Size</label>
                <div className="relative">
                  <select value={partySize} onChange={e => setPartySize(e.target.value)} className={selectClass} style={selectStyle}>
                    {[...Array(20)].map((_, i) => {
                      const val = String(i + 1).padStart(2, "0");
                      return <option key={val} value={val}>{val}</option>;
                    })}
                  </select>
                  <Caret subtextCol={subtextCol} />
                </div>
              </div>
              {/* Meal Type */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: labelCol }}>Meal Type</label>
                <div className="relative">
                  <select value={mealType} onChange={e => setMealType(e.target.value)} className={selectClass} style={selectStyle}>
                    {MEAL_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <Caret subtextCol={subtextCol} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Table ── */}
          <div className={`pb-5 border-b text-center ${dividerCol}`} style={{ borderColor: inputBorder }}>
            <button
              className="text-sm px-2 py-1 rounded-xl border transition-all"
              style={{
                cursor: "pointer",
                background: STATUS_CONFIG.reconfirmed.bg,
                color: theme.text_light,
                borderColor: STATUS_CONFIG.reconfirmed.bg,
                fontWeight: 500
              }}
              onClick={() => setShowAllocatedModal(true)}
            >
              Set Table{booking?.table ? ` - ${booking.table}` : ""}
            </button>
          </div>

          {/* AllocatedTables Modal */}
          {showAllocatedModal && (
            <BookingModal
              // Add props as needed for table allocation
              onClose={() => setShowAllocatedModal(false)}
            />
          )}

          {/* ── Special Requirements ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" style={{ color: labelCol }}>
              Client Special Requirements
            </label>
            <textarea
              value={specialReq}
              onChange={e => setSpecialReq(e.target.value)}
              placeholder="Special Requirements"
              className={textareaClass}
              style={{
                background: inputBg,
                borderColor: inputBorder,
                color: inputText,
              }}
            />
          </div>

          {/* ── Internal Notes ── */}
          <div className={`flex flex-col gap-2 pb-5 border-b ${dividerCol}`} style={{ borderColor: inputBorder }}>
            <label className="text-sm font-semibold" style={{ color: labelCol }}>
              Internal Notes
            </label>
            <textarea
              value={internalNotes}
              onChange={e => setInternalNotes(e.target.value)}
              placeholder="Internal Notes"
              className={textareaClass}
              style={{
                background: inputBg,
                borderColor: inputBorder,
                color: inputText,
              }}
            />
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "12px 0", borderRadius: "0.75rem",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                border: `1px solid ${STATUS_CONFIG.noShow.bg}`,
                color: STATUS_CONFIG.noShow.bg, background: "transparent", transition: "all 0.15s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = STATUS_CONFIG.noShow.bg; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = STATUS_CONFIG.noShow.bg; }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                flex: 1, padding: "12px 0", borderRadius: "0.75rem",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                background: STATUS_CONFIG.reconfirmed.bg, color: "#fff",
                border: "none", transition: "all 0.15s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "#16a34a"; }}
              onMouseOut={e => { e.currentTarget.style.background = STATUS_CONFIG.reconfirmed.bg; }}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}