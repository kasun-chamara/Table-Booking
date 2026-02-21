import React from "react";
import SidebarNav from "./SidebarNav/Index";

export default function MainLayout({ children, onNavigate }) {
  return (
    <div>
      <SidebarNav isDarkMode={false} onNavigate={onNavigate} />
      <div style={{ marginLeft: 64, padding: 24 }}>
        {children}
      </div>
    </div>
  );
}
