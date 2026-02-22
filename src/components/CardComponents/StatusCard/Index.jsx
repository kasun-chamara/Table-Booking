import React from "react";

export default function StatCard({ 
  title = "Waiting List", 
  count = 6, 
  total = 13, 
  color = "#D4A017",
  palette,
  style = {}
}) {
  const cardBg = palette?.cardBg || "#fff";
  const textColor = palette?.foreground || "#1F2129";

  return (
    <div
      className="relative rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between p-4"
      style={{ 
        background: cardBg,
        color: textColor,
        borderLeft: `5px solid ${color}`,
        height: "100px",
        ...style,
      }}
    >
      <div
        className="absolute bottom-0 left-0 w-16 h-16 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: color }}
      />

      <p className="font-bold text-base ml-1 z-10">{title}</p>
      <div className="ml-1 flex items-baseline gap-1 z-10">
        <span
          className="text-5xl font-bold leading-none"
          style={{ color }}
        >
          {count}
        </span>
        <span className="text-lg font-medium" style={{ color: textColor, opacity: 0.7 }}>/{total}</span>
      </div>
    </div>
  );
}