import React, { useState, useEffect } from "react";
import SidebarNav from "./SidebarNav/Index";
import HeaderNav from "./Header/Index";
import theme from "../../theme";

export default function MainLayout({ children, onNavigate, darkMode, setDarkMode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const sidebarWidth = sidebarExpanded ? 200 : 64;
  const layoutMargin = 16; 

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SidebarNav
        darkMode={darkMode}
        onNavigate={onNavigate}
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
        notificationCount={3}
        setDarkMode={setDarkMode}
        avatarSrc={null}
      />

      {/* Header */}
      <HeaderNav
        sidebarWidth={sidebarWidth + layoutMargin}
        layoutMargin={layoutMargin}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main
        style={{
          position: "fixed",
          top: 88,
          left: sidebarWidth + 32,
          right: 16,
          bottom: 16,
          background: (darkMode ? theme.dark.background : theme.background),
          color: (darkMode ? theme.dark.foreground : theme.foreground),
          border: `1px solid ${(darkMode ? theme.dark.border : theme.border)}`,
          borderRadius: 12,
          padding: 12,
          overflow: "auto",
        }}
      >
        <style>{`
          @media (max-width: 900px) {
            main {
              top: 16px !important;
            }
          }
        `}</style>
        {children}
      </main>
    </div>
  );
}
