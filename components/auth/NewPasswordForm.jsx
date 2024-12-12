"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import CardWrapper from "./CardWrapper";
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "../ui/form";
import { NewPasswordSchema } from "@/schemas/index";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { newPassword } from "@/actions/new-password";

export default function NewPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });
  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await newPassword(values, token);
      setError(response?.error);
      setSuccess(response?.success);
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Create new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter new password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="New password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Create new password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
