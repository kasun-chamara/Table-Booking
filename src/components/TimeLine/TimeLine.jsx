import React, { useState, useRef, useEffect, useCallback } from 'react';
import theme from '../../../theme';

const TABLES = Array.from({ length: 16 }, (_, i) => ({ id: i + 1, label: "Table 1" }));
const HOURS = Array.from({ length: 17 }, (_, i) => i + 7); // 7:00 to 23:00

const INITIAL_BOOKINGS = [
  { id: 1, tableId: 1,  user: "User 001", startHour: 9,   duration: 1,   color: "#4CAF50" },
  { id: 2, tableId: 2,  user: "User 001", startHour: 9,   duration: 2.5, color: "#7B68EE" },
  { id: 3, tableId: 3,  user: "User 001", startHour: 9,   duration: 2,   color: "#FFB300" },
  { id: 4, tableId: 9,  user: "User 001", startHour: 9,   duration: 3.5, color: "#EF5350" },
];

const NOW        = new Date(2025, 0, 26);
const DATE_LABEL = NOW.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const DAY_LABEL  = NOW.toLocaleDateString("en-GB", { weekday: "long" });

const CELL_WIDTH  = 65;
const ROW_HEIGHT  = 36;
const LABEL_WIDTH = 88;
const MIN_HOURS   = 0.25; // minimum 15 min
const SNAP        = 0.25; // snap to 15 min

function snap(val) {
  return Math.round(val / SNAP) * SNAP;
}

