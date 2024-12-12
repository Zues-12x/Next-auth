import Link from "next/link";
import { Button } from "../ui/button";

export default function BackButton({ href, label }) {
  console.log("BackButton href:", href);
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
