"use client";

import { useRouter } from "next/navigation";

export default function LoginButton({ children, mode = "redirect", asChild }) {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>Modal todo</span>;
  }

  return (
    <>
      <span onClick={onClick} className="cursor-pointer">
        {children}
      </span>
      ;
    </>
  );
}
