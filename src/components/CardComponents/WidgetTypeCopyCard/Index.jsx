import { useState } from "react";
import theme from '../../../../theme';

const widgetData = {
  "HTML Widget Code": `<iframe width="768px" height="360px" src="https://portal.prestatable.co.uk/api/widget/1bc950d9-a9ed-40b7-913b-f00c69ec4e30a9e2e9d4-14c5-4d18-aa46-e85e1dc76fc2/80009/ade49376-b612-4221-981b-5e44d918f486/horizontal" frameBorder="0" style="rgba(238, 239, 238, 0.0)"></iframe>`,
  "Link": `https://portal.prestatable.co.uk/api/widget/1bc950d9-a9ed-40b7-913b-f00c69ec4e30a9e2e9d4-14c5-4d18-aa46-e85e1dc76fc2/80009/ade49376-b612-4221-981b-5e44d918f486/horizontal`,
  "JavaScript Code": `<script src="https://portal.prestatable.co.uk/api/widget/1bc950d9-a9ed-40b7-913b-f00c69ec4e30a9e2e9d4-14c5-4d18-aa46-e85e1dc76fc2/80009/ade49376-b612-4221-981b-5e44d918f486/horizontal.js"></script>`,
};

export default function SelectWidgetType({ darkMode = false, customTheme }) {
  const [active, setActive] = useState("HTML Widget Code");
  const [copied, setCopied] = useState(false);

  const palette = darkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const border = palette.border;
  const cardBg = palette.cardBg;
  const text = palette.foreground;
  const codeBoxBg = palette.surface || (darkMode ? "#1e2027" : "#f8fafc");
  const codeBoxBorder = palette.border;
  const codeBoxText = palette.foreground;
  const buttonBg = copied ? "#22c55e" : palette.status.reconfirmed;
  const buttonText = "#fff";
  const buttonBorder = "none";

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetData[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden mt-5"
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        border: `1px solid ${border}`,
        background: cardBg,
        color: text,
      }}
    >
      {/* Header */}
      <h2
        className="text-center text-lg font-semibold tracking-wide pt-6"
        style={{ color: text }}
      >
        Select Widget Type
      </h2>
      <div className="px-8 py-6">
        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {Object.keys(widgetData).map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                style={{
                  background: isActive ? palette.status.reconfirmed : 'transparent',
                  border: 'none',
                  color: isActive ? '#fff' : text,
                  boxShadow: undefined,
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.85,
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-150`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        {/* Code box */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${codeBoxBorder}`,
            background: codeBoxBg,
          }}
        >
          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              background: buttonBg,
              color: buttonText,
              border: buttonBorder,
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: 14,
              minWidth: 10,
              padding: '6px 16px',
              top: 12,
              right: 12,
              position: 'absolute',
              transition: 'all 0.15s',
              cursor: 'pointer',
            }}
          >
            {copied ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <p
            className="p-4 pr-20 text-sm font-mono leading-relaxed break-all"
            style={{ color: codeBoxText }}
          >
            {widgetData[active]}
          </p>
        </div>
      </div>
    </div>
  );
}