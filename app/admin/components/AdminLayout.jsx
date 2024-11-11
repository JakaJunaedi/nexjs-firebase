"use client";

import Headers from "@/app/admin/components/Headers";
import Sidebar from "@/app/admin/components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutSideEvent(event) {
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSideEvent);
    };
  }, []);

  return (
    <main className="relative flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        ref={sidebarRef}
        className={`fixed md:hidden ease-in-out transition-all duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-[260px]"
        }`}
      >
        <Sidebar />
      </div>
      <section className="flex-1 flex flex-col min-h-screen">
        <Headers toggleSidebar={toggleSidebar} />
        <section className="flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
}
