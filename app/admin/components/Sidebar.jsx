"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Category",
      link: "/admin/categories",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Product",
      link: "/admin/products",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Order",
      link: "/admin/orders",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Customer",
      link: "/admin/customers",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Review",
      link: "/admin/reviews",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Sales",
      link: "/admin/collectios",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Collections",
      link: "/admin/collectios",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Manage Admin",
      link: "/admin/admins",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
  ];

  return (
    <section className="flex flex-col gap-10 justify-between bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px]">
      <div className="flex justify-center">
        <img src="/logo.png" alt="" className="h-8" />
      </div>
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
        {menuList.map((item, index) => {
          return <Tab item={item} key={index} />;
        })}
      </ul>
      <div className="flex justify-center w-full mb-5">
        <button
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Loading",
                success: "Successfully Log Out",
              });
            } catch (error) {
              toast.error(error?.message);
            }
          }}
          className="flex gap-2 items-center px-3 py-3 hover:bg-indigo-100 rounded-xl w-full font-semibold ease-soft-spring duration-300"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;

  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 py-2 px-4 rounded-xl font-semibold ease-soft-spring transition-all duration-300 ${
          isSelected ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
