"use client";

import { logout } from "@/actions/logout";

export default function LogoutButton({ children }) {
  const onClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}{" "}
    </span>
  );
}
