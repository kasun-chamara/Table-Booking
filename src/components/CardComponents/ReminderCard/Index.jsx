import React from "react";
import theme from "../../../../theme";
import { LuBellRing } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";


export default function ReminderConfirmModal({ open, onClose, onConfirm, isDarkMode = true }) {
  if (!open) return null;

  const palette = isDarkMode ? theme.dark : theme;
  const reconfirmedColor = palette.status.reconfirmed;
  const modalBg = palette.cardBg;
  const modalText = palette.foreground;
  const divider = palette.border;
  const cancelBtn = palette.status.noShow;
  const confirmBtn = palette.status.reconfirmed;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 min-h-screen h-screen">
      <div
        className="w-full max-w-2xl rounded-2xl p-6 shadow-xl"
        style={{ background: modalBg, color: modalText }}
      >
        <div className="flex gap-3 items-start">
          <div
            className="grid h-10 w-10 place-items-center rounded-full border"
            style={{ borderColor: reconfirmedColor, background: palette.primary?.green_100|| theme.primary.gray_500 }}
          ><LuBellRing size={20} color={reconfirmedColor} />
            
          </div>
          <div className="flex-1 flex justify-between min-w-0">
            <h2 className="text-base sm:text-xl font-semibold leading-snug text-left break-words" style={{ color: modalText }}>
              You are about to send reminder emails for the selected bookings
            </h2>
            
          </div>
        </div>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-left pl-13 pr-13" style={{ color: modalText }}>
          This action will add the selected bookings to the reminder queue and
          the status will be updated once the reminder queue is completed.
        </p>
        <div className="my-5 h-px w-full" style={{ background: divider }} />
        <div className="flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            className="min-w-[70px] rounded-xl border-2 px-3 py-2 font-semibold text-sm sm:text-base"
            style={{ borderColor: cancelBtn, color: cancelBtn, background: modalBg }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="min-w-[70px] rounded-xl border-2 px-3 py-2 font-semibold text-sm sm:text-base"
            style={{ background: confirmBtn, color: palette.text_light, borderColor: confirmBtn }}
          >
            Yes Continue
          </button>
        </div>
      </div>
    </div>
  );
}