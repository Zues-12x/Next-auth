"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./CardWrapper";
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "../ui/form";
import { LoginSchema } from "@/schemas/index";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const urlError =
    params.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", code: "" },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await login(values, callbackUrl);
      if (response?.error) {
        {
          setError(response?.error);
          if (!showTwoFactor) {
            form.reset();
          }
        }
      }
      if (response?.success) {
        form.reset();
        setSuccess(response?.success);
      }
      if (response?.twoFactor) {
        setShowTwoFactor(true);
      }
    });
  };

  return (
    <>
      <CardWrapper
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        headerLabel="Welcome back"
        showSocial
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {!showTwoFactor ? (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Enter email"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter password"
                            type="password"
                          />
                        </FormControl>
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/auth/resetPassword">
                            Forgot password?
                          </Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Enter the code you recieved"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              {showTwoFactor ? "Verify 2FA" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
