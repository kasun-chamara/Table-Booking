import theme from "../../../theme";
import StatCard from "../../components/CardComponents/StatusCard/Index";
import SeatOccupancyCard from "../../components/CardComponents/SeatOccupancyCard";
import Calendar from "../../components/Calendar/Index";
import BookingTable from "../../components/TableComponent/Table";

const statusList = [
  { key: 'waitingList',  label: 'Waiting'     },
  { key: 'unallocated',  label: 'Unallocated' },
  { key: 'confirmed',    label: 'Confirmed'   },
  { key: 'reconfirmed',  label: 'Reconfirmed' },
  { key: 'seated',       label: 'Seated'      },
  { key: 'left',         label: 'Left'        },
  { key: 'noShow',       label: 'No Show'     },
  { key: 'cancelled',    label: 'Cancelled'   },
];

export default function Home({ darkMode = false }) {
  const palette = darkMode ? theme.dark : theme;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Top section: Status cards + Right column ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "6fr 2fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* ── LEFT: 6 status cards + BookingTable below ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* 6 Status Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 16,
            }}
          >
            {statusList.slice(0, 6).map(({ key, label }) => (
              <StatCard
                key={key}
                title={label}
                total={13}
                color={palette.status[key]}
                palette={palette}
              />
            ))}
          </div>

          {/* BookingTable — fills same width as the 6 cards */}
          <BookingTable darkMode={darkMode} />

        </div>

        {/* ── RIGHT: 2 cards + Seat Occupancy + Calendar ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Top 2 status cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {statusList.slice(6).map(({ key, label }) => (
              <StatCard
                key={key}
                title={label}
                total={13}
                color={palette.status[key]}
                palette={palette}
              />
            ))}
          </div>

          {/* Seat Occupancy */}
          <SeatOccupancyCard
            title="Seat Occupancy Status"
            percentage={70}
            darkMode={darkMode}
          />

          {/* Calendar */}
          <Calendar
            accentColor="#22c55e"
            darkMode={darkMode}
            onDateSelect={(date) => console.log(date)}
          />

        </div>
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 6fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(6, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}