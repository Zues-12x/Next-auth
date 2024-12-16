"use client";
import { useSession } from "next-auth/react";
import UserInfo from "../_components/UserInfo";

export default function ClientPage() {
  const session = useSession();
  return (
    <UserInfo
      user={session?.data?.user}
      label={"User Info: (client component)"}
    />
  );
}
