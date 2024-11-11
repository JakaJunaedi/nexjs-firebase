"use client";

import React from "react";
import { Menu } from "lucide-react";

export default function Headers({ toggleSidebar }) {
  return (
    <section className="flex items-center gap-3 bg-white border-b px-4 py-4">
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <h1>Dashboard</h1>
    </section>
  );
}
