import { useState } from "react";


const tables = [
  { id: 1, numbers: [2], min: 2, max: 2, available: true },
  { id: 2, numbers: [11, 3], min: 2, max: 2, available: false },
  { id: 3, numbers: [12], min: 2, max: 2, available: true },
  { id: 4, numbers: [22, 3], min: 2, max: 2, available: false },
  { id: 5, numbers: [32, 3], min: 2, max: 2, available: false },
  { id: 6, numbers: [42], min: 2, max: 2, available: true },
  { id: 7, numbers: [52, 3], min: 2, max: 2, available: false },
  { id: 8, numbers: [62], min: 2, max: 2, available: true },
  { id: 9, numbers: [26, 3], min: 2, max: 2, available: false },
  { id: 10, numbers: [25, 3], min: 2, max: 2, available: false },
  { id: 11, numbers: [24], min: 2, max: 2, available: true },
  { id: 12, numbers: [23, 3], min: 2, max: 2, available: false },
  { id: 13, numbers: [22], min: 2, max: 2, available: true },
  { id: 14, numbers: [21, 3], min: 2, max: 2, available: false },
  { id: 15, numbers: [20, 3], min: 2, max: 2, available: false },
];

const TableIcon = ({ color = "#22c55e", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="8" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <line x1="8" y1="8" x2="8" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="8" x2="16" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="5" r="2" fill={color} />
  </svg>
);

const NumberBadge = ({ num, available }) => (
  <span
    className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md text-xs font-bold text-white ${
      available ? "bg-green-500" : "bg-red-400"
    }`}
  >
    {num}
  </span>
);

const TableCard = ({ table, selected, onToggle }) => {
  const isAvailable = table.available;

  const borderClass = selected
    ? "border-2 border-green-500 shadow-md shadow-green-100"
    : isAvailable
    ? "border border-green-200 hover:border-green-400"
    : "border border-red-200";

  const bgClass = selected
    ? "bg-green-50"
    : isAvailable
    ? "bg-white hover:bg-green-50"
    : "bg-red-50";

  return (
    <button
      onClick={() => isAvailable && onToggle(table.id)}
      disabled={!isAvailable}
      className={`relative rounded-xl p-2 sm:p-3 transition-all duration-200 text-left w-full ${borderClass} ${bgClass} ${
        !isAvailable ? "cursor-not-allowed opacity-80" : "cursor-pointer active:scale-95"
      }`}
    >
      {selected && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
        <TableIcon color={isAvailable ? "#22c55e" : "#f87171"} size={14} />
        <div className="flex gap-0.5 sm:gap-1 flex-wrap">
          {table.numbers.map((n, i) => (
            <NumberBadge key={i} num={n} available={isAvailable} />
          ))}
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3 text-xs text-gray-500">
        <div className="text-center">
          <div className="font-semibold text-gray-700 text-xs sm:text-sm">{table.min}</div>
          <div className="text-gray-400" style={{ fontSize: "9px" }}>Min</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-700 text-xs sm:text-sm">{table.max}</div>
          <div className="text-gray-400" style={{ fontSize: "9px" }}>Max</div>
        </div>
      </div>
    </button>
  );
};

export default function BookingModal() {
  const [selectedTables, setSelectedTables] = useState([2, 3, 4]);
  const [partySize] = useState(2);
  const { onClose } = arguments[0] || {};

  const toggleTable = (id) => {
    setSelectedTables((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const makeUnallocated = () => setSelectedTables([]);

  // Modal always open, remove fallback UI

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl max-h-[95vh] overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
              <TableIcon color="#22c55e" size={16} />
            </div>
            <h2 className="text-base sm:text-xl font-semibold text-gray-800">Create New Booking</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Allocated Table Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-600 font-medium text-sm sm:text-base whitespace-nowrap">Allocated Table :</span>
            {selectedTables.length === 0 ? (
              <span className="text-gray-400 text-sm italic">None</span>
            ) : (
              selectedTables.map((t) => (
                <span
                  key={t}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold text-sm"
                >
                  {t}
                </span>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={makeUnallocated}
              className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 border-red-400 text-red-500 text-xs sm:text-sm font-semibold hover:bg-red-50 active:bg-red-100 transition-colors whitespace-nowrap"
            >
              Make Unallocated
            </button>
            <button
              className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 border-green-500 bg-green-500 text-white text-xs sm:text-sm font-semibold hover:bg-green-600 active:bg-green-700 transition-colors whitespace-nowrap"
              style={{ marginLeft: '8px' }}
              // TODO: Add save handler
            >
              Save
            </button>
          </div>
        </div>

        {/* Grid Area */}
        <div className="mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-xl border border-gray-200 bg-gray-50 p-2 sm:p-4">
          <div className="flex justify-end mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-600 bg-white px-2 sm:px-3 py-1 rounded-full border border-gray-200">
              Party size: {partySize}
            </span>
          </div>
          {/* Responsive grid: 3 cols on mobile, 4 on sm, 5 on md+ */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2">
            {tables.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                selected={selectedTables.includes(table.id)}
                onToggle={toggleTable}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 sm:px-6 pb-3 sm:pb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-green-500 flex-shrink-0"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-400 flex-shrink-0"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}