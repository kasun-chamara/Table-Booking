//BookingDetailsModal
export const MOCK_BOOKING = {
  customer: "Alex Johnson",
  phone: "0045634567",
  status: "reconfirmed",
  date: "2026-01-19",
  from: "5.00 PM",
  to: "5.00 PM",
  partySize: "06",
  mealType: "Lunch",
  table: "03",
  avatarSrc: null,
};

// mock data for BookingTable 
const MOCK_DATA = [
  { id: 1, tables: [2, 3, 4], customer: "Alex Johnson", phone: "0987654345", time: "02:00 PM", pax: 2, src: "W", dep: 20.0, status: "waitingList" },
  { id: 2, tables: [7],       customer: "Ben Smith", phone: "0987654321", time: "03:00 PM", pax: 4, src: "P", dep: 40.0, status: "unallocated" },
  { id: 3, tables: [2, 3, 4], customer: "Chris Lee", phone: "0987654333", time: "04:00 PM", pax: 3, src: "E", dep: 30.0, status: "confirmed" },
  { id: 4, tables: [7],       customer: "Dana White", phone: "0987654344", time: "05:00 PM", pax: 2, src: "T", dep: 25.0, status: "reconfirmed" },
  { id: 5, tables: [2, 3, 4], customer: "Eva Green", phone: "0987654355", time: "06:00 PM", pax: 5, src: "W", dep: 50.0, status: "seated" },
  { id: 6, tables: [7],       customer: "Frank Black", phone: "0987654366", time: "07:00 PM", pax: 1, src: "P", dep: 10.0, status: "left" },
  { id: 7, tables: [2, 3, 4], customer: "Grace Blue", phone: "0987654377", time: "08:00 PM", pax: 2, src: "E", dep: 20.0, status: "noShow" },
  { id: 8, tables: [7],       customer: "Henry Red", phone: "0987654388", time: "09:00 PM", pax: 3, src: "T", dep: 35.0, status: "cancelled" },
];

export default MOCK_DATA;
