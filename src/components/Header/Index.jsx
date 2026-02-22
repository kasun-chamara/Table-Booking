import React, { useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { MdOutlineWbSunny, MdOutlineNightlight } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import NewBookingModal from "../CardComponents/NewBooking/Index";

function IconBtn({ children, onClick, title, darkMode }) {
	return (
		<button
			onClick={onClick}
			title={title}
			className={`
				bg-transparent border-none cursor-pointer
				flex items-center justify-center p-1 rounded-lg
				transition-opacity duration-150 hover:opacity-65
				${darkMode ? 'text-[#FAFAFA]' : 'text-[#1F2129]'}
			`}
		>
			{children}
		</button>
	);
}

export default function HeaderNav({
	sidebarWidth = 64,
	layoutMargin = 16,
	title = "Table Booking App",
	subtitle = "Booking Dashboard",
	notificationCount = 0,
	darkMode = false,
	setDarkMode,
	avatarSrc
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showNewBooking, setShowNewBooking] = useState(false);

	return (
		<>
			<header
				className={`
					fixed top-0 left-0 z-[100]
					flex items-center px-6
					h-[60px] rounded-xl border
					transition-colors duration-200
					${darkMode 
						? 'bg-[#32363E] border-[#374151] shadow-[0_2px_12px_rgba(31,41,55,0.18)]' 
						: 'bg-white border-[#e5e7eb] shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
					}
					md:flex hidden
				`}
				style={{
					width: `calc(100% - ${sidebarWidth}px - ${layoutMargin * 2}px)`,
					marginLeft: sidebarWidth + layoutMargin,
					marginTop: layoutMargin,
					marginBottom: 24,
				}}
			>
				{/* Left: Branding */}
				<div className="flex items-center gap-3">
					{/* Desktop Title (md and up) */}
					<div className="hidden md:flex flex-col leading-tight items-start">
						<span
							className={`
								text-2xl font-semibold tracking-tight
								${darkMode ? 'text-[#FAFAFA]' : 'text-[#1F2129]'}
							`}
						>
							{title}
						</span>
						<span
							className={`
								text-xs font-normal mt-0.5
								${darkMode ? 'text-[#9ca3af]' : 'text-[#6b7280]'}
							`}
						>
							{subtitle}
						</span>
            
					</div>
				</div>

				{/* Right: Icon Cluster */}
				<div className="ml-auto">
					{/* Desktop/Tablet Layout */}
					<div
						className={`
							hidden md:flex items-center gap-1.5
							rounded-[14px] px-2.5 py-1.5 border
							transition-colors duration-250
							${darkMode 
								? 'bg-[#23272f] border-[#374151]' 
								: 'bg-[#f3f4f6] border-[#e5e7eb]'
							}
						`}
					>
						{/* Bell */}
						<div className="relative">
							<IconBtn darkMode={darkMode}>
								<HiOutlineBell size={20} />
							</IconBtn>
							{notificationCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
									{notificationCount}
								</span>
							)}
						</div>

						{/* Divider */}
						<div className={`
							w-px h-5 mx-0.5
							${darkMode ? 'bg-[#374151]' : 'bg-[#e5e7eb]'}
						`} />

						{/* Theme Toggle */}
						<IconBtn
							onClick={() => setDarkMode(d => !d)}
							title="Toggle theme"
							darkMode={darkMode}
						>
							{darkMode
								? <MdOutlineWbSunny size={20} />
								: <MdOutlineNightlight size={20} />
							}
						</IconBtn>

						<div className={`
							w-px h-5 mx-0.5
							${darkMode ? 'bg-[#374151]' : 'bg-[#e5e7eb]'}
						`} />

						<div
							className={`w-8 h-8 rounded-full overflow-hidden cursor-pointer flex items-center justify-center border ${darkMode ? 'border-[#374151]' : 'border-[#e5e7eb]'} bg-white`}
							style={{ boxSizing: 'border-box' }}
						>
							{avatarSrc ? (
								<img 
									src={avatarSrc} 
									alt="User" 
									className="w-full h-full object-cover"
								/>
							) : (
								<svg 
									width="20" 
									height="20" 
									viewBox="0 0 24 24" 
									className={darkMode ? 'fill-[#9ca3af]' : 'fill-[#6b7280]'}
								>
									<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
								</svg>
							)}
						</div>

						<div className="hidden lg:flex gap-2 ml-4">
							 <button
									 className={`
											 px-4 py-1.5 rounded-lg font-semibold text-sm
											 transition-colors duration-200
											 ${darkMode
													 ? 'bg-[#FAFAFA] text-[#32363E] hover:bg-[#32363E] hover:text-[#FAFAFA]'
													 : 'bg-[#1F2129] text-white hover:bg-white hover:text-[#1F2129]'
											 }
									 `}
									 onClick={() => setShowNewBooking(true)}
							 >
									 New Booking
							 </button>
							 <button
									 className={`
											 px-4 py-1.5 rounded-lg font-semibold text-sm border
											 transition-colors duration-200
											 ${darkMode
													 ? 'bg-[#32363E] text-[#FAFAFA] border-[#374151] hover:bg-[#FAFAFA] hover:text-[#32363E]'
													 : 'bg-white text-[#1F2129] border-[#e5e7eb] hover:bg-[#1F2129] hover:text-white'
											 }
									 `}
							 >
									 Close Booking
							 </button>
						</div>
					</div>
          

					<div
						className={`flex md:hidden items-center gap-2 w-full justify-between px-2 py-2`}
						style={{ background: darkMode ? '#23272f' : '#f3f4f6', borderRadius: 12, marginTop: 8, marginBottom: 8 }}
					>
						<button
							className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 mr-2
									 ${darkMode
												? 'bg-[#FAFAFA] text-[#32363E] hover:bg-[#32363E] hover:text-[#FAFAFA]'
												: 'bg-[#1F2129] text-white hover:bg-white hover:text-[#1F2129]'}
							`}
							onClick={() => setShowNewBooking(true)}
						>
							New Booking
						</button>
						<button
							className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm border transition-colors duration-200 ml-2
								${darkMode
									? 'bg-[#32363E] text-[#FAFAFA] border-[#374151] hover:bg-[#FAFAFA] hover:text-[#32363E]'
									: 'bg-white text-[#1F2129] border-[#e5e7eb] hover:bg-[#1F2129] hover:text-white'}
							`}
						>
							Close Booking
						</button>
					</div>
				</div>
			</header>

			{isMenuOpen && (
				<>
					<div 
						className="fixed inset-0 z-[99] bg-black/20 md:hidden"
						onClick={() => setIsMenuOpen(false)}
					/>
					<div
						className={`
							fixed z-[101] left-0 right-0 mx-auto
							top-[calc(60px+${layoutMargin}px+8px)]
							w-[calc(100%-${sidebarWidth}px-${layoutMargin * 2}px-32px)]
							ml-[${sidebarWidth + layoutMargin}px]
							p-4 rounded-xl border
							transition-all duration-200
							${darkMode 
								? 'bg-[#32363E] border-[#374151] shadow-[0_4px_12px_rgba(31,41,55,0.25)]' 
								: 'bg-white border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
							}
						`}
						style={{
							marginLeft: sidebarWidth + layoutMargin,
							width: `calc(100% - ${sidebarWidth}px - ${layoutMargin * 2}px - 32px)`,
						}}
					>
						<div className="flex flex-col gap-2">
							<button
								className={`
									w-full px-4 py-3 rounded-lg font-semibold text-sm
									transition-colors duration-200 text-left
									${darkMode
										? 'bg-[#FAFAFA] text-[#32363E] hover:bg-[#374151] hover:text-[#FAFAFA]'
										: 'bg-[#1F2129] text-white hover:bg-[#f3f4f6] hover:text-[#1F2129]'
									}
								`}
								onClick={() => setIsMenuOpen(false)}
							>
								New Booking
							</button>
							<button
								className={`
									w-full px-4 py-3 rounded-lg font-semibold text-sm border
									transition-colors duration-200 text-left
									${darkMode
										? 'bg-[#32363E] text-[#FAFAFA] border-[#374151] hover:bg-[#FAFAFA] hover:text-[#32363E]'
										: 'bg-white text-[#1F2129] border-[#e5e7eb] hover:bg-[#1F2129] hover:text-white'
									}
								`}
								onClick={() => setIsMenuOpen(false)}
							>
								Close Booking
							</button>
						</div>
					</div>
				</>
			)}

			{showNewBooking && (
				<NewBookingModal
					open={showNewBooking}
					onClose={() => setShowNewBooking(false)}
					darkMode={darkMode}
					accentColor="#22c55e"
				/>
			)}
		</>
	);
}