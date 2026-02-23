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
        className="w-full max-w-2xl rounded-2xl p-6 shadow-xl border"
        style={{
          background: palette.cardBg,
          color: palette.foreground,
          borderColor: palette.border
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

        <p className="mt-4 text-sm sm:text-base ml-13">
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
            style={{
              borderRadius: '0.75rem',
              border: `1px solid ${palette.status.noShow}`,
              color: palette.status.noShow,
              background: 'transparent',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: 16,
              transition: 'all 0.15s',
              cursor: 'pointer',
            }}
            onMouseOver={e => { e.currentTarget.style.background = palette.status.noShow; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = palette.status.noShow; }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              borderRadius: '0.75rem',
              background: palette.status.reconfirmed,
              color: palette.text_light,
              border: 'none',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: 16,
              transition: 'all 0.15s',
              cursor: 'pointer',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#16a34a'; }}
            onMouseOut={e => { e.currentTarget.style.background = palette.status.reconfirmed; }}
          >
            Yes Continue
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}