"use client";

import Sidebar from "@/components/layout/Sidebar";
import "../../styles/styles.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout bgmain">
      <Sidebar />

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
