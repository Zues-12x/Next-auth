
export default function Header({ label }) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="font-bold text-3xl">Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
