import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-slate-900 p-2 text-white">Logout</button>
      </form>
    </div>
  );
}
