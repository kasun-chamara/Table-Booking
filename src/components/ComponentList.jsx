
import React, { useState } from "react";
import BookingStatusList from "./BookingStatus/Index";
import ReminderConfirmModal from "./CardComponents/ReminderCard/Index";
import TimeSlotBookingModal from "./CardComponents/TimeSlot/Index";
import TableCapacityCard from "./CardComponents/TableCard/Index";
import SidebarNav from "./SidebarNav/Index";
import HeaderNav from "./Header/Index";

export default function ComponentList() {
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [timeSlotModalOpen, setTimeSlotModalOpen] = useState(false);

  return (
    <>
      <HeaderNav title="Component Showcase" subtitle="Explore UI Components" />
      <div className="space-y-8" style={{ marginLeft: 64 }}>
        <BookingStatusList />
        <h3 className="text-xl font-bold text-center">   Open Modal</h3>
        <div className="flex flex-col gap-3 items-center justify-center">
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition"
            style={{ width: 300 }}
            onClick={() => setReminderModalOpen(true)}
          >
            Open Reminder Modal
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            style={{ width: 300 }}
            onClick={() => setTimeSlotModalOpen(true)}
          >
            Open Time Slot Modal
          </button>
        </div>
        <ReminderConfirmModal open={reminderModalOpen} onClose={() => setReminderModalOpen(false)} />
        <TimeSlotBookingModal open={timeSlotModalOpen} onClose={() => setTimeSlotModalOpen(false)} />
        <h3 className="text-xl font-bold text-center">Table Capacity Cards</h3>
        <div className="flex flex-row gap-6 items-start justify-center">  
          {/* Example: All available */}
          <TableCapacityCard
            tableNumbers={[
              { num: 2, available: true },
              { num: 3, available: true},
              { num: 4, available: true},
            ]}
            min={2}
            max={4}
          />
          {/* Example: All unavailable */}
          <TableCapacityCard
            tableNumbers={[
              { num: 5, available: false },
              { num: 6, available: false },
              { num: 7, available: false },
              { num: 8, available: false },
            ]}
            min={2}
            max={8}
          />
        </div>
      </div>
    </>
  );
}
