"use client";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="bg-secondary flex justify-between rounded-xl items-center w-[600px] shadow-sm p-3 ">
      <div className="flex gap-2">
        <Button variant={path === "/server" ? "default" : "outlined "} asChild>
          <Link href="/server"> Server</Link>
        </Button>
        <Button variant={path === "/client" ? "default" : "outlined "} asChild>
          <Link href="/client"> Client</Link>
        </Button>
        <Button variant={path === "/admin" ? "default" : "outlined "} asChild>
          <Link href="/admin"> Admin</Link>
        </Button>
        <Button
          variant={path === "/settings" ? "default" : "outlined "}
          asChild
        >
          <Link href="/settings"> Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}
