"use client";

import FormError from "../form-error";
import { useCurrentRole } from "@/hooks/getRole";

export default function RoleGate({ children, allowedRole }) {
  const { role } = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError
        message={"You don't have the permission to view this content!"}
      />
    );
  }

  return <>{children}</>;
}
