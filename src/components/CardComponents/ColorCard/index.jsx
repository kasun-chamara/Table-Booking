import { useState, useRef, useEffect } from "react";
import theme from '../../../../theme';

const defaultConfig = {
  calendarBackground: { label: "Calendar Background", value: "#d9ead3" },
  calendarTopSeparator: { label: "Calendar Top Separator", value: "#16537e" },
  previousMonthsText: { label: "Previous Months Text", value: "#2986cc" },
  dayTitleText: { label: "Day Title Text", value: "#c90076" },
  currentDateText: { label: "Current Date Text", value: "#9fc5e8" },
  monthTitleText: { label: "Month Title Text", value: "#134f5c" },
  selectedDateBackground: { label: "Selected Date Background", value: "#f1c232" },
  selectedDateText: { label: "Selected Date Text", value: "#3d85c6" },
  textBoxBackground: { label: "Text Box Background", value: "#f3f6f4" },
  textBoxText: { label: "Text Box Text", value: "#3d85c6" },
  buttonBackground: { label: "Button Background", value: "#c90076" },
  buttonText: { label: "Button Text", value: "#ffffff" },
};

function ColorField({ label, value, onChange, palette,  }) {
  const inputRef = useRef(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleTextChange = (e) => {
    const v = e.target.value;
    setText(v);
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) {
      onChange(v);
    }
  };

  const handleColorChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium tracking-wide uppercase text-left"
        style={{
          color: palette?.foreground || '#1F2129',
          textAlign: 'left',
          display: 'block',
        }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all cursor-pointer"
        style={{
          background: palette?.surface || (palette?.darkMode ? '#1e2027' : '#f8fafc'),
          border: `1px solid ${palette?.border || '#e5e7eb'}`,
        }}
        onClick={() => inputRef.current?.click()}
      >
        {/* Color Swatch */}
        <div
          className="w-7 h-7 rounded-md flex-shrink-0 transition-transform hover:scale-110"
          style={{
            backgroundColor: value,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
          }}
        />
        {/* Hidden native color input */}
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={handleColorChange}
          className="sr-only"
        />
        {/* Hex text input */}
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-transparent text-sm font-mono outline-none"
          style={{
            color: palette?.foreground || '#1F2129',
            '::placeholder': { color: palette?.foreground || '#1F2129' },
          }}
          placeholder="#000000"
          maxLength={7}
        />
        {/* Eyedropper icon hint */}
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke={palette?.foreground || '#1F2129'}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
    </div>
  );
}

export default function WidgetConfigurations({ darkMode = false, customTheme }) {
  const [config, setConfig] = useState(defaultConfig);

  const palette = darkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const handleChange = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const handleSave = () => {
    // Save logic here if needed
  };

  const entries = Object.entries(config);

  return (
    <div
      className="w-full rounded-2xl border overflow-hidden"
      style={{
        background: palette.cardBg,
        borderColor: palette.border,
        color: palette.foreground,
      }}
    >
      {/* Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map(([key, { label, value }]) => (
            <ColorField
              key={key}
              id={key}
              label={label}
              value={value}
              onChange={(v) => handleChange(key, v)}
              palette={palette}
            />
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleSave}
            style={{
              borderRadius: '0.75rem',
              background: '#22c55e',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: 16,
              transition: 'all 0.15s',
              cursor: 'pointer',
              minWidth: 120,
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#16a34a'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#22c55e'; }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}