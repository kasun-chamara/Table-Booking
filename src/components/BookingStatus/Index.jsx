import React from 'react';
import theme from '../../../theme';

// Default statuses and labels
const defaultStatuses = [
  'waitingList',
  'unallocated',
  'confirmed',
  'reconfirmed',
  'seated',
  'left',
  'noShow',
  'cancelled',
];

const defaultStatusLabels = {
  waitingList: 'Waiting List',
  unallocated: 'Unallocated',
  confirmed: 'Confirmed',
  reconfirmed: 'Reconfirmed',
  seated: 'Seated',
  left: 'Left',
  noShow: 'No Show',
  cancelled: 'Cancelled',
};


const BookingStatusList = ({
	statuses = defaultStatuses,
	statusLabels = defaultStatusLabels,
	isDarkMode = false,
}) => {
	const palette = isDarkMode ? theme.dark : theme;
	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<div
				className="p-6 rounded-lg"
				style={{ background: palette.background, color: palette.foreground }}
			>
				<h2 className="mb-4 text-lg font-semibold" style={{ color: palette.foreground }}>
					Booking Statuses
				</h2>
				<ul className="list-none p-0">
					{statuses.map((status) => (
						<li
							key={status}
							className="flex items-center justify-center mb-3 rounded-xl h-10 px-4"
							style={{ background: palette.status[status], width: '150px' }}
						>
							<span className="font-medium" style={{ color: palette.text_light }}>{statusLabels[status]}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BookingStatusList;
