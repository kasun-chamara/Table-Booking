import { useState } from "react";
import theme from '../../../../theme';

export default function WidgetConfigurationsType({ darkMode = false, customTheme }) {
  const [selected, setSelected] = useState("vertical");

  const palette = darkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const border = palette.border;
  const cardBg = palette.cardBg;
  const text = palette.foreground;
  const boxActiveBg = palette.cardBg;
  const boxInactiveBg = palette.surface || (darkMode ? "#1e2027" : "#f8fafc");
  const boxActiveBorder = palette.border;
  const boxInactiveBorder = palette.border;
  const labelCol = palette.foreground;

  return (
    <div
      className="w-full rounded-3xl border p-6"
      style={{
        background: cardBg,
        borderColor: border,
        color: text,
      }}
    >
      <h2 className="text-lg font-bold mb-11" style={{ color: labelCol }}>Widget Configurations Type</h2>

      {/* Vertical Widget */}
      <div
        className="rounded-2xl border p-4 mb-4 cursor-pointer transition-all duration-150"
        style={{
          background: selected === "vertical" ? boxActiveBg : boxInactiveBg,
          borderColor: selected === "vertical" ? boxActiveBorder : boxInactiveBorder,
        }}
        onClick={() => setSelected("vertical")}
      >
        {/* Row: label + radio */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color: labelCol }}>Vertical Widget</span>
          {/* Radio */}
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${selected === "vertical" ? "border-green-500 " : "border-gray-300 "}`}>
            {selected === "vertical" && (
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        {/* Vertical preview: stacked bars */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="h-8 rounded-xl" style={{ background: palette.surface, border: `1px solid ${palette.border}` }} />
          <div className="h-8 rounded-xl" style={{ background: palette.surface, border: `1px solid ${palette.border}` }} />
          <div className="h-8 rounded-xl" style={{ background: palette.surface, border: `1px solid ${palette.border}` }} />
        </div>

        {/* Save button */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{
            background: selected === "vertical" ? palette.status.reconfirmed : palette.status.reconfirmed + '99',
            opacity: selected === "vertical" ? 1 : 0.6,
          }}
        >
          Save
        </button>
      </div>

      {/* Horizontal Widget */}
      <div
        className="rounded-2xl border p-4 cursor-pointer transition-all duration-150"
        style={{
          background: selected === "horizontal" ? boxActiveBg : boxInactiveBg,
          borderColor: selected === "horizontal" ? boxActiveBorder : boxInactiveBorder,
        }}
        onClick={() => setSelected("horizontal")}
      >
        {/* Row: label + radio */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color: labelCol }}>Horizontal Widget</span>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${selected === "horizontal" ? "border-green-500 " : "border-gray-300 "}`}>
            {selected === "horizontal" && (
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        {/* Horizontal preview: side-by-side bars + save */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <div className="h-8 flex-1 rounded-xl" style={{ background: palette.surface, border: `1px solid ${palette.border}` }} />
            <div className="h-8 flex-1 rounded-xl" style={{ background: palette.surface, border: `1px solid ${palette.border}` }} />
            <div className="h-8 flex-1 rounded-xl" style={{ background: palette.surface, border: `1px solid ${palette.border}` }} />
          </div>
          <button
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all flex-shrink-0"
            style={{
              background: selected === "horizontal" ? palette.status.reconfirmed : palette.status.reconfirmed + '99',
              opacity: selected === "horizontal" ? 1 : 0.6,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}