export default function ReservationTimeline({ darkMode = false, customTheme }) {
  const palette = darkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [draggingId, setDraggingId] = useState(null);
  const scrollRef  = useRef(null);
  const dragRef    = useRef(null); // { id, side: 'left'|'right', startX, origStart, origDuration }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = CELL_WIDTH;
  }, []);

  // ── Drag handlers ────────────────────────────────────────────
  const onMouseDown = useCallback((e, id, side) => {
    e.preventDefault();
    e.stopPropagation();
    const booking = bookings.find(b => b.id === id);
    dragRef.current = {
      id,
      side,
      startX:       e.clientX,
      origStart:    booking.startHour,
      origDuration: booking.duration,
    };
    setDraggingId(id);

    const onMouseMove = (ev) => {
      if (!dragRef.current) return;
      const { id, side, startX, origStart, origDuration } = dragRef.current;
      const deltaHours = (ev.clientX - startX) / CELL_WIDTH;

      setBookings(prev => prev.map(b => {
        if (b.id !== id) return b;

        if (side === 'right') {
          // Dragging right edge: change duration only
          const newDuration = Math.max(MIN_HOURS, snap(origDuration + deltaHours));
          const maxDuration = HOURS[HOURS.length - 1] - b.startHour;
          return { ...b, duration: Math.min(newDuration, maxDuration) };
        } else {
          // Dragging left edge: move start, shrink/grow duration
          const newStart    = snap(origStart + deltaHours);
          const clampedStart = Math.max(HOURS[0], Math.min(newStart, origStart + origDuration - MIN_HOURS));
          const newDuration  = snap(origDuration - (clampedStart - origStart));
          return { ...b, startHour: clampedStart, duration: Math.max(MIN_HOURS, newDuration) };
        }
      }));
    };

    const onMouseUp = () => {
      dragRef.current = null;
      setDraggingId(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [bookings]);

  // Touch support
  const onTouchStart = useCallback((e, id, side) => {
    const touch = e.touches[0];
    const booking = bookings.find(b => b.id === id);
    dragRef.current = {
      id, side,
      startX:       touch.clientX,
      origStart:    booking.startHour,
      origDuration: booking.duration,
    };
    setDraggingId(id);

    const onTouchMove = (ev) => {
      if (!dragRef.current) return;
      const { id, side, startX, origStart, origDuration } = dragRef.current;
      const deltaHours = (ev.touches[0].clientX - startX) / CELL_WIDTH;

      setBookings(prev => prev.map(b => {
        if (b.id !== id) return b;
        if (side === 'right') {
          const newDuration = Math.max(MIN_HOURS, snap(origDuration + deltaHours));
          const maxDuration = HOURS[HOURS.length - 1] - b.startHour;
          return { ...b, duration: Math.min(newDuration, maxDuration) };
        } else {
          const newStart     = snap(origStart + deltaHours);
          const clampedStart = Math.max(HOURS[0], Math.min(newStart, origStart + origDuration - MIN_HOURS));
          const newDuration  = snap(origDuration - (clampedStart - origStart));
          return { ...b, startHour: clampedStart, duration: Math.max(MIN_HOURS, newDuration) };
        }
      }));
    };

    const onTouchEnd = () => {
      dragRef.current = null;
      setDraggingId(null);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  }, [bookings]);

  const getBookingsForTable = (tableId) =>
    bookings.filter((b) => b.tableId === tableId);

  const formatHour = (h) => {
    const hh = Math.floor(h);
    const mm = Math.round((h - hh) * 60);
    return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}`;
  };

  return (
    <div
      className="w-full rounded-3xl border"
      style={{
        background: palette.cardBg,
        borderColor: palette.border,
        color: palette.foreground,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.75rem 1.25rem", borderBottom: `1px solid ${palette.border}`,
        flexWrap: "wrap", gap: "0.5rem",
      }}>
        <div style={{ textAlign: "left", lineHeight: 1.3 }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: palette.foreground }}>{DATE_LABEL}</div>
          <div style={{ fontSize: "0.8rem", color: palette.foreground, opacity: 0.6 }}>{DAY_LABEL}</div>
        </div>
      </div>

      {/* ── Timeline body ── */}
      <div style={{ display: "flex", overflow: "hidden" }}>

        {/* Fixed left: Table labels */}
        <div style={{ flexShrink: 0, width: LABEL_WIDTH, borderRight: `1px solid ${palette.border}` }}>
          <div style={{
            height: ROW_HEIGHT, display: "flex", alignItems: "center", paddingLeft: "1rem",
            borderBottom: `1px solid ${palette.border}`,
            fontWeight: 700, fontSize: "0.78rem", color: palette.foreground,
          }}>
            Table No
          </div>
          {TABLES.map((t) => (
            <div key={t.id} style={{
              height: ROW_HEIGHT, display: "flex", alignItems: "center", paddingLeft: "1rem",
              borderBottom: `1px solid ${palette.border}`,
              fontSize: "0.78rem", color: palette.foreground, opacity: 0.75,
            }}>
              {t.label}
            </div>
          ))}
        </div>

        {/* Scrollable grid */}
        <div ref={scrollRef} style={{ overflowX: "auto", flex: 1, position: "relative" }}>
          <div style={{ minWidth: HOURS.length * CELL_WIDTH }}>

            {/* Hour header */}
            <div style={{
              display: "flex", height: ROW_HEIGHT,
              borderBottom: `1px solid ${palette.border}`,
              position: "sticky", top: 0, background: palette.cardBg, zIndex: 2,
            }}>
              {HOURS.map((h) => (
                <div key={h} style={{
                  width: CELL_WIDTH, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: `1px solid ${palette.border}`,
                  fontSize: "0.72rem", fontWeight: 600,
                  color: palette.foreground, opacity: 0.6,
                }}>
                  {String(h).padStart(2, "0")} : 00
                </div>
              ))}
              <div style={{ width: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: palette.foreground, opacity: 0.4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
              </div>
            </div>

            {/* Table rows */}
            {TABLES.map((t) => {
              const rowBookings = getBookingsForTable(t.id);
              return (
                <div key={t.id} style={{
                  height: ROW_HEIGHT, position: "relative", display: "flex",
                  borderBottom: `1px solid ${palette.border}`,
                }}>
                  {/* Grid columns */}
                  {HOURS.map((h) => (
                    <div key={h} style={{
                      width: CELL_WIDTH, flexShrink: 0,
                      borderRight: `1px solid ${palette.border}`, height: "100%",
                    }} />
                  ))}

                  {/* Booking bars */}
                  {rowBookings.map((b) => {
                    const left  = (b.startHour - HOURS[0]) * CELL_WIDTH;
                    const width = b.duration * CELL_WIDTH - 4;
                    return (
                      <div
                        key={b.id}
                        title={`${b.user}  ${formatHour(b.startHour)} – ${formatHour(b.startHour + b.duration)}`}
                        style={{
                          position: "absolute",
                          left: left + 2, top: 4,
                          height: ROW_HEIGHT - 8,
                          width: Math.max(width, 24),
                          borderRadius: "0.45rem",
                          background: b.color,
                          display: "flex", alignItems: "center",
                          overflow: "hidden",
                          zIndex: 1,
                          cursor: "default",
                          transition: draggingId === b.id ? "none" : "width 0.05s, left 0.05s",
                        }}
                      >
                        {/* ── Left drag handle ── */}
                        <div
                          onMouseDown={(e) => onMouseDown(e, b.id, 'left')}
                          onTouchStart={(e) => onTouchStart(e, b.id, 'left')}
                          style={{
                            width: 10, height: "100%", flexShrink: 0,
                            cursor: "ew-resize",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "rgba(0,0,0,0.18)",
                            borderRadius: "0.45rem 0 0 0.45rem",
                          }}
                        >
                          <svg width="5" height="14" viewBox="0 0 5 14" fill="none">
                            <line x1="1" y1="1" x2="1" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="4" y1="1" x2="4" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>

                        {/* Label */}
                        <span style={{
                          color: "#fff", fontSize: "0.72rem", fontWeight: 600,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          flex: 1, paddingLeft: "0.3rem",
                        }}>
                          {b.user}
                        </span>

                        {/* ── Right drag handle ── */}
                        <div
                          onMouseDown={(e) => onMouseDown(e, b.id, 'right')}
                          onTouchStart={(e) => onTouchStart(e, b.id, 'right')}
                          style={{
                            width: 10, height: "100%", flexShrink: 0,
                            cursor: "ew-resize",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "rgba(0,0,0,0.18)",
                            borderRadius: "0 0.45rem 0.45rem 0",
                          }}
                        >
                          <svg width="5" height="14" viewBox="0 0 5 14" fill="none">
                            <line x1="1" y1="1" x2="1" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="4" y1="1" x2="4" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}