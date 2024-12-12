"use client";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import CardWrapper from "./CardWrapper";
import { verify } from "@/actions/verify";
import FormSuccess from "../form-success";
import FormError from "../form-error";

export default function NewVerificationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = useCallback(() => {
    setError(null);
    setSuccess(null);

    if (token) {
      setLoading(true);
      verify(token)
        .then((data) => {
          setLoading(false);
          setSuccess(data?.success);
          setError(data?.error);
        })
        .catch(() => {
          setError("Something went wrong");
          setLoading(false);
        });
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Confirm your account verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center my-2">
        <button onClick={onSubmit} className="bg-blue-700 p-2 rounded-md">
          Verify
        </button>
      </div>
      <div className="flex items-center w-full justify-center">
        {loading && !error && !success ? <BeatLoader></BeatLoader> : ""}
        {success ? <FormSuccess message={success} /> : ""}
        {error ? <FormError message={error} /> : ""}
      </div>
    </CardWrapper>
  );
}
