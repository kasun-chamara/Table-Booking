import React from "react";
import { createPortal } from "react-dom";
import theme from "../../../../theme";
import { LuBellRing } from "react-icons/lu";

export default function ReminderConfirmModal({
  open,
  onClose,
  onConfirm,
  isDarkMode = true
}) {
  if (!open) return null;

  const palette = isDarkMode ? theme.dark : theme;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60">
      <div
        className="w-full max-w-2xl rounded-2xl p-6 shadow-xl"
        style={{
          background: palette.cardBg,
          color: palette.foreground
        }}
      >
        <div className="flex gap-3 items-start">
          <div
            className="grid h-10 w-10 place-items-center rounded-full border"
            style={{
              borderColor: palette.status.reconfirmed
            }}
          >
            <LuBellRing size={20} color={palette.status.reconfirmed} />
          </div>

          <h2 className="text-base sm:text-xl font-semibold">
            You are about to send reminder emails for the selected bookings
          </h2>
        </div>

        <p className="mt-4 text-sm sm:text-base">
          This action will add the selected bookings to the reminder queue and
          the status will be updated once the reminder queue is completed.
        </p>

        <div
          className="my-5 h-px"
          style={{ background: palette.border }}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border-1 px-4 py-2 font-semibold"
            style={{
              borderColor: palette.status.noShow,
              color: palette.status.noShow
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl px-4 py-2 font-semibold"
            style={{
              background: palette.status.reconfirmed,
              color: palette.text_light
            }}
          >
            Yes Continue
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}