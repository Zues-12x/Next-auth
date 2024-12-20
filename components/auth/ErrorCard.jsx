import CardWrapper from "./CardWrapper";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    />
  );
}
