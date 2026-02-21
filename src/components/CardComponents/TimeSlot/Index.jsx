import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdTableRestaurant } from "react-icons/md";
import theme from "../../../../theme";

export default function TimeSlotBookingModal({
  open,
  onClose,
  date = "08-07-2030",
  isDarkMode = true
}) {
  const [selected, setSelected] = useState(null);

  if (!open) return null;

  const timeSlots = Array.from({ length: 42 }).map((_, i) => ({
    time: "08:00 AM",
    available: ![0, 27, 28, 41].includes(i), // demo unavailable slots
  }));

  const palette = isDarkMode ? theme.dark : theme;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 min-h-screen h-screen">
      <div
        className="w-full max-w-4xl rounded-2xl p-6 shadow-xl"
        style={{ background: palette.cardBg, color: palette.foreground }}
      >

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-full border"
              style={{
                borderColor: palette.status.reconfirmed,
                background: palette.primary?.green_100 || theme.primary.green_100
              }}
            >
              <MdTableRestaurant size={20} color={palette.status.reconfirmed} />
            </div>
            <h2 className="text-lg font-semibold" style={{ color: palette.foreground }}>
              New Booking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 self-start transition-colors duration-150"
            aria-label="Close"
            style={{ background: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = isDarkMode
                ? (palette.gray_700 || theme.gray_700 || '#374151')
                : (palette.gray_100 || theme.gray_100 || '#f3f4f6');
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <IoIosClose size={34} />
          </button>
        </div>

        <div className="my-4 h-px w-full" style={{ background: palette.border }} />

        {/* Time Slot Box */}
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: palette.border }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold" style={{ color: palette.foreground }}>
              Please select a time slot
            </p>
            <p className="font-semibold" style={{ color: palette.foreground, opacity: 0.7 }}>{date}</p>
          </div>

          <div className="mb-4 h-px w-full" style={{ background: palette.status.reconfirmed }} />

          {/* Slots Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
            {timeSlots.map((slot, index) => {
              const isSelected = selected === index;
              return (
                <button
                  key={index}
                  disabled={!slot.available}
                  onClick={() => setSelected(index)}
                  className={`
                    rounded-lg px-2 py-1 text-sm font-semibold
                    transition
                    ${slot.available ? "text-white" : "cursor-not-allowed text-white"}
                  `}
                  style={
                    slot.available
                      ? isSelected
                        ? { background: palette.gray_700 || theme.gray_500 }
                        : { background: palette.status.reconfirmed }
                      : { background: palette.status.noShow }
                  }
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex justify-end gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: palette.status.reconfirmed }} />
              <span style={{ color: palette.foreground }}>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-600" />
              <span style={{ color: palette.foreground }}>Unavailable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}