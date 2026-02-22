
import React from "react";
import theme from "../../../theme";

export default function CloseBooking({ darkMode = false }) {
	const palette = darkMode ? theme.dark : theme;
	return (
		<div
			style={{
				background: palette.cardBg,
				border: `1px solid ${palette.border}`,
				borderRadius: 8,
				boxShadow: palette.shadow,
				padding: 16,
				color: palette.foreground,
				maxWidth: 480,
				margin: "32px auto"
			}}
		>
			<h2 className="text-xl font-bold mb-2">Close Booking Test</h2>
			<p>This is a test page for Close Booking.</p>
		</div>
	);
}
