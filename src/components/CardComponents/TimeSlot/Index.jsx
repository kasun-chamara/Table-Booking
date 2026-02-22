import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { MdTableRestaurant } from "react-icons/md";
import theme from "../../../../theme";

export default function TimeSlotBookingModal({
  open,
  onClose,
  date = "08-07-2030",
  isDarkMode = true,
}) {
  const [selected, setSelected] = useState(null);

  const timeSlots = Array.from({ length: 42 }).map((_, i) => ({
    time: "08:00 AM",
    available: ![0, 27, 28, 41].includes(i),
  }));

  const palette = isDarkMode ? theme.dark : theme;

  useEffect(() => {
    if (!open) return;

    const esc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // ✅ Conditional render AFTER hooks
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] grid place-items-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl p-6 shadow-xl"
        style={{ background: palette.cardBg, color: palette.foreground }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-full border"
              style={{
                borderColor: palette.status.reconfirmed,
                background:
                  palette.primary?.green_100 || theme.primary.green_100,
              }}
            >
              <MdTableRestaurant
                size={20}
                color={palette.status.reconfirmed}
              />
            </div>
            <h2 className="text-lg font-semibold">New Booking</h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1 transition hover:opacity-70"
            aria-label="Close"
          >
            <IoIosClose size={34} />
          </button>
        </div>

        <div className="my-4 h-px w-full" style={{ background: palette.border }} />

        {/* Time Slot Box */}
        <div className="rounded-xl border p-4" style={{ borderColor: palette.border }}>
          <div className="mb-3 flex justify-between">
            <p className="font-semibold">Please select a time slot</p>
            <p className="opacity-70">{date}</p>
          </div>

          <div className="mb-4 h-px w-full" style={{ background: palette.status.reconfirmed }} />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
            {timeSlots.map((slot, index) => {
              const isSelected = selected === index;

              return (
                <button
                  key={index}
                  disabled={!slot.available}
                  onClick={() => setSelected(index)}
                  className="rounded-lg px-2 py-1 text-sm font-semibold text-white transition"
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
        </div>
      </div>
    </div>,
    document.body
  );
}