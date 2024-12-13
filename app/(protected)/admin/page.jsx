"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

export default function AdminPage() {
  const [apiResponse, setApiResponse] = useState("");
  const [actionResponse, setActionResponse] = useState("");

  const onApiRouteClick = () => {
    fetch("api/admin").then((response) => {
      if (response.ok) {
        setApiResponse("OK");
      } else {
        setApiResponse("NotOk");
      }
    });
  };
  const onActionRouteClick = async () => {
    const res = await admin();
    if (res?.success) {
      setActionResponse("OK");
    }
    if (res?.error) {
      setActionResponse("NotOk");
    }
  };

  return (
    <Card>
      <CardHeader className="w-[400px]">
        <p className="text-2xl font-semibold text-center">Admin page</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={"ADMIN"}>
          <FormSuccess message={"I hope you are an admin"} />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-md">
          <p>Admin only route</p>
          <Button onClick={onApiRouteClick} variant="outline">
            Click to test
          </Button>
        </div>
        {apiResponse === "OK" ? (
          <FormSuccess message={"Chal gayi"} />
        ) : (
          apiResponse === "NotOk" && <FormError message={"Nahi Chali"} />
        )}
        <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-md">
          <p>Admin only Server Action</p>
          <Button onClick={onActionRouteClick} variant="outline">
            Click to test
          </Button>
        </div>
        {actionResponse === "OK" ? (
          <FormSuccess message={"Chal gayi"} />
        ) : (
          actionResponse === "NotOk" && <FormError message={"Nahi Chali"} />
        )}
      </CardContent>
    </Card>
  );
}
