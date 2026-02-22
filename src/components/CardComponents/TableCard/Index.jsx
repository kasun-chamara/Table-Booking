import React from "react";
import { MdTableRestaurant } from "react-icons/md";
import theme from "../../../../theme";

export default function TableCapacityCard({
  tableNumbers = [2,3,5,6,], 
  min = 2,
  max = 2,
  isDarkMode = false,
}) {
  const palette = isDarkMode ? theme.dark : theme;
  const normalizedTableNumbers = tableNumbers.map(t =>
    typeof t === 'object' && t !== null
      ? t
      : { num: t, available: true}
  );
  return (
    <div
      className="flex flex-col w-full max-w-[200px] gap-1.5 rounded-2xl border-2 p-4"
      style={{
        borderColor:
          normalizedTableNumbers.length > 0 && normalizedTableNumbers.every(t => !t.available)
            ? palette.status.noShow
            : palette.status.reconfirmed,
        background: palette.cardBg,
        color: palette.foreground,
      }}
    >

      <div className="flex w-full">
        <div className="flex flex-col items-center justify-center min-w-[40px]">
          <div
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{
              background:
                normalizedTableNumbers.length > 0 && normalizedTableNumbers.every(t => !t.available)
                  ? palette.status.noShow
                  : palette.status.reconfirmed,
            }}
          >
            <MdTableRestaurant
              className="text-white"
              size={18}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 flex-1">
          {normalizedTableNumbers.map(({ num, available }, idx) => (
            <div
              key={idx}
              className="grid h-7 w-7 place-items-center rounded-lg text-base font-bold border"
              style={{
                borderWidth: 2,
                borderColor: available ? palette.status.reconfirmed : palette.status.noShow,
                background: available
                  ? palette.primary?.green_100 || theme.primary.green_100
                  : palette.primary?.noShow_100 || theme.primary.noShow_100,
                color: available
                  ? palette.status.reconfirmed
                  : palette.status.noShow,
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-around text-center">
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: palette.foreground }}
          >
            Min
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: palette.foreground }}
          >
            {min}
          </p>
        </div>
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: palette.foreground }}
          >
            Max
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: palette.foreground }}
          >
            {max}
          </p>
        </div>
      </div>
    </div>
  );
}
