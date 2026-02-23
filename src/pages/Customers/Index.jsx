

import React, { useState } from "react";
import { IoEyeOutline, IoPrint } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import MOCK_DATA from '../../MockDb';
import theme from "../../../theme";


// Generate unique customers from MOCK_DATA
const customers = Object.values(
	MOCK_DATA.reduce((acc, booking) => {
		if (!acc[booking.customer]) {
			acc[booking.customer] = {
				name: booking.customer,
				contact: booking.phone,
				email: booking.email,
				marketing: booking.marketing,
				bookings: [],
			};
		}
		acc[booking.customer].bookings.push(booking);
		return acc;
	}, {})
);


export default function CustomersPage({ darkMode = false,  }) {
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [search, setSearch] = useState("");

	// Use theme colors similar to BookingTable
	const palette  = darkMode ? theme.dark : theme;
	const bg       = palette.cardBg;
	const surface  = palette.surface  || (darkMode ? "#1e2027" : "#f8fafc");
	const border   = palette.border || "#e5e7eb";
	const text     = palette.foreground || "#1F2129";
	const subtext  = palette.subtext  || (darkMode ? "#94a3b8" : "#64748b");
	const headerBg = palette.headerBg || (darkMode ? "#1e2027" : "#f1f5f9");

	// Filter customers by search
	const filteredCustomers = customers.filter(c =>
		c.name.toLowerCase().includes(search.toLowerCase()) ||
		c.contact.toLowerCase().includes(search.toLowerCase()) ||
		c.email.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 }}>
			<div style={{ gridColumn: 'span 12' }}>
				<h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: palette.foreground, textAlign: 'left' }}>Customers Details</h1>
				{/* Toolbar */}
				<div style={{
					display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10,
					padding: "12px 0 16px 0", background: surface,
					borderTopLeftRadius: 16, borderTopRightRadius: 16
				}}>
					<div style={{
						flex: 1, minWidth: 160, maxWidth: 280,
						display: "flex", alignItems: "center", gap: 8,
						background: darkMode ? "#1e2027" : "#fff",
						border: `1px solid ${border}`, borderRadius: 10, padding: "6px 12px",
					}}>
						<CiSearch style={{ color: subtext, fontSize: 16 }} />
						<input
							value={search}
							onChange={e => setSearch(e.target.value)}
							placeholder="Search..."
							style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: text, width: "100%" }}
						/>
					</div>
					<div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
						{["Excel", "PDF"].map(btn => (
							<button key={btn} style={{
								padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
								border: `1px solid ${border}`, background: "transparent", color: text, cursor: "pointer",
							}}>{btn}</button>
						))}
						<button style={{
							width: 34, height: 34, borderRadius: 8, border: `1px solid ${border}`,
							background: "transparent", cursor: "pointer", color: text,
							display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
						}}>
							<IoPrint />
						</button>
					</div>
				</div>
				<div style={{ background: bg, borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}` }}>
					<div style={{ overflowX: 'auto', width: '100%' }}>
						<table style={{ minWidth: 700, width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
							<thead>
								<tr style={{ background: headerBg }}>
									<th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: subtext }}>Customer Name</th>
									<th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: subtext }}>Contact</th>
									<th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: subtext }}>Email</th>
									<th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: subtext }}>Booking Count</th>
									<th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: subtext }}>Marketing</th>
									<th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: subtext }}>Action</th>
								</tr>
							</thead>
							<tbody>
								{filteredCustomers.map((c, i) => (
									<tr key={c.name} style={{
										background: i % 2 === 0 ? bg : surface,
										borderBottom: `1px solid ${border}`
									}}>
										<td style={{ padding: '12px 16px', fontWeight: 500, color: text, textAlign: 'center' }}>{c.name}</td>
										<td style={{ padding: '12px 16px', color: text, textAlign: 'center' }}>{c.contact}</td>
										<td style={{ padding: '12px 16px', color: text, textAlign: 'center' }}>{c.email}</td>
										<td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: text }}>{c.bookings.length}</td>
										<td style={{ padding: '12px 16px', textAlign: 'center' }}>
											{c.marketing ? <span style={{ color: '#22c55e', fontWeight: 600 }}>Yes</span> : <span style={{ color: '#ef4444', fontWeight: 600 }}>No</span>}
										</td>
										<td style={{ padding: '12px 16px', textAlign: 'center' }}>
											<button
												onClick={() => setSelectedCustomer(c)}
												style={{ background: 'transparent', border: `1px solid ${border}`, borderRadius: 6, cursor: 'pointer', color: subtext, fontSize: 20, padding: "4px 4px"}}
												title="View Bookings"
											>
												<IoEyeOutline />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Modal for showing bookings of selected customer */}
				{selectedCustomer && (
					<div style={{
						position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
						background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
					}}
						onClick={() => setSelectedCustomer(null)}
					>
						<div style={{ background: bg, borderRadius: 12, minWidth: 340, maxWidth: 480, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', color: text }}
							onClick={e => e.stopPropagation()}
						>
							<h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Bookings for {selectedCustomer.name}</h2>
							<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
								{selectedCustomer.bookings.map(b => (
									<li key={b.id} style={{ marginBottom: 10, padding: 10, borderRadius: 8, background: surface, border: `1px solid ${border}` }}>
										<div><strong>Table(s):</strong> {b.tables.join(', ')}</div>
										<div><strong>Time:</strong> {b.time}</div>
										<div><strong>Status:</strong> {b.status}</div>
									</li>
								))}
							</ul>
							<button onClick={() => setSelectedCustomer(null)} style={{ marginTop: 16, padding: '8px 18px', borderRadius: 8, border: 'none', background: subtext, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Close</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
