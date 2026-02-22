

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LuBellRing } from "react-icons/lu";
import { IoClose, IoTimeOutline } from "react-icons/io5";
import Calendar from "../../Calendar/Index";
import TimeSlotBookingModal from "../TimeSlot/Index";
import theme from '../../../../theme';

const PARTY_SIZES = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const MEAL_TYPES  = ["Breakfast", "Lunch", "Dinner", "Brunch", "Afternoon Tea"];


export default function NewBookingModal({ open, onClose, onBook, darkMode = false, accentColor }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [partySize, setPartySize]       = useState(10);
  const [duration, setDuration]         = useState("");
  const [mealType, setMealType]         = useState("Lunch");
  const [showTimeSlot, setShowTimeSlot] = useState(false);

  const palette = darkMode ? theme.dark : theme;
  const bg = palette.cardBg;
  const border = palette.border;
  const text = palette.foreground;
  const subtext = palette.subtext || (darkMode ? "#94a3b8" : "#64748b");
  const headerBg = palette.headerBg || (darkMode ? "#1e2027" : "#f1f5f9");
  const inputBg = palette.surface || (darkMode ? "#1e2027" : "#f8fafc");
  const placeholder = subtext;
  // Use reconfirmed color for green accent (same as Calendar)
  const buttonAccent = accentColor || palette.status.reconfirmed;

  if (!open) return null;

  const handleBook = () => {
    setShowTimeSlot(true);
  };

  const handleTimeSlotClose = () => {
    setShowTimeSlot(false);
  };

  const handleTimeSlotConfirm = (slot) => {
    setShowTimeSlot(false);
    onBook?.({ selectedDate, partySize, duration, mealType, timeSlot: slot });
    onClose?.();
  };

  // Only show NewBooking modal if open and not showing time slot
  const showNewBooking = open && !showTimeSlot;

  return (
    <>
      {showNewBooking && ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-[99999] flex justify-center items-center bg-black/60 px-4 pt-0"
          onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
        >
          <div
            className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border"
            style={{
              background: bg,
              borderColor: border,
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b"
              style={{
                background: headerBg,
                borderColor: border,
              }}
            >
              <div className="w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: palette.status.reconfirmed,
                  background: bg,
                }}
              >
                <LuBellRing size={22} color={palette.status.reconfirmed} />
              </div>
              <span className="text-xl font-bold" style={{ color: text }}>
                Create New Booking
              </span>
              <button
                onClick={onClose}
                className="ml-auto w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer transition-opacity hover:opacity-70"
                style={{
                  background: inputBg,
                  borderColor: border,
                  color: subtext,
                }}
              >
                <IoClose size={18} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Left — Calendar */}
              <div className="p-6 border-b md:border-b-0 md:border-r"
                style={{ borderColor: border }}
              >
                <p className="font-bold text-base mb-4" style={{ color: text }}>
                  Select Date
                </p>
                <Calendar
                  accentColor={accentColor}
                  darkMode={darkMode}
                  onDateSelect={setSelectedDate}
                />
              </div>

              {/* Right — Form */}
              <div className="p-6 flex flex-col gap-5">
                <p className="font-semibold text-sm" style={{ color: subtext }}>
                  Add a new reservation quickly and easily
                </p>

                {/* Party Size + Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" style={{ color: text }}>
                      Party Size
                    </label>
                    <div className="relative">
                      <select
                        value={partySize}
                        onChange={e => setPartySize(Number(e.target.value))}
                        className="w-full rounded-xl px-3 py-2.5 text-sm appearance-none outline-none cursor-pointer border pr-8"
                        style={{
                          background: inputBg,
                          borderColor: border,
                          color: text,
                        }}
                      >
                        {PARTY_SIZES.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
                        style={{ color: subtext }}
                      >▾</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" style={{ color: text }}>
                      Booking Duration
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        placeholder="e.g. 2h 30m"
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border pr-9"
                        style={{
                          background: inputBg,
                          borderColor: border,
                          color: text,
                          '::placeholder': { color: placeholder },
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: subtext }}
                      >
                        <IoTimeOutline size={16} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meal Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold" style={{ color: text }}>
                    Meal Type
                  </label>
                  <div className="relative">
                    <select
                      value={mealType}
                      onChange={e => setMealType(e.target.value)}
                      className="w-full rounded-xl px-3 py-2.5 text-sm appearance-none outline-none cursor-pointer border pr-8"
                      style={{
                        background: inputBg,
                        borderColor: border,
                        color: text,
                      }}
                    >
                      {MEAL_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
                      style={{ color: subtext }}
                    >▾</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Book Button */}
                <button
                  onClick={handleBook}
                  className="w-full py-3.5 rounded-xl text-white  text-base cursor-pointer transition-opacity hover:opacity-90"
                  style={{ background: buttonAccent }}
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* Time Slot Modal */}
      {showTimeSlot && (
        <TimeSlotBookingModal
          open={showTimeSlot}
          onClose={handleTimeSlotClose}
          date={selectedDate?.toLocaleDateString()}
          isDarkMode={darkMode}
          onConfirm={handleTimeSlotConfirm}
        />
      )}
    </>
  );
}