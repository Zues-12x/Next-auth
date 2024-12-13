"use client";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SettingsPage() {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (e, values) => {
    startTransition(async () => {
      e.preventDefault();
      const res = await settings(values);
      update();
    });
  };

  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
}
