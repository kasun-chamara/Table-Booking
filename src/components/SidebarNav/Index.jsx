import React, { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineViewList,
  HiOutlineViewGrid,
  HiOutlineLogout,
} from "react-icons/hi";
import { MdTableRestaurant } from "react-icons/md";
import { TbBrandCodesandbox } from "react-icons/tb";
import theme from "../../../theme";
import { FiSettings } from "react-icons/fi";
import { MdFastfood } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdTableChart } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { MdTimeline } from "react-icons/md";
import { MdWidgets } from "react-icons/md";

// ─── SidebarNav ───────────────────────────────────────────────────────────────
export default function SidebarNav({
  activeId = "home",
  onNavigate,
  onLogout,
  theme: customTheme,
  isDarkMode = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(activeId);
  const [subMenuActive, setSubMenuActive] = useState(null);

  // Use centralized theme file for palette
  const palette = isDarkMode
    ? (customTheme?.dark || theme.dark)
    : (customTheme || theme);

  const colors = {
    bg:          palette.sidebar_bg ?? (isDarkMode ? "#1f2937" : "#ffffff"),
    border:      palette.border     ?? palette.gray_700 ?? (isDarkMode ? "#374151" : "#e5e7eb"),
    iconDefault: palette.gray_400   ?? (isDarkMode ? "#9ca3af" : "#6b7280"),
    iconActive:  palette.primary    ?? (isDarkMode ? "#ffffff" : "#111827"),
    activeBg:    palette.gray_300   ?? (isDarkMode ? "#374151" : "#e5e7eb"),
    logout:      palette.status?.noShow ?? "#ef4444",
    text:        palette.foreground ?? (isDarkMode ? "#FAFAFA" : "#1F2129"),
  };

  const NAV_ITEMS = [
    { id: "home",   label: "Home",      icon: HiOutlineHome },
    { id: "resturant", label: "Restaurant", icon: MdTableRestaurant, subMenu: [
      { id: "setting", label: "Setting", icon: FiSettings },
      { id: "mealtype", label: "Meal Type", icon: MdFastfood },
      { id: "closebooking", label: "Close Booking", icon: MdClose },
    ] },
    { id: "customers", label: "Customers", icon: HiOutlineUsers },
    { id: "widget",    label: "Widget",    icon: HiOutlineViewList },
    { id: "tables",    label: "Tables",    icon: HiOutlineViewGrid, subMenu: [
      { id: "table",      label: "Table",       icon: MdTableChart },
      { id: "tablegroup", label: "Table Group",  icon: MdGroup },
      { id: "timeline",   label: "Timeline",     icon: MdTimeline },
    ] },
    { id: "components", label: "Components", icon: MdWidgets },
  ];

  const ROUTE_MAP = {
    home:         "/",
    setting:      "/setting",
    mealtype:     "/mealtype",
    closebooking: "/closebooking",
    customers:    "/customers",
    widget:       "/widget",
    components:   "/components",
    table:        "/table",
    tablegroup:   "/tablegroup",
    timeline:     "/timeline",
  };

  // ✅ FIXED: now uses ROUTE_MAP to pass correct path
  const handleNav = (id) => {
    setActive(id);
    setSubMenuActive(null);
    onNavigate?.(ROUTE_MAP[id] ?? "/");
  };

  // ✅ FIXED: now uses ROUTE_MAP to pass correct path
  const handleSubMenu = (id) => {
    setSubMenuActive(id);
    onNavigate?.(ROUTE_MAP[id] ?? "/");
  };

  return (
    <nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        width: expanded ? 200 : 64,
        transition: "width 0.25s ease",
        height: "calc(100vh - 32px)",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        padding: "16px 8px",
        position: "fixed",
        left: 16,
        top: 16,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"0 12px", marginBottom:8, color:colors.text }}>
        <TbBrandCodesandbox size={28} />
        {expanded && <strong style={{ whiteSpace:"nowrap" }}>Dashboard</strong>}
      </div>

      <div style={{ height:1, background:colors.border, marginBottom:8 }} />

      {/* Nav items */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
        {NAV_ITEMS.map(({ id, icon: Icon, label, subMenu }) => (
          <React.Fragment key={id}>
            <button
              onClick={() => handleNav(id)}
              style={{
                display:"flex", alignItems:"center", gap:12,
                height:44, padding:"0 12px", borderRadius:10,
                border:"none", cursor:"pointer",
                background: active === id ? colors.activeBg : "transparent",
                color: colors.text,
                transition:"background 0.15s ease",
                whiteSpace:"nowrap",
              }}
            >
              {React.createElement(Icon, { size: 22 })}
              {expanded && <span style={{ fontSize:14, fontWeight:500, color:colors.text }}>{label}</span>}
              {expanded && subMenu && (
                <span style={{ marginLeft:4, display:"flex", alignItems:"center", transition:"transform 0.2s", transform: active === id ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L10 8L6 12" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>

            {/* Sub-menu for Restaurant */}
            {id === "resturant" && active === "resturant" && expanded && subMenu && (
              <div style={{ marginLeft:36, marginTop:4, display:"flex", flexDirection:"column", gap:2 }}>
                {subMenu.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubMenu(sub.id)}
                    style={{
                      display:"flex", alignItems:"center", gap:8, height:32, padding:"0 8px", borderRadius:8,
                      border:"none", cursor:"pointer",
                      background: subMenuActive === sub.id ? colors.activeBg : "transparent",
                      color: colors.text,
                      fontSize:13, fontWeight:400, textAlign:"left"
                    }}
                  >
                    {sub.icon && React.createElement(sub.icon, { size:18, style:{ marginRight:6 }, color: subMenuActive === sub.id ? colors.iconActive : colors.text })}
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {/* Sub-menu for Tables */}
            {id === "tables" && active === "tables" && expanded && subMenu && (
              <div style={{ marginLeft:36, marginTop:4, display:"flex", flexDirection:"column", gap:2 }}>
                {subMenu.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubMenu(sub.id)}
                    style={{
                      display:"flex", alignItems:"center", gap:8, height:32, padding:"0 8px", borderRadius:8,
                      border:"none", cursor:"pointer",
                      background: subMenuActive === sub.id ? colors.activeBg : "transparent",
                      color: colors.text,
                      fontSize:13, fontWeight:400, textAlign:"left"
                    }}
                  >
                    {sub.icon && React.createElement(sub.icon, { size:18, style:{ marginRight:6 }, color: subMenuActive === sub.id ? colors.iconActive : colors.text })}
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ height:1, background:colors.border, margin:"8px 0" }} />

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          display:"flex", alignItems:"center", gap:12,
          height:44, padding:"0 12px", borderRadius:10,
          border:"none", cursor:"pointer",
          color: colors.logout, background:"transparent", whiteSpace:"nowrap",
        }}
      >
        <HiOutlineLogout size={22} />
        {expanded && <span style={{ fontSize:14, color: palette.status?.noShow || colors.logout }}>Logout</span>}
      </button>
    </nav>
  );
}