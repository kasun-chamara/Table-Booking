import theme from "../../../../theme";

export default function SeatOccupancyCard({ 
  title = "Seat Occupancy Status", 
  percentage = 70,
  color, 
  darkMode = false 
}) {
  const palette = darkMode ? theme.dark : theme;
  const statusColor = color || palette.status.reconfirmed;
  const bg = palette.cardBg;
  const border = palette.border;
  const textColor = palette.foreground;

  return (
    <div
      style={{
        background: bg, 
        border: `1px solid ${border}`, 
        borderRadius: 16,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: textColor }}>
          {title}
        </span>
        <span style={{
          width: 10, height: 10, borderRadius: "50%",
          background: statusColor,
          boxShadow: `0 0 6px ${statusColor}`,
          display: "inline-block"
        }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          flex: 1,
          height: 18,
          borderRadius: 999,
          background:bg,
          border: `1px solid ${statusColor}`,
          overflow: "hidden",
          padding: 2,
          boxSizing: "border-box",
        }}>
          <div style={{
            height: "100%",
            width: `${percentage}%`,
            borderRadius: 999,
            background: statusColor,
            transition: "width 0.6s ease",
          }} />
        </div>

        <span style={{ fontWeight: 700, fontSize: 15,  minWidth: 40 }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}