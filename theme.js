// Centralized theme color palette for the app
const theme = {

	gray_500: '#4B5563', // darker gray for dark mode
	gray_700: '#1F2937', // even darker gray for dark mode
    
	text_light: '#FFFFFF', 


	primary: {
		DEFAULT: '#2563eb', // blue-600
		light: '#3b82f6',   // blue-500
		dark: '#1e40af', // blue-800

		//Green
        	green_100: '#E6F7F0', // green-100 for reconfirmed status bg
			green_200: '#C8E6C9', // green-200 for other green status bg
			green_300: '#A8E6C9', // green-300 for other green status bg

            noShow_100: '#FEE2E2', // lightest red
		    noShow_200: '#FCA5A5', // medium red
		    noShow_300: '#F87171', // strong red
			
	},
	background: '#fafbfc', // updated light bg
	status: {
		waitingList: '#E6B800',
		unallocated: '#AACC00',
		confirmed: '#66CC00',
		reconfirmed: '#00B34D',
		seated: '#00B395',
		left: '#F26D52',
		noShow: '#F20D0D',// strong red
		cancelled: '#AA091E',
	},
	foreground: '#1F2129', // light mode text
	cardBg: '#FFFFFF', // light mode card background
	border: '#E4E6EB', // light mode border
	secondary: '#F2F4F5', // light mode secondary/muted
	surface: '#f8fafc', // light mode surface


    
	// Dark mode palette
	dark: {
		gray_500: '#6B7280',
		gray_700: '#374151',

		primary: {
			DEFAULT: '#60a5fa', // blue-400

			//Green
            green_50: '#002B1A', // very dark green for dark mode
            green_100: '#174C3C', // deep green for dark mode backgrounds
			green_200: '#276955', // medium green for dark mode
			green_300: '#319C6A', // brighter green accent for dark mode

            noShow_100: '#7F1D1D', // dark red background
			noShow_200: '#B91C1C', // medium dark red
			noShow_300: '#DC2626', // strong dark red
		},
		background: '#1e2027', // updated dark bg
		status: {
			waitingList: '#E6B800',
			unallocated: '#AACC00',
			confirmed: '#66CC00',
			reconfirmed: '#00B34D',
			seated: '#00B395',
			left: '#F26D52',
			noShow: '#F20D0D',			// strong red
			cancelled: '#AA091E',
		},
		foreground: '#FAFAFA', // dark mode text
		text_light: '#FFFFFF',
		cardBg: '#32363E', // dark mode card background
		border: '#434850', // dark mode border
		secondary: '#434850', // dark mode secondary/muted
		surface: '#23272f', // dark mode surface
	},
};

export default theme;